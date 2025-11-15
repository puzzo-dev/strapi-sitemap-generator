/**
 * API Configuration Constants
 * 
 * Centralized configuration for all API endpoints and settings.
 * This file consolidates environment variables and provides
 * typed configuration objects for the application.
 */

/// <reference types="vite/client" />

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

export const ENV = {
  /** Node environment */
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  /** Production mode check */
  IS_PRODUCTION: import.meta.env.NODE_ENV === 'production',
  
  /** Development mode check */
  IS_DEVELOPMENT: import.meta.env.NODE_ENV === 'development',
} as const;

// ============================================================================
// STRAPI CMS CONFIGURATION
// ============================================================================

export const STRAPI_CONFIG = {
  /** Base API URL */
  API_URL: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337',
  
  /** API authentication token */
  API_TOKEN: import.meta.env.VITE_STRAPI_API_TOKEN || '',
  
  /** Upload/media URL */
  UPLOADS_URL: import.meta.env.VITE_STRAPI_UPLOADS_URL || 
    `${import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337'}/uploads`,
  
  /** Check if Strapi is enabled */
  IS_ENABLED: import.meta.env.VITE_ENABLE_STRAPI_CMS === 'true',
} as const;

// ============================================================================
// ERPNEXT CONFIGURATION
// ============================================================================

export const ERPNEXT_CONFIG = {
  /** Base URL (will be fetched from Strapi in production) */
  URL: import.meta.env.VITE_ERP_NEXT_URL || '',
  
  /** API Key (will be fetched from Strapi in production) */
  API_KEY: import.meta.env.VITE_ERP_NEXT_API_KEY || '',
  
  /** API Secret (will be fetched from Strapi in production) */
  API_SECRET: import.meta.env.VITE_ERP_NEXT_API_SECRET || '',
  
  /** Check if ERPNext integration is enabled */
  IS_ENABLED: import.meta.env.VITE_ENABLE_ERPNEXT_INTEGRATION === 'true',
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
  /** Enable fallback to local data when APIs fail */
  ENABLE_FALLBACKS: import.meta.env.VITE_ENABLE_FALLBACKS !== 'false', // Default true
  
  /** Enable Strapi CMS integration */
  ENABLE_STRAPI: import.meta.env.VITE_ENABLE_STRAPI_CMS === 'true',
  
  /** Enable ERPNext integration */
  ENABLE_ERPNEXT: import.meta.env.VITE_ENABLE_ERPNEXT_INTEGRATION === 'true',
  
  /** Enable analytics tracking */
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  /** Enable development tools */
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEVELOPMENT_TOOLS === 'true',
} as const;

// ============================================================================
// LOGGING CONFIGURATION
// ============================================================================

export const LOGGING_CONFIG = {
  /** Log level */
  LEVEL: (import.meta.env.VITE_LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
  
  /** Remote logging endpoint */
  ENDPOINT: import.meta.env.VITE_LOG_ENDPOINT || '',
  
  /** Remote logging API key */
  API_KEY: import.meta.env.VITE_LOG_API_KEY || '',
  
  /** Enable console logging in production */
  ENABLE_CONSOLE: ENV.IS_DEVELOPMENT || import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true',
} as const;

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_CONFIG = {
  /** Default stale time for queries (10 minutes) */
  DEFAULT_STALE_TIME: 10 * 60 * 1000,
  
  /** Default garbage collection time (30 minutes) */
  DEFAULT_GC_TIME: 30 * 60 * 1000,
  
  /** Short stale time for frequently changing data (2 minutes) */
  SHORT_STALE_TIME: 2 * 60 * 1000,
  
  /** Long stale time for rarely changing data (1 hour) */
  LONG_STALE_TIME: 60 * 60 * 1000,
  
  /** Enable refetch on window focus */
  REFETCH_ON_FOCUS: false,
  
  /** Enable refetch on reconnect */
  REFETCH_ON_RECONNECT: true,
  
  /** Number of retry attempts */
  RETRY_COUNT: 2,
} as const;

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Strapi CMS endpoints
  STRAPI: {
    PRODUCTS: 'products',
    SERVICES: 'services',
    BLOG_POSTS: 'blog-posts',
    BLOG_CATEGORIES: 'blog-categories',
    TEAM_MEMBERS: 'team-members',
    JOB_LISTINGS: 'job-listings',
    TESTIMONIALS: 'testimonials',
    CASE_STUDIES: 'case-studies',
    INDUSTRIES: 'industries',
    FAQ_ITEMS: 'faq-items',
    CLIENT_LOGOS: 'client-logos',
    NAV_ITEMS: 'nav-items',
    SOCIAL_LINKS: 'social-links',
    FOOTER_COLUMNS: 'footer-columns',
    SITE_CONFIG: 'site-config',
    PAGE_CONTENT: 'page-contents',
    LANGUAGE_CONFIG: 'language-config',
    UI_TRANSLATIONS: 'ui-translations',
    ANALYTICS_CONFIG: 'analytics-config',
    AD_SLIDES: 'ad-slides',
    FOOTER: 'footer',
  },
  
  // ERPNext endpoints
  ERPNEXT: {
    BLOG_POST: 'Blog Post',
    BLOG_CATEGORY: 'Blog Category',
    EMPLOYEE: 'Employee',
    JOB_OPENING: 'Job Opening',
    LEAD: 'Lead',
    EVENT: 'Event',
    EMAIL_GROUP_MEMBER: 'Email Group Member',
    JOB_APPLICANT: 'Job Applicant',
    BLOG_COMMENT: 'Blog Comment',
  },
} as const;

// ============================================================================
// HTTP CONFIGURATION
// ============================================================================

export const HTTP_CONFIG = {
  /** Request timeout in milliseconds */
  TIMEOUT: 30000,
  
  /** Default headers for Strapi requests */
  STRAPI_HEADERS: {
    'Content-Type': 'application/json',
    ...(STRAPI_CONFIG.API_TOKEN ? { 
      Authorization: `Bearer ${STRAPI_CONFIG.API_TOKEN}` 
    } : {}),
  },
  
  /** Create ERPNext headers (called with credentials) */
  createERPNextHeaders: (apiKey: string, apiSecret: string) => ({
    'Content-Type': 'application/json',
    'Authorization': `token ${apiKey}:${apiSecret}`,
  }),
} as const;

// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
  /** Application name */
  NAME: import.meta.env.VITE_APP_NAME || 'I-Varse Technologies',
  
  /** Application URL */
  URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  
  /** Default language */
  DEFAULT_LANGUAGE: 'en',
  
  /** Supported languages */
  SUPPORTED_LANGUAGES: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'] as const,
} as const;

// ============================================================================
// EXPORT HELPERS
// ============================================================================

/**
 * Get full Strapi API URL for an endpoint
 */
export const getStrapiURL = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`/api/${endpoint}`, STRAPI_CONFIG.API_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};

/**
 * Get full ERPNext API URL for an endpoint
 */
export const getERPNextURL = (endpoint: string, baseUrl: string): string => {
  return `${baseUrl}/api/resource/${endpoint}`;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  return FEATURE_FLAGS[feature];
};

/**
 * Get environment-specific configuration
 */
export const getEnvConfig = () => ({
  isDevelopment: ENV.IS_DEVELOPMENT,
  isProduction: ENV.IS_PRODUCTION,
  enableDevTools: FEATURE_FLAGS.ENABLE_DEV_TOOLS,
  enableAnalytics: FEATURE_FLAGS.ENABLE_ANALYTICS,
  logLevel: LOGGING_CONFIG.LEVEL,
});
