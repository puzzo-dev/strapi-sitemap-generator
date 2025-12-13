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

import { getSecret } from '@/lib/utils/credentials';

// Constants for API integration
const STRAPI_URL = import.meta.env.PROD
  ? (getSecret('STRAPI_API_URL') || '')
  : (import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337');

// Function to get API token dynamically
const getStrapiToken = () => {
  return import.meta.env.PROD
    ? getSecret('STRAPI_API_TOKEN')
    : import.meta.env.VITE_STRAPI_API_TOKEN;
};

// Function to generate headers dynamically with current token
const getStrapiHeaders = () => {
  const token = getStrapiToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  // Debug: Log if token is missing (only in development)
  if (!token && !import.meta.env.PROD) {
    console.warn('[Strapi] API token not found - requests may fail with 403');
  }

  return headers;
};

// Current language for localization
let currentLanguage = 'en';

// Function to set current language for Strapi requests
export function setCurrentLanguage(lang: string) {
  console.log('📝 Strapi: Setting currentLanguage to:', lang);
  currentLanguage = lang;
  console.log('Language changed to:', lang);
}

// Function to get current language
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * Fetch data from Strapi API with error handling and fallback to local data
 * Strapi v5: populate=* goes 1 level deep only.
 * For dynamic zones: Use populate[dynamicZone][on][component.name][populate]=* syntax
 * Based on actual schema from I-VarseCMSBackend
 */
async function fetchStrapiData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    if (!getStrapiToken()) {
      console.warn('No Strapi API token provided, using fallback data');
      return fallbackData;
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    // Build proper populate based on actual Strapi schema
    let populateStrategy = '';

    if (endpoint.includes('services')) {
      // Services: populate what ServiceDetail page actually uses
      // Hero section (hero.hero-simple) for title/description
      // Base row sections with baseCards for "why choose us" content
      populateStrategy =
        'populate[content][on][hero.hero-simple][populate][heroBadge]=*' +
        '&populate[content][on][hero.hero-simple][populate][heroImage]=true' +
        '&populate[content][on][blocks.base-row][populate][badge]=*' +
        '&populate[content][on][blocks.base-row][populate][title]=*' +
        '&populate[content][on][blocks.base-row][populate][description]=*' +
        '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardBadge]=*' +
        '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardMedia]=true' +
        '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][page]=true' +
        '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][service]=true' +
        '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][solution]=true' +
        '&populate[seo][populate][ogImage]=true';
    } else if (endpoint.includes('pages')) {
      // Pages schema: section (dynamic zone) + seo component
      populateStrategy =
        'populate[section][on][hero.hero-simple][populate][heroBadge]=*' +
        '&populate[section][on][hero.hero-simple][populate][heroImage]=true' +
        '&populate[section][on][hero.hero-simple][populate][stats]=*' +
        '&populate[section][on][hero.hero-simple][populate][heroBtns]=*' +
        '&populate[section][on][hero.hero-full]=*' +
        '&populate[section][on][blocks.base-row][populate][badge]=*' +
        '&populate[section][on][blocks.base-row][populate][gallery]=*' +
        '&populate[section][on][blocks.base-row][populate][baseCards]=*' +
        '&populate[section][on][blocks.base-row][populate][socialLinks]=*' +
        '&populate[section][on][blocks.base-row][populate][statCards]=*' +
        '&populate[section][on][blocks.base-row][populate][testimonialCards]=*' +
        '&populate[section][on][blocks.base-row][populate][cta]=*' +
        '&populate[section][on][blocks.base-row][populate][CaseStudies]=*' +
        '&populate[section][on][blocks.base-row][populate][Faqs]=*' +
        '&populate[section][on][blocks.base-row][populate][button]=*' +
        '&populate[section][on][blocks.base-row][populate][link]=*' +
        '&populate[section][on][blocks.cta-section][populate][ctaBadge]=*' +
        '&populate[section][on][blocks.cta-section][populate][ctaButtons]=*' +
        '&populate[section][on][blocks.gallery-section]=*' +
        '&populate[section][on][cards.testimonial-card]=*' +
        '&populate[section][on][cards.stat]=*' +
        '&populate[section][on][cards.social-link]=*' +
        '&populate[section][on][cards.base-card]=*' +
        '&populate[section][on][cards.contact-info]=*' +
        '&populate[section][on][cards.newsletter-card]=*' +
        '&populate[section][on][cards.media-card]=*' +
        '&populate[section][on][cards.form]=*' +
        '&populate[section][on][cards.footer-menu]=*' +
        '&populate[section][on][cards.faq-card]=*' +
        '&populate[section][on][cards.cta-btn-card]=*' +
        '&populate[section][on][cards.case-studies-card]=*' +
        '&populate[section][on][shared.link]=*' +
        '&populate[section][on][shared.badge]=*' +
        '&populate[section][on][shared.seo]=*' +
        '&populate[section][on][shared.logo]=*' +
        '&populate[section][on][shared.gallery-image]=*' +
        '&populate[section][on][shared.form-fields]=*' +
        '&populate[section][on][shared.filter-pill]=*' +
        '&populate[section][on][shared.button]=*' +
        '&populate[seo][populate][ogImage]=true';
    } else if (endpoint.includes('products') || endpoint.includes('projects')) {
      // Projects schema similar to pages with section dynamic zone
      populateStrategy = 'populate=*';
    } else if (endpoint.includes('case-studies')) {
      populateStrategy = 'populate=*';
    } else {
      // Default: simple populate
      populateStrategy = 'populate=*';
    }

    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?${populateStrategy}${localeSuffix}`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Strapi v5: Data is flat (no attributes wrapper)
    if (Array.isArray(result.data)) {
      // Collection type - array of items
      return result.data as T;
    } else if (result.data) {
      // Single type - single object
      return result.data as T;
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
    if (!getStrapiToken()) {
      return localProducts.find(product => product.id === id);
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/solutions/${id}?populate=*${localeSuffix}`, {
      headers: getStrapiHeaders()
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
    if (!getStrapiToken()) {
      return localServices.find(service => service.id === id);
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    // Populate what ServiceDetail page actually uses
    const populateStr =
      'populate[content][on][hero.hero-simple][populate][heroBadge]=*' +
      '&populate[content][on][hero.hero-simple][populate][heroImage]=true' +
      '&populate[content][on][blocks.base-row][populate][badge]=*' +
      '&populate[content][on][blocks.base-row][populate][title]=*' +
      '&populate[content][on][blocks.base-row][populate][description]=*' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardBadge]=*' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardMedia]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][page]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][service]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][solution]=true' +
      '&populate[seo][populate][ogImage]=true';

    const response = await fetch(`${STRAPI_URL}/api/services/${id}?${populateStr}${localeSuffix}`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      // Silent fallback for 404 - content not in Strapi yet
      return localServices.find(service => service.id === id);
    }

    const result = await response.json();

    // Strapi v5: Data is flat (no attributes wrapper)
    return result.data;
  } catch (error) {
    // Silent fallback to local data
    return localServices.find(service => service.id === id);
  }
}

/**
 * Get a single service by slug from API or fallback to local data
 */
export async function getServiceBySlug(slug: string): Promise<ServiceProps | undefined> {
  try {
    if (!getStrapiToken()) {
      return localServices.find(service => service.slug === slug);
    }

    console.log('🔍 Fetching service by slug:', slug);

    // Use Strapi API with language param and slug filter
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    // Populate what ServiceDetail page actually uses
    const populateStr =
      'populate[content][on][hero.hero-simple][populate][heroBadge]=*' +
      '&populate[content][on][hero.hero-simple][populate][heroImage]=true' +
      '&populate[content][on][blocks.base-row][populate][badge]=*' +
      '&populate[content][on][blocks.base-row][populate][title]=*' +
      '&populate[content][on][blocks.base-row][populate][description]=*' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardBadge]=*' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardMedia]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][page]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][service]=true' +
      '&populate[content][on][blocks.base-row][populate][baseCards][populate][cardLink][populate][solution]=true' +
      '&populate[seo][populate][ogImage]=true';

    const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&${populateStr}${localeSuffix}`;
    console.log('📡 API URL:', url);

    const response = await fetch(url, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      console.warn(`⚠️ Service not found in Strapi for slug: ${slug}`);
      // Silent fallback for 404 - content not in Strapi yet
      return localServices.find(service => service.slug === slug);
    }

    const result = await response.json();
    console.log('✅ Strapi response:', result);

    // Return first match or fallback
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      console.log('✅ Found service in Strapi:', result.data[0].title);
      return result.data[0];
    }

    console.warn(`⚠️ Empty data from Strapi for slug: ${slug}, using fallback`);
    return localServices.find(service => service.slug === slug);
  } catch (error) {
    // Silent fallback to local data
    return localServices.find(service => service.slug === slug);
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
 * Maps from Strapi menu-items collection
 */
export async function getNavItems(): Promise<NavItem[]> {
  try {
    if (!getStrapiToken()) {
      return localNavItems;
    }

    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    // populate=deep doesn't work in Strapi v5, use populate=*
    const response = await fetch(`${STRAPI_URL}/api/menu-items?populate=*${localeSuffix}`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      return localNavItems;
    }

    const result = await response.json();

    if (!Array.isArray(result.data) || result.data.length === 0) {
      return localNavItems;
    }

    // Transform Strapi menu-items to NavItem format
    const transformMenuItem = (item: any, index: number): NavItem => {
      const menuLink = item.attributes?.menuLink?.[0] || item.menuLink?.[0];
      const label = menuLink?.label || item.attributes?.menuItemTitle || item.menuItemTitle || 'Untitled';

      // Generate URL from label (convert to lowercase, replace spaces with hyphens)
      const generateUrl = (text: string): string => {
        if (text === 'Home') return '/';
        return '/' + text.toLowerCase().replace(/\s+/g, '-');
      };

      const url = menuLink?.externalUrl || generateUrl(label);

      // Get children from menu_items relation
      const childrenData = item.attributes?.menu_items?.data || item.menu_items || [];
      const children = childrenData.length > 0
        ? childrenData.map((child: any, childIndex: number) => transformMenuItem(child, childIndex))
        : undefined;

      return {
        id: item.id || index,
        label,
        url: {
          url,
          openInNewTab: menuLink?.linkType === 'external'
        },
        order: item.attributes?.order || item.order || index,
        isButton: false,
        children
      };
    };

    return result.data.map(transformMenuItem);
  } catch (error) {
    console.warn('Error fetching navigation items:', error);
    return localNavItems;
  }
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
 * Get footer data from API
 * Fetches from global single type footer component
 */
export async function getFooter(): Promise<FooterProps> {
  try {
    if (!getStrapiToken()) {
      return footerData;
    }

    // Use wildcard population - Strapi v5 handles nested components automatically
    const response = await fetch(`${STRAPI_URL}/api/global?populate=*`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      // Content not published yet or doesn't exist - use fallback silently
      return footerData;
    }

    const result = await response.json();
    if (!result.data?.attributes?.footer) {
      return footerData;
    }

    const footer = result.data.attributes.footer;

    // Map Strapi footer structure to FooterProps
    return {
      companyDescription: footer.companyDescFooter || footerData.companyDescription,
      contactAddress: footer.companyContactInfo?.address || footerData.contactAddress,
      contactPhone: footer.companyContactInfo?.phone || footerData.contactPhone,
      contactEmail: footer.companyContactInfo?.email || footerData.contactEmail,
      contactSectionTitle: footer.companyContactInfo?.title || footerData.contactSectionTitle,
      columns: footer.FooterMenu?.map((menu: any, index: number) => ({
        id: index + 1,
        title: menu.footerMenuTitle || '',
        links: menu.footerMenuLink?.map((link: any) => ({
          title: link.linkText || '',
          url: link.linkUrl || '#',
          external: link.isExternal || false
        })) || []
      })) || footerData.columns,
      socialLinks: footerData.socialLinks, // Use fallback for now
      copyrightText: footer.legalFooter?.copyright || footerData.companyName,
      companyName: footerData.companyName,
      legalLinks: footer.legalFooter?.legalLink?.map((link: any) => ({
        title: link.linkText || '',
        url: link.linkUrl || '#',
        external: link.isExternal || false
      })) || footerData.legalLinks
    };
  } catch (error) {
    // Silent fallback - content not published in Strapi yet
    console.debug('Footer content not available from Strapi, using fallback');
    return footerData;
  }
}

/**
 * Get site configuration from API
 * Fetches from global-seo single type
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    if (!getStrapiToken()) {
      return defaultSiteConfig;
    }

    const response = await fetch(`${STRAPI_URL}/api/global-seo?populate=*`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      // Silently fall back to default config if collection doesn't exist
      return defaultSiteConfig;
    }

    const result = await response.json();
    if (!result.data) {
      return defaultSiteConfig;
    }

    const attrs = result.data.attributes;
    return {
      siteName: attrs.siteName || defaultSiteConfig.siteName,
      siteDescription: attrs.siteDescription || defaultSiteConfig.siteDescription,
      siteUrl: attrs.websiteUrl || defaultSiteConfig.siteUrl,
      contactEmail: attrs.contactEmail || defaultSiteConfig.contactEmail,
      contactPhone: defaultSiteConfig.contactPhone,
      contactAddress: defaultSiteConfig.contactAddress,
      logoLight: attrs.logoUrl || defaultSiteConfig.logoLight,
      logoDark: defaultSiteConfig.logoDark,
      favicon: defaultSiteConfig.favicon,
      erpNextUrl: defaultSiteConfig.erpNextUrl,
      erpNextApiKey: defaultSiteConfig.erpNextApiKey,
      erpNextApiSecret: defaultSiteConfig.erpNextApiSecret
    };
  } catch (error) {
    // Silent fallback - using default config
    return defaultSiteConfig;
  }
}

/**
 * Get language configuration from Strapi's native i18n plugin
 * The /api/i18n/locales endpoint is PUBLIC - no auth required
 */
export async function getLanguageConfig(): Promise<{
  supportedLanguages: string[];
  defaultLanguage: string;
  enabledTranslations: Record<string, any>;
}> {
  try {
    // Strapi's i18n locales endpoint is PUBLIC - no authorization needed
    const response = await fetch(`${STRAPI_URL}/api/i18n/locales`);

    if (!response.ok) {
      throw new Error(`Failed to fetch locales: ${response.status} ${response.statusText}`);
    }

    const locales = await response.json();

    if (!Array.isArray(locales) || locales.length === 0) {
      throw new Error('Invalid locales response');
    }

    const supportedLanguages = locales.map((locale: any) => locale.code);
    const defaultLocale = locales.find((locale: any) => locale.isDefault);

    return {
      supportedLanguages,
      defaultLanguage: defaultLocale?.code || 'en',
      enabledTranslations: {}
    };
  } catch (error) {
    console.error('Error fetching language config:', error);
    throw error;
  }
}

/**
 * Get translations for UI elements from Strapi
 */
export async function getUITranslations(language: string = currentLanguage): Promise<Record<string, any>> {
  try {
    if (!getStrapiToken()) {
      return {};
    }

    const response = await fetch(`${STRAPI_URL}/api/ui-translations?filters[language][$eq]=${language}&populate=*`, {
      headers: getStrapiHeaders()
    });

    if (!response.ok) {
      // Silent fallback - collection might not exist
      return {};
    }

    const result = await response.json();
    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      return {};
    }

    // Transform Strapi data to i18n format
    const translationData = result.data[0].attributes;
    return translationData.translations || {};
  } catch (error) {
    // Silent fallback
    return {};
  }
}

/**
 * Get page content by slug from Strapi API (legacy function - use getPageContent with language awareness)
 */
export async function getPageContentBySlug(slug: string): Promise<PageContent | null> {
  try {
    if (!getStrapiToken()) {
      return null;
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/page-contents?filters[slug][$eq]=${slug}&populate=*${localeSuffix}`, {
      headers: getStrapiHeaders()
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
        headers: getStrapiHeaders()
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
      { headers: getStrapiHeaders() }
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
      headers: getStrapiHeaders(),
      body: JSON.stringify(analyticsData)
    });
  } catch (error) {
    console.warn('Failed to track ad analytics:', error);
    // Don't throw error for analytics tracking failures
  }
}

/**
 * Get analytics configuration from Strapi CMS
 */
export async function getAnalyticsConfig(language?: string): Promise<any> {
  try {
    const apiUrl = STRAPI_URL;
    const apiToken = getStrapiToken();

    if (apiUrl && apiToken) {
      const lang = language || 'en';
      const response = await fetch(`${apiUrl}/api/analytics-config?locale=${lang}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data || null;
      }
      // Silent fail for 404 - collection doesn't exist
    }

    // Fallback configuration - minimal defaults when Strapi is unavailable
    return {
      enabled: false,
      debugMode: false,
      cookieConsent: true,
      dataRetentionDays: 365,
      anonymizeIP: true,
      googleAnalytics: {
        measurementId: '',
        enabled: false,
        enhancedEcommerce: false,
        customDimensions: [],
        customMetrics: []
      },
      facebookPixel: {
        pixelId: '',
        enabled: false,
        advancedMatching: false,
        automaticMatching: false,
        customEvents: []
      },
      matomo: {
        siteId: '1',
        url: '',
        enabled: false,
        trackSubdomains: false,
        cookieDomain: typeof window !== 'undefined' ? window.location.hostname : '',
        domains: typeof window !== 'undefined' ? [window.location.hostname] : []
      }
    };
  } catch (error) {
    console.warn('Error fetching analytics config:', error);
    return null;
  }
}
