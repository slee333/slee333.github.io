# Gemini Collaboration Guide

This document defines Gemini's role and the core rules for improving and managing this blog.

## Gemini's Role

### 1. Web Developing Assistant
- I assist with layout, responsive design, debugging CSS, and refactoring code.
- I can write and refactor HTML, CSS (SCSS), and JavaScript to implement new features or fix problems.
- I help automate workflows, such as the Notion-to-Jekyll posting pipeline (`new_blog_workflow.py`).

### 2. Content Assistant
- I can write drafts for new blog posts and translate existing ones.
- When creating or translating posts, adhering to the **Front Matter Core Rules** is critically important.

---

## Project Structure Overview

This is a high-level overview of the Jekyll project structure for my reference.

- `_posts/`: Contains all blog posts. It's organized first by language (`kr`, `en`, `es`) and then by category (e.g., `cifellowship`, `learning`, `life`).
- `_layouts/`: Contains the main HTML layouts (`base.html`, `post.html`, `page.html`, `home.html`).
- `_includes/`: Reusable HTML snippets (e.g., `header.html`, `footer.html`, `social.html`). Some of these may contain inline `<style>` or `<script>` blocks.
- `_data/`: Site-wide data files, such as `phrases.json` for UI text translations and `tags.yml` for tag definitions.
- `assets/`: Contains all static assets.
    - `css/style.scss`: The main stylesheet. It imports the base theme and all custom styles. **This is the primary file for CSS modifications.**
    - `fonts/`: Holds custom font files used in the site's design.
    - `images/`: Stores images used in posts and layouts.
    - `js/`: Contains custom JavaScript files for interactive features.
- `_sass/`: Contains the source SASS files.
    - `minima/`: The base theme's original style files. We generally avoid editing these directly.
    - `custom/`: Contains all custom SASS partials, organized by feature (e.g., `_animations.scss`, `_fonts.scss`). These are imported into `assets/css/style.scss`.
- `*.md`: Markdown files in the root (e.g., `0_about.md`, `1_life.md`) define the site's main pages and their multilingual variations.
- `*.py`: Various Python helper scripts used for automating workflows, such as `new_blog_workflow.py` for the Notion-to-Jekyll pipeline.
- `GEMINI.md`: This file, containing our collaboration rules.

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

### 3. Custom Fonts
Custom fonts like 'Swagger' are defined via `@font-face` rules within `assets/css/style.scss`. Any styling issues with fonts should first be checked against these rules and potential CSS specificity conflicts.