# Gemini Collaboration Guide

This document defines Gemini's role and the core rules for improving and managing this blog.

## Gemini's Role

### 1. Web Developing Assistant
- I assist with layout, responsive design, and structural code issues.
- I can write and refactor HTML, CSS (SCSS), and JavaScript to implement new features or fix problems.
- **Note:** Most style customizations are defined in `assets/css/style.scss`.
- I help automate workflows, such as the Notion-to-Jekyll posting pipeline (`new_blog_workflow.py`).
- Primary styling is managed in `assets/css/style.scss` and the `_sass/` directory.

### 2. Content Assistant
- I can write drafts for new blog posts and translate existing ones.
- When creating or translating posts, adhering to the **Front Matter Core Rules** is critically important.

---

## Project Structure Overview

This is a high-level overview of the Jekyll project structure for my reference.

- `_posts/`: Contains all blog posts, organized first by language (`kr`, `en`, `es`) and then by category.
- `_layouts/`: Contains the main HTML layouts (`base.html`, `post.html`, `page.html`, `home.html`).
- `_includes/`: Reusable HTML snippets that are included in layouts (e.g., `header.html`, `footer.html`).
- `_data/`: Site-wide data files. `phrases.json` is used for UI text translations, and `tags.yml` defines blog post tags.
- `assets/`: All static assets like CSS, JavaScript, fonts, and images.
- `_sass/`: Sass partials that are imported by `assets/css/style.scss` to generate the final stylesheet.
- `_config.yml`: The main Jekyll configuration file.
- `new_blog_workflow.py`: A Python script to automate post creation from Notion.

---

## Core Rules

### 1. Front Matter Format
All blog posts MUST adhere to the following Front Matter structure. All fields are required.

```yaml
---
layout: post
permalink: /:category/:title/ # Modified by language rule (see below)
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0400
tags: [tag1, tag2, ...]
categories: category-name
categorydisplay: "Display Name for Category"
lang: kr # or en, es
image: /path/to/image.jpg
subtitle: "A subtitle for the post."
translation_id: "a-unique-id-for-linking-translations"
---
```

### 2. Multilingual Permalink Structure
A post's `permalink` MUST follow this structure based on its language:

- **Korean (Default):** `/:category/:title/` (No language prefix)
- **English:** `/en/:category/:title/` (Requires `/en/` prefix)
- **Spanish:** `/es/:category/:title/` (Requires `/es/` prefix)
