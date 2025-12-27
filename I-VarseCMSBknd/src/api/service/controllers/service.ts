/**
 * service controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::service.service',
    ({ strapi }) => ({
         async findOne(ctx) {
            const { slug } = ctx.params;
            const contentType = strapi.contentType('api::service.service');
            const entity = await strapi.documents('api::service.service').findFirst({
                filters: { slug: { $eq: slug } },
                populate: ctx.query.populate,  // Your middleware's deep 'on' object
                status: 'published', // Add if you only want published entries
            });

            if (!entity) {
                return ctx.notFound('Service not found');
            }            
            const sanitizedEntity = await strapi.contentAPI.sanitize.output(entity, contentType, { auth: ctx.state?.auth });
            return this.transformResponse({ data: sanitizedEntity });
        },
    })
);


