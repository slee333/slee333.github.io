"""Local Markdown writing, image optimization and isolated Jekyll previews.

Never commits, pushes, uploads, downloads or changes Notion content.
"""
import argparse
from datetime import date, datetime, timezone
import hashlib
import http.server
import io
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
from urllib.parse import quote, unquote, urljoin, urlsplit
from uuid import uuid4

import yaml
from markdown_it import MarkdownIt
from markdown_it.rules_inline.image import image as parse_image
from PIL import Image, ImageOps
import pillow_avif  # Register AVIF decoding as well as encoding before reading images.

ROOT = Path(__file__).resolve().parent
CATEGORIES = {'life', 'learning', 'research', 'cifellowship'}
LANGUAGES = {'kr', 'en', 'es'}
POLICY = 'v1-jpeg-avif60-1600-png-lossless-webp'
EXCLUDED = {'.git', '.obsidian', '.env', '.blog-workflow', '_site', '_media',
            '.jekyll-cache', '.sass-cache', 'vendor', 'slee-comment-joy-main', '__pycache__'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def atomic_write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.tmp-' + uuid4().hex)
    temporary.write_bytes(data)
    os.replace(temporary, path)


def split_post(text):
    match = re.match(r'\A\ufeff?---\s*\n(.*?)\n---[^\S\n]*\n?', text, re.S)
    if not match:
        raise ValueError('글 맨 위에 블로그 글 템플릿의 속성을 넣어 주세요.')
    metadata = yaml.safe_load(match[1]) or {}
    if not isinstance(metadata, dict):
        raise ValueError('글 속성은 YAML 이름: 값 형식이어야 합니다.')
    return metadata, text[:match.end()], text[match.end():]


def serialize(metadata, body):
    return '---\n' + yaml.safe_dump(metadata, allow_unicode=True, sort_keys=False) + '---\n\n' + body.lstrip('\n')


def image_parser(state, silent):
    if state.src[state.pos:state.pos + 2] != '![':
        return False
    start = state.pos
    end_label = state.md.helpers.parseLinkLabel(state, start + 1, False)
    destination = None
    if end_label >= 0 and state.src[end_label + 1:end_label + 2] == '(':
        pos = end_label + 2
        while pos < state.posMax and state.src[pos].isspace():
            pos += 1
        parsed = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax)
        if parsed.ok:
            destination = (pos, parsed.pos)
    matched = parse_image(state, silent)
    if matched and not silent:
        state.tokens[-1].meta['destination_span'] = destination
    return matched


def image_links(body):
    """Return real Markdown image destinations with source offsets (not code examples)."""
    parser = MarkdownIt('commonmark')
    parser.inline.ruler.at('image', image_parser)
    lines = body.splitlines(True)
    offsets = [0]
    for line in lines:
        offsets.append(offsets[-1] + len(line))
    result = []
    for token in parser.parse(body):
        if token.type != 'inline' or token.map is None:
            continue
        images = [child for child in token.children or [] if child.type == 'image']
        if not images:
            continue
        first, last = token.map
        region = ''.join(lines[first:last])
        position = region.find(token.content)
        if position >= 0:
            mapping = [offsets[first] + position + i for i in range(len(token.content) + 1)]
        else:
            # Lists and blockquotes strip prefixes from each inline source line.
            mapping = []
            source_line = first
            for content_line in token.content.splitlines(True):
                needle = content_line.rstrip('\n')
                while source_line < last and needle not in lines[source_line]:
                    source_line += 1
                if source_line >= last:
                    raise ValueError('이미지 링크 위치를 확인할 수 없습니다. 일반 ![설명](경로) 형식을 사용해 주세요.')
                column = lines[source_line].find(needle)
                mapping.extend(offsets[source_line] + column + i for i in range(len(content_line)))
                source_line += 1
            mapping.append(mapping[-1] + 1 if mapping else offsets[first])
        for child in images:
            span = child.meta.get('destination_span')
            if span is None:
                result.append((None, None, child.attrGet('src')))
            else:
                start, end = span
                result.append((mapping[start], mapping[end - 1] + 1, child.attrGet('src')))
    return result


def replace_images(body, transform):
    edits = []
    for start, end, href in image_links(body):
        replacement = transform(href)
        if replacement is not None and replacement != href:
            if start is None:
                raise ValueError('로컬 원본 이미지는 참조 링크 대신 ![설명](경로) 형식으로 넣어 주세요.')
            edits.append((start, end, replacement))
    for start, end, value in sorted(set(edits), reverse=True):
        body = body[:start] + value + body[end:]
    return body


def local_image(href, post, root):
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    name = unquote(parsed.path)
    target = root / name.lstrip('/') if name.startswith('/') else post.parent / name
    return target.resolve()


def relative_image(target, post):
    return quote(os.path.relpath(target, post.parent).replace('\\', '/'), safe='/-._~')


class Media:
    def __init__(self, root):
        self.root = root.resolve()
        self.originals = (self.root / '_media/originals').resolve()
        self.assets = (self.root / 'assets/images/posts').resolve()
        self.cache_path = self.root / '.blog-workflow/obsidian-media-cache.json'
        self.cache = json.loads(self.cache_path.read_text(encoding='utf-8')) if self.cache_path.exists() else {}
        self.pending = {}
        self.sources = {}
        self.report = []

    def optimize(self, path):
        if not path.is_relative_to(self.originals):
            return None
        if not path.is_file():
            raise ValueError(f'원본 이미지를 찾을 수 없습니다: {path.name}')
        raw = path.read_bytes()
        if len(raw) > 50 * 1024 * 1024:
            raise ValueError(f'이미지가 50 MB보다 큽니다: {path.name}')
        self.sources[path] = digest(raw)
        cache_key = digest(raw + POLICY.encode())
        cached = self.cache.get(cache_key)
        if cached:
            output = (self.root / cached['path']).resolve()
            if output.is_relative_to(self.assets) and output.is_file() and digest(output.read_bytes()) == cached['hash']:
                return output
        suffix = path.suffix.lower()
        encoded = raw
        if suffix == '.svg':
            pass  # Preserve vectors; do not rasterize them.
        else:
            with Image.open(io.BytesIO(raw)) as original:
                original.load()
                animated = getattr(original, 'n_frames', 1) > 1
                if animated or original.format in {'GIF', 'AVIF', 'WEBP'}:
                    suffix = {'JPEG': '.jpg', 'PNG': '.png', 'GIF': '.gif', 'AVIF': '.avif', 'WEBP': '.webp'}.get(original.format, suffix)
                elif original.format == 'JPEG':
                    image = ImageOps.exif_transpose(original).convert('RGB')
                    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                    icc = image.info.get('icc_profile')
                    image.info.clear()
                    data = io.BytesIO()
                    image.save(data, format='AVIF', quality=60, speed=6, max_threads=4, icc_profile=icc)
                    encoded, suffix = data.getvalue(), '.avif'
                elif original.format == 'PNG':
                    image = ImageOps.exif_transpose(original).convert('RGBA' if 'A' in original.getbands() or 'transparency' in original.info else 'RGB')
                    icc = image.info.get('icc_profile')
                    image.info.clear()
                    data = io.BytesIO()
                    image.save(data, format='WEBP', lossless=True, method=6, icc_profile=icc or b'')
                    if len(data.getvalue()) < len(raw):
                        encoded, suffix = data.getvalue(), '.webp'
                else:
                    raise ValueError(f'지원하지 않는 이미지 형식입니다: {path.name}. PNG 또는 JPEG로 저장해 주세요.')
            with Image.open(io.BytesIO(encoded)) as check:
                check.verify()
        output = self.assets / ('opt-' + digest(encoded)[:24] + suffix)
        if output.exists() and output.read_bytes() != encoded:
            raise ValueError('기존 최적화 이미지와 파일 내용이 다릅니다.')
        self.pending[output] = encoded
        self.cache[cache_key] = {'path': output.relative_to(self.root).as_posix(), 'hash': digest(encoded)}
        self.report.append({'original': path.name, 'before': len(raw), 'after': len(encoded), 'format': suffix[1:]})
        return output

    def commit(self):
        if any(digest(path.read_bytes()) != expected for path, expected in self.sources.items()):
            raise ValueError('최적화 중 원본 이미지가 바뀌었습니다. 다시 실행해 주세요.')
        for path, data in self.pending.items():
            if not path.exists():
                atomic_write(path, data)
        if self.pending:
            atomic_write(self.cache_path, json.dumps(self.cache, indent=2).encode('utf-8'))


def writing_files(root):
    return sorted([*root.glob('_drafts/**/*.md'), *root.glob('_posts/**/*.md')])


def optimize_posts(posts, root=ROOT):
    root = root.resolve()
    media = Media(root)
    edits = []
    for post in posts:
        before = post.read_bytes()
        text = before.decode('utf-8-sig').replace('\r\n', '\n')
        if not text.strip():
            continue
        _, header, body = split_post(text)

        def transform(href):
            path = local_image(href, post, root)
            if path is None:
                return None
            output = media.optimize(path)
            return relative_image(output, post) if output else None

        changed = header + replace_images(body, transform)
        if changed != text:
            if b'\r\n' in before:
                changed = changed.replace('\n', '\r\n')
            edits.append((post, before, changed.encode('utf-8')))
    if any(post.read_bytes() != before for post, before, _ in edits):
        raise ValueError('작업 중 글이 수정되었습니다. 저장한 뒤 다시 실행해 주세요.')
    media.commit()
    backup = root / '.blog-workflow/obsidian-backups' / (datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S-') + uuid4().hex[:8])
    for post, before, changed in edits:
        atomic_write(backup / post.relative_to(root), before)
        atomic_write(post, changed)
    return media.report


def validate_metadata(metadata):
    if not str(metadata.get('title', '')).strip() or '{{' in str(metadata.get('title', '')):
        raise ValueError('글의 title을 입력해 주세요.')
    if metadata.get('categories') not in CATEGORIES or metadata.get('lang', 'kr') not in LANGUAGES:
        raise ValueError('categories: life/learning/research/cifellowship, lang: kr/en/es 중에서 선택해 주세요.')


def new_post(slug, title, category='life', lang='kr', root=ROOT):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug):
        raise ValueError('새 글 이름은 영문 소문자와 숫자, 하이픈을 사용해 주세요.')
    path = root / '_drafts' / (slug + '.md')
    if path.exists():
        raise ValueError('같은 이름의 초안이 이미 있습니다.')
    metadata = {'layout': 'post', 'title': title, 'date': date.today().isoformat(),
                'categories': category, 'lang': lang, 'subtitle': '', 'tags': [],
                'translation_id': slug}
    atomic_write(path, serialize(metadata, '').encode('utf-8'))
    return path


def ready_post(path, root=ROOT):
    root, path = root.resolve(), path.resolve()
    if not path.is_relative_to((root / '_drafts').resolve()) or path.suffix.lower() != '.md':
        raise ValueError('ready에는 docs/_drafts 안의 Markdown 초안을 지정해 주세요.')
    optimize_posts([path], root)
    before = path.read_bytes()
    metadata, _, body = split_post(before.decode('utf-8-sig').replace('\r\n', '\n'))
    validate_metadata(metadata)
    lang, category = metadata.get('lang', 'kr'), metadata['categories']
    slug = str(metadata.get('translation_id') or path.stem).strip().lower()
    slug = re.sub(r'[^a-z0-9-]', '', slug.replace(' ', '-')).strip('-') or 'note-' + uuid4().hex[:10]
    metadata['translation_id'] = str(metadata.get('translation_id') or slug)
    day = str(metadata.get('date') or date.today().isoformat())[:10]
    date.fromisoformat(day)
    metadata['date'] = day
    metadata['layout'] = 'post'
    metadata['published'] = True
    metadata['permalink'] = ('' if lang == 'kr' else '/' + lang) + '/' + category + '/' + slug + '/'
    target = root / '_posts' / lang / category / (day + '-' + slug + '.md')
    if target.exists():
        raise ValueError('같은 발행 파일이 이미 있습니다. 기존 글을 확인해 주세요.')
    config = yaml.safe_load((root / '_config.yml').read_text(encoding='utf-8')) or {}
    baseurl = str(config.get('baseurl', '')).rstrip('/')

    def transform(href):
        image = local_image(href, path, root)
        if image is None:
            return None
        if not image.is_relative_to((root / 'assets/images/posts').resolve()):
            raise ValueError('로컬 이미지는 설정된 원본 이미지 폴더에 넣어 주세요.')
        relative = relative_image(image, target)
        expected = baseurl + '/' + image.relative_to(root).as_posix()
        actual = unquote(urlsplit(urljoin('https://preview.invalid' + baseurl + metadata['permalink'], relative)).path)
        if actual != expected:
            raise ValueError('현재 baseurl/주소 구조와 이미지 상대경로가 맞지 않습니다. 원고는 이동하지 않았습니다.')
        return relative

    changed = serialize(metadata, replace_images(body, transform)).encode('utf-8')
    if path.read_bytes() != before:
        raise ValueError('작업 중 초안이 수정되었습니다. 다시 실행해 주세요.')
    backup = root / '.blog-workflow/obsidian-backups' / ('ready-' + uuid4().hex) / path.name
    atomic_write(backup, before)
    atomic_write(target, changed)
    path.unlink()
    return target


def build_site(root=ROOT, drafts=False):
    root = root.resolve()
    posts = writing_files(root)
    report = optimize_posts(posts, root)
    if drafts:
        for path in root.glob('_drafts/**/*.md'):
            if path.read_text(encoding='utf-8-sig').strip():
                validate_metadata(split_post(path.read_text(encoding='utf-8-sig'))[0])
    work = root / '.blog-workflow'
    work.mkdir(exist_ok=True)
    folder = Path(tempfile.mkdtemp(prefix='markdown-', dir=work))
    source, destination = folder / 'source', folder / 'site'
    shutil.copytree(root, source, ignore=lambda path, names: set(names) & EXCLUDED)
    config = yaml.safe_load((root / '_config.yml').read_text(encoding='utf-8')) or {}
    baseurl = str(config.get('baseurl', '')).rstrip('/')
    # Obsidian uses file-relative links. The isolated preview uses site-relative links.
    for path in writing_files(source):
        text = path.read_text(encoding='utf-8-sig')
        if not text.strip():
            continue
        _, header, body = split_post(text)

        def transform(href):
            image = local_image(href, path, source)
            if image is None or not image.is_relative_to((source / 'assets/images/posts').resolve()):
                return None
            if not image.is_file():
                raise ValueError(f'발행 이미지를 찾을 수 없습니다: {image.name}')
            return baseurl + '/' + quote(image.relative_to(source).as_posix(), safe='/')

        changed = header + replace_images(body, transform)
        if text != changed:
            path.write_text(changed, encoding='utf-8')
    bundle = shutil.which('bundle') or shutil.which('bundle.bat')
    if not bundle:
        raise ValueError('Ruby Bundler를 찾을 수 없습니다.')
    command = [bundle, 'exec', 'jekyll', 'build', '--source', source.as_posix(), '--destination', destination.as_posix()]
    if drafts:
        command += ['--drafts', '--unpublished', '--future']
    subprocess.run(command, cwd=root, check=True)
    return destination, report


def watch_signature(root):
    files = writing_files(root) + list(root.glob('_media/originals/**/*')) + [root / '_config.yml']
    return tuple((str(path), path.stat().st_mtime_ns, path.stat().st_size) for path in files if path.is_file())


def serve_preview(destination, port, root=ROOT):
    current = {'directory': destination}

    class Handler(http.server.SimpleHTTPRequestHandler):
        extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                          '.avif': 'image/avif', '.webp': 'image/webp'}
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(current['directory']), **kwargs)

        def log_message(self, *args):
            pass

    server = http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    signature = watch_signature(root)
    print(f'미리보기: http://127.0.0.1:{port}/?nolang=1', flush=True)
    print('저장하면 자동으로 다시 빌드합니다. 브라우저에서 새로고침하세요. 종료: Ctrl+C', flush=True)
    try:
        while True:
            time.sleep(1)
            observed = watch_signature(root)
            if observed == signature:
                continue
            time.sleep(0.7)
            if observed != watch_signature(root):
                continue
            try:
                updated, _ = build_site(root, drafts=True)
                previous = current['directory'].parent.resolve()
                current['directory'] = updated
                # Remove only the previous generated copy owned by this running preview.
                if previous.parent == (root / '.blog-workflow').resolve() and previous.name.startswith('markdown-'):
                    shutil.rmtree(previous, ignore_errors=True)
                print('미리보기 업데이트 완료. 브라우저를 새로고침하세요.', flush=True)
            except (ValueError, OSError, subprocess.CalledProcessError) as error:
                print(f'저장한 글을 확인해 주세요: {error}', flush=True)
            signature = watch_signature(root)
    except KeyboardInterrupt:
        pass
    finally:
        server.shutdown()
        server.server_close()


def main():
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, 'reconfigure'):
            stream.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    new = commands.add_parser('new', help='새 Markdown 초안 만들기')
    new.add_argument('slug')
    new.add_argument('--title', required=True)
    new.add_argument('--category', choices=sorted(CATEGORIES), default='life')
    new.add_argument('--lang', choices=sorted(LANGUAGES), default='kr')
    preview = commands.add_parser('preview', help='새 이미지를 최적화하고 초안을 포함해 미리보기')
    preview.add_argument('--no-serve', action='store_true')
    preview.add_argument('--port', type=int, default=4002)
    commands.add_parser('build', help='새 이미지를 최적화하고 발행 대상만 빌드')
    ready = commands.add_parser('ready', help='검토한 초안을 로컬 _posts로 이동. 커밋/공개하지 않음')
    ready.add_argument('file')
    args = parser.parse_args()
    if args.command == 'new':
        print(new_post(args.slug, args.title, args.category, args.lang))
    elif args.command == 'ready':
        path = Path(args.file)
        if not path.is_absolute():
            path = ROOT / path
        print('발행 준비 파일:', ready_post(path))
        print('아직 커밋하거나 공개하지 않았습니다.')
    else:
        destination, report = build_site(drafts=args.command == 'preview')
        for row in report:
            print(f"이미지: {row['original']} — {row['before']:,} → {row['after']:,} bytes ({row['format']})")
        print('완료:', destination)
        if args.command == 'preview' and not args.no_serve:
            serve_preview(destination, args.port)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        print(f'중단: {error}', file=sys.stderr)
        sys.exit(1)
