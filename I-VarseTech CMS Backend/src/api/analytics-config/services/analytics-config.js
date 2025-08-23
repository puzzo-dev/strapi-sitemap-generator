'use strict';

/**
 * analytics-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::analytics-config.analytics-config');
