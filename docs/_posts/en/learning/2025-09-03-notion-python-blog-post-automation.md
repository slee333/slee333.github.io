---
layout: post
permalink: /en/learning/:title/
title: "Notion to Jekyll - Automating Image Uploads"
subtitle: "Uploading images was the most cumbersome part of moving posts from Notion to Jekyll. Let's automate this process."
date: 2025-09-03 10:00:00 +0900
lang: en
categories: learning
categorydisplay: Learning
tags: [python, automation, cloudinary, jekyll]
image: https://pix4free.org/assets/library/2021-08-01/originals/automation.jpg # TODO: Please set a representative image for this post.
translation_id: notion-automation-workflow
---


## Introduction

A GitHub blog using Markdown. It's definitely convenient and excellent.

But as I mentioned in a [previous post](https://slee333.github.io/en/learning/Jeykll-notion-to-jekyll/), I do most of my writing in Notion.

Because Notion's interface is just more comfortable for creating content.

However, moving it to my Jekyll-based personal blog was quite a cumbersome manual task.

Copy-pasting text? Simple. But the problem was the images.

When you copy from Notion to Jekyll, the images break. So, I had to go through the tedious process of uploading each image to an external site like Imgur and then fetching the image from that site.

As you can probably tell, it was an extremely tedious process.

But how could I have known?

That the era of MCPs would arrive, making it much easier to solve these problems with tools like Claude Code or the Gemini CLI.

I wrestled with it for a whole day yesterday and succeeded in automating this boring process. Through a Python script.

Therefore, today I want to share the workflow for **automatically posting Notion images with their captions to the blog**.

This is also code purely written by Gemini. Although Gemini did reference my [previous code](https://slee333.github.io/en/learning/Jeykll-notion-to-jekyll/)...

Anyway, let's dive in.

-----

## The Instability of Notion's Images

Images uploaded to Notion are stored on Notion's servers (mainly AWS S3).

The problem is that these URLs are often temporary and change frequently. So, if you just copy the image link from Notion, the next day the link will have changed, and all the images will be broken.

Truly unbearable.

To have firm control over all elements of the blog, hosting images on an external service was therefore essential.

That is, uploading the image to an external hosting site and then getting the link. This way, the link won't change (unless the hosting site I use goes down).

I originally used a site called `imgur`, but it seems they no longer support their API.

So I moved to another platform. **Cloudinary**.

Cloudinary had more features than I expected.

In addition to image uploads, it also had the ability to transform and optimize images in real-time through URL parameters.

Enough talk, let's get into how I used the Cloudinary API.


-----


## Writing the Python Script (or rather, telling it to be written)

Much of the automation script was covered in the previous post, so I'll skip the detailed parts.

Some parts have been further optimized through MCPs like the Gemini CLI, but the basic principle is the same.

Basically, all content on a Notion page is made up of 'blocks'.

In this situation, the script's purpose is to extract image data and upload it to Cloudinary when the block type is **image**.

Let's go step by step.

-----

### 0. Preparation: Setting up API Keys

For the script to communicate with Cloudinary, some preliminary work is needed.

This process requires three pieces of information: **Cloud Name, API Key, and API Secret**.

You can find this information by logging into your Cloudinary dashboard and going to Settings -> API Keys.

As everyone knows, the most important thing is not to hardcode these values directly into the script.

Exposing sensitive information like the API Secret is very dangerous for security if it accidentally gets uploaded to places like Git.

Good children should use a separate file (`.env`) to set **Environment Variables**.

Anyway, I used the `os` module in my Python script as shown below to load the environment variables and configure Cloudinary.

```python
import cloudinary
import os

# Load Cloudinary credentials from environment variables
cloudinary.config (
  cloud_name = os.environ.get ('CLOUDINARY_CLOUD_NAME'),
  api_key = os.environ.get ('CLOUDINARY_API_KEY'),
  api_secret = os.environ.get ('CLOUDINARY_API_SECRET'),
  secure = True # Set to use HTTPS
)

```

This allows me to run the script securely without exposing my secret keys.

Once the API key setup via environment variables is complete, we move on to the next step.


### 1. Extracting Image URL and Caption

The script first extracts the original image URL and the user-written caption text from the Notion image block.

### 2. Uploading Image to Cloudinary

Next, the script directly passes the extracted Notion image URL to the Cloudinary API to upload the image.

It's very effective because the script handles it automatically without me having to do it manually.


```python

import cloudinary.uploader

def upload_image_to_cloudinary(image_url):
    """Takes an image URL and uploads it directly to Cloudinary."""
    try:
        # The cloudinary.uploader.upload function can take a URL as a direct argument.
        upload_result = cloudinary.uploader.upload(image_url)
        print(f"Image upload successful! Public ID: {upload_result['public_id']}")
        return upload_result
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None
```

### 3. Generating a Responsive img Tag

When the image is successfully uploaded, Cloudinary returns a unique `public_id`.

This is the key part. Instead of just using this ID to create a Markdown image tag `![]()`, the point is to generate an **`<img>` tag for the responsive web**.

This **img tag** includes the `srcset` attribute. Its function is to let the browser choose the most appropriate image size based on the user's screen size (desktop, tablet, mobile, etc.).

This prevents unnecessary data waste and dramatically improves loading speed.

```python

def generate_responsive_image_tag(public_id):
    """Generates a responsive HTML image tag from a Cloudinary public_id."""
    widths = [400, 800, 1200] # Desired image widths
    srcset_parts = []

    for width in widths:
        # Adjusts width and auto-optimizes format and quality with Cloudinary URL transformations.
        transformed_url = cloudinary.CloudinaryImage(public_id).build_url(
            transformation=[
                {'width': width, 'crop': 'limit'},
                {'quality': 'auto', 'fetch_format': 'auto'}
            ]
        )
        srcset_parts.append(f"{transformed_url} {width}w")
    
    srcset = "\n".join(srcset_parts)
    fallback_src = cloudinary.CloudinaryImage(public_id).build_url(transformation={'width': 800}) # Fallback image

    return f'''<img 
  srcset="{srcset}"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="{fallback_src}"
  alt="Image description">'''
```

### 4. Handling the Caption and Final HTML Combination

Finally, the caption text extracted in step 1 is wrapped in a `<p>` tag with simple styling and added right below the `<img>` tag generated in step 3. It's also center-aligned.

-----


## The Result

After all this, a simple image block from Notion is transformed into the following complete responsive HTML code on my blog.

```markdown
<img 
  srcset="https://res.cloudinary.com/.../w_400,.../image.webp 400w,
https://res.cloudinary.com/.../w_800,.../image.webp 800w,
https://res.cloudinary.com/.../w_1200,.../image.webp 1200w"
  sizes="(max-width: 1200px) 100vw, 1200px"
  src="https://res.cloudinary.com/.../w_800,.../image.webp"
  alt="Image description">

<p style="text-align:center; font-style:italic;">This is the image caption written in Notion.</p>
```

-----


## Conclusion

MCPs are great.

By diligently using the Gemini CLI, I was able to automate the repetitive image processing task that was the biggest hurdle in writing blog posts.

Isn't the process of finding bottlenecks in a workflow and automating them another joy for people who love development?

By optimizing this time-consuming process, things have become much more convenient, and I think it has gotten better because of it.
