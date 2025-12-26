export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/data',
      handler: 'controller.getSitemapData',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/content-types',
      handler: 'controller.getContentTypes',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/config',
      handler: 'controller.getConfig',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/config',
      handler: 'controller.updateConfig',
      config: {
        policies: [],
      },
    },
  ],
};