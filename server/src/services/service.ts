import type { Core } from '@strapi/types';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Discover ALL content types with slug fields
   */
  async discoverContentTypes() {
    const contentTypes = [];
    const allContentTypes = strapi.contentTypes;
    for (const [uid, contentType] of Object.entries(allContentTypes)) {
      // Only include API content types (exclude admin, plugin types)
      if (!uid.startsWith('api::')) continue;
      const schema = contentType as any;
      const attributes = schema.attributes || {};
      // Only content types with slug field
      const hasSlug = 'slug' in attributes;
      if (hasSlug) {
        contentTypes.push({
          uid,
          singularName: schema.info?.singularName || uid.split('.').pop(),
          pluralName: schema.info?.pluralName || uid.split('.').pop(),
          displayName: schema.info?.displayName || uid,
          hasPublishedAt: 'publishedAt' in attributes,
        });
      }
    }

    return contentTypes;
  },

  /**
   * Get content type info
   */
  async getContentTypeInfo(uid: string) {
    const contentType = (strapi.contentTypes as any)[uid] as any;
    const attributes = contentType.attributes || {};

    return {
      singularName: contentType.info?.singularName || uid.split('.').pop(),
      pluralName: contentType.info?.pluralName || uid.split('.').pop(),
      displayName: contentType.info?.displayName || uid,
      hasPublishedAt: 'publishedAt' in attributes,
    };
  },

  /**
   * Generate sitemap XML from user-selected content types
   */
  async generateXML() {
    const config = await this.getConfig();

    const {
      baseUrl = 'https://example.com',
      selectedContentTypes = [],
      customPaths = {},
      customPriorities = {},
      customChangefreq = {},
    } = config;

    strapi.log.info(`[Sitemap] Generating sitemap with ${selectedContentTypes.length} selected content types`);
    strapi.log.info(`[Sitemap] Selected types:`, selectedContentTypes);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    if (selectedContentTypes.length === 0) {
      strapi.log.warn('[Sitemap] No content types selected for sitemap generation');
      xml += '</urlset>';
      return xml;
    }

    // Process ONLY selected content types
    for (const uid of selectedContentTypes) {
      try {
        const contentType = await this.getContentTypeInfo(uid);
        strapi.log.info(`[Sitemap] Processing content type: ${uid}`);

        // Fetch all entries - let Strapi handle draft/published state
        const entries = await strapi.entityService.findMany(uid);

        strapi.log.info(`[Sitemap] Found ${entries?.length || 0} entries for ${uid}`);

        if (entries && Array.isArray(entries) && entries.length > 0) {
          const basePath = customPaths[uid] || `/${contentType.pluralName}`;
          const priority = customPriorities[uid] || 0.7;
          const changefreq = customChangefreq[uid] || 'monthly';

          entries.forEach((entry) => {
            if (entry.slug) {
              xml += this.generateUrlEntry({
                loc: `${baseUrl}${basePath}/${entry.slug}`,
                lastmod: entry.updatedAt
                  ? new Date(entry.updatedAt).toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0],
                priority,
                changefreq,
              });
            }
          });
        }
      } catch (error: any) {
        strapi.log.error(`[Sitemap] Failed to fetch entries for ${uid}:`, error.message);
        strapi.log.error(`[Sitemap] Error details:`, error);
      }
    }

    xml += '</urlset>';
    strapi.log.info(`[Sitemap] Sitemap generation complete`);
    return xml;
  },

  generateUrlEntry({ loc, lastmod, priority, changefreq }: { loc: string; lastmod?: string; priority?: number; changefreq?: string }) {
    let entry = '  <url>\n';
    entry += `    <loc>${this.escapeXml(loc)}</loc>\n`;
    if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
    if (changefreq) entry += `    <changefreq>${changefreq}</changefreq>\n`;
    if (priority) entry += `    <priority>${priority}</priority>\n`;
    entry += '  </url>\n';
    return entry;
  },

  escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  },

  /**
   * Get structured sitemap data for frontend display
   */
  async getSitemapData() {
    const config = await this.getConfig();

    const {
      baseUrl = 'https://example.com',
      selectedContentTypes = [],
      customPaths = {},
    } = config;

    strapi.log.info(`[Sitemap] Getting sitemap data for ${selectedContentTypes.length} content types`);

    const data = {
      entries: {} as Record<string, any[]>,
      meta: {
        totalUrls: 0,
        lastGenerated: new Date().toISOString(),
        contentTypes: [] as any[],
      },
    };

    if (selectedContentTypes.length === 0) {
      strapi.log.warn('[Sitemap] No content types selected - returning empty sitemap data');
      return data;
    }

    for (const uid of selectedContentTypes) {
      try {
        const contentType = await this.getContentTypeInfo(uid);
        strapi.log.info(`[Sitemap] Fetching data for ${uid}`);

        // Fetch all entries without filters
        const entries = await strapi.entityService.findMany(uid);

        strapi.log.info(`[Sitemap] Found ${entries?.length || 0} entries for ${uid}`);

        if (entries && Array.isArray(entries) && entries.length > 0) {
          const basePath = customPaths[uid] || `/${contentType.pluralName}`;

          data.entries[uid] = entries
            .filter((entry) => entry.slug) // Only include entries with slug
            .map((entry) => ({
              url: `${baseUrl}${basePath}/${entry.slug}`,
              title: entry.title || entry.name || entry.slug,
              lastmod: entry.updatedAt,
            }));

          data.meta.contentTypes.push({
            uid,
            displayName: contentType.displayName,
            count: data.entries[uid].length,
          });

          data.meta.totalUrls += data.entries[uid].length;
        }
      } catch (error: any) {
        strapi.log.error(`[Sitemap] Failed to fetch ${uid}:`, error.message);
        strapi.log.error(`[Sitemap] Error details:`, error);
      }
    }

    strapi.log.info(`[Sitemap] Total URLs in sitemap: ${data.meta.totalUrls}`);
    return data;
  },

  /**
   * Get plugin configuration
   */
  async getConfig() {
    const pluginStore = strapi.store({ type: 'plugin', name: 'strapi-sitemap-generator' });

    const config = await pluginStore.get({ key: 'config' }) as any;

    return config || {
      baseUrl: 'https://example.com',
      selectedContentTypes: [],
      customPaths: {},
      customPriorities: {},
      customChangefreq: {},
    };
  },

  /**
   * Update plugin configuration
   */
  async updateConfig(newConfig: any) {
    const pluginStore = strapi.store({ type: 'plugin', name: 'strapi-sitemap-generator' });

    await pluginStore.set({ key: 'config', value: newConfig });

    return newConfig;
  },
});

export default service;
