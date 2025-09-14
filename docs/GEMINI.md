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

- `_posts/`: Contains all blog posts, organized first by language (`kr`, `en`, `es`).
- `_layouts/`: Contains the main HTML layouts (`base.html`, `post.html`, `page.html`, `home.html`).
- `_includes/`: Reusable HTML snippets (e.g., `header.html`, `footer.html`). Some of these may contain inline `<style>` or `<script>` blocks.
- `_data/`: Site-wide data files. `phrases.json` for UI text and `tags.yml` for tag definitions.
- `assets/css/style.scss`: The main stylesheet. It imports the base theme and contains **all custom styles for the site**. This is the primary file for CSS modifications.
- `_sass/minima`: The base theme's original style files. We generally avoid editing these directly.
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