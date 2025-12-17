/**
 * `layoutPopulate` middleware
 */

const populate = {
  header: {
    populate: {
      siteLogo: {
        fields: ['logoText'],
        populate: {
          logoImageLight: {
            fields: ['url', 'alternativeText']
          },
          logoImageDark: {
            fields: ['url', 'alternativeText']
          }
        }
      },
      menu_items: {
        fields: ['order'],
        populate: {
          menuLink: {
            populate: {
              page: {
                fields: ['title', 'slug']
              }
            }
          },
          menu_items: {  // Nested submenu items (repeatable)
            fields: ['order'],
            populate: {
              menuLink: {
                populate: {
                  page: {
                    fields: ['title', 'slug']
                  }
                }
              }
            }
          }
        }
      },
      navCta: {
        populate: {
          page: {
            fields: ['title', 'slug']
          }
        }
      }
    }
  },
  footer: {
    populate: {
      footerLogo: {
        fields: ['logoText'],
        populate: {
          logoImageLight: {
            fields: ['url', 'alternativeText']
          },
          logoImageDark: {
            fields: ['url', 'alternativeText']
          }
        }
      },
      fields: ['companyDescFooter'],
      companyContactInfo: {
        fields: ['phone', 'email', 'address'],
        populate: {
          socialLinks: {
            fields: ['platform'],
            populate: {
              socialIcon: {
                fields: ['url']
              },
              linkUrl: {
                fields: ['label', 'externalUrl']
              }
            }
          }
        }
      },
      FooterMenu: {
        fields: ['footerMenuTitle'],
        populate: {
          footerMenuLink: {
            populate: {
              page: {
                fields: ['title', 'slug']
              },
              service: {
                fields: ['title', 'slug']
              }
            }
          }
        }
      },
      legalFooter: {
        fields: ['copyright'],
        populate: {
          legalLink: {
            populate: {
              page: {
                fields: ['title', 'slug']
              }
            }
          }
        }
      }
    }
  }
};

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In layoutPopulate middleware.');
    ctx.query = {
      populate,
      ...ctx.query
    };
    await next();
  };
};
