/**
 * Simplified Configuration for Docker/Self-Hosted Setup
 * No Cloudflare Worker needed - Strapi is on same network
 */

import { SiteConfig } from './types/core';

// Public configuration from environment
export const PUBLIC_CONFIG = {
  strapiUrl: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337',
  enableFallbacks: import.meta.env.VITE_ENABLE_FALLBACKS !== 'false',
  enableERPNextIntegration: import.meta.env.VITE_ENABLE_ERPNEXT_INTEGRATION === 'true',
  enableStrapiCMS: import.meta.env.VITE_ENABLE_STRAPI_CMS !== 'false',
} as const;

// Configuration cache
let configCache: {
  siteConfig?: SiteConfig;
  lastFetch?: number;
  cacheDuration: number;
} = {
  cacheDuration: 5 * 60 * 1000, // 5 minutes
};

/**
 * Fetch site configuration from Strapi
 * In Docker setup, Strapi API is public-readable for site config
 * Sensitive fields (ERPNext credentials) are marked private in Strapi
 */
export async function fetchExternalConfig(): Promise<SiteConfig | null> {
  try {
    // Check cache
    const now = Date.now();
    if (
      configCache.siteConfig &&
      configCache.lastFetch &&
      now - configCache.lastFetch < configCache.cacheDuration
    ) {
      return configCache.siteConfig;
    }

    // Fetch from Strapi (no token needed for public site config)
    const response = await fetch(
      `${PUBLIC_CONFIG.strapiUrl}/api/site-config?populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.data) {
      return null;
    }

    const siteConfig: SiteConfig = {
      id: result.data.id,
      ...result.data.attributes,
    };

    // Cache the configuration
    configCache.siteConfig = siteConfig;
    configCache.lastFetch = now;

    return siteConfig;
  } catch (error) {
    console.error('Error fetching external configuration:', error);
    return null;
  }
}

/**
 * Clear configuration cache
 */
export function clearConfigCache(): void {
  configCache = {
    cacheDuration: 5 * 60 * 1000,
  };
}

/**
 * Initialize configuration on app start
 */
export async function initializeConfig(): Promise<void> {
  try {
    await fetchExternalConfig();
    console.log('Configuration loaded successfully');
  } catch (error) {
    console.warn('Failed to load configuration, using fallbacks:', error);
  }
}

export default {
  PUBLIC_CONFIG,
  fetchExternalConfig,
  clearConfigCache,
  initializeConfig,
};
