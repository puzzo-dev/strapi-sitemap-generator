# Strapi Sitemap Generator

Generate and serve XML sitemaps in Strapi v5 with a simple admin UI.

## Features
- Admin UI for selecting content types with `slug`
- Custom URL patterns, priority and change frequency per type
- Live URL preview for custom paths
- One-click Generate with live toast feedback
- Preview XML in a new tab
- Public endpoint: `/api/strapi-sitemap-generator/sitemap.xml`
- Robust service with logging and safe fallbacks

## Quick Start
1. Enable plugin in Strapi (already enabled in `config/plugins.ts`)
2. Open the plugin in Strapi Admin → "Sitemap Generator"
3. Set Base URL (e.g., `https://yourdomain.com`)
4. Select content types to include
5. Configure custom paths (optional)
6. Click "Generate Sitemap" and "Preview XML"

## Custom URL Configuration

For each selected content type, you can customize how URLs are generated:

### Default Behavior
If no custom path is specified, URLs use the plural name:
- Content type: `articles` → URL: `https://yourdomain.com/articles/[slug]`
- Content type: `pages` → URL: `https://yourdomain.com/pages/[slug]`

### Custom Path Examples
- **Root URLs** (no prefix): Set custom path to `/`
  - Result: `https://yourdomain.com/[slug]`
  - Use case: Top-level pages like "About", "Contact"

- **Different prefix**: Set custom path to `/blog` (when content type is `articles`)
  - Result: `https://yourdomain.com/blog/[slug]`
  - Use case: Aligning with frontend routes that differ from Strapi collection names

- **Nested paths**: Set custom path to `/resources/guides`
  - Result: `https://yourdomain.com/resources/guides/[slug]`

### SEO Settings
- **Priority** (0.0 - 1.0): Indicates importance relative to other URLs (default: 0.7)
- **Change Frequency**: How often content updates (default: monthly)

## Notes
- Only content types with a `slug` field are available
- Only entries with a `slug` value are included in the sitemap
- Generation saves config, then builds the sitemap from selected content types
- Search engines fetch the XML via the public endpoint (no download button needed)

## Endpoints
- **Public sitemap**: `/api/strapi-sitemap-generator/sitemap.xml`
- **Admin preview data**: `GET /strapi-sitemap-generator/data`
- **Admin config**: `GET/PUT /strapi-sitemap-generator/config`
- **Admin content types**: `GET /strapi-sitemap-generator/content-types`
