import type { Schema, Struct } from '@strapi/strapi';

export interface AnalyticsFacebookPixel extends Struct.ComponentSchema {
  collectionName: 'components_analytics_facebook_pixel';
  info: {
    description: 'Facebook Pixel configuration for conversion tracking';
    displayName: 'Facebook Pixel';
  };
  attributes: {
    advancedMatching: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    automaticMatching: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    customEvents: Schema.Attribute.JSON;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    pixelId: Schema.Attribute.String;
  };
}

export interface AnalyticsGoogleAnalytics extends Struct.ComponentSchema {
  collectionName: 'components_analytics_google_analytics';
  info: {
    description: 'Google Analytics 4 configuration';
    displayName: 'Google Analytics';
  };
  attributes: {
    customDimensions: Schema.Attribute.JSON;
    customMetrics: Schema.Attribute.JSON;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    enhancedEcommerce: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    measurementId: Schema.Attribute.String;
    trackingId: Schema.Attribute.String;
  };
}

export interface AnalyticsMatomo extends Struct.ComponentSchema {
  collectionName: 'components_analytics_matomo';
  info: {
    description: 'Matomo (Piwik) analytics configuration';
    displayName: 'Matomo Analytics';
  };
  attributes: {
    cookieDomain: Schema.Attribute.String;
    domains: Schema.Attribute.JSON;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    siteId: Schema.Attribute.String;
    trackSubdomains: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'analytics.facebook-pixel': AnalyticsFacebookPixel;
      'analytics.google-analytics': AnalyticsGoogleAnalytics;
      'analytics.matomo': AnalyticsMatomo;
    }
  }
}
