---
layout: post
permalink: /en/learning/:title/
title: Exporting Notion page to Jekyll just with URL
date: 2024-07-10 00:00:00 -0400
tags: [blog, chatgpt, openai]
categories: learning
categorydisplay: Learning
lang: en
thumbnail: https://cdn.pixabay.com/photo/2013/05/12/09/36/globe-110775_960_720.jpg
subtitle: Even using the feature to export Notion pages as Markdown felt cumbersome. I just want to be able to automatically upload posts by simply entering the URL!
translation_id: "jekyllnotion"
---

In the previous post, we discussed how to support multiple languages in Jekyll without using plugins. In this post, we will focus on how to upload a post written in Notion to Jekyll.

My pipeline follows these steps:

1. Write a post in Notion.
2. Use the Notion API to convert the Notion page to Markdown format.
3. Use the Chat GPT API to translate the Markdown into the desired language.
4. Write the Markdown file for each language in the corresponding directory with the appropriate front matter.

This post will cover steps 1, 2, and 4, excluding step 3.

## 1. Writing a Post in Notion

For testing, I created a post. [Here is the post](https://slee333.github.io/%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EC%84%A4%EC%A0%95-%EC%8B%A4%ED%97%98/). As you can see, I included various elements like headers, bold, italic, and images in a single page.

![Notion Screenshot](https://i.imgur.com/VZSpMW0.png)

There are a few things to be cautious about during this process.

### 1.1. Uploading Screenshots

When posting about blog development or journal reviews, you often include screenshots of external images. While these screenshots appear fine in Notion, they can cause issues when the image links are used in your blog because the URLs of images uploaded directly to Notion change frequently (possibly due to being stored in different locations like AWS or Notion's own database).

I solved this problem by using Imgur. Visit Imgur and click the "New Post" button. You will see the following screen.

![Imgur Screenshot](https://i.imgur.com/HtGM05g.png)

Copy and paste your screenshot content here. The screenshot will be uploaded to Imgur.

![Imgur Screenshot](https://i.imgur.com/pIDJkJn.png)

Right-click on the uploaded screenshot and copy the image link. Then, use Notion's *image → embed Link* feature to attach the link, ensuring that the URL won't change.

You don't necessarily have to use Imgur; any image hosting site will work. I prefer not to upload images to my blog's internal assets, but if you do, you might need a different approach.

### 1.2. Limiting the Features I Use

As explained in part 2, we will eventually convert the Notion page to Markdown. While Notion supports exporting pages as Markdown, I wanted a one-click solution to import, convert, and translate Notion pages using Python. Therefore, I had to create my own pipeline to extract Markdown from the Notion page URL.

Since it's challenging to implement all of Notion's features in Markdown, I decided to limit the features I use. The features I chose are:

- **Body Text**: The basic function of writing text.
- **Headers**: Markdown headers like `#`, `##`, `###`.
- **Bold, Italic, Underline, Strikethrough**: Frequently used styles. Markdown doesn't support underline natively, but it can be done using `<ins>` tags.
- **Code**: Essential for many lists.
- **Colors**: Notion supports various text colors and background colors, but I only implemented text colors.
- **Lists**: Both ordered and unordered lists.
- **Checkboxes**: Not often used, but easy to implement.
- **Dividers**: Represented by `---`.
- **Images**: As mentioned earlier, images are crucial and implemented.
- **Blockquotes**: Implemented, though not perfectly.

I will explain how these were implemented in part 2.

### 1.3. Pre-configuring Front Matter

My post's front matter includes the following:

- layout
- permalink
- title
- date
- tags
- categories
- categorydisplay: A custom front matter for displaying categories in different languages.
- lang: The post's language.
- thumbnail: The blog post's thumbnail.
- subtitle: The blog's subtitle.

I set these up using Notion's property feature to match my page format, making it easier to retrieve. The current page's properties are as follows:

![Notion Properties Screenshot](https://i.imgur.com/nuBKB0U.png)

Now that we have linked the Notion page properties with the front matter, let's move on to extracting the Notion page as Markdown.

## 2. Notion API

As mentioned earlier, Notion supports exporting pages as Markdown. However, wanting a lazy one-click solution for URL-based conversion and translation, I decided to automate the process using the Notion API.

### 2.1. Using the Notion API

To use the Notion API, you need to create an Integration. Go to the [Integration page](https://www.notion.so/profile/integrations) and create a new integration. Click "New integration" to see the following screen.

![Notion Integration Screenshot](https://i.imgur.com/cvzYZUy.png)

Set the integration name and link it to the workspace where you will write posts in Notion. The type should be internal for personal use.

You will see the following screen once the integration is created.

![Notion Integration Screenshot](https://i.imgur.com/Jb9HGQG.png)

We will use the **internal integration secret** in the next section. Once the integration is created, return to the Notion page where you will write posts.

![Notion Page Screenshot](https://i.imgur.com/E1QLdii.png)

Click the "..." button in the top right corner of the page and select "Connect to". You will see the integration you created earlier. Click it to link the integration to your page. The above screenshot is an example.

### 2.2 Accessing Markdown with the Notion API in Python

Now, let's create a Python file to use the Notion API. I created a file called **blog_pipeline.ipynb** in the root directory of my blog and imported the necessary libraries.
```python
from notion_client import Client
from dotenv import load_dotenv
import re  
```
If the package is not installed, use pip to install it (e.g., %pip install notion_client). Now, we are ready to use the Notion API in the Python environment.

## 3. Converting Notion Pages to Markdown
Now let's use the API to convert a page to Markdown. The process involves the following steps:

### 3.1. Converting Page URL to Page ID
Notion pages have a page ID. If you look at the page URL, it appears like this:
https://www.notion.so/seungwooklee/Jekyll-86e9ef81af6e4cefae24c0c733ce6853

The last part of the URL, a 32-character string split into 8-4-4-4-12 format, is the page ID. In the example above, the page ID is 86e9ef81-af6e-4cef-ae24-c0c733ce6853. The Notion API accesses pages using the page ID, so we need to create a Python function to convert the URL to a page ID.
```python
def extract_notion_page_id(notion_url):
    """
    Extract the Notion page ID from a Notion URL.
    
    Parameters:
    notion_url (str): The URL of the Notion page.
    
    Returns:
    str: The extracted Notion page ID.
    """
    # Define the regular expression pattern to match the Notion page ID - geting 32-character string
    pattern = re.compile(r'([a-f0-9]{32})')
    
    # Search for the pattern in the Notion URL
    match = pattern.search(notion_url)
    
    if match:
        # Extract the page ID
        page_id = match.group(1)
        
        # Insert hyphens in the pattern 8-4-4-4-12
        formatted_page_id = f"{page_id[:8]}-{page_id[8:12]}-{page_id[12:16]}-{page_id[16:20]}-{page_id[20:]}"
        
        return formatted_page_id
    else:
        raise ValueError("Invalid Notion URL or page ID not found.")  
```

### 3.2. Storing the Secret Token

Now, let's start using the Notion API. To do this, we need the internal secret we saw when creating the integration. When using the Notion API in Python, you need to enter this secret. However, including the secret in the code is not recommended as it could be exposed to others, allowing them to modify your posts through the API (although this is not an issue if you don't upload the Python file to GitHub).

Since I plan to upload my Python code to GitHub, I decided to manage the secret with a `.env` file. Here's how to do it:

1. Create a `.env` file in the directory containing your Python code.
2. Write the following in the `.env` file:
   `NOTION_TOKEN=your_secret_key` (no need to enclose it in quotes)
3. If the `.env` file is uploaded to GitHub, all this work becomes pointless. Add `.env` to your `.gitignore` file. Here is an example of my `.gitignore` file:

   ![Gitignore Screenshot](https://i.imgur.com/8FdfiS5.png)

Once this is done, load the secret in your Python code and create the Notion API client:

```python
import os
from dotenv import load_dotenv
from notion_client import Client

# Load the .env file
load_dotenv()

# Get the Notion token from the .env file
notion_token = os.getenv('NOTION_TOKEN')

# Create Notion API Client
notion = Client(auth=notion_token)
```

### 3.3. Creating Front Matter with the Notion API

Now, we can access the Notion page in Python using the API client and page ID. We stored the values for the front matter in the Notion page properties, so let's create a function to retrieve them:

```python
def extract_frontmatter(page_id):
    """
    Get the properties of a Notion page.
    
    Parameters:
    page_id (str): The ID of the Notion page.
    
    Returns:
    dict: The properties of the Notion page.

    * Note: For my Jekyll page, I used the following properties:
        - title: title of the post
        - date: date post is created. Instead of using the date in Notion, I used the date that I manually input in Notion
        - tags: tags of the post
        - categories: categories of the post
        - categorydisplay: weird name, I know. But this is for display purposes in Jekyll
        - lang: language of the post; either kr, en, or es; default is kr
        - thumbnail: thumbnail image of the post
        - subtitle: subtitle of the post
    """
    # Get the page data
    page_data = notion.pages.retrieve(page_id)
    
    # Get the properties of the page
    properties = page_data['properties']

    # Extract the properties
    frontmatter = {
        'filename': properties['filename']['rich_text'][0]['plain_text'],
        'title': properties['title']['title'][0]['plain_text'],
        'date': properties['date']['date']['start'],
        'tags': ' '.join([tag['name'] for tag in properties['tags']['multi_select']]),
        'categories': properties['categories']['select']['name'],
        'categorydisplay': properties['categorydisplay']['select']['name'],
        'lang': properties['lang']['select']['name'],
        'thumbnail': properties['thumbnail']['files'][0]['name'],
        'subtitle': properties['subtitle']['rich_text'][0]['plain_text']
    }

    return frontmatter
```

In this function, we retrieve the page data using `notion.pages.retrieve(page_id)` and then extract the values from the properties. The keys like *rich_text*, *date*, *select*, etc., depend on the property type (text, image, select, multi-select) set in Notion. This might vary depending on your specific front matter and Notion page properties. Adjust the function as needed to match your setup.

### 3.4. Converting Page Content to Markdown

Now, let's convert the page content to Markdown. If you followed the steps above, you should be able to obtain all the blocks of a Notion page as a `list` using the `notion.blocks.children.list(page_id)` function. Each block is represented as a `dict`. I approached the conversion by converting each block to Markdown sequentially from top to bottom. Here is a function that takes the list of blocks as input:

```python
def extract_markdown(blocks):
    """
    Extract Markdown content from Notion blocks.

    Parameters:
    blocks (list): List of Notion blocks.

    Returns:
    str: Markdown content.
    """
    markdown_lines = []

    for block in blocks['results']:
        block_type = block['type']
        block_content = block[block_type]
        text = ''

        if block_type != 'image' and block_type != 'divider':
            for rt in block_content['rich_text']:
                # Check if this text is linked
                if rt['text']['link'] is not None:
                    tmp = f"[{rt['text']['content']}]({rt['text']['link']['url']})"
                else:
                    tmp = f"{rt['text']['content']}"

                # Check if annotations indicate bold/italic/strikethrough/underline/code/colored text
                if rt['annotations']['underline']:
                    tmp = f"<ins>{tmp}</ins>"
                if rt['annotations']['bold']:
                    tmp = f"**{tmp}**"
                if rt['annotations']['italic']:
                    tmp = f"*{tmp}*"
                if rt['annotations']['strikethrough']:
                    tmp = f"~~{tmp}~~"
                if rt['annotations']['code']:
                    tmp = f"`{tmp}`"
                if rt['annotations']['color'] != 'default':
                    tmp = f"<span style='color:{rt['annotations']['color']}'>{tmp}</span>"

                text += tmp

            # Add two spaces at the end of each line to create line breaks
            text += '  '

        if block_type == 'paragraph':
            markdown_lines.append(text)
        elif block_type == 'heading_1':
            markdown_lines.append(f"# {text}")
        elif block_type == 'heading_2':
            markdown_lines.append(f"## {text}")
        elif block_type == 'heading_3':
            markdown_lines.append(f"### {text}")
        elif block_type == 'bulleted_list_item':
            markdown_lines.append(f"- {text}")
        elif block_type == 'numbered_list_item':
            markdown_lines.append(f"1. {text}")
        elif block_type == 'to_do':
            checked = block_content['checked']
            markdown_lines.append(f"- [{'x' if checked else ' '}] {text}")
        elif block_type == 'quote':
            text = text.replace('\n', '\n> ')  # Add > at the beginning of each line
            markdown_lines.append(f"> {text}")
        elif block_type == 'code':
            language = block_content['language']
            markdown_lines.append(f"```{language}\n{text}\n```")
        elif block_type == 'callout':
            icon = block_content['icon']['emoji']
            markdown_lines.append(f"> {icon} {text}")
        elif block_type == 'divider':
            markdown_lines.append("---")
        elif block_type == 'image':
            # Suppose we only use external url for images... for convenience
            if 'external' in block_content:
                url = block_content['external']['url']
            elif 'file' in block_content:
                url = block_content['file']['url']
            else:
                url = ""
            # Caption is omitted for simplicity
            caption = ""
            markdown_lines.append(f"![{caption}]({url})  ")

    return markdown_lines
```

You can see that the code is almost hardcoded to match the way Notion extracts blocks. The method of converting each block to Markdown varies depending on the block type. While I won't explain every detail, here is an overview:

- First, check if the block type is not an image or divider. If not, it is a text-based block.
- Then, depending on whether the text is a header, list, etc., apply the corresponding Markdown syntax to the output.
- If the block is a divider, the result is `---`. If it is an image, the result is the Markdown format for an image. I did not implement captions for images due to complexity.
- The results are collected into a `markdown_lines` list, with each converted block added sequentially.

Once you have a list of blocks converted to Markdown, it’s time to use this list along with the extracted front matter to create a Jekyll page.


### 3.5. Creating a Jekyll Page

Let's write the code to create a Jekyll page using the extracted front matter and Markdown list.

The `front_matter` string is constructed using the extracted front matter `dict` variable. When the extracted front matter is stored in a variable called `page_fm`, the code looks like this:

```python
front_matter = f"""---
layout: post
permalink: /{page_fm['categories']}/:title/
title: "{page_fm['title']}"
date: {page_fm['date']} 00:00:00 -0400
tags: {page_fm['tags']}
categories: {page_fm['categories']}
categorydisplay: {page_fm['categorydisplay']}
lang: {page_fm['lang']}
thumbnail: {page_fm['thumbnail']}
subtitle: {page_fm['subtitle']}
---\n"""
```

Once the front matter, which should be at the beginning of the page, is ready, create the Markdown file at the desired path and write the post. First, write the front matter, and then write each line of the extracted Markdown list (`list` type) into the file. When the variable name of the Markdown list is `page_md`, the code is as follows:

```python
# Write the Markdown content to the file
# Write in directory ./_posts/{lang}/{categories}/{filename}
with open(os.path.join('_posts', language , page_fm['categories'],filename), 'w') as file:
    file.write(front_matter)
    for line in page_md:
        file.write(f"{line}\n")

# Will return page_fm and filename for reference
print(f"Jekyll post Markdown file written: {os.path.join('_posts', language , page_fm['categories'],filename)}")
```

First, write the front matter, and then write each line of the `page_md` Markdown list. The completed function is as follows:

```python
def write_jekyll_post_from_fm_md(page_fm, page_md, language="kr"):
    """
    Write a Jekyll post Markdown file.
    
    Parameters:
    page_fm (dict): The front matter of the page.
    page_md (list): The markdown content of the page.
    
    Outputs:
    front_matter (str): The front matter of the Markdown file.
    filename (str): The filename of the Markdown file.
    """

    # Define the filename of the Markdown file
    filename = f"{page_fm['date']}-{page_fm['filename']}.md"

    # Define the front matter of the Markdown file
    front_matter = f"""---
layout: post
permalink: /{page_fm['categories']}/:title/
title: "{page_fm['title']}"
date: {page_fm['date']} 00:00:00 -0400
tags: {page_fm['tags']}
categories: {page_fm['categories']}
categorydisplay: {page_fm['categorydisplay']}
lang: {page_fm['lang']}
thumbnail: {page_fm['thumbnail']}
subtitle: {page_fm['subtitle']}
---\n"""

    # Write the Markdown content to the file
    # Write in directory ./_posts/{lang}/{categories}/{filename}
    with open(os.path.join('_posts', language, page_fm['categories'], filename), 'w') as file:
        file.write(front_matter)
        for line in page_md:
            file.write(f"{line}\n")

    # Will return page_fm and filename for reference
    print(f"Jekyll post Markdown file written: {os.path.join('_posts', language, page_fm['categories'], filename)}")

    return front_matter, filename
```

## 4. Handling Pagination

If the post is too long, the Notion API uses *pagination*, splitting the post into multiple parts. If the response from the API contains a `has_more` variable, you need to send additional requests using the `next_cursor` variable. For more information, refer to [Notion's official API page](https://developers.notion.com/reference/intro#pagination). I created the following function:

```python
def get_jekyll_post_from_notion_page(page_id):
    """
    Write a Jekyll post Markdown file.
    
    Parameters:
    page_id (str): The ID of the Notion page.

    Outputs:
    page_fm (dict): The front matter of the page.
    page_md (list): The markdown content of the page.
    """
    # Get the front matter of the page
    page_fm = extract_frontmatter(page_id)

    # Get the markdown content of the page
    page_md = []

    response = notion.blocks.children.list(page_id)
    page_md.extend(extract_markdown(response))

    has_more = response['has_more']
    next_cursor = response['next_cursor']
    while has_more:
        if next_cursor:
            response = notion.blocks.children.list(page_id, start_cursor=next_cursor)
            page_md.extend(extract_markdown(response))
            has_more = response['has_more']
            next_cursor = response['next_cursor']
        else:
            break

    return page_fm, page_md
```

If `has_more` and `next_cursor` exist, additional requests are sent to retrieve more content from the Notion page.

## 5. Final Steps

Using the functions created so far, creating a page looks like this:

```python
page_url = "your_page_url"

# Example usage
page_id = extract_page_id(page_url)
print("Notion Page ID:", page_id)

# Get the front matter and markdown content of the Notion page
pfm, pmd = get_jekyll_post_from_notion_page(page_id)

# Write the Jekyll post Markdown file in Korean
_, _ = write_jekyll_post_from_fm_md(pfm, pmd)
```

---

In this post, we covered how to convert a Notion page to a Jekyll post using Python and the Notion API. I'm not sure how helpful this will be due to the extensive hardcoding, but...

In the next post, I'll discuss how to use ChatGPT to automatically support multiple languages in this process. I planned to include it in this post, but it got too long... I need a break.