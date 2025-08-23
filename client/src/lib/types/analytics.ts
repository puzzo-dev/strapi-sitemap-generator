/**
 * Analytics Types
 * 
 * Type definitions for analytics integration including Google Analytics,
 * Facebook Pixel, and Matomo tracking systems.
 */

// Analytics Configuration Types
export interface AnalyticsConfig {
  id: number;
  googleAnalytics?: GoogleAnalyticsConfig;
  facebookPixel?: FacebookPixelConfig;
  matomo?: MatomoConfig;
  enabled: boolean;
  debugMode?: boolean;
  cookieConsent?: boolean;
  dataRetentionDays?: number;
  anonymizeIP?: boolean;
}

export interface GoogleAnalyticsConfig {
  measurementId: string;
  enabled: boolean;
  trackingId?: string; // Legacy GA3 support
  enhancedEcommerce?: boolean;
  customDimensions?: CustomDimension[];
  customMetrics?: CustomMetric[];
}

export interface FacebookPixelConfig {
  pixelId: string;
  enabled: boolean;
  advancedMatching?: boolean;
  automaticMatching?: boolean;
  customEvents?: string[];
}

export interface MatomoConfig {
  siteId: string;
  url: string;
  enabled: boolean;
  trackSubdomains?: boolean;
  cookieDomain?: string;
  domains?: string[];
}

export interface CustomDimension {
  index: number;
  name: string;
  scope: 'hit' | 'session' | 'user' | 'product';
}

export interface CustomMetric {
  index: number;
  name: string;
  type: 'integer' | 'currency' | 'time';
}

// Event Tracking Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
  language?: string;
  content_group1?: string; // Section type
  content_group2?: string; // Page category
  custom_map?: Record<string, any>;
}

export interface EcommerceEvent {
  transaction_id?: string;
  value?: number;
  currency?: string;
  items?: EcommerceItem[];
  coupon?: string;
  shipping?: number;
  tax?: number;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  item_brand?: string;
  item_variant?: string;
}

// User Interaction Events
export interface UserInteractionEvent extends AnalyticsEvent {
  element_type: 'button' | 'link' | 'form' | 'video' | 'image' | 'modal';
  element_id?: string;
  element_text?: string;
  page_section?: string;
}

export interface FormEvent extends AnalyticsEvent {
  form_id: string;
  form_name: string;
  form_destination?: string;
  form_submit_text?: string;
}

export interface VideoEvent extends AnalyticsEvent {
  video_title: string;
  video_url: string;
  video_duration?: number;
  video_current_time?: number;
  video_percent?: number;
}

// Content Engagement Events
export interface ContentEvent extends AnalyticsEvent {
  content_type: 'blog' | 'service' | 'product' | 'case_study' | 'team' | 'faq';
  content_id: string;
  content_title: string;
  content_category?: string;
  engagement_type: 'view' | 'click' | 'share' | 'download' | 'contact';
}

export interface SearchEvent extends AnalyticsEvent {
  search_term: string;
  search_results?: number;
  search_category?: string;
}

// Language and Localization Events
export interface LanguageEvent extends AnalyticsEvent {
  previous_language: string;
  new_language: string;
  page_path: string;
  content_available: boolean;
}

// Performance and Error Events
export interface PerformanceEvent extends AnalyticsEvent {
  metric_name: 'page_load_time' | 'api_response_time' | 'image_load_time';
  metric_value: number;
  page_path: string;
}

export interface ErrorEvent extends AnalyticsEvent {
  error_type: 'javascript' | 'api' | 'network' | 'content';
  error_message: string;
  error_stack?: string;
  page_path: string;
  user_agent?: string;
}

// Analytics Provider Interface
export interface AnalyticsProvider {
  name: string;
  initialize(config: any): Promise<void>;
  trackPageView(event: PageViewEvent): void;
  trackEvent(event: AnalyticsEvent): void;
  trackEcommerce(event: EcommerceEvent): void;
  trackUserInteraction(event: UserInteractionEvent): void;
  trackFormSubmission(event: FormEvent): void;
  trackContentEngagement(event: ContentEvent): void;
  trackSearch(event: SearchEvent): void;
  trackLanguageChange(event: LanguageEvent): void;
  trackPerformance(event: PerformanceEvent): void;
  trackError(event: ErrorEvent): void;
  setUserId(userId: string): void;
  setUserProperties(properties: Record<string, any>): void;
  consent(granted: boolean): void;
}

// Analytics Context Types
export interface AnalyticsContextValue {
  config: AnalyticsConfig | null;
  isLoaded: boolean;
  isEnabled: boolean;
  trackPageView: (event: Partial<PageViewEvent>) => void;
  trackEvent: (event: AnalyticsEvent) => void;
  trackUserInteraction: (event: UserInteractionEvent) => void;
  trackFormSubmission: (event: FormEvent) => void;
  trackContentEngagement: (event: ContentEvent) => void;
  trackSearch: (event: SearchEvent) => void;
  trackLanguageChange: (event: LanguageEvent) => void;
  trackEcommerce: (event: EcommerceEvent) => void;
  trackPerformance: (event: PerformanceEvent) => void;
  trackError: (event: ErrorEvent) => void;
  setConsent: (granted: boolean) => void;
  setUserId: (userId: string) => void;
  setUserProperties: (properties: Record<string, any>) => void;
}

// Hook Return Types
export interface UseAnalyticsReturn extends AnalyticsContextValue {}

export interface UsePageTrackingReturn {
  trackPageView: (additionalData?: Partial<PageViewEvent>) => void;
  trackPageExit: () => void;
  trackTimeOnPage: () => void;
}

export interface UseInteractionTrackingReturn {
  trackClick: (element: HTMLElement, additionalData?: Partial<UserInteractionEvent>) => void;
  trackHover: (element: HTMLElement, duration: number) => void;
  trackScroll: (percentage: number) => void;
  trackFormStart: (formId: string) => void;
  trackFormComplete: (formId: string, success: boolean) => void;
}

// Consent Management
export interface ConsentSettings {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  necessary: boolean; // Always true
  timestamp: number;
  version: string;
}

export interface ConsentManager {
  getConsent(): ConsentSettings | null;
  setConsent(settings: Partial<ConsentSettings>): void;
  hasConsent(type: keyof ConsentSettings): boolean;
  isConsentRequired(): boolean;
  showConsentBanner(): boolean;
}
