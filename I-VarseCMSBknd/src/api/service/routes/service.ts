/**
 * service router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::service.service',
    {
        config: {
            find: {
                middlewares: ['api::service.service-detail-populate'],
            },
        },
    }
);
