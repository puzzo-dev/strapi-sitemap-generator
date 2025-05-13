import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: '';
    displayName: 'HeroSection';
  };
  attributes: {
    companyLogo: Schema.Attribute.Component<'shared.logo', false>;
    currentIndex: Schema.Attribute.Integer;
    HeroContent: Schema.Attribute.Component<'shared.hero-slide', false>;
    isHeroLoading: Schema.Attribute.Boolean;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface SectionsSectionSettings extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_settings';
  info: {
    description: '';
    displayName: 'SectionSettings';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', true>;
    clientLogo: Schema.Attribute.Component<'shared.logo', true>;
    featured: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<['grid', 'list']>;
    logoSize: Schema.Attribute.Enumeration<['small', 'medium', 'large']>;
    maxDsiplay: Schema.Attribute.Integer;
    postsToShow: Schema.Attribute.Integer;
    SectionFeatured: Schema.Attribute.Component<'shared.featured', false>;
    showFeaturedOnly: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    slides: Schema.Attribute.Component<'shared.hero-slide', false>;
    stats: Schema.Attribute.Component<'shared.stats', true>;
    testimonialCount: Schema.Attribute.Integer;
    video: Schema.Attribute.Component<'shared.video', false>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    buttonLink: Schema.Attribute.Component<'shared.url', false>;
    icon: Schema.Attribute.String;
    iconPosition: Schema.Attribute.Enumeration<['left', 'right']>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    size: Schema.Attribute.Enumeration<['sm', 'lg', 'md']>;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost', 'link']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFeatured extends Struct.ComponentSchema {
  collectionName: 'components_shared_featureds';
  info: {
    displayName: 'featured';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface SharedHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_slides';
  info: {
    displayName: 'HeroSlide';
  };
  attributes: {
    SlideButton: Schema.Attribute.Component<'shared.button', true>;
    SlideImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'linkItem';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Component<'shared.url', false>;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_logos';
  info: {
    description: '';
    displayName: 'logo';
  };
  attributes: {
    className: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    logoImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    size: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['light', 'dark', 'auto']>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'NavItem';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer;
    url: Schema.Attribute.Component<'shared.url', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStats extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: '';
    displayName: 'stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedUrl extends Struct.ComponentSchema {
  collectionName: 'components_shared_urls';
  info: {
    displayName: 'url';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    displayName: 'video';
  };
  attributes: {
    description: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.Component<'shared.url', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.hero-section': SectionsHeroSection;
      'sections.section-settings': SectionsSectionSettings;
      'shared.button': SharedButton;
      'shared.featured': SharedFeatured;
      'shared.hero-slide': SharedHeroSlide;
      'shared.link-item': SharedLinkItem;
      'shared.logo': SharedLogo;
      'shared.media': SharedMedia;
      'shared.nav-item': SharedNavItem;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.stats': SharedStats;
      'shared.url': SharedUrl;
      'shared.video': SharedVideo;
    }
  }
}
