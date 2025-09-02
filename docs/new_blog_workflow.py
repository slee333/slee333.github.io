import os
import sys
import json
import re
import requests
import base64
from notion_client import Client
from dotenv import load_dotenv

# --- SETUP ---
# Load environment variables from .env file
load_dotenv()

# Notion API Setup
notion_token = os.getenv('NOTION_TOKEN')
if not notion_token:
    print("ERROR: NOTION_TOKEN not found in .env file.")
    sys.exit(1)
notion = Client(auth=notion_token)

# Imgur API Setup
# IMPORTANT: Replace with your actual Imgur Client ID
# You can get one here: https://api.imgur.com/oauth2/addclient
IMGUR_CLIENT_ID = "YOUR_IMGUR_CLIENT_ID_HERE"

# --- HELPER FUNCTIONS (from your original notebook) ---

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
        return field.get('date', {}).get('start', default) if field.get('date') else default
        
    def get_file_name(field, default=''):
        return field.get('files', [{}])[0].get('name', default) if field.get('files') else default

    return {
        'filename': get_plain_text(props.get('filename')),
        'title': get_plain_text(props.get('title')),
        'date': get_date_start(props.get('date')),
        'tags': ' '.join(get_multiselect_names(props.get('tags'))),
        'categories': get_select_name(props.get('categories')),
        'categorydisplay': get_select_name(props.get('categorydisplay')),
        'lang': get_select_name(props.get('lang'), 'kr'),
        'thumbnail': get_file_name(props.get('thumbnail')),
        'subtitle': get_plain_text(props.get('subtitle')),
        'translation_id': get_plain_text(props.get('translation_id'))
    }

# --- NEW WORKFLOW FUNCTIONS ---

def upload_image_to_imgur(image_url, client_id):
    """Downloads an image from a URL and uploads it to Imgur."""
    headers = {"Authorization": f"Client-ID {client_id}"}
    
    try:
        print(f"Downloading image from: {image_url}")
        response = requests.get(image_url)
        response.raise_for_status()
        image_data = response.content
        
        print("Uploading to Imgur...")
        r = requests.post("https://api.imgur.com/3/image", headers=headers, data={'image': image_data})
        r.raise_for_status()
        data = r.json()
        
        new_link = data['data']['link']
        print(f"Successfully uploaded image. New URL: {new_link}")
        return new_link
    except requests.exceptions.RequestException as e:
        print(f"Error processing image {image_url}: {e}")
        return image_url

def extract_markdown_and_upload_images(all_blocks, client_id):
    """Extracts markdown, handling pagination and uploading images to Imgur with captions."""
    markdown_lines = []
    for block in all_blocks:
        block_type = block['type']
        block_content = block[block_type]
        text = ''

        if block_type == 'image':
            source_url = ""
            if block_content.get('type') == 'external':
                source_url = block_content['external']['url']
            elif block_content.get('type') == 'file':
                source_url = block_content['file']['url']
            else:
                continue
            
            new_imgur_url = upload_image_to_imgur(source_url, client_id)
            
            # Use image title as alt text for accessibility
            alt_text = os.path.basename(new_imgur_url)
            markdown_lines.append(f"![{alt_text}]({new_imgur_url})")

            # Handle caption
            caption_text = ''
            if 'caption' in block_content and block_content['caption']:
                caption_text = ''.join([rt.get('plain_text', '') for rt in block_content['caption']])
            
            if caption_text:
                markdown_lines.append(f'<p style="text-align:center; font-style:italic;">{caption_text}</p>')
            
            markdown_lines.append("") # Add a newline for spacing
            continue

        if 'rich_text' in block_content:
            for rt in block_content.get('rich_text', []):
                tmp = rt.get('plain_text', '')
                annotations = rt.get('annotations', {})
                if rt.get('href'):
                    tmp = f"[{tmp}]({rt['href']})"
                if annotations.get('bold'): tmp = f"**{tmp}**"
                if annotations.get('italic'): tmp = f"*{tmp}*"
                if annotations.get('strikethrough'): tmp = f"~~{tmp}~~"
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

    return "\n".join(markdown_lines)

def write_jekyll_post(front_matter, content, lang):
    """Writes the final markdown file to the correct directory."""
    fm = front_matter.copy()
    
    if 'title' in fm and fm['title']:
        slug = re.sub(r'[^a-z0-9\s-]', '', fm['title'].lower()).strip().replace(' ', '-')
        fm['slug'] = re.sub(r'-+', '-', slug)
    else:
        fm['slug'] = 'untitled'

    fm_lines = ["---"]
    for key, value in fm.items():
        fm_lines.append(f"{key}: {json.dumps(value, ensure_ascii=False)}")
    fm_lines.append("---")
    fm_string = "\n".join(fm_lines)

    directory = os.path.join('_posts', lang, fm['categories'])
    os.makedirs(directory, exist_ok=True)
    file_path = os.path.join(directory, f"{fm['date']}-{fm['filename']}.md")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fm_string)
        f.write("\n\n")
        f.write(content)
    
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
    
    if IMGUR_CLIENT_ID == "YOUR_IMGUR_CLIENT_ID_HERE" or not IMGUR_CLIENT_ID:
        print("ERROR: Imgur Client ID is not set in the script.")
        return

    page_id = extract_notion_page_id(notion_page_url)
    print(f"Processing Notion Page ID: {page_id}")
    
    front_matter = extract_frontmatter(page_id)
    print(f"Extracted Front Matter for: {front_matter['title']}")

    all_blocks = get_all_blocks(page_id)
    markdown_content = extract_markdown_and_upload_images(all_blocks, IMGUR_CLIENT_ID)

    write_jekyll_post(front_matter, markdown_content, 'kr')

    print("--- Workflow Complete! ---")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        run_pipeline(url)
    else:
        print("Usage: python new_blog_workflow.py <notion_page_url>")