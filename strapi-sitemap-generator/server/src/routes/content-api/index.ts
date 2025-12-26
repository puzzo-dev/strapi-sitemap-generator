export default {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/sitemap.xml',
      handler: 'controller.generateXml',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/download',
      handler: 'controller.downloadXml',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};