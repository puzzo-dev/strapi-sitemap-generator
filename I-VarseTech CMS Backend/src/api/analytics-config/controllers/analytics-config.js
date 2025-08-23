'use strict';

/**
 * analytics-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::analytics-config.analytics-config', ({ strapi }) => ({
  async find(ctx) {
    // Populate all nested components
    ctx.query = {
      ...ctx.query,
      populate: {
        googleAnalytics: true,
        facebookPixel: true,
        matomo: true
      }
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Populate all nested components
    ctx.query = {
      ...ctx.query,
      populate: {
        googleAnalytics: true,
        facebookPixel: true,
        matomo: true
      }
    };

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
}));
