# Strapi Sitemap Generator

Generate and serve XML sitemaps in Strapi v5 with a simple admin UI.

## Features
- Admin UI for selecting content types with `slug`
- Custom URL patterns, priority and change frequency per type
- One-click Generate with live toast feedback
- Preview XML in a new tab
- Public endpoint: `/api/strapi-sitemap-generator/sitemap.xml`
- Robust service with logging and safe fallbacks

## Quick Start
1. Enable plugin in Strapi (already enabled in `config/plugins.ts`)
2. Open the plugin in Strapi Admin → “Sitemap Generator”
3. Set Base URL and select content types
4. Click “Generate Sitemap” and “Preview XML”

## Notes
- Admin “Download XML” has been removed; search engines fetch the XML via the public endpoint.
- Generation saves config, then builds the sitemap from selected content types.
- Only entries with a `slug` are included.

## Endpoints
- View: `/api/strapi-sitemap-generator/sitemap.xml`
- Admin data (preview): `/strapi-sitemap-generator/data`
- Admin config: `GET/PUT /strapi-sitemap-generator/config`
