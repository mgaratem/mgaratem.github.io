# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Jekyll-based personal portfolio site deployed to GitHub Pages (`mgaratem.github.io`). It uses the `cvless` theme with Bootstrap 5, custom SCSS, particles.js animations, and a dark/light mode toggle.

## Development Commands

**Local development with Docker (recommended):**
```bash
docker-compose up
```

**Local development with Ruby/Bundler:**
```bash
bundle install
bundle exec jekyll serve
```

Site is served at `http://localhost:4000`. There are no automated tests.

## Architecture

### Layout Hierarchy

All layouts extend `_layouts/default.html`, which provides the HTML shell, Bootstrap container, and conditionally loads particles.js for the home and 404 pages.

- `home.html` — homepage with dark mode toggler
- `resume.html` — CV page with `id="cv"` for styling
- `page.html` — generic pages (posts listing)
- `post.html` — blog post pages

### Content Files

- `index.md` — homepage (layout: home), composed entirely of `_includes/` partials
- `resume.md` — resume page (layout: resume), composed of `_includes/resume/` partials
- `posts.md` — blog listing page
- `404.md` — custom error page
- `_posts/` — blog posts (Markdown)

### Includes Structure

**Homepage partials** (`_includes/`): `about-me.html`, `stack.html`, `projects.html`, `social.html`, `toggler.html`

**Resume partials** (`_includes/resume/`): `experiences.html`, `education.html`, `certifications.html`, `languages.html`

**Layout utilities**: `head.html`, `header.html`, `navbar.html`, `footer.html`, `particles-home.html`, `particles-404.html`

### Styling

SCSS modules live in `_sass/` and are imported via `assets/css/styles.min.scss`. Key files: `_variables.scss` (CSS custom properties for theming), `_base.scss`, `_elements.scss`. Compiled output goes to `assets/css/main-style.css` and `assets/css/resume-style.css`.

Dark/light mode is handled via `assets/js/darkmode.js` by toggling CSS custom properties.

### JavaScript

- `assets/js/main.js` — initializes particles.js and skill scroll animations (Intersection Observer API)
- `assets/js/darkmode.js` — dark/light mode toggle
- `assets/js/particles.min.js` + `assets/js/particles.json` — particle background animation config

### Assets

- `assets/fonts/` — JetBrains Mono and Hack fonts (woff2)
- `assets/files/` — project images (PNG, JPG, SVG) and resume PDF (`resume-latest.pdf`)
- `_includes/svg/` — SVG icons for contact info
