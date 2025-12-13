import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBaseRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_base_rows';
  info: {
    displayName: 'baseRow';
  };
  attributes: {
    badge: Schema.Attribute.Component<'shared.badge', false>;
    baseCards: Schema.Attribute.Component<'cards.base-card', true>;
    button: Schema.Attribute.Component<'shared.button', true>;
    CaseStudies: Schema.Attribute.Component<'cards.case-studies-card', true>;
    cta: Schema.Attribute.Component<'blocks.cta-section', false>;
    description: Schema.Attribute.Text;
    Faqs: Schema.Attribute.Component<'cards.faq-card', true>;
    gallery: Schema.Attribute.Component<'blocks.gallery-section', false>;
    link: Schema.Attribute.Component<'shared.link', true>;
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
    ctaBadge: Schema.Attribute.Component<'shared.badge', false>;
    ctaButtons: Schema.Attribute.Component<'shared.link', true>;
    ctaContent: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface BlocksGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_gallery_sections';
  info: {
    displayName: 'gallerySection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    galleryCtaButton: Schema.Attribute.Component<'shared.button', false>;
    galleryCtaText: Schema.Attribute.Text;
    galleryImages: Schema.Attribute.Component<'shared.gallery-image', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksIndustryFilter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_industry_filters';
  info: {
    displayName: 'IndustryFilter';
  };
  attributes: {
    filter: Schema.Attribute.Component<'shared.filter-pill', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksLegalLinks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_legal_links';
  info: {
    displayName: 'LegalFooter';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    legalLink: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface CardsBaseCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_base_cards';
  info: {
    displayName: 'baseCard';
  };
  attributes: {
    cardBadge: Schema.Attribute.Component<'shared.badge', false>;
    cardContent: Schema.Attribute.RichText;
    cardLink: Schema.Attribute.Component<'shared.link', true>;
    cardMedia: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    title: Schema.Attribute.String;
  };
}

export interface CardsCaseStudiesCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_studies_cards';
  info: {
    displayName: 'caseStudiesCard';
  };
  attributes: {
    case_study: Schema.Attribute.Relation<
      'oneToOne',
      'api::case-study.case-study'
    >;
    caseStudiesContent: Schema.Attribute.RichText;
    caseStudiesResult: Schema.Attribute.RichText;
    caseStudiesTitle: Schema.Attribute.String;
  };
}

export interface CardsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_cards_contact_infos';
  info: {
    displayName: 'contactInfo';
  };
  attributes: {
    address: Schema.Attribute.JSON;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'cards.social-link', true>;
  };
}

export interface CardsCtaBtnCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_cta_btn_cards';
  info: {
    displayName: 'ctaBtnCard';
  };
  attributes: {
    ctaBtn: Schema.Attribute.Component<'shared.button', true>;
    ctaLink: Schema.Attribute.Component<'shared.link', true>;
    isLink: Schema.Attribute.Boolean;
  };
}

export interface CardsFaqCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_faq_cards';
  info: {
    displayName: 'faqCard';
  };
  attributes: {
    faq: Schema.Attribute.Relation<'oneToOne', 'api::faq.faq'>;
  };
}

export interface CardsFooterMenu extends Struct.ComponentSchema {
  collectionName: 'components_cards_footer_menus';
  info: {
    displayName: 'footerMenu';
  };
  attributes: {
    footerMenuLink: Schema.Attribute.Component<'shared.link', true>;
    footerMenuTitle: Schema.Attribute.String;
  };
}

export interface CardsForm extends Struct.ComponentSchema {
  collectionName: 'components_cards_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    endpoint: Schema.Attribute.Enumeration<
      ['contact-us', 'demo-request', 'newsletter']
    >;
    erpNextFormName: Schema.Attribute.Text;
    errorMessage: Schema.Attribute.String;
    formInput: Schema.Attribute.Component<'shared.form-fields', true>;
    submit: Schema.Attribute.Component<'shared.button', false>;
    successMessage: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
    newsletterForm: Schema.Attribute.Component<'cards.form', false>;
    title: Schema.Attribute.String;
  };
}

export interface CardsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_cards_social_links';
  info: {
    displayName: 'socialLink';
  };
  attributes: {
    linkUrl: Schema.Attribute.Component<'shared.link', false>;
    platform: Schema.Attribute.Enumeration<
      ['X', 'facebook', 'instagram', 'linkedin']
    > &
      Schema.Attribute.Required;
    socialIcon: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface CardsStat extends Struct.ComponentSchema {
  collectionName: 'components_cards_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    statImage: Schema.Attribute.Media<'images'>;
    statInfo: Schema.Attribute.String;
    statTitle: Schema.Attribute.String;
  };
}

export interface CardsTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_testimonial_cards';
  info: {
    displayName: 'testimonialCard';
  };
  attributes: {
    customerImage: Schema.Attribute.Media<'images'>;
    customerName: Schema.Attribute.String;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    testimonial: Schema.Attribute.Text;
  };
}

export interface HeroHeroFull extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_fulls';
  info: {
    displayName: 'heroFull';
  };
  attributes: {
    heroBadge: Schema.Attribute.Component<'shared.badge', false>;
    heroMediaCards: Schema.Attribute.Component<'cards.media-card', true>;
    heroSlides: Schema.Attribute.Component<'hero.hero-slide', true>;
    heroStat: Schema.Attribute.Component<'cards.stat', true>;
    socialLinks: Schema.Attribute.Component<'cards.social-link', true>;
  };
}

export interface HeroHeroSimple extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_simples';
  info: {
    displayName: 'heroSimple';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heroBadge: Schema.Attribute.Component<'shared.badge', false>;
    heroBtns: Schema.Attribute.Component<'cards.cta-btn-card', false>;
    heroImage: Schema.Attribute.Media<'images' | 'files'>;
    stats: Schema.Attribute.Component<'cards.stat', true>;
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
    slideCTA: Schema.Attribute.Component<'shared.link', true>;
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
    footerLogo: Schema.Attribute.Component<'shared.logo', false>;
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
    menu_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::menu-item.menu-item'
    >;
    navCta: Schema.Attribute.Component<'shared.link', false>;
    siteLogo: Schema.Attribute.Component<'shared.logo', false>;
  };
}

export interface SharedBadge extends Struct.ComponentSchema {
  collectionName: 'components_elements_badges';
  info: {
    displayName: 'badge';
  };
  attributes: {
    badgeText: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {};
}

export interface SharedFilterPill extends Struct.ComponentSchema {
  collectionName: 'components_shared_filter_pills';
  info: {
    displayName: 'filterPill';
  };
  attributes: {
    case_study: Schema.Attribute.Relation<
      'oneToOne',
      'api::case-study.case-study'
    >;
    Icon: Schema.Attribute.Media<'images' | 'files'>;
    isActive: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface SharedFormFields extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    displayName: 'formFields';
  };
  attributes: {
    inputType: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'textarea', 'select']
    >;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    placeholder: Schema.Attribute.Text;
    required: Schema.Attribute.Boolean;
  };
}

export interface SharedGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_images';
  info: {
    displayName: 'galleryImage';
  };
  attributes: {
    galleryImage: Schema.Attribute.Media<'images'>;
    imageCaption: Schema.Attribute.Text;
    imageTag: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    externalUrl: Schema.Attribute.String;
    label: Schema.Attribute.String;
    linkType: Schema.Attribute.Enumeration<['internal', 'external']>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    service: Schema.Attribute.Relation<'oneToOne', 'api::service.service'>;
    solution: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    logoImageDark: Schema.Attribute.Media<'images'>;
    logoImageLight: Schema.Attribute.Media<'images' | 'files'>;
    logoText: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_elements_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    noIndex: Schema.Attribute.Boolean;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images' | 'files'>;
    ogTitle: Schema.Attribute.String;
    ogType: Schema.Attribute.Enumeration<
      ['website', 'article', 'service', 'product']
    >;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.base-row': BlocksBaseRow;
      'blocks.cta-section': BlocksCtaSection;
      'blocks.gallery-section': BlocksGallerySection;
      'blocks.industry-filter': BlocksIndustryFilter;
      'blocks.legal-links': BlocksLegalLinks;
      'cards.base-card': CardsBaseCard;
      'cards.case-studies-card': CardsCaseStudiesCard;
      'cards.contact-info': CardsContactInfo;
      'cards.cta-btn-card': CardsCtaBtnCard;
      'cards.faq-card': CardsFaqCard;
      'cards.footer-menu': CardsFooterMenu;
      'cards.form': CardsForm;
      'cards.media-card': CardsMediaCard;
      'cards.newsletter-card': CardsNewsletterCard;
      'cards.social-link': CardsSocialLink;
      'cards.stat': CardsStat;
      'cards.testimonial-card': CardsTestimonialCard;
      'hero.hero-full': HeroHeroFull;
      'hero.hero-simple': HeroHeroSimple;
      'hero.hero-slide': HeroHeroSlide;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'shared.badge': SharedBadge;
      'shared.button': SharedButton;
      'shared.filter-pill': SharedFilterPill;
      'shared.form-fields': SharedFormFields;
      'shared.gallery-image': SharedGalleryImage;
      'shared.link': SharedLink;
      'shared.logo': SharedLogo;
      'shared.seo': SharedSeo;
    }
  }
}
