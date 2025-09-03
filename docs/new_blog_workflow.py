import os
import sys
import re
import yaml
import requests
from notion_client import Client
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api

# --- SETUP ---
# Load environment variables from .env file
load_dotenv()

# Notion API Setup
notion_token = os.getenv('NOTION_TOKEN')
if not notion_token:
    print("ERROR: NOTION_TOKEN not found in .env file.")
    sys.exit(1)
notion = Client(auth=notion_token)

# Cloudinary API Setup
cloudinary_cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
cloudinary_api_key = os.getenv('CLOUDINARY_API_KEY')
cloudinary_api_secret = os.getenv('CLOUDINARY_API_SECRET')

if not all([cloudinary_cloud_name, cloudinary_api_key, cloudinary_api_secret]):
    print("ERROR: Cloudinary credentials not found in .env file.")
    sys.exit(1)

cloudinary.config(
    cloud_name=cloudinary_cloud_name,
    api_key=cloudinary_api_key,
    api_secret=cloudinary_api_secret
)


# --- HELPER FUNCTIONS ---

def extract_notion_page_id(notion_url):
    """Extracts the Notion page ID from a Notion URL."""
    match = re.search(r'([a-f0-9]{32})', notion_url)
    if match:
        page_id = match.group(1)
        return f"{page_id[:8]}-{page_id[8:12]}-{page_id[12:16]}-{page_id[16:20]}-{page_id[20:]}"
    else:
        match = re.search(r'([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-?[a-f0-9]{12})', notion_url)
        if match:
            return match.group(1)
    raise ValueError("Invalid Notion URL or page ID not found.")

def extract_frontmatter(page_id):
    """Gets the properties of a Notion page to build the front matter."""
    page_data = notion.pages.retrieve(page_id)
    props = page_data['properties']
    
    def get_plain_text(field, default=''):
        if field and field.get('rich_text') and field['rich_text']:
            return field['rich_text'][0].get('plain_text', default)
        return default

    def get_select_name(field, default=''):
        return field.get('select', {}).get('name', default) if field.get('select') else default

    def get_multiselect_names(field, default=[]):
        return [tag['name'] for tag in field.get('multi_select', [])]

    def get_date_start(field, default=''):
        raw_date = field.get('date', {}).get('start', default) if field.get('date') else default
        if raw_date and '.000' in raw_date:
            return raw_date.replace('.000', ' ').replace('T', ' ')
        return raw_date

    def get_file_name(field, default=''):
        files = field.get('files', [])
        if files:
            return files[0].get('name', default)
        return default

    return {
        'filename_for_post': get_plain_text(props.get('filename')),
        'title': get_plain_text(props.get('title')),
        'date': get_date_start(props.get('date')),
        'tags': get_multiselect_names(props.get('tags')),
        'categories': get_select_name(props.get('categories')),
        'categorydisplay': get_select_name(props.get('categorydisplay')),
        'lang': get_select_name(props.get('lang'), 'kr'),
        'image': get_file_name(props.get('image')),
        'subtitle': get_plain_text(props.get('subtitle')),
        'translation_id': get_plain_text(props.get('translation_id'))
    }

# --- MARKDOWN & IMAGE FUNCTIONS ---

def upload_image_to_cloudinary(image_url):
    """Uploads an image from a URL to Cloudinary and returns the full result."""
    try:
        print(f"Uploading image to Cloudinary from: {image_url}")
        upload_result = cloudinary.uploader.upload(image_url)
        print(f"Successfully uploaded image. Public ID: {upload_result['public_id']}")
        return upload_result
    except Exception as e:
        print(f"Error processing image {image_url} with Cloudinary: {e}")
        return None

def extract_markdown_and_upload_images(all_blocks):
    """Extracts markdown and generates responsive Cloudinary HTML img tags."""
    markdown_lines = []
    for block in all_blocks:
        block_type = block['type']
        block_content = block[block_type]
        text = ''

        if block_type == 'image':
            source_url = block_content.get('file', {}).get('url') or block_content.get('external', {}).get('url')
            if not source_url:
                continue
            
            upload_result = upload_image_to_cloudinary(source_url)
            if not upload_result:
                markdown_lines.append(f"![Image failed to upload]({source_url})")
                continue

            public_id = upload_result['public_id']
            alt_text = os.path.basename(public_id)
            widths = [400, 800, 1200]
            
            base_transformations = [
                {'height': 1000, 'crop': 'limit'},
                {'quality': 'auto', 'fetch_format': 'auto'}
            ]

            srcset_parts = []
            for width in widths:
                current_transformations = [{'width': width}] + base_transformations
                transformed_url = cloudinary.CloudinaryImage(public_id).build_url(transformation=current_transformations, secure=True)
                srcset_parts.append(f"{transformed_url} {width}w")
            
            srcset = ",\n".join(srcset_parts)
            fallback_src = cloudinary.CloudinaryImage(public_id).build_url(transformation=[{'width': widths[1]}] + base_transformations, secure=True)
            sizes = f"(max-width: {widths[-1]}px) 100vw, {widths[-1]}px"

            html_img_tag = f'''<img 
  srcset="{srcset}"
  sizes="{sizes}"
  src="{fallback_src}"
  alt="{alt_text}">'''
            markdown_lines.append(html_img_tag)

            caption_text = ''.join([rt.get('plain_text', '') for rt in block_content.get('caption', [])])
            if caption_text:
                markdown_lines.append(f'<p style="text-align:center; font-style:italic;">{caption_text}</p>')
            
            markdown_lines.append("")
            continue

        if 'rich_text' in block_content:
            for rt in block_content.get('rich_text', []):
                tmp = rt.get('plain_text', '')
                annotations = rt.get('annotations', {})
                if rt.get('href'):
                    tmp = f"[{tmp}]({rt['href']})"
                if annotations.get('bold'): tmp = f"**{tmp}**"
                if annotations.get('italic'): tmp = f"*{tmp}*"
                if annotations.get('strikethrough'): tmp = f"~~{tmp}~~")
                if annotations.get('code'): tmp = f"`{tmp}`"
                text += tmp
        
        if block_type == 'paragraph': markdown_lines.append(text)
        elif block_type == 'heading_1': markdown_lines.append(f"# {text}")
        elif block_type == 'heading_2': markdown_lines.append(f"## {text}")
        elif block_type == 'heading_3': markdown_lines.append(f"### {text}")
        elif block_type == 'bulleted_list_item': markdown_lines.append(f"* {text}")
        elif block_type == 'numbered_list_item': markdown_lines.append(f"1. {text}")
        elif block_type == 'quote': markdown_lines.append(f"> {text}")
        elif block_type == 'divider': markdown_lines.append("---")
        elif block_type == 'code':
            lang = block_content.get('language', 'text')
            code_text = block_content['rich_text'][0]['plain_text']
            markdown_lines.append(f"```{lang}\n{code_text}\n```")

    return "\n\n".join(markdown_lines)

# --- FILE & TAGS FUNCTIONS ---

def update_tags_yml(new_tags):
    """Reads _data/tags.yml, adds new tags, and writes it back."""
    tags_file_path = os.path.join('_data', 'tags.yml')
    updated = False
    
    try:
        with open(tags_file_path, 'r', encoding='utf-8') as f:
            tags_data = yaml.safe_load(f) or {}
    except FileNotFoundError:
        tags_data = {}

    existing_tags = list(tags_data.keys())

    for tag in new_tags:
        if tag not in existing_tags:
            print(f"New tag found: '{tag}'. Adding to tags.yml with placeholder translations.")
            tags_data[tag] = {'en': tag, 'kr': tag, 'es': tag}
            updated = True

    if updated:
        try:
            with open(tags_file_path, 'w', encoding='utf-8') as f:
                yaml.dump(tags_data, f, allow_unicode=True, sort_keys=False)
            print(f"Successfully updated {tags_file_path}")
        except Exception as e:
            print(f"Error writing to {tags_file_path}: {e}")

def write_jekyll_post(front_matter, content):
    """Writes the final markdown file with properly formatted YAML front matter."""
    fm_to_dump = front_matter.copy()
    fm_to_dump['layout'] = 'post'

    if fm_to_dump.get('translation_id'):
        permalink_slug = fm_to_dump['translation_id'].lower().strip().replace(' ', '-')
        permalink_slug = re.sub(r'[^a-z0-9-]', '', permalink_slug)
        fm_to_dump['permalink'] = f"/{fm_to_dump['categories']}/{permalink_slug}/"

    post_filename = fm_to_dump.pop('filename_for_post', 'untitled')
    lang = fm_to_dump.get('lang', 'kr')
    date_str = str(fm_to_dump.get('date', '1970-01-01')).split(' ')[0]

    try:
        fm_string = yaml.dump(fm_to_dump, allow_unicode=True, sort_keys=False)
    except Exception as e:
        print(f"Error dumping YAML: {e}")
        fm_string = "# YAML DUMP FAILED #\n"

    directory = os.path.join('_posts', lang, fm_to_dump['categories'])
    os.makedirs(directory, exist_ok=True)
    file_path = os.path.join(directory, f"{date_str}-{post_filename}.md")

    final_content = f"---\n{fm_string}---\n\n{content}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"Successfully wrote post to: {file_path}")

# --- MAIN EXECUTION LOGIC ---

def get_all_blocks(page_id):
    """Fetches all blocks from a Notion page, handling pagination."""
    response = notion.blocks.children.list(page_id)
    all_blocks = response['results']
    while response['has_more']:
        response = notion.blocks.children.list(page_id, start_cursor=response['next_cursor'])
        all_blocks.extend(response['results'])
    print(f"Fetched a total of {len(all_blocks)} blocks.")
    return all_blocks

def run_pipeline(notion_page_url):
    """Main function to run the full pipeline."""
    print("--- Starting New Automated Workflow ---")
    
    page_id = extract_notion_page_id(notion_page_url)
    print(f"Processing Notion Page ID: {page_id}")
    
    front_matter = extract_frontmatter(page_id)
    print(f"Extracted Front Matter for: {front_matter['title']}")

    # Update tags.yml with any new tags
    if front_matter.get('tags'):
        update_tags_yml(front_matter['tags'])

    all_blocks = get_all_blocks(page_id)
    markdown_content = extract_markdown_and_upload_images(all_blocks)

    write_jekyll_post(front_matter, markdown_content)

    print("--- Workflow Complete! ---")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        run_pipeline(url)
    else:
        print("Usage: python new_blog_workflow.py <notion_page_url>")
