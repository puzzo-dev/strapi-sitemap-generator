export default ({ env }) => ({
    matomo: {
        config: {
            widgetURL: env('MATOMO_WIDGET_URL'),
        },
    },
});

// 
