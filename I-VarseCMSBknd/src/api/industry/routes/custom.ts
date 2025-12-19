module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/industries/:slug',
            handler: 'industry.findOne',
            config: {
                auth: false,
            },
        },
    ],
}
