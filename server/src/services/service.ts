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

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Process ONLY selected content types
    for (const uid of selectedContentTypes) {
      try {
        const contentType = await this.getContentTypeInfo(uid);

        // Build query - only filter by publishedAt if field exists
        const query: any = {
          fields: ['slug', 'updatedAt'],
        };

        if (contentType.hasPublishedAt) {
          query.filters = { publishedAt: { $notNull: true } };
          query.publicationState = 'live';
        }

        const entries = await strapi.entityService.findMany(uid, query);

        if (entries && Array.isArray(entries)) {
          const basePath = customPaths[uid] || `/${contentType.pluralName}`;
          const priority = customPriorities[uid] || 0.7;
          const changefreq = customChangefreq[uid] || 'monthly';

          entries.forEach((entry) => {
            xml += this.generateUrlEntry({
              loc: `${baseUrl}${basePath}/${entry.slug}`,
              lastmod: entry.updatedAt
                ? new Date(entry.updatedAt).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0],
              priority,
              changefreq,
            });
          });
        }
      } catch (error: any) {
        strapi.log.warn(`Failed to fetch entries for ${uid}:`, error.message);
      }
    }

    xml += '</urlset>';
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

    const data = {
      entries: {} as Record<string, any[]>,
      meta: {
        totalUrls: 0,
        lastGenerated: new Date().toISOString(),
        contentTypes: [] as any[],
      },
    };

    for (const uid of selectedContentTypes) {
      try {
        const contentType = await this.getContentTypeInfo(uid);

        const query: any = {
          fields: ['slug', 'title', 'name', 'updatedAt'],
        };

        if (contentType.hasPublishedAt) {
          query.filters = { publishedAt: { $notNull: true } };
          query.publicationState = 'live';
        }

        const entries = await strapi.entityService.findMany(uid, query);

        if (entries && Array.isArray(entries)) {
          const basePath = customPaths[uid] || `/${contentType.pluralName}`;

          data.entries[uid] = entries.map((entry) => ({
            url: `${baseUrl}${basePath}/${entry.slug}`,
            title: entry.title || entry.name || entry.slug,
            lastmod: entry.updatedAt,
          }));

          data.meta.contentTypes.push({
            uid,
            displayName: contentType.displayName,
            count: entries.length,
          });

          data.meta.totalUrls += entries.length;
        }
      } catch (error: any) {
        strapi.log.warn(`Failed to fetch ${uid}:`, error.message);
      }
    }

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
