import type { Core } from '@strapi/types';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Generate sitemap XML
   * Public endpoint for serving sitemap.xml
   */
  async generateXml(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const xml = await service.generateXML();

      ctx.type = 'application/xml';
      ctx.body = xml;
    } catch (error: any) {
      ctx.throw(500, `Failed to generate sitemap: ${error.message}`);
    }
  },

  /**
   * Get sitemap data as JSON
   * Admin endpoint for preview
   */
  async getSitemapData(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const data = await service.getSitemapData();

      ctx.body = data;
    } catch (error: any) {
      ctx.throw(500, `Failed to get sitemap data: ${error.message}`);
    }
  },

  /**
   * Download sitemap.xml file
   * Admin endpoint for downloading
   */
  async downloadXml(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const xml = await service.generateXML();

      ctx.type = 'application/xml';
      ctx.attachment('sitemap.xml');
      ctx.body = xml;
    } catch (error: any) {
      ctx.throw(500, `Failed to download sitemap: ${error.message}`);
    }
  },

  /**
   * Get all available content types
   * Admin endpoint for content type discovery
   */
  async getContentTypes(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const contentTypes = await service.discoverContentTypes();

      ctx.body = { data: contentTypes };
    } catch (error: any) {
      ctx.throw(500, `Failed to discover content types: ${error.message}`);
    }
  },

  /**
   * Get current plugin configuration
   * Admin endpoint for loading settings
   */
  async getConfig(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const config = await service.getConfig();

      ctx.body = config;
    } catch (error: any) {
      ctx.throw(500, `Failed to get config: ${error.message}`);
    }
  },

  /**
   * Update plugin configuration
   * Admin endpoint for saving settings
   */
  async updateConfig(ctx: any) {
    try {
      const service = strapi.plugin('strapi-sitemap-generator').service('service');
      const config = await service.updateConfig(ctx.request.body);

      ctx.body = config;
    } catch (error: any) {
      ctx.throw(500, `Failed to update config: ${error.message}`);
    }
  },
});

export default controller;
