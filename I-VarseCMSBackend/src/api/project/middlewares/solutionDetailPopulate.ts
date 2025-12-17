/**
 * `solutionDetailPopulate` middleware
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
            fields: ['badgeText']  // Fixed: removed extra "populate" wrapper
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
            fields: ['badgeText']
          },
          baseCards: {
            fields: ['title', 'cardContent'],
            populate: {
              cardLink: {
                fields: ['label', 'linkType'],
                populate: {
                  solution: {
                    fields: ['title', 'slug']
                  }
                }
              }
            }
          }
        }
      },
      'cards.base-card': {  // Added this component (was in your query string)
        fields: ['title', 'cardContent']
      },
      'blocks.gallery-section': {
        fields: ['title', 'description', 'galleryCtaText'],
        populate: {
          galleryImages: {
            fields: ['imageTag', 'imageCaption'],
            populate: {
              galleryImage: {
                fields: ['url']
              }
            }
          },
          galleryCtaButton: {
            fields: ['label', 'variant'],
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
    strapi.log.info('In solutionDetailPopulate middleware.');
    ctx.query = {
      populate,
      ...ctx.query
    };
    await next();
  };
};
