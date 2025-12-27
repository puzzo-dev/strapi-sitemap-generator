/**
 * `serviceDetailPopulate` middleware
 */
const populate = {
  seo: {
    fields: ['metaTitle', 'metaDescription', 'ogTitle', 'ogDescription'],
    populate: {
      ogImage: {
        fields: ['url']
      }
    }
  },
  block: {
    on: {
      'hero.hero-simple': {
        fields: ['title', 'description'],
        populate: {
          heroBadge: {
            fields: ['badgeText']  // ← Removed extra populate wrapper
          },
          heroBtns: {
            populate: {
              ctaLink: {
                fields: ['label', 'linkType', 'externalUrl'],
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
      'blocks.base-row': {
        populate: {
          badge: {
            fields: ['badgeText']  // ← Fixed
          },
          baseCards: {
            fields: ['title', 'cardContent']
          },
          CaseStudies: {
            fields: ['caseStudiesTitle', 'caseStudiesContent', 'caseStudiesResult']
          },
          cta: {
            fields: ['ctaContent'],  // ← If cta is non-repeatable component
            populate: {
              ctaButtons: {
                fields: ['label', 'linkType'],
                populate: {
                  page: {
                    fields: ['title', 'slug']
                  }
                }
              }
            }
          },
          Faqs: {
            populate: {
              faq: {
                fields: ['faqTitle', 'faqAnswer']
              }
            }
          }
        }
      },
      'blocks.cta-section': {
        fields: ['title', 'ctaContent'],
        populate: {
          ctaButtons: {
            fields: ['label', 'linkType'],
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
    strapi.log.info('In serviceDetailPopulate middleware.');
    ctx.query = {
      populate,
      ...ctx.query
    };
    await next();
  };
};
