/**
 * industry controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::industry.industry', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;
        const contentType = strapi.contentType('api::industry.industry');
        const entity = await strapi.documents('api::industry.industry').findFirst({
            filters: { slug: { $eq: slug } },
            populate: ctx.query.populate,  // Your middleware's deep 'on' object
            status: 'published', // Add if you only want published entries
        });

        if (!entity) {
            return ctx.notFound('Industry not found');
        }
        const sanitizedEntity = await strapi.contentAPI.sanitize.output(entity, contentType, { auth: ctx.state?.auth });
        return this.transformResponse({ data: sanitizedEntity });
    },
}));
