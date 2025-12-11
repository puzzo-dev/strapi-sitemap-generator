import {
  products as localProducts,
  services as localServices,
  testimonials as localTestimonials,
  socialLinks as localSocialLinks,
  navItems as localNavItems,
  faqItems as localFAQItems,
  footerData,
  defaultSiteConfig,
} from '@/lib/data/';
import {
  NavItem,
  SocialLink,
  SiteConfig,
  LanguageConfig,
  ClientLogo,
  PageContent,
  FooterColumn,
  FAQItem,
  ProductProps,
  ServiceProps,
  TestimonialProps,
  FooterProps
} from './types';

// Constants for API integration
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Default headers for API requests
const strapiHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {})
};

// Current language for localization
let currentLanguage = 'en';

// Function to set current language for Strapi requests
export function setCurrentLanguage(lang: string) {
  currentLanguage = lang;
  console.log('Language changed to:', lang);
}

/**
 * Fetch data from Strapi API with error handling and fallback to local data
 */
async function fetchStrapiData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, using fallback data');
      return fallbackData;
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*${localeSuffix}`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Handle both collection and single type responses from Strapi
    if (Array.isArray(result.data)) {
      return result.data.map((item: any) => ({
        id: item.id,
        ...item.attributes
      })) as T;
    } else if (result.data && result.data.attributes) {
      return {
        id: result.data.id,
        ...result.data.attributes
      } as T;
    }

    return fallbackData;
  } catch (error) {
    console.warn(`Error fetching data (${endpoint}):`, error);
    return fallbackData;
  }
}

// Utility: Fetch with language fallback (current lang -> en -> local)
async function fetchWithLanguageFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // 1. Try current language
  let data = await fetchStrapiData<T>(endpoint, [] as any);
  if ((!data || (Array.isArray(data) && data.length === 0)) && currentLanguage !== 'en') {
    // 2. Try English
    const prevLang = currentLanguage;
    setCurrentLanguage('en');
    data = await fetchStrapiData<T>(endpoint, [] as any);
    setCurrentLanguage(prevLang);
  }
  // 3. Fallback to local data
  return (data && (!Array.isArray(data) || data.length > 0)) ? data : fallbackData;
}

/**
 * Get all products from API or fallback to local data
 */
export async function getProducts(): Promise<ProductProps[]> {
  return fetchWithLanguageFallback<ProductProps[]>('products', localProducts);
}

/**
 * Get a single product by ID from API or fallback to local data
 */
export async function getProductById(id: number): Promise<ProductProps | undefined> {
  try {
    if (!STRAPI_API_TOKEN) {
      return localProducts.find(product => product.id === id);
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*${localeSuffix}`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return {
      id: result.data.id,
      ...result.data.attributes
    };
  } catch (error) {
    console.warn(`Error fetching product ${id}:`, error);
    return localProducts.find(product => product.id === id);
  }
}

/**
 * Get all services from API or fallback to local data
 */
export async function getServices(): Promise<ServiceProps[]> {
  try {
    const services = await fetchStrapiData<ServiceProps[]>('services', []);
    return services.length > 0 ? services : localServices;
  } catch (error) {
    console.warn('Error fetching services:', error);
    return localServices;
  }
}

/**
 * Get a single service by ID from API or fallback to local data
 */
export async function getServiceById(id: number): Promise<ServiceProps | undefined> {
  try {
    if (!STRAPI_API_TOKEN) {
      return localServices.find(service => service.id === id);
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/services/${id}?populate=*${localeSuffix}`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return {
      id: result.data.id,
      ...result.data.attributes
    };
  } catch (error) {
    console.warn(`Error fetching service ${id}:`, error);
    return localServices.find(service => service.id === id);
  }
}

/**
 * Get all testimonials from API or fallback to local data
 */
export async function getTestimonials(): Promise<TestimonialProps[]> {
  return fetchWithLanguageFallback<TestimonialProps[]>('testimonials', localTestimonials);
}

/**
 * Get FAQ items from API
 */
export async function getFAQItems(): Promise<FAQItem[]> {
  return fetchStrapiData<FAQItem[]>('faq-items', localFAQItems);
}

/**
 * Get navigation menu items from API
 */
export async function getNavItems(): Promise<NavItem[]> {
  return fetchStrapiData<NavItem[]>('nav-items', localNavItems);
}

/**
 * Get social media links from API
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  return fetchStrapiData<SocialLink[]>('social-links', localSocialLinks);
}

/**
 * Get footer columns from API
 */
export async function getFooterColumns(): Promise<FooterColumn[]> {
  return fetchStrapiData<FooterColumn[]>('footer-columns', []);
}

/**
 * Get site configuration from API
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    if (!STRAPI_API_TOKEN) {
      return defaultSiteConfig;
    }

    const response = await fetch(`${STRAPI_URL}/api/site-config?populate=*`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.data) {
      return defaultSiteConfig;
    }

    return {
      id: result.data.id,
      ...result.data.attributes
    };
  } catch (error) {
    console.warn('Error fetching site config:', error);
    return defaultSiteConfig;
  }
}

/**
 * Get language configuration from Strapi API
 */
export async function getLanguageConfig(): Promise<{
  supportedLanguages: string[];
  defaultLanguage: string;
  enabledTranslations: Record<string, any>;
}> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token, using default language configuration');
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const response = await fetch(`${STRAPI_URL}/api/language-config?populate=*`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      console.warn(`Strapi language config API error: ${response.status}, using defaults`);
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const result = await response.json();
    if (!result.data) {
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const config = result.data.attributes;
    return {
      supportedLanguages: config.supportedLanguages || ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
      defaultLanguage: config.defaultLanguage || 'en',
      enabledTranslations: config.translations || {}
    };
  } catch (error) {
    console.warn('Error fetching language config:', error);
    return {
      supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
      defaultLanguage: 'en',
      enabledTranslations: {}
    };
  }
}

/**
 * Get translations for UI elements from Strapi
 */
export async function getUITranslations(language: string = currentLanguage): Promise<Record<string, any>> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token, using local translations');
      return {};
    }

    const response = await fetch(`${STRAPI_URL}/api/ui-translations?filters[language][$eq]=${language}&populate=*`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      console.warn(`Strapi UI translations API error: ${response.status}, using local translations`);
      return {};
    }

    const result = await response.json();
    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.warn(`No UI translations found for language: ${language}`);
      return {};
    }

    // Transform Strapi data to i18n format
    const translationData = result.data[0].attributes;
    return translationData.translations || {};
  } catch (error) {
    console.warn('Error fetching UI translations:', error);
    return {};
  }
}

/**
 * Get page content by slug from Strapi API (legacy function - use getPageContent with language awareness)
 */
export async function getPageContentBySlug(slug: string): Promise<PageContent | null> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, returning null');
      return null;
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/page-contents?filters[slug][$eq]=${slug}&populate=*${localeSuffix}`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Handle collection response from Strapi
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      const pageData = result.data[0];
      return {
        id: pageData.id,
        ...pageData.attributes
      };
    }

    // If no data found, try English fallback
    if (locale !== 'en') {
      const prevLang = currentLanguage;
      setCurrentLanguage('en');
      const englishResponse = await fetch(`${STRAPI_URL}/api/page-contents?filters[slug][$eq]=${slug}&populate=*`, {
        headers: strapiHeaders
      });
      setCurrentLanguage(prevLang);

      if (englishResponse.ok) {
        const englishResult = await englishResponse.json();
        if (englishResult.data && Array.isArray(englishResult.data) && englishResult.data.length > 0) {
          const pageData = englishResult.data[0];
          return {
            id: pageData.id,
            ...pageData.attributes
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`Error fetching page content (${slug}):`, error);
    return null;
  }
}

/**
 * Fetch dynamic ads from Strapi
 */
export async function getAdsFromStrapi(filters?: {
  position?: string;
  targetAudience?: string[];
  maxAds?: number;
}): Promise<any[]> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('locale', currentLanguage);

    // Add active status filter
    params.append('filters[isActive][$eq]', 'true');

    // Add date filters for active campaigns
    const now = new Date().toISOString();
    params.append('filters[$or][0][startDate][$null]', 'true');
    params.append('filters[$or][1][startDate][$lte]', now);
    params.append('filters[$and][0][$or][0][endDate][$null]', 'true');
    params.append('filters[$and][0][$or][1][endDate][$gte]', now);

    // Add position filter if specified
    if (filters?.position) {
      params.append('filters[position][$eq]', filters.position);
    }

    // Add pagination
    if (filters?.maxAds) {
      params.append('pagination[limit]', filters.maxAds.toString());
    }

    // Sort by priority
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'createdAt:desc');

    const response = await fetch(
      `${STRAPI_URL}/api/ad-slides?${params.toString()}`,
      { headers: strapiHeaders }
    );

    if (!response.ok) {
      throw new Error(`Strapi ads fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return transformStrapiAds(data.data || []);
  } catch (error) {
    console.error('Error fetching ads from Strapi:', error);
    throw error;
  }
}

/**
 * Transform Strapi ads data to match local AdSlide interface
 */
function transformStrapiAds(strapiAds: any[]): any[] {
  return strapiAds.map(item => {
    const attributes = item.attributes;
    return {
      id: item.id,
      title: attributes.title,
      subtitle: attributes.subtitle,
      description: attributes.description,
      bgColor: attributes.bgColor || 'from-blue-600 to-blue-800',
      icon: attributes.icon || 'Star',
      cta: attributes.cta || 'Learn More',
      ctaUrl: attributes.ctaUrl,
      image: attributes.image?.data?.attributes?.url ?
        `${STRAPI_URL}${attributes.image.data.attributes.url}` : undefined,
      priority: attributes.priority || 999,
      startDate: attributes.startDate ? new Date(attributes.startDate) : undefined,
      endDate: attributes.endDate ? new Date(attributes.endDate) : undefined,
      targetAudience: attributes.targetAudience?.map((ta: any) => ta.audience) || [],
      clickTrackingId: attributes.clickTrackingId || `strapi-ad-${item.id}`,
      isActive: attributes.isActive,
      adType: attributes.adType,
      position: attributes.position
    };
  });
}

/**
 * Track ad analytics to Strapi
 */
export async function trackAdAnalytics(data: {
  adId: string;
  action: 'view' | 'click';
  timestamp?: Date;
  userAgent?: string;
  referrer?: string;
}): Promise<void> {
  try {
    const analyticsData = {
      data: {
        adId: data.adId,
        action: data.action,
        timestamp: data.timestamp || new Date(),
        userAgent: data.userAgent || navigator.userAgent,
        referrer: data.referrer || document.referrer,
        sessionId: sessionStorage.getItem('session-id') || 'anonymous'
      }
    };

    await fetch(`${STRAPI_URL}/api/ad-analytics`, {
      method: 'POST',
      headers: strapiHeaders,
      body: JSON.stringify(analyticsData)
    });
  } catch (error) {
    console.warn('Failed to track ad analytics:', error);
    // Don't throw error for analytics tracking failures
  }
}
