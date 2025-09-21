# Gemini Collaboration Guide

This document defines the project's identity, my role within it, and the core guidelines for managing and developing this blog.

## 1. Project Identity

This project is a personal, multilingual (Korean, English, Spanish) blog built on the Jekyll static site generator. It serves as a platform for sharing insights on technology, medicine, research, and personal life. A key feature is the automated content pipeline from Notion to Jekyll, facilitated by a custom Python script.

## 2. My Role

### Web Developing Assistant
- I assist with layout, responsive design, debugging CSS, and refactoring code.
- I can write and refactor HTML, CSS (SCSS), and JavaScript to implement new features or fix problems.
- I help automate and maintain workflows, such as the Notion-to-Jekyll posting pipeline (`new_blog_workflow.py`).

### Content Assistant
- I can write drafts for new blog posts and translate existing ones.
- When creating or translating posts, adhering to the **Content & Front Matter Rules** is critically important.

---

## 3. Project Structure Overview

The project is housed within the `docs/` directory to support GitHub Pages.

- **`_posts/`**: Contains all blog posts, organized by language (`kr`, `en`, `es`) and then by category (e.g., `cifellowship`, `learning`, `life`). Post filenames must follow the `YYYY-MM-DD-title.md` format.
- **`_layouts/`**: Main HTML layouts (`base.html`, `post.html`, `page.html`).
- **`_includes/`**: Reusable HTML snippets (e.g., `header.html`, `footer.html`).
- **`_data/`**: Site-wide data files, such as `phrases.json` for UI text translations and `tags.yml` for tag definitions.
- **`assets/`**: All static assets.
    - **`css/style.scss`**: The main stylesheet. **This is the primary file for CSS modifications.** It imports custom SASS partials.
    - **`_sass/custom/`**: Contains all custom SASS partials. Style changes should be made here.
    - **`js/`**: Custom JavaScript files. Helpers should be encapsulated in IIFEs to avoid global variables.
    - **`images/`**: Images for posts and layouts.
    - **`fonts/`**: Custom font files.
- **`*.md` (root)**: Markdown files like `0_about.md` and `1_life.md` define the site's main pages and their multilingual variations. The numbered prefix dictates the order in the navigation.
- **`*.py`**: Python helper scripts. `new_blog_workflow.py` is the key script for the Notion-to-Jekyll pipeline.
- **`_site/`**: The generated static site. **Do not edit this directory directly.**
- **`GEMINI.md`**: This file.

---

## 4. Development & Workflow

### Local Development
To preview the site locally, run the following command from the `docs/` directory:
`bundle exec jekyll serve --livereload`
The site will be available at `http://127.0.0.1:4000`.

### Build & Verification
- To build the site, run: `bundle exec jekyll build`. This generates the site into the `_site/` directory.
- Before committing, this command should be run to ensure there are no build warnings.
- Use `bundle exec jekyll doctor` to check for any configuration issues.

### Content Automation
The `new_blog_workflow.py` script automates creating posts from Notion.
- Use `python new_blog_workflow.py --help` to see available options.
- When modifying this script, test it against a staging Notion page.

---

## 5. Core Rules & Conventions

### Content & Front Matter
All blog posts MUST adhere to the following Front Matter structure.

```yaml
---
layout: post
permalink: /:category/:title/ # Will be prefixed by language code
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0400
tags: [tag1, tag2]
categories: category-name
categorydisplay: "Display Name for Category"
lang: kr # or en, es
image: /path/to/image.jpg
subtitle: "A subtitle for the post."
translation_id: "a-unique-id-for-linking-translations"
---
```

### Multilingual Permalink Structure
A post's `permalink` is automatically prefixed based on its language `lang`:

- **Korean (`kr`):** `/:category/:title/` (No prefix)
- **English (`en`):** `/en/:category/:title/`
- **Spanish (`es`):** `/es/:category/:title/`

### Coding Style
- **SCSS:** Inherit Minima conventions. Use two-space indentation. Place new styles in `_sass/custom/`.
- **JavaScript:** Use camelCase for functions. Avoid global variables.
- **Python:** Follow PEP 8 with 4-space indentation.
- **Commits:** Use short, imperative titles (e.g., `feat: add social media links`).

### Environment
The automation scripts may require credentials stored in a `.env` file. This file should never be committed.
