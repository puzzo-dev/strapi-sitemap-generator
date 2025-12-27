module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/case-studies/:slug',
            handler: 'case-study.findOne',
            config: {
                auth: false,
            },
        },
    ],
}
