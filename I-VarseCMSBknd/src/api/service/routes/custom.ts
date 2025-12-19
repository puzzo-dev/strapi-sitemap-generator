module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/services/:slug',
            handler: 'service.findOne',
            config: {
                auth: false,
                middlewares: ['api::service.service-detail-populate'],
            },
        },
    ],
}
