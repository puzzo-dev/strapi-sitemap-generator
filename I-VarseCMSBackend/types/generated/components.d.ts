import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cta_sections';
  info: {
    displayName: 'ctaSection';
  };
  attributes: {};
}

export interface ElementsBadge extends Struct.ComponentSchema {
  collectionName: 'components_elements_badges';
  info: {
    displayName: 'badge';
  };
  attributes: {};
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'link';
  };
  attributes: {};
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {};
}

export interface HeroHeroFull extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_fulls';
  info: {
    displayName: 'heroFull';
  };
  attributes: {};
}

export interface HeroHeroSimple extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_simples';
  info: {
    displayName: 'heroSimple';
  };
  attributes: {};
}

export interface HeroHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_slides';
  info: {
    displayName: 'heroSlide';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.cta-section': BlocksCtaSection;
      'elements.badge': ElementsBadge;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'hero.hero-full': HeroHeroFull;
      'hero.hero-simple': HeroHeroSimple;
      'hero.hero-slide': HeroHeroSlide;
    }
  }
}
