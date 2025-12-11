/**
 * Analytics Context
 * 
 * React context for managing analytics tracking across the application
 * with Strapi CMS configuration integration.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { analyticsService } from '@/lib/services/AnalyticsService';
import { getAnalyticsConfig } from '@/lib/strapi';
import {
  AnalyticsConfig,
  AnalyticsContextValue,
  AnalyticsEvent,
  PageViewEvent,
  UserInteractionEvent,
  FormEvent,
  ContentEvent,
  SearchEvent,
  LanguageEvent,
  EcommerceEvent,
  PerformanceEvent,
  ErrorEvent,
  ConsentSettings,
  AnalyticsProviderProps
} from '@/lib/types/analytics';

const CONSENT_STORAGE_KEY = 'ivarse_analytics_consent';

const DEFAULT_CONSENT: ConsentSettings = {
  analytics: false,
  marketing: false,
  functional: true,
  necessary: true,
  timestamp: Date.now(),
  version: '1.0.0',
};

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [config, setConfig] = useState<AnalyticsConfig | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [consent, setConsentState] = useState<ConsentSettings>(DEFAULT_CONSENT);
  
  const [location] = useLocation();
  const { i18n } = useTranslation();
  
  // Fetch analytics configuration from Strapi
  const [analyticsConfig, setAnalyticsConfig] = useState<any>(null);
  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getAnalyticsConfig(i18n.language);
        setAnalyticsConfig(config);
      } catch (error) {
        console.warn('Failed to fetch analytics config:', error);
      } finally {
        setConfigLoading(false);
      }
    };
    fetchConfig();
  }, [i18n.language]);

  // Load consent from localStorage
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent);
        setConsentState({ ...DEFAULT_CONSENT, ...parsedConsent });
      }
    } catch (error) {
      console.warn('Failed to load analytics consent:', error);
    }
  }, []);

  // Initialize analytics when config is loaded
  useEffect(() => {
    if (!analyticsConfig || configLoading) return;

    const initializeAnalytics = async () => {
      try {
        setConfig(analyticsConfig);
        
        // Check if analytics is enabled and user has consented
        const shouldEnable = analyticsConfig.enabled && 
          (consent.analytics || consent.marketing || !analyticsConfig.cookieConsent);
        
        if (shouldEnable) {
          await analyticsService.initialize(analyticsConfig);
          setIsEnabled(true);
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
        setIsLoaded(true);
      }
    };

    initializeAnalytics();
  }, [analyticsConfig, configLoading, consent.analytics, consent.marketing]);

  // Update consent in analytics service when consent changes
  useEffect(() => {
    if (isLoaded && analyticsService.isReady()) {
      analyticsService.consent(consent.analytics || consent.marketing);
    }
  }, [consent.analytics, consent.marketing, isLoaded]);

  // Track page views on route changes
  useEffect(() => {
    if (!isEnabled || !analyticsService.isReady()) return;

    const pageViewEvent: PageViewEvent = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location,
      language: i18n.language,
      content_group1: getPageSection(location),
      content_group2: getPageCategory(location)
    };

    // Small delay to ensure page title is updated
    const timer = setTimeout(() => {
      analyticsService.trackPageView(pageViewEvent);
    }, 100);

    return () => clearTimeout(timer);
  }, [location, i18n.language, isEnabled]);

  // Helper functions
  const getPageSection = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    return segments[0] || 'home';
  };

  const getPageCategory = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'homepage';
    if (segments.length === 1) return 'main-section';
    return 'sub-section';
  };

  // Tracking functions
  const trackPageView = useCallback((event: Partial<PageViewEvent>) => {
    if (!isEnabled || !analyticsService.isReady()) return;

    const fullEvent: PageViewEvent = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location,
      language: i18n.language,
      content_group1: getPageSection(location),
      content_group2: getPageCategory(location),
      ...event
    };

    analyticsService.trackPageView(fullEvent);
  }, [isEnabled, location, i18n.language]);

  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackEvent(event);
  }, [isEnabled]);

  const trackUserInteraction = useCallback((event: UserInteractionEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackUserInteraction(event);
  }, [isEnabled]);

  const trackFormSubmission = useCallback((event: FormEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackFormSubmission(event);
  }, [isEnabled]);

  const trackContentEngagement = useCallback((event: ContentEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackContentEngagement(event);
  }, [isEnabled]);

  const trackSearch = useCallback((event: SearchEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackSearch(event);
  }, [isEnabled]);

  const trackLanguageChange = useCallback((event: LanguageEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackLanguageChange(event);
  }, [isEnabled]);

  const trackEcommerce = useCallback((event: EcommerceEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackEcommerce(event);
  }, [isEnabled]);

  const trackPerformance = useCallback((event: PerformanceEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackPerformance(event);
  }, [isEnabled]);

  const trackError = useCallback((event: ErrorEvent) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.trackError(event);
  }, [isEnabled]);

  const setConsent = useCallback((granted: boolean) => {
    const newConsent: ConsentSettings = {
      ...consent,
      analytics: granted,
      marketing: granted,
      timestamp: Date.now()
    };

    setConsentState(newConsent);
    
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    } catch (error) {
      console.warn('Failed to save analytics consent:', error);
    }

    if (analyticsService.isReady()) {
      analyticsService.consent(granted);
    }
  }, [consent]);

  const setUserId = useCallback((userId: string) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.setUserId(userId);
  }, [isEnabled]);

  const setUserProperties = useCallback((properties: Record<string, any>) => {
    if (!isEnabled || !analyticsService.isReady()) return;
    analyticsService.setUserProperties(properties);
  }, [isEnabled]);

  const contextValue: AnalyticsContextValue = {
    config,
    isLoaded,
    isEnabled,
    trackPageView,
    trackEvent,
    trackUserInteraction,
    trackFormSubmission,
    trackContentEngagement,
    trackSearch,
    trackLanguageChange,
    trackEcommerce,
    trackPerformance,
    trackError,
    setConsent,
    setUserId,
    setUserProperties
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook to use analytics context
export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);
  
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  
  return context;
}

// Hook for page tracking with automatic cleanup
export function usePageTracking(additionalData?: Partial<PageViewEvent>) {
  const { trackPageView, trackPerformance } = useAnalytics();
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Track page view with additional data
    if (additionalData) {
      trackPageView(additionalData);
    }

    // Track page load performance
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      if (loadTime > 0) {
        trackPerformance({
          action: 'page_load_time',
          category: 'Performance',
          metric_name: 'page_load_time',
          metric_value: loadTime,
          page_path: window.location.pathname
        });
      }
    }

    // Track time on page when component unmounts
    return () => {
      const timeOnPage = Date.now() - startTime;
      trackPerformance({
        action: 'time_on_page',
        category: 'Engagement',
        metric_name: 'page_load_time',
        metric_value: timeOnPage,
        page_path: window.location.pathname
      });
    };
  }, [trackPageView, trackPerformance, additionalData, startTime]);

    return {
      trackPageView: (data?: Partial<PageViewEvent>) => trackPageView({ ...(additionalData || {}), ...(data || {}) }),
      trackPageExit: () => {
        const timeOnPage = Date.now() - startTime;
        trackPerformance({
          action: 'page_exit',
          category: 'Engagement',
          metric_name: 'page_load_time',
          metric_value: timeOnPage,
          page_path: window.location.pathname
        });
      },
      trackTimeOnPage: () => {
        const timeOnPage = Date.now() - startTime;
        trackPerformance({
          action: 'time_on_page',
          category: 'Engagement',
          metric_name: 'page_load_time',
          metric_value: timeOnPage,
          page_path: window.location.pathname
        });
      }
    };
}

// Hook for interaction tracking with element helpers
export function useInteractionTracking() {
  const { trackUserInteraction, trackEvent } = useAnalytics();

  const trackClick = useCallback((element: HTMLElement, additionalData?: Partial<UserInteractionEvent>) => {
    const tagName = element.tagName.toLowerCase();
    const elementType: UserInteractionEvent['element_type'] = 
      tagName === 'a' ? 'link' : 
      tagName === 'button' ? 'button' : 
      tagName === 'form' ? 'form' : 
      tagName === 'video' ? 'video' : 
      tagName === 'img' ? 'image' : 'button';
    const elementText = element.textContent?.trim() || '';
    const elementId = element.id || '';

    trackUserInteraction({
      action: 'click',
      category: 'User Interaction',
      label: elementText || elementId,
      element_type: elementType,
      element_id: elementId,
      element_text: elementText,
      page_section: element.closest('[data-section]')?.getAttribute('data-section') || undefined,
      ...additionalData
    });
  }, [trackUserInteraction]);

  const trackHover = useCallback((element: HTMLElement, duration: number) => {
    trackEvent({
      action: 'hover',
      category: 'User Interaction',
      label: element.textContent?.trim() || element.id || 'unknown',
      value: duration
    });
  }, [trackEvent]);

  const trackScroll = useCallback((percentage: number) => {
    trackEvent({
      action: 'scroll',
      category: 'Engagement',
      label: `${Math.round(percentage)}%`,
      value: percentage
    });
  }, [trackEvent]);

  const trackFormStart = useCallback((formId: string) => {
    trackEvent({
      action: 'form_start',
      category: 'Form',
      label: formId
    });
  }, [trackEvent]);

  const trackFormComplete = useCallback((formId: string, success: boolean) => {
    trackEvent({
      action: success ? 'form_complete' : 'form_error',
      category: 'Form',
      label: formId,
      value: success ? 1 : 0
    });
  }, [trackEvent]);

  return {
    trackClick,
    trackHover,
    trackScroll,
    trackFormStart,
    trackFormComplete
  };
}

export default AnalyticsProvider;
