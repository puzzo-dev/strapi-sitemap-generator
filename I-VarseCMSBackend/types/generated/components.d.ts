import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBaseRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_base_rows';
  info: {
    displayName: 'baseRow';
  };
  attributes: {
    badge: Schema.Attribute.Component<'elements.badge', false>;
    baseCards: Schema.Attribute.Component<'cards.base-card', true>;
    cta: Schema.Attribute.Component<'blocks.cta-section', false>;
    description: Schema.Attribute.Text;
    filter: Schema.Attribute.Component<'blocks.filter', false>;
    gallery: Schema.Attribute.Component<'blocks.gallery-section', false>;
    socialLinks: Schema.Attribute.Component<'cards.social-link', true>;
    statCards: Schema.Attribute.Component<'cards.stat', true>;
    testimonialCards: Schema.Attribute.Component<
      'cards.testimonial-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cta_sections';
  info: {
    displayName: 'ctaSection';
  };
  attributes: {
    ctaBadge: Schema.Attribute.Component<'elements.badge', false>;
    ctaButtons: Schema.Attribute.Component<'elements.link', true>;
    ctaContent: Schema.Attribute.RichText;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFilter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_filters';
  info: {
    displayName: 'filter';
  };
  attributes: {};
}

export interface BlocksGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_gallery_sections';
  info: {
    displayName: 'gallerySection';
  };
  attributes: {};
}

export interface BlocksLegalLinks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_legal_links';
  info: {
    displayName: 'LegalFooter';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    legalLink: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface CardsBaseCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_base_cards';
  info: {
    displayName: 'baseCard';
  };
  attributes: {
    cardBadge: Schema.Attribute.Component<'elements.badge', false>;
    cardContent: Schema.Attribute.RichText;
    cardImages: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    cardLink: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CardsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_cards_contact_infos';
  info: {
    displayName: 'contactInfo';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'cards.social-link', true>;
  };
}

export interface CardsFooterMenu extends Struct.ComponentSchema {
  collectionName: 'components_cards_footer_menus';
  info: {
    displayName: 'FooterMenu';
  };
  attributes: {
    footerMenuLink: Schema.Attribute.Component<'elements.link', true>;
    footerMenuTitle: Schema.Attribute.String;
  };
}

export interface CardsMediaCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_media_cards';
  info: {
    displayName: 'mediaCard';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface CardsNewsletterCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_newsletter_cards';
  info: {
    displayName: 'newsletterCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CardsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_cards_social_links';
  info: {
    displayName: 'socialLink';
  };
  attributes: {
    linkUrl: Schema.Attribute.Component<'elements.link', false>;
    socialIcon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface CardsStat extends Struct.ComponentSchema {
  collectionName: 'components_cards_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {};
}

export interface CardsTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_testimonial_cards';
  info: {
    displayName: 'testimonialCard';
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
  attributes: {
    externalUrl: Schema.Attribute.String;
    label: Schema.Attribute.String;
    linkType: Schema.Attribute.Enumeration<['internal', 'external']>;
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    logoImageDark: Schema.Attribute.Media<'images' | 'files'>;
    logoImageLight: Schema.Attribute.Media<'images' | 'files'>;
    logoText: Schema.Attribute.String;
    logoThemeType: Schema.Attribute.Enumeration<['light', 'dark']>;
  };
}

export interface ElementsSeo extends Struct.ComponentSchema {
  collectionName: 'components_elements_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {};
}

export interface HeroHeroFull extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_fulls';
  info: {
    displayName: 'heroFull';
  };
  attributes: {
    heroBadge: Schema.Attribute.Component<'elements.badge', false>;
    heroMediaCards: Schema.Attribute.Component<'cards.media-card', true>;
    heroSlides: Schema.Attribute.Component<'hero.hero-slide', true>;
    heroStat: Schema.Attribute.Component<'cards.stat', true>;
  };
}

export interface HeroHeroSimple extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_simples';
  info: {
    displayName: 'heroSimple';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heroBadge: Schema.Attribute.Component<'elements.badge', false>;
    heroImage: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HeroHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_slides';
  info: {
    displayName: 'heroSlide';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slideCTA: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    companyContactInfo: Schema.Attribute.Component<
      'cards.contact-info',
      false
    > &
      Schema.Attribute.Required;
    companyDescFooter: Schema.Attribute.Text & Schema.Attribute.Required;
    FooterMenu: Schema.Attribute.Component<'cards.footer-menu', true>;
    legalFooter: Schema.Attribute.Component<'blocks.legal-links', false>;
    newsLetter: Schema.Attribute.Component<'cards.newsletter-card', false>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    headerMenu: Schema.Attribute.Relation<
      'oneToMany',
      'api::menu-item.menu-item'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.base-row': BlocksBaseRow;
      'blocks.cta-section': BlocksCtaSection;
      'blocks.filter': BlocksFilter;
      'blocks.gallery-section': BlocksGallerySection;
      'blocks.legal-links': BlocksLegalLinks;
      'cards.base-card': CardsBaseCard;
      'cards.contact-info': CardsContactInfo;
      'cards.footer-menu': CardsFooterMenu;
      'cards.media-card': CardsMediaCard;
      'cards.newsletter-card': CardsNewsletterCard;
      'cards.social-link': CardsSocialLink;
      'cards.stat': CardsStat;
      'cards.testimonial-card': CardsTestimonialCard;
      'elements.badge': ElementsBadge;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'elements.seo': ElementsSeo;
      'hero.hero-full': HeroHeroFull;
      'hero.hero-simple': HeroHeroSimple;
      'hero.hero-slide': HeroHeroSlide;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
