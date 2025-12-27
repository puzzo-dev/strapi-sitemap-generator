/**
 * project controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;
        const contentType = strapi.contentType('api::project.project');
        const entity = await strapi.documents('api::project.project').findFirst({
            filters: { slug: { $eq: slug } },
            populate: ctx.query.populate,  // Your middleware's deep 'on' object
            status: 'published', // Add if you only want published entries
        });

        if (!entity) {
            return ctx.notFound('Project not found');
        }
        const sanitizedEntity = await strapi.contentAPI.sanitize.output(entity, contentType, { auth: ctx.state?.auth });
        return this.transformResponse({ data: sanitizedEntity });
    },
}));
