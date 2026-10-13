"""Notion -> review -> isolated preview -> local post. Never commits or pushes."""
import argparse
import difflib
import hashlib
import html
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from urllib.parse import urlparse
from uuid import UUID, uuid4
import yaml

ROOT = Path(__file__).resolve().parent
CATEGORIES = {'life', 'learning', 'research', 'cifellowship'}
LANGUAGES = {'kr', 'en', 'es'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def atomic_write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.tmp-' + uuid4().hex)
    temporary.write_bytes(data)
    os.replace(temporary, path)


def read_post(path):
    text = path.read_text(encoding='utf-8-sig')
    match = re.match(r'\A---\s*\n(.*?)\n---\s*\n(.*)\Z', text, re.S)
    if not match:
        raise ValueError(f'Invalid front matter: {path.name}')
    return yaml.safe_load(match[1]) or {}, match[2]


def plain(items):
    return ''.join(item.get('plain_text', item.get('text', {}).get('content', '')) for item in items)


def property_text(prop):
    prop = prop or {}
    return plain(prop.get('title', prop.get('rich_text', [])))


def safe_url(url):
    if urlparse(url).scheme not in ('https', 'http', 'mailto'):
        raise ValueError('Unsupported URL scheme in Notion content.')
    return url


def rich(items):
    parts = []
    for item in items:
        text = html.escape(plain([item]), quote=False)
        annotations = item.get('annotations', {})
        if annotations.get('code'):
            text = '<code>' + text + '</code>'
        else:
            for key, tag in [('bold', 'strong'), ('italic', 'em'), ('strikethrough', 'del')]:
                if annotations.get(key):
                    text = f'<{tag}>{text}</{tag}>'
        if item.get('href'):
            text = '<a href="' + html.escape(safe_url(item['href']), quote=True) + '">' + text + '</a>'
        parts.append(text)
    return ''.join(parts)


def extract_notion_page_id(value):
    match = re.search(r'[a-fA-F0-9]{32}|[a-fA-F0-9]{8}(?:-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}', value)
    if not match:
        raise ValueError('A Notion page URL or ID is required.')
    return str(UUID(match.group()))


def get_all_blocks(client, page_id):
    blocks, cursor = [], None
    while True:
        result = client.blocks.children.list(block_id=page_id, start_cursor=cursor, page_size=100)
        for block in result['results']:
            if block.get('has_children'):
                block['children'] = get_all_blocks(client, block['id'])
            blocks.append(block)
        if not result.get('has_more'):
            return blocks
        cursor = result['next_cursor']


def metadata(page, overrides):
    props = page.get('properties', {})
    title_prop = props.get('title') or next((p for p in props.values() if p.get('type') == 'title'), {})
    title = property_text(title_prop).strip()
    if not title:
        raise ValueError('Notion page has no title.')
    select = lambda key: (props.get(key, {}).get('select') or {}).get('name', '')
    category = overrides.get('category') or select('categories')
    lang = overrides.get('lang') or select('lang') or 'kr'
    lang = 'kr' if lang == 'ko' else lang
    if category not in CATEGORIES:
        raise ValueError('Set categories in Notion or pass --category life|learning|research|cifellowship.')
    if lang not in LANGUAGES:
        raise ValueError('Language must be kr, en or es.')
    date = (props.get('date', {}).get('date') or {}).get('start') or datetime.now(timezone.utc).date().isoformat()
    parsed_date = datetime.fromisoformat(date.replace('Z', '+00:00'))
    filename = overrides.get('slug') or property_text(props.get('filename'))
    translation_id = property_text(props.get('translation_id')) or filename or page['id'].replace('-', '')
    slug = re.sub(r'[^a-z0-9-]', '', (filename or translation_id).lower().replace(' ', '-'))
    if not slug:
        raise ValueError('Provide a nonempty English --slug, e.g. new-york-weekend.')
    fm = {'layout': 'post', 'title': title, 'date': parsed_date.isoformat(), 'lang': lang,
          'categories': category, 'subtitle': property_text(props.get('subtitle')),
          'translation_id': translation_id, 'notion_id': extract_notion_page_id(page['id']),
          'tags': [t['name'] for t in props.get('tags', {}).get('multi_select', [])]}
    if 'featured' in props:
        fm['featured'] = bool(props['featured'].get('checkbox'))
    if select('categorydisplay'):
        fm['categorydisplay'] = select('categorydisplay')
    prefix = '' if lang == 'kr' else '/' + lang
    fm['permalink'] = f'{prefix}/{category}/{slug}/'
    return fm, f'{parsed_date.date().isoformat()}-{slug}.md'


def find_target(root, fm, filename):
    matches = []
    for path in (root / '_posts').rglob('*.md'):
        existing, _ = read_post(path)
        if existing.get('lang') == fm['lang'] and (
            existing.get('notion_id') == fm['notion_id'] or
            existing.get('translation_id') == fm['translation_id']
        ):
            matches.append((path, existing))
    if len(matches) > 1:
        raise ValueError('Multiple existing posts match this identity; resolve before importing.')
    if matches:
        path, existing = matches[0]
        merged = dict(existing)
        merged.update(fm)
        merged['permalink'] = existing.get('permalink', fm['permalink'])
        return path, merged
    target = root / '_posts' / fm['lang'] / fm['categories'] / filename
    if target.exists():
        raise ValueError('Filename belongs to another post. Choose another --slug.')
    return target, fm


class Images:
    def __init__(self, stage):
        self.stage = stage
        self.assets = {}
        self.urls = {}

    def store(self, url):
        import requests
        safe_url(url)
        if url in self.urls:
            return self.urls[url]
        if urlparse(url).scheme != 'https':
            raise ValueError('Images must use HTTPS.')
        extensions = {'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/avif': '.avif'}
        with requests.get(url, stream=True, timeout=(10, 45)) as response:
            response.raise_for_status()
            kind = response.headers.get('Content-Type', '').split(';')[0]
            if kind not in extensions:
                raise ValueError('Unsupported image format; use JPEG, PNG, WebP, GIF or AVIF.')
            chunks, size = [], 0
            for chunk in response.iter_content(65536):
                size += len(chunk)
                if size > 25 * 1024 * 1024:
                    raise ValueError('An image exceeds 25 MB. Resize it before importing.')
                chunks.append(chunk)
        data = b''.join(chunks)
        name = digest(data) + extensions[kind]
        atomic_write(self.stage / 'assets' / name, data)
        destination = 'assets/images/posts/' + name
        self.assets[destination] = digest(data)
        self.urls[url] = '/' + destination
        return self.urls[url]


def render_blocks(blocks, images):
    output = []
    list_kind = None
    for block in blocks:
        kind = block['type']
        content = block.get(kind, {})
        current_list = {'bulleted_list_item': 'ul', 'numbered_list_item': 'ol', 'to_do': 'ul'}.get(kind)
        if list_kind != current_list:
            if list_kind:
                output.append(f'</{list_kind}>')
            if current_list:
                output.append(f'<{current_list}>')
            list_kind = current_list
        text = rich(content.get('rich_text', []))
        children = block.get('children', [])
        if kind == 'table':
            rows = []
            for index, row in enumerate(children):
                cells = []
                for column, cell in enumerate(row['table_row']['cells']):
                    tag = 'th' if (index == 0 and content.get('has_column_header')) or (column == 0 and content.get('has_row_header')) else 'td'
                    cells.append(f'<{tag}>{rich(cell)}</{tag}>')
                rows.append('<tr>' + ''.join(cells) + '</tr>')
            output.append('<div class="notion-table"><table>' + ''.join(rows) + '</table></div>')
            continue
        nested = render_blocks(children, images) if children else ''
        if current_list:
            checkbox = ('☑ ' if content.get('checked') else '☐ ') if kind == 'to_do' else ''
            output.append(f'<li>{checkbox}{text}{nested}</li>')
        elif kind == 'paragraph':
            if text or nested:
                output.append((f'<p>{text}</p>' if text else '') + nested)
        elif kind.startswith('heading_'):
            level = max(2, int(kind[-1]))
            anchor = 'notion-' + block['id'].replace('-', '')
            output.append(f'<h{level} id="{anchor}">{text}</h{level}>' + nested)
        elif kind == 'toggle':
            output.append(f'<details><summary>{text}</summary>{nested}</details>')
        elif kind in ('quote', 'callout'):
            output.append(f'<blockquote><p>{text}</p>{nested}</blockquote>')
        elif kind == 'code':
            language = re.sub(r'[^a-zA-Z0-9_-]', '', content.get('language', 'text'))
            output.append(f'<pre><code class="language-{language}">{html.escape(plain(content.get("rich_text", [])))}</code></pre>')
        elif kind == 'divider':
            output.append('<hr>')
        elif kind == 'image':
            url = (content.get('file') or content.get('external') or {}).get('url')
            if not url:
                raise ValueError('An image has no downloadable URL.')
            src = images.store(url)
            caption = rich(content.get('caption', []))
            alt = html.escape(plain(content.get('caption', [])), quote=True)
            output.append(f'<figure><img src="{src}" alt="{alt}" loading="lazy">' + (f'<figcaption>{caption}</figcaption>' if caption else '') + '</figure>')
        elif kind in ('bookmark', 'link_preview', 'embed'):
            url = safe_url(content.get('url', ''))
            output.append(f'<p><a href="{html.escape(url, quote=True)}">{html.escape(url)}</a></p>')
        elif kind in ('column_list', 'column', 'synced_block') and nested:
            output.append(nested)
        elif kind == 'table_of_contents':
            pass
        else:
            raise ValueError(f'Unsupported Notion block: {kind}. Convert it before importing; nothing was published.')
    if list_kind:
        output.append(f'</{list_kind}>')
    return '\n'.join(output)


def serialize(fm, body):
    return '---\n' + yaml.safe_dump(fm, allow_unicode=True, sort_keys=False) + '---\n\n{% raw %}\n' + body.replace('{% endraw %}', '&#123;% endraw %&#125;') + '\n{% endraw %}\n'


def prepare(page, blocks, overrides, root=ROOT):
    fm, filename = metadata(page, overrides)
    target, fm = find_target(root, fm, filename)
    review = datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S-') + uuid4().hex[:8]
    stage = root / '.blog-workflow' / 'reviews' / review
    stage.mkdir(parents=True)
    images = Images(stage)
    body = render_blocks(blocks, images)
    image_prop = page.get('properties', {}).get('image', {})
    files = image_prop.get('files', [])
    image_url = image_prop.get('url')
    if files:
        image_url = (files[0].get('file') or files[0].get('external') or {}).get('url')
    if not image_url and page.get('cover'):
        image_url = (page['cover'].get('external') or page['cover'].get('file') or {}).get('url')
    if image_url:
        fm['image'] = images.store(image_url)
    candidate = serialize(fm, body).encode('utf-8')
    atomic_write(stage / 'post.md', candidate)
    base = target.read_bytes() if target.exists() else b''
    manifest = {'target': target.relative_to(root).as_posix(), 'base_hash': digest(base),
                'existed': target.exists(), 'candidate_hash': digest(candidate), 'assets': images.assets,
                'notion_id': fm['notion_id'], 'permalink': fm['permalink']}
    atomic_write(stage / 'manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2).encode('utf-8'))
    atomic_write(stage / 'before.md', base)
    return review


def load_review(review, root=ROOT):
    if not re.fullmatch(r'\d{8}-\d{6}-[a-f0-9]{8}', review):
        raise ValueError('Invalid review ID.')
    stage = root / '.blog-workflow' / 'reviews' / review
    manifest = json.loads((stage / 'manifest.json').read_text(encoding='utf-8'))
    target = (root / manifest['target']).resolve()
    if not target.is_relative_to((root / '_posts').resolve()) or target.suffix != '.md':
        raise ValueError('Review target must be a Markdown post inside _posts.')
    candidate = (stage / 'post.md').read_bytes()
    if digest(candidate) != manifest['candidate_hash']:
        raise ValueError('Candidate changed after import. Edit the Notion source and import again.')
    for relative, expected in manifest['assets'].items():
        destination = (root / relative).resolve()
        if not destination.is_relative_to((root / 'assets/images/posts').resolve()):
            raise ValueError('Invalid asset destination.')
        if digest((stage / 'assets' / destination.name).read_bytes()) != expected:
            raise ValueError('Staged image changed after import.')
    return stage, manifest, target, candidate


def review_diff(review, root=ROOT):
    stage, manifest, target, candidate = load_review(review, root)
    old = target.read_text(encoding='utf-8-sig') if target.exists() else ''
    return ''.join(difflib.unified_diff(old.splitlines(True), candidate.decode('utf-8').splitlines(True), fromfile=manifest['target'], tofile='Notion candidate'))


def copy_assets(stage, manifest, root):
    for relative, expected in manifest['assets'].items():
        destination = root / relative
        if destination.exists():
            if digest(destination.read_bytes()) != expected:
                raise ValueError('Existing image differs from its content hash.')
        else:
            atomic_write(destination, (stage / 'assets' / destination.name).read_bytes())


def apply_review(review, root=ROOT):
    stage, manifest, target, candidate = load_review(review, root)
    current = target.read_bytes() if target.exists() else b''
    if target.exists() and digest(current) == manifest['candidate_hash']:
        return target
    if target.exists() != manifest['existed'] or digest(current) != manifest['base_hash']:
        raise ValueError('The post changed since import. Import again to review the new differences; no overwrite performed.')
    copy_assets(stage, manifest, root)
    atomic_write(target, candidate)
    return target


def preview_review(review, root=ROOT, serve=True, port=4001):
    stage, manifest, target, candidate = load_review(review, root)
    folder = Path(tempfile.mkdtemp(prefix='preview-', dir=root / '.blog-workflow'))
    source = folder / 'source'
    shutil.copytree(root, source, ignore=shutil.ignore_patterns('.blog-workflow', '_site', '.jekyll-cache', '.sass-cache', 'vendor', '.env', '.git', 'slee-comment-joy-main', '__pycache__'))
    copy_assets(stage, manifest, source)
    atomic_write(source / manifest['target'], candidate)
    destination = folder / 'site'
    bundle = shutil.which('bundle') or shutil.which('bundle.bat')
    if not bundle:
        raise ValueError('Ruby Bundler is required for preview.')
    subprocess.run([bundle, 'exec', 'jekyll', 'build', '--source', str(source), '--destination', str(destination)], cwd=root, check=True)
    print('Preview built:', destination)
    if serve:
        print(f'Preview: http://127.0.0.1:{port}{manifest["permalink"]}?nolang=1')
        subprocess.run([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1', '--directory', str(destination)], check=True)
    return destination


def main():
    # Windows redirected output otherwise uses the legacy console code page.
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, 'reconfigure'):
            stream.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    importer = commands.add_parser('import', help='Import into an isolated review, not _posts')
    importer.add_argument('url')
    importer.add_argument('--category', choices=sorted(CATEGORIES))
    importer.add_argument('--lang', choices=sorted(LANGUAGES))
    importer.add_argument('--slug', help='Stable English filename for a new post')
    for name in ('review', 'apply', 'preview'):
        command = commands.add_parser(name)
        command.add_argument('id', help='Review ID printed by import')
        if name == 'preview':
            command.add_argument('--no-serve', action='store_true')
            command.add_argument('--port', type=int, default=4001)
    argv = sys.argv[1:]
    if argv and argv[0].startswith('https://'):
        argv.insert(0, 'import')
    args = parser.parse_args(argv)
    if args.command == 'import':
        from dotenv import load_dotenv
        from notion_client import Client
        load_dotenv(ROOT / '.env')
        token = os.getenv('NOTION_TOKEN')
        if not token:
            raise ValueError('NOTION_TOKEN is missing in docs/.env. See WRITING.md.')
        client = Client(auth=token)
        page_id = extract_notion_page_id(args.url)
        page = client.pages.retrieve(page_id=page_id)
        blocks = get_all_blocks(client, page_id)
        review = prepare(page, blocks, vars(args))
        print('Review ID:', review)
        print('No published files changed. Next:')
        for command in ('review', 'preview', 'apply'):
            print(f'  python new_blog_workflow.py {command} {review}')
    elif args.command == 'review':
        print(review_diff(args.id) or 'No text changes.')
    elif args.command == 'apply':
        print('Updated locally:', apply_review(args.id))
        print('Not deployed. Review the Git diff, build, then commit/push only the approved post and images.')
    else:
        preview_review(args.id, serve=not args.no_serve, port=args.port)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        if isinstance(error, (ValueError, FileNotFoundError)):
            print(f'Error: {error}', file=sys.stderr)
        else:
            print(f'Import/preview failed ({type(error).__name__}). Check page access, network and configuration; no automatic deployment occurred.', file=sys.stderr)
        sys.exit(1)
