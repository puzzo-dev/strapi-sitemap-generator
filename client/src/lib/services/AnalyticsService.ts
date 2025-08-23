/**
 * Analytics Service Implementation
 * 
 * Provides unified analytics tracking across Google Analytics, Facebook Pixel,
 * and Matomo with Strapi CMS configuration integration.
 */

import {
  AnalyticsConfig,
  AnalyticsProvider,
  AnalyticsEvent,
  PageViewEvent,
  EcommerceEvent,
  UserInteractionEvent,
  FormEvent,
  ContentEvent,
  SearchEvent,
  LanguageEvent,
  PerformanceEvent,
  ErrorEvent,
  GoogleAnalyticsConfig,
  FacebookPixelConfig,
  MatomoConfig
} from '@/lib/types/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    _paq: any[];
  }
}

/**
 * Google Analytics 4 Provider
 */
export class GoogleAnalyticsProvider implements AnalyticsProvider {
  public readonly name = 'Google Analytics';
  private config: GoogleAnalyticsConfig | null = null;
  private isInitialized = false;

  async initialize(config: GoogleAnalyticsConfig): Promise<void> {
    this.config = config;
    
    if (!config.enabled || !config.measurementId) {
      console.warn('Google Analytics is disabled or missing measurement ID');
      return;
    }

    try {
      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Configure GA4
      window.gtag('js', new Date());
      window.gtag('config', config.measurementId, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ...config.enhancedEcommerce && { enhanced_ecommerce: true }
      });

      this.isInitialized = true;
      console.log('Google Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('config', this.config!.measurementId, {
      page_title: event.page_title,
      page_location: event.page_location,
      page_path: event.page_path,
      content_group1: event.content_group1,
      content_group2: event.content_group2,
      custom_map: event.custom_map
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters
    });
  }

  trackEcommerce(event: EcommerceEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', 'purchase', {
      transaction_id: event.transaction_id,
      value: event.value,
      currency: event.currency || 'USD',
      items: event.items,
      coupon: event.coupon,
      shipping: event.shipping,
      tax: event.tax
    });
  }

  trackUserInteraction(event: UserInteractionEvent): void {
    this.trackEvent({
      action: event.action,
      category: 'User Interaction',
      label: `${event.element_type}: ${event.element_text || event.element_id}`,
      customParameters: {
        element_type: event.element_type,
        element_id: event.element_id,
        page_section: event.page_section
      }
    });
  }

  trackFormSubmission(event: FormEvent): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'Form',
      label: event.form_name,
      customParameters: {
        form_id: event.form_id,
        form_destination: event.form_destination
      }
    });
  }

  trackContentEngagement(event: ContentEvent): void {
    this.trackEvent({
      action: event.engagement_type,
      category: `Content - ${event.content_type}`,
      label: event.content_title,
      customParameters: {
        content_id: event.content_id,
        content_category: event.content_category
      }
    });
  }

  trackSearch(event: SearchEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', 'search', {
      search_term: event.search_term,
      search_results: event.search_results,
      search_category: event.search_category
    });
  }

  trackLanguageChange(event: LanguageEvent): void {
    this.trackEvent({
      action: 'language_change',
      category: 'Localization',
      label: `${event.previous_language} to ${event.new_language}`,
      customParameters: {
        previous_language: event.previous_language,
        new_language: event.new_language,
        content_available: event.content_available
      }
    });
  }

  trackPerformance(event: PerformanceEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', 'timing_complete', {
      name: event.metric_name,
      value: Math.round(event.metric_value),
      event_category: 'Performance'
    });
  }

  trackError(event: ErrorEvent): void {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', 'exception', {
      description: event.error_message,
      fatal: event.error_type === 'javascript',
      custom_map: {
        error_type: event.error_type,
        page_path: event.page_path
      }
    });
  }

  setUserId(userId: string): void {
    if (!this.isInitialized || !window.gtag) return;
    window.gtag('config', this.config!.measurementId, { user_id: userId });
  }

  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized || !window.gtag) return;
    window.gtag('set', { user_properties: properties });
  }

  consent(granted: boolean): void {
    if (!window.gtag) return;
    
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied'
    });
  }
}

/**
 * Facebook Pixel Provider
 */
export class FacebookPixelProvider implements AnalyticsProvider {
  public readonly name = 'Facebook Pixel';
  private config: FacebookPixelConfig | null = null;
  private isInitialized = false;

  async initialize(config: FacebookPixelConfig): Promise<void> {
    this.config = config;
    
    if (!config.enabled || !config.pixelId) {
      console.warn('Facebook Pixel is disabled or missing pixel ID');
      return;
    }

    try {
      // Load Facebook Pixel script
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      `;
      document.head.appendChild(script);

      // Initialize pixel
      window.fbq('init', config.pixelId, {
        em: config.advancedMatching ? 'auto' : undefined
      });
      
      window.fbq('track', 'PageView');

      this.isInitialized = true;
      console.log('Facebook Pixel initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Facebook Pixel:', error);
    }
  }

  trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized || !window.fbq) return;
    window.fbq('track', 'PageView');
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || !window.fbq) return;
    
    // Map generic events to Facebook standard events
    const fbEventMap: Record<string, string> = {
      'contact': 'Contact',
      'lead': 'Lead',
      'purchase': 'Purchase',
      'add_to_cart': 'AddToCart',
      'view_content': 'ViewContent',
      'search': 'Search',
      'complete_registration': 'CompleteRegistration'
    };

    const fbEvent = fbEventMap[event.action] || 'CustomEvent';
    window.fbq('track', fbEvent, {
      content_category: event.category,
      content_name: event.label,
      value: event.value,
      ...event.customParameters
    });
  }

  trackEcommerce(event: EcommerceEvent): void {
    if (!this.isInitialized || !window.fbq) return;

    window.fbq('track', 'Purchase', {
      value: event.value,
      currency: event.currency || 'USD',
      content_ids: event.items?.map(item => item.item_id),
      content_type: 'product',
      num_items: event.items?.length || 0
    });
  }

  trackUserInteraction(event: UserInteractionEvent): void {
    this.trackEvent({
      action: 'view_content',
      category: event.category,
      label: event.label,
      customParameters: {
        content_type: event.element_type,
        content_name: event.element_text || event.element_id
      }
    });
  }

  trackFormSubmission(event: FormEvent): void {
    if (!this.isInitialized || !window.fbq) return;
    
    window.fbq('track', 'Lead', {
      content_name: event.form_name,
      content_category: 'Form Submission'
    });
  }

  trackContentEngagement(event: ContentEvent): void {
    this.trackEvent({
      action: 'view_content',
      category: event.content_type,
      label: event.content_title,
      customParameters: {
        content_id: event.content_id,
        content_type: event.content_type
      }
    });
  }

  trackSearch(event: SearchEvent): void {
    if (!this.isInitialized || !window.fbq) return;
    
    window.fbq('track', 'Search', {
      search_string: event.search_term,
      content_category: event.search_category
    });
  }

  trackLanguageChange(event: LanguageEvent): void {
    // Facebook Pixel doesn't have specific language change tracking
    this.trackEvent({
      action: 'language_change',
      category: 'Localization',
      label: event.new_language
    });
  }

  trackPerformance(event: PerformanceEvent): void {
    // Facebook Pixel doesn't track performance metrics
  }

  trackError(event: ErrorEvent): void {
    // Facebook Pixel doesn't track errors
  }

  setUserId(userId: string): void {
    if (!this.isInitialized || !window.fbq) return;
    window.fbq('set', 'userData', { external_id: userId });
  }

  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized || !window.fbq) return;
    window.fbq('set', 'userData', properties);
  }

  consent(granted: boolean): void {
    if (!window.fbq) return;
    window.fbq('consent', granted ? 'grant' : 'revoke');
  }
}

/**
 * Matomo Provider
 */
export class MatomoProvider implements AnalyticsProvider {
  public readonly name = 'Matomo';
  private config: MatomoConfig | null = null;
  private isInitialized = false;

  async initialize(config: MatomoConfig): Promise<void> {
    this.config = config;
    
    if (!config.enabled || !config.siteId || !config.url) {
      console.warn('Matomo is disabled or missing configuration');
      return;
    }

    try {
      // Initialize Matomo tracking
      window._paq = window._paq || [];
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      
      if (config.cookieDomain) {
        window._paq.push(['setCookieDomain', config.cookieDomain]);
      }
      
      if (config.domains) {
        window._paq.push(['setDomains', config.domains]);
      }

      // Load Matomo script
      const script = document.createElement('script');
      script.async = true;
      script.src = `${config.url}/matomo.js`;
      document.head.appendChild(script);

      window._paq.push(['setTrackerUrl', `${config.url}/matomo.php`]);
      window._paq.push(['setSiteId', config.siteId]);

      this.isInitialized = true;
      console.log('Matomo initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Matomo:', error);
    }
  }

  trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized || !window._paq) return;
    
    window._paq.push(['setCustomUrl', event.page_location]);
    window._paq.push(['setDocumentTitle', event.page_title]);
    window._paq.push(['trackPageView']);
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || !window._paq) return;
    
    window._paq.push(['trackEvent', event.category, event.action, event.label, event.value]);
  }

  trackEcommerce(event: EcommerceEvent): void {
    if (!this.isInitialized || !window._paq) return;

    if (event.items) {
      event.items.forEach(item => {
        window._paq.push(['addEcommerceItem', 
          item.item_id, 
          item.item_name, 
          item.category, 
          item.price, 
          item.quantity
        ]);
      });
    }

    window._paq.push(['trackEcommerceOrder', 
      event.transaction_id, 
      event.value, 
      event.tax, 
      event.shipping
    ]);
  }

  trackUserInteraction(event: UserInteractionEvent): void {
    this.trackEvent({
      action: event.action,
      category: 'User Interaction',
      label: `${event.element_type}: ${event.element_text || event.element_id}`,
      value: event.value
    });
  }

  trackFormSubmission(event: FormEvent): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'Form',
      label: event.form_name,
      value: event.value
    });
  }

  trackContentEngagement(event: ContentEvent): void {
    this.trackEvent({
      action: event.engagement_type,
      category: `Content - ${event.content_type}`,
      label: event.content_title,
      value: event.value
    });
  }

  trackSearch(event: SearchEvent): void {
    if (!this.isInitialized || !window._paq) return;
    
    window._paq.push(['trackSiteSearch', 
      event.search_term, 
      event.search_category, 
      event.search_results
    ]);
  }

  trackLanguageChange(event: LanguageEvent): void {
    this.trackEvent({
      action: 'language_change',
      category: 'Localization',
      label: `${event.previous_language} to ${event.new_language}`,
      value: event.content_available ? 1 : 0
    });
  }

  trackPerformance(event: PerformanceEvent): void {
    this.trackEvent({
      action: event.metric_name,
      category: 'Performance',
      label: event.page_path,
      value: Math.round(event.metric_value)
    });
  }

  trackError(event: ErrorEvent): void {
    this.trackEvent({
      action: 'error',
      category: `Error - ${event.error_type}`,
      label: event.error_message,
      value: 1
    });
  }

  setUserId(userId: string): void {
    if (!this.isInitialized || !window._paq) return;
    window._paq.push(['setUserId', userId]);
  }

  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized || !window._paq) return;
    
    Object.entries(properties).forEach(([key, value], index) => {
      window._paq.push(['setCustomVariable', index + 1, key, value, 'visit']);
    });
  }

  consent(granted: boolean): void {
    if (!window._paq) return;
    
    if (granted) {
      window._paq.push(['rememberConsentGiven']);
    } else {
      window._paq.push(['forgetConsentGiven']);
    }
  }
}

/**
 * Unified Analytics Service
 * Manages multiple analytics providers and provides a single interface
 */
export class AnalyticsService {
  private providers: AnalyticsProvider[] = [];
  private config: AnalyticsConfig | null = null;
  private isInitialized = false;

  async initialize(config: AnalyticsConfig): Promise<void> {
    this.config = config;
    
    if (!config.enabled) {
      console.warn('Analytics is disabled');
      return;
    }

    try {
      // Initialize Google Analytics
      if (config.googleAnalytics?.enabled) {
        const gaProvider = new GoogleAnalyticsProvider();
        await gaProvider.initialize(config.googleAnalytics);
        this.providers.push(gaProvider);
      }

      // Initialize Facebook Pixel
      if (config.facebookPixel?.enabled) {
        const fbProvider = new FacebookPixelProvider();
        await fbProvider.initialize(config.facebookPixel);
        this.providers.push(fbProvider);
      }

      // Initialize Matomo
      if (config.matomo?.enabled) {
        const matomoProvider = new MatomoProvider();
        await matomoProvider.initialize(config.matomo);
        this.providers.push(matomoProvider);
      }

      this.isInitialized = true;
      console.log(`Analytics initialized with ${this.providers.length} providers`);
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  private executeOnProviders<T extends keyof AnalyticsProvider>(
    method: T,
    ...args: Parameters<AnalyticsProvider[T]>
  ): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      try {
        (provider[method] as any)(...args);
      } catch (error) {
        console.error(`Error in ${provider.name} ${method}:`, error);
      }
    });
  }

  trackPageView(event: PageViewEvent): void {
    this.executeOnProviders('trackPageView', event);
  }

  trackEvent(event: AnalyticsEvent): void {
    this.executeOnProviders('trackEvent', event);
  }

  trackEcommerce(event: EcommerceEvent): void {
    this.executeOnProviders('trackEcommerce', event);
  }

  trackUserInteraction(event: UserInteractionEvent): void {
    this.executeOnProviders('trackUserInteraction', event);
  }

  trackFormSubmission(event: FormEvent): void {
    this.executeOnProviders('trackFormSubmission', event);
  }

  trackContentEngagement(event: ContentEvent): void {
    this.executeOnProviders('trackContentEngagement', event);
  }

  trackSearch(event: SearchEvent): void {
    this.executeOnProviders('trackSearch', event);
  }

  trackLanguageChange(event: LanguageEvent): void {
    this.executeOnProviders('trackLanguageChange', event);
  }

  trackPerformance(event: PerformanceEvent): void {
    this.executeOnProviders('trackPerformance', event);
  }

  trackError(event: ErrorEvent): void {
    this.executeOnProviders('trackError', event);
  }

  setUserId(userId: string): void {
    this.executeOnProviders('setUserId', userId);
  }

  setUserProperties(properties: Record<string, any>): void {
    this.executeOnProviders('setUserProperties', properties);
  }

  consent(granted: boolean): void {
    this.executeOnProviders('consent', granted);
  }

  getConfig(): AnalyticsConfig | null {
    return this.config;
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  getProviders(): AnalyticsProvider[] {
    return [...this.providers];
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
