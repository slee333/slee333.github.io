---
layout: post
permalink: /en/learning/:title/
title: "Automate Blog Post Translations (feat. ChatGPT)"
date: 2024-09-21 00:00:00 -0400
tags: blog life ChatGPT LLM llama 3.1
categories: learning
categorydisplay: Learning
lang: en
thumbnail: https://i.imgur.com/nyv5CB7.png
subtitle: The potential of large language models is limitless. This is no exception in blog post translations.
---
In previous posts, we covered **[Creating Jekyll posts with Multilingual Support](https://slee333.github.io/en/learning/jekyll-multilang-without-plugin/)** and **[Making Jekyll Blog Posting Easy Using Notion](https://slee333.github.io/en/learning/Jeykll-notion-to-jekyll/)**. 

In the previous post, the final version of the function that automatically translates Notion pages to markdown looked like this:

```python
page_url = "My page URL"

# Example usage
page_id = extract_notion_page_id(page_url)
print("Notion Page ID:", page_id)

# Get the front matter and markdown content of the Notion page
pfm, pmd = get_jekyll_post_from_notion_page(page_id)

# Write the Jekyll post Markdown file in Korean
_, _ = write_jekyll_post_from_fm_md(pfm, pmd)
```

To briefly explain: using the Notion page URL, we extract the front matter (`pfm`) and page content (`pmd`) using the `get_jekyll_post_from_notion_page` function, and then create an actual markdown file using the `write_jekyll_post_from_fm_md` function.

In this post, based on the above, we will discuss how to automate the completed markdown page using large language models like **ChatGPT** or **Llama 3.1**. This post will be shorter than the previous two!

---

## Using ChatGPT

**1. Setting Up the API**

Among the large language models, ChatGPT is probably the most well-known. If you are using the paid version of ChatGPT, you can use the ChatGPT API as follows.

First, go to the [ChatGPT API website](https://platform.openai.com/) and create a project. If you are new to creating projects, click the <span style='color:red'>+ Create Project</span> button to create a new project.

![Create a new project.](https://i.imgur.com/za6DJNp.png)

In the API page, go to the dashboard, where you will find a tab to create API keys on the left. Enter the API Keys section and create a secret key using the <span style='color:green'>Create New Secret Key</span> button on the right.

![Create an API key.](https://i.imgur.com/Di6i5Od.png)

**2. Calling the API in Python**

Once the API key is created, you need to call the API within your Python code.

You can directly insert the API key into your Python code, but if you plan to upload your Python code to GitHub, be cautious. Exposing your secret key on GitHub can lead to misuse. Since I include my Python code in the GitHub page repository, I chose to load the secret key as an environment variable instead of including it directly in the code.

Although I briefly introduced how to create and manage a `.env` file in previous posts, I will go over the process again.

1. Write a `.env` file in the directory containing your Python code.
2. In the `.env` file, write something like `OPENAI_API_KEY = your_secret_key` (no need to add quotes around the string).
3. Make sure the `.env` file is added to `.gitignore` so it doesn't get uploaded to GitHub. See an example `.gitignore` file below.

After completing the above steps, load the secret key in your Python code and run the OpenAI client. Combine this with the Notion API from the previous post, and the code looks like this:

```python
from openai import OpenAI
from dotenv import load_dotenv
from notion_client import Client

# Load .env file
load_dotenv()

# From .env get notion_token
notion_token = os.getenv('NOTION_TOKEN')
notion = Client(auth=notion_token)

# Load OpenAI API
client = OpenAI(
  api_key=os.getenv('OPENAI_API_KEY'),
)
```

If the `openai` library is not installed, install it using pip. In the command line:

```python
pip install openai
```

or in Jupyter Notebook:

```python
%pip install openai
```

**3. Translating with ChatGPT**

The next step is to translate the markdown file using the `client` variable that we defined. The markdown elements that we received as a list in the previous function (`pmd`) should be converted into a large text file separated by `\n`.

Here's the function I defined:

```python
def translate_markdown(markdown_string, frontmatter_dict, target_language):
    """
    Translate markdown content to the target language using OpenAI.

    Parameters:
    markdown_string (list): List of markdown elements joined with ' '.
    target_language (str): Target language for translation.

    Returns:
    str: Translated markdown content.
    """
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a translator of a Jekyll blog. Your job is to translate contents in markdown into given language; keep all markdown syntax."},
            {"role": "user", "content": f"Translate the following Korean markdown page to {target_language}: {markdown_string}"}
        ]
    )

    title_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Translate the following Korean phrase to the given language."},
            {"role": "user", "content": f"Translate this to {target_language}: {frontmatter_dict['title']}"}
        ]
    )

    subtitle_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Translate the following Korean phrase to the given language."},
            {"role": "user", "content": f"Translate this to {target_language}: {frontmatter_dict['subtitle']}"}
        ]
    )

    return completion.choices[0].message, title_completion.choices[0].message, subtitle_completion.choices[0].message  
```

To briefly explain:

The `translate_markdown` function translates markdown content into the target language using the OpenAI API. The key elements are:
- `markdown_string`: A string of joined markdown elements.
- `frontmatter_dict`: A dictionary containing the front matter elements like the `title` and `subtitle`.
- `target_language`: The target language to translate to.

The function uses `client.chat.completions.create` to translate the content with the ChatGPT models.

Here's the process using this function:

```python
# Translate the markdown content to English
translated_content_en, en_title, en_subtitle = translate_markdown(' '.join(pmd), pfm, 'English')
en_md_list = translated_content_en.content.split('\n')

_, _ = write_jekyll_post_from_fm_md(pfm, en_md_list, language='en', multilang_title=en_title.content, multilang_subtitle=en_subtitle.content)
```

Using the `split` function, we convert the merged markdown file back to a list format. Then, using the `write_jekyll_post_from_fm_md` function from the [previous post](https://slee333.github.io/en/learning/Jeykll-notion-to-jekyll/), we create the markdown file in the specified directory with the English title and subtitle.

---

## Using Llama 3.1

The above method requires subscribing to the OpenAI API's paid service, which charges based on the length of the input values. However, **Meta** recently released the Llama 3.1, a free local large language model, which allows you to run powerful models locally without worrying about costs, as long as your computer has sufficient performance.

Llama 3.1 comes in three models: 8B, 70B, and 405B. The larger the number, the better the performance. Among these, the Llama 3.1 405B model is known to outperform GPT-4. Refer to the table below.

![Llama models comparison](https://i.imgur.com/FTJNtnp.png)

Typically, the 8B model is suitable for simple text summarization and classification tasks, the 70B model for content creation, and the 405B model for industrial use, synthetic data generation, and research. However, since my computer's performance is not extraordinarily high, I chose the 8B model without hesitation.

### How to Install It?

There are two ways to install it: via the official website or using Ollama. The latter is easier so I chose that method. Here's how to install and use Llama 3.1 with Ollama. I'm not going to explain the former method since I'm not familiar with it.

**1. Installing Llama 3.1 Using Ollama**

![Ollama download page](https://i.imgur.com/6Nia1Lg.png)

First, visit the [official Ollama download page](https://ollama.com/download/windows) and install the software according to your OS environment.

Once the installation is complete, create an account on the Ollama website, log in, and find the `Models` section in the top right corner. You will see a screen like this.

![Ollama models](https://i.imgur.com/27vjcnG.png)

Select llama 3.1 and enter to copy the installation command.

![Copy the installation command](https://i.imgur.com/7PqqsAD.png)

After copying, paste the command into the terminal. If you're using the Llama 3.1 8B model, the command is:

```python
ollama run llama3
```

**2. Calling Llama 3.1 in Python**

Although you can run the installed Llama 3.1 8B model in the terminal, we want to run it in Python. Here's how:

First, install ollama from pip by running the following command:

```python
pip install -U langchain-ollama
```

If you are installing in the Anaconda terminal or similar environments, run the above command directly. In a Jupyter Notebook environment, prefix the command with `%`.

Once installed, import the library and run Llama 3.1. Note that Ollama must be running on your computer during this process, and having it running in the background is sufficient. Now execute the following code to assign Llama 3.1 to the `llm` variable:

```python
from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="llama3.1")
```

Then, input a prompt into `llm` and run it. Here's an example prompt I used:

```python
response = llm.invoke("Yo what up you running alright?")
print(response)

#### I got the response below: ####
# Ha ha, I'm doing great, thanks for asking! I'm a large language model, 
# so I don't have a physical body, but I'm always ready to chat and help 
# with any questions or topics you'd like to discuss. 
# How about you? What's going on in your world today?
```

When I gave the above prompt, I received the response shown in the commented portion.

Since we have confirmed that Llama 3.1 is working correctly, let's create a translation function using Llama 3.1. Here's a slightly modified version of the earlier function:

```python
def translate_markdown_llama(markdown_string, frontmatter_dict, target_language):
    """
    Translate markdown content to the target language using OpenAI.

    Parameters:
    pmd (list): List of markdown strings.
    target_language (str): Target language for translation.

    Returns:
    str: Translated markdown content.
    """

    md_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean markdown content into {target_language}, preserving all markdown syntax.
    
    Instructions:
    - Translate the text content from Korean to {target_language}.
    - Preserve all markdown formatting and syntax exactly as in the original.
    - Do not translate or change any code inside code blocks denoted by (triple backticks).
    - Exception: Translate comments within code blocks (e.g., lines starting with #, //, or enclosed in /* */) into {target_language}.
    - Do not add, remove, or alter any markdown elements.
    - Do not include any explanations, comments, or additional text.
    - Output only the translated markdown content.
        
    Content to translate:
    {markdown_string}
    """

    md_response = llm.invoke(md_prompt, temperature=0.0)

    title_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean phrase to {target_language}.
    
    Translate the following blog title to {target_language}: {frontmatter_dict['title']}
    Do not include any explanations, comments, or additional text. Just return the translated title.
    """

    title_response = llm.invoke(title_prompt, temperature=0.0)

    subtitle_prompt = f""" 
    You are a translator for a Jekyll blog. Your task is to translate the following Korean phrase to {target_language}.
    
    Translate the following post subtitle to {target_language}: {frontmatter_dict['subtitle']}
    Do not include any explanations, comments, or additional text. Just return the translated subtitle.
    """

    title_response = llm.invoke(subtitle_prompt, temperature=0.0)

    return md_response, title_response, title_response  
```

This function uses Llama 3.1 to translate markdown, title, and subtitle.

**3. Llama 3.1’s Translation Performance**

To be honest, it’s a bit disappointing. I tried using the Llama 3.1 8B model to translate the English and Spanish versions of this post, but unlike GPT-4, it was impossible to translate the entire post all at once. I had to modify the function to translate each markdown element one by one, which took a lot of time.

Additionally, I had to use prompt engineering to ensure that only the translated markdown elements were provided without any additional comments, which wasn’t easy either. It kept adding things like *“Here is the translated version…”* and other unnecessary comments. In the end, I ended up using ChatGPT to translate this post.

While I do like ChatGPT, the token costs become burdensome as the data size increases, so the introduction of Llama 3.1, which I can run locally on my computer without much cost, is very encouraging. However, the translation performance with the 8B model I used was quite lacking. For now, I’ll likely continue using GPT for the translation process.

Of course, aside from that, Llama 3.1 8B shows quite impressive performance for simpler tasks, but I’ll cover that in another post later.

---

Anyway, I’ve finished setting up my blog. Now, by writing a page freely in Notion and pulling the URL to execute it in Jupyter Notebook, I can easily create multilingual posts. Of course, there are a few things I need to fix, like some incorrect translations or details, but it’s true that the writing process has become overwhelmingly more convenient. I plan to add more features to the blog, and when I do, I’ll document those processes in posts like this as well.