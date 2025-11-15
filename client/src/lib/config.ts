/**
 * External Configuration Management
 * 
 * This module handles fetching sensitive configuration from external sources:
 * - Strapi CMS stores ERPNext credentials (API key, secret, URL)
 * - Frontend only needs Strapi public URL
 * - Strapi API token stored securely (Cloudflare Workers, env vars, etc.)
 * 
 * Security Architecture:
 * 1. Strapi API credentials → Environment variables (server-side only)
 * 2. ERPNext credentials → Stored in Strapi CMS (fetched server-side)
 * 3. Frontend → Only receives public Strapi URL
 * 4. All sensitive operations happen server-side or through secure proxies
 */

import { SiteConfig } from './types/core';

// Public configuration (safe to expose in frontend)
export const PUBLIC_CONFIG = {
  strapiUrl: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337',
  // Add other non-sensitive public config here
  enableFallbacks: import.meta.env.VITE_ENABLE_FALLBACKS !== 'false',
  enableERPNextIntegration: import.meta.env.VITE_ENABLE_ERPNEXT_INTEGRATION === 'true',
  enableStrapiCMS: import.meta.env.VITE_ENABLE_STRAPI_CMS !== 'false',
} as const;

// Configuration cache
let configCache: {
  siteConfig?: SiteConfig;
  erpNextConfig?: {
    url: string;
    apiKey: string;
    apiSecret: string;
  };
  lastFetch?: number;
  cacheDuration: number;
} = {
  cacheDuration: 5 * 60 * 1000, // 5 minutes cache
};

/**
 * Fetch Strapi API token from secure external source
 * In production, this should call a Cloudflare Worker or similar secure endpoint
 * that returns the token without exposing it in the frontend bundle
 */
async function getSecureStrapiToken(): Promise<string | null> {
  try {
    // Development: Use environment variable
    if (import.meta.env.DEV) {
      return import.meta.env.VITE_STRAPI_API_TOKEN || null;
    }

    // Production: Fetch from secure endpoint (e.g., Cloudflare Worker)
    const tokenEndpoint = import.meta.env.VITE_SECURE_TOKEN_ENDPOINT;
    
    if (!tokenEndpoint) {
      console.warn('No secure token endpoint configured. Using fallback data.');
      return null;
    }

    const response = await fetch(tokenEndpoint, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch secure token: ${response.status}`);
    }

    const data = await response.json();
    return data.token || null;
  } catch (error) {
    console.error('Error fetching secure Strapi token:', error);
    return null;
  }
}

/**
 * Fetch site configuration including ERPNext credentials from Strapi
 * This happens server-side or through a secure proxy
 */
export async function fetchExternalConfig(): Promise<SiteConfig | null> {
  try {
    // Check cache first
    const now = Date.now();
    if (
      configCache.siteConfig &&
      configCache.lastFetch &&
      now - configCache.lastFetch < configCache.cacheDuration
    ) {
      return configCache.siteConfig;
    }

    // Get secure token
    const token = await getSecureStrapiToken();
    
    if (!token) {
      console.warn('No Strapi token available. Using fallback configuration.');
      return null;
    }

    // Fetch site config from Strapi (includes ERPNext credentials)
    const response = await fetch(
      `${PUBLIC_CONFIG.strapiUrl}/api/site-config?populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

    // Extract and cache ERPNext config separately (never expose to client)
    if (siteConfig.erpNextUrl && siteConfig.erpNextApiKey && siteConfig.erpNextApiSecret) {
      configCache.erpNextConfig = {
        url: siteConfig.erpNextUrl,
        apiKey: siteConfig.erpNextApiKey,
        apiSecret: siteConfig.erpNextApiSecret,
      };
    }

    return siteConfig;
  } catch (error) {
    console.error('Error fetching external configuration:', error);
    return null;
  }
}

/**
 * Get ERPNext configuration (server-side only)
 * Never call this from client-side code
 */
export async function getERPNextConfig(): Promise<{
  url: string;
  apiKey: string;
  apiSecret: string;
} | null> {
  // Check cache first
  if (configCache.erpNextConfig) {
    return configCache.erpNextConfig;
  }

  // Fetch full config which includes ERPNext credentials
  await fetchExternalConfig();

  return configCache.erpNextConfig || null;
}

/**
 * Clear configuration cache
 * Useful for forcing a refresh or during logout
 */
export function clearConfigCache(): void {
  configCache = {
    cacheDuration: 5 * 60 * 1000,
  };
}

/**
 * Initialize configuration on app start
 * This can be called in main.tsx or App.tsx
 */
export async function initializeConfig(): Promise<void> {
  try {
    await fetchExternalConfig();
    console.log('External configuration loaded successfully');
  } catch (error) {
    console.warn('Failed to load external configuration, using fallbacks:', error);
  }
}

export default {
  PUBLIC_CONFIG,
  fetchExternalConfig,
  getERPNextConfig,
  clearConfigCache,
  initializeConfig,
};
