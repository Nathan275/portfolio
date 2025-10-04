# Nathan Hon — Engineering Portfolio (GitHub Pages ready)

A lightweight, no-build static site (HTML/CSS/JS) with hash routing. Drop these files into a repository and enable GitHub Pages.

## Quick Start

1. **Create repo** (public or private) named anything you like.
2. **Upload** the files in this folder to the repo root (keep `index.html` at root).
3. In GitHub, go to **Settings → Pages**
   - Build and deployment: **Deploy from a branch**
   - Branch: **main** (or `master`) / root
4. Visit the Pages URL and you're live 🎉

> This site uses **hash routes** (`#/portfolio`, `#/about`), so deep links work without special server config. `404.html` is included as a friendly fallback.

## Customize

- Edit text/sections in `script.js` (PROJECTS, About text, Blog entries).
- Replace placeholder images in `assets/` and update the `img` paths.
- Update social links in the footer of `index.html`.
- Add your **resume PDF** to the repo and link it in the About section.

## Optional: Custom domain

- Add a `CNAME` file (root of repo) with your domain, e.g. `nathan.engineer`.
- Point your DNS at GitHub Pages per GitHub’s docs.

## Notes

- No frameworks or build steps required.
- All CSS is in `styles.css`.
- The modal and routing logic are vanilla JS.
