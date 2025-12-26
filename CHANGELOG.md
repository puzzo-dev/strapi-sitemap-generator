# Changelog

## 0.1.0 (2025-12-26)
## 0.1.1 (2025-12-26)

- Removed `/download` content-api route and the `downloadXml` controller handler
- Bumped version to 0.1.1

- Admin UI overhaul: full-width, left-aligned, consistent Strapi design-system spacing
- Added toast feedback for Generate, Save, View actions
- Removed Download XML button from Admin (search engines fetch via public URL)
- Generation now saves config before building sitemap
- Backend service: simplified queries to fetch all entries, include only entries with `slug`
- Added detailed logging for discovery and generation steps
- Statistics cards formatted with separate lines and improved spacing
