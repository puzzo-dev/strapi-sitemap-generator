/**
 * Strapi Service
 *
 * This service handles all communication with the Strapi CMS Backend.
 * 
 * IMPORTANT: Strapi Structure Overview
 * =====================================
 * 
 * Current Strapi Collections (exist in backend):
 * - services          → /api/services
 * - case-studies      → /api/case-studies
 * - projects          → /api/projects (used as products - no separate products collection)
 * - teams             → /api/teams
 * - industries        → /api/industries
 * - pages             → /api/pages
 * - menu-items        → /api/menu-items
 * - global (single)   → /api/global (contains header with client logos)
 * - global-seo (single) → /api/global-seo
 * 
 * Data Mapping:
 * - products          → Uses 'projects' collection (no separate products collection)
 * - testimonials      → Static items extracted from page/content components (cards.testimonial-card)
 * - faq-items         → Missing collection, returns empty (uses client fallback data)
 * - client-logos      → Extracted from global.header.siteLogo component
 * 
 * All collections use i18n for localization and dynamic content zones for flexible layouts.
 * 
 * Dynamic Content Components Available:
 * - hero.hero-simple, hero.hero-full
 * - cards.base-card, cards.testimonial-card, cards.stat, cards.social-link, cards.contact-info
 * - blocks.gallery-section, blocks.cta-section, blocks.base-row
 * - shared.link, shared.badge, shared.seo, shared.logo
 * 
 * To create missing collections in Strapi:
 * 1. Go to Content-Type Builder in Strapi admin
 * 2. Create Collection Type (e.g., "product", "testimonial", "faq-item", "client-logo")
 * 3. Add fields matching the interfaces in /client/src/lib/types/
 * 4. Enable i18n plugin for localization
 * 5. Update this service to fetch from the new endpoints
 */
import { ILoggerService, ICacheService } from '@/lib/abstractions';
import {
  PageContent,
  ProductProps,
  ServiceProps,
  TestimonialProps,
  TeamMember,
  CaseStudyProps,
  IndustryProps,
  JobListing,
  ClientLogo,
  FAQItem
} from '@/lib/types';
import { getSecret } from '@/lib/utils/credentials';
import { getCurrentLanguage } from '@/lib/strapi';

export class StrapiService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly logger?: ILoggerService;
  private readonly cache?: ICacheService;

  constructor(logger?: ILoggerService, cache?: ICacheService) {
    const secretBaseUrl = import.meta.env.PROD ? getSecret('STRAPI_API_URL') : undefined;
    const secretToken = import.meta.env.PROD ? getSecret('STRAPI_API_TOKEN') : undefined;
    this.baseUrl = secretBaseUrl || import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
    this.headers = {
      ...(secretToken || import.meta.env.VITE_STRAPI_API_TOKEN
        ? { 'Authorization': `Bearer ${secretToken || import.meta.env.VITE_STRAPI_API_TOKEN}` }
        : {}),
      'Content-Type': 'application/json',
    };
    this.logger = logger;
    this.cache = cache;
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Add locale parameter for localized content
    const locale = getCurrentLanguage();
    if (locale && locale !== 'en') {
      url.searchParams.append('locale', locale);
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const cacheKey = url.toString();
    if (this.cache) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        this.logger?.debug(`Cache hit for ${cacheKey}`);
        return cached;
      }
    }

    try {
      const response = await fetch(cacheKey, { headers: this.headers });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (this.cache) {
        this.cache.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes
      }
      return data;
    } catch (error) {
      this.logger?.error(`Request failed for ${cacheKey}`, error as Error);
      throw error;
    }
  }

  public async getPageBySlug(slug: string): Promise<PageContent | null> {
    const response = await this.makeRequest<{ data: any[] }>('/api/pages', {
      'filters[slug][$eq]': slug,
      'populate': '*'
    });
    const item = response.data?.[0];
    if (!item) return null;
    return {
      id: item.id,
      title: item.attributes?.title || '',
      description: item.attributes?.description || '',
      slug: item.attributes?.slug || '',
      metaTitle: item.attributes?.metaTitle || '',
      metaDescription: item.attributes?.metaDescription || '',
      sections: item.attributes?.sections || []
    };
  }

  public async getProducts(): Promise<ProductProps[]> {
    // Products are stored in the 'projects' collection in Strapi
    // There is no separate 'products' collection - projects serve as products
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/projects', {
        'populate': 'deep'
      });
      return response.data.map(item => {
        const attrs = item.attributes || {};
        return {
          id: item.id,
          title: attrs.title || '',
          slug: attrs.slug || '',
          translationKey: attrs.translationKey,
          description: attrs.description || '',
          image: attrs.content?.find((c: any) => c.__component === 'blocks.gallery-section')?.galleryImages?.[0] || '',
          keyFeatures: [],
          benefits: { id: 0, title: '', content: '', items: [] },
          industries: { id: 0, title: '', content: '', items: [] },
          casestudies: { id: 0, title: '', content: '', items: [] },
          faqs: { id: 0, title: '', content: '', items: [] },
          pricing: [],
          demoUrl: '',
          downloadUrl: '',
          supportUrl: '',
          category: [],
          tags: [],
          status: 'Active' as const
        };
      });
    } catch (error) {
      this.logger?.warn('Products/Projects not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getServices(): Promise<ServiceProps[]> {
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/services', {
        'populate': 'deep'
      });
      return response.data.map(item => {
        const attrs = item.attributes || {};
        // Extract image from content blocks if not directly available
        const heroBlock = attrs.content?.find((c: any) => c.__component === 'hero.hero-simple');
        const galleryBlock = attrs.content?.find((c: any) => c.__component === 'blocks.gallery-section');

        return {
          id: item.id,
          title: attrs.title || '',
          slug: attrs.slug || '',
          subtitle: heroBlock?.subtitle || '',
          description: attrs.description || '',
          fullDescription: attrs.description || '',
          benefits: { id: 0, title: '', content: '', items: [] },
          casestudies: { id: 0, title: '', content: '', items: [] },
          faqs: { id: 0, title: '', content: '', items: [] },
          icon: 'fa-cog',
          image: heroBlock?.backgroundImage || galleryBlock?.galleryImages?.[0] || undefined,
          seo: attrs.seo
        };
      });
    } catch (error) {
      this.logger?.warn('Services not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getTestimonials(): Promise<TestimonialProps[]> {
    // Testimonials collection doesn't exist - extract from pages or return empty
    // Testimonials are stored as components within dynamic content zones
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/pages', {
        'populate': 'deep'
      });

      const testimonials: TestimonialProps[] = [];

      // Extract testimonial cards from all pages
      response.data.forEach(page => {
        const content = page.attributes?.section || page.attributes?.content || [];
        content.forEach((block: any) => {
          if (block.__component === 'cards.testimonial-card') {
            testimonials.push({
              id: testimonials.length + 1,
              name: block.customerName || '',
              content: block.testimonial || '',
              rating: block.rating || 5,
              image: block.customerImage?.url || block.customerImage?.data?.attributes?.url,
              position: '',
              company: ''
            });
          }
        });
      });

      return testimonials;
    } catch (error) {
      this.logger?.warn('Testimonials not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getTeam(): Promise<TeamMember[]> {
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/teams', {
        'populate': 'deep'
      });
      return response.data.map(item => {
        const attrs = item.attributes || {};
        // Extract data from content blocks
        const heroBlock = attrs.content?.find((c: any) => c.__component === 'hero.hero-simple');
        const contactBlock = attrs.content?.find((c: any) => c.__component === 'cards.contact-info');
        const socialBlock = attrs.content?.find((c: any) => c.__component === 'cards.social-link');

        return {
          id: item.id,
          name: attrs.title || '',
          position: heroBlock?.subtitle || '',
          translationKey: attrs.translationKey,
          bio: attrs.description || '',
          role: heroBlock?.subtitle || '',
          image: heroBlock?.backgroundImage || '',
          slug: attrs.slug || '',
          description: attrs.description || '',
          email: contactBlock?.email,
          phone: contactBlock?.phone,
          location: contactBlock?.address,
          socialLinks: socialBlock ? [socialBlock] : [],
          seo: attrs.seo
        };
      });
    } catch (error) {
      this.logger?.warn('Team members not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getCaseStudies(): Promise<CaseStudyProps[]> {
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/case-studies', {
        'populate': 'deep'
      });
      return response.data.map(item => {
        const attrs = item.attributes || {};
        // Extract data from dynamic content
        const heroBlock = attrs.content?.find((c: any) => c.__component === 'hero.hero-simple');
        const statsBlock = attrs.content?.find((c: any) => c.__component === 'cards.stat');
        const galleryBlock = attrs.content?.find((c: any) => c.__component === 'blocks.gallery-section');
        const testimonialBlock = attrs.content?.find((c: any) => c.__component === 'cards.testimonial-card');

        return {
          id: item.id,
          title: attrs.title || '',
          slug: attrs.slug || '',
          translationKey: attrs.translationKey,
          description: attrs.description || '',
          image: heroBlock?.backgroundImage || galleryBlock?.galleryImages?.[0],
          client: '', // Not in current schema
          industry: attrs.industry || '',
          duration: '3 months',
          teamSize: 0, // Not in current schema
          status: 'completed' as const,
          challenge: '',
          solution: '',
          results: statsBlock ? [statsBlock] : [],
          technologies: [],
          timeline: [],
          testimonial: testimonialBlock,
          gallery: galleryBlock?.galleryImages || [],
          tags: [],
          featured: false,
          publishedDate: attrs.publishedAt || attrs.createdAt || new Date().toISOString(),
          seo: attrs.seo
        };
      });
    } catch (error) {
      this.logger?.warn('Case studies not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getIndustries(): Promise<IndustryProps[]> {
    try {
      const response = await this.makeRequest<{ data: any[] }>('/api/industries', {
        'populate': 'deep'
      });
      return response.data.map(item => {
        const attrs = item.attributes || {};
        const heroBlock = attrs.content?.find((c: any) => c.__component === 'hero.hero-simple');
        const statsBlock = attrs.content?.filter((c: any) => c.__component === 'cards.stat') || [];
        const cardsBlock = attrs.content?.filter((c: any) => c.__component === 'cards.base-card') || [];

        return {
          id: item.id,
          name: attrs.title || '',
          title: attrs.title || '',
          slug: attrs.slug || '',
          translationKey: attrs.translationKey,
          description: attrs.description || '',
          image: heroBlock?.backgroundImage,
          challenges: cardsBlock.map((c: any) => c.title).filter(Boolean),
          solutions: cardsBlock.map((c: any) => c.description).filter(Boolean),
          technologies: [],
          caseStudies: [],
          benefits: cardsBlock.map((c: any) => c.title).filter(Boolean),
          stats: statsBlock.map((s: any) => ({
            label: s.label || s.title,
            value: s.value || s.description
          })),
          featured: false,
          seo: attrs.seo
        };
      });
    } catch (error) {
      this.logger?.warn('Industries not found in Strapi, returning empty array');
      return [];
    }
  }

  public async getClientLogos(): Promise<ClientLogo[]> {
    // Client logos are stored in global.header.siteLogo component
    try {
      const response = await this.makeRequest<{ data: any }>('/api/global', {
        'populate': 'deep'
      });

      const header = response.data?.attributes?.header;
      const siteLogo = header?.siteLogo;

      if (!siteLogo) {
        this.logger?.warn('No site logo found in global.header, returning empty array');
        return [];
      }

      // Extract logo information from the siteLogo component
      const logos: ClientLogo[] = [];

      // Handle light logo
      if (siteLogo.logoImageLight?.data) {
        logos.push({
          id: 1,
          name: siteLogo.logoText || 'Company Logo (Light)',
          image: siteLogo.logoImageLight.data.attributes?.url || '',
          url: undefined
        });
      }

      // Handle dark logo
      if (siteLogo.logoImageDark?.data) {
        logos.push({
          id: 2,
          name: siteLogo.logoText || 'Company Logo (Dark)',
          image: siteLogo.logoImageDark.data.attributes?.url || '',
          url: undefined
        });
      }

      return logos;
    } catch (error) {
      this.logger?.warn('Failed to fetch client logos from global.header, returning empty array');
      return [];
    }
  }

  public async getFaqs(): Promise<FAQItem[]> {
    // FAQ items collection is the only missing collection in Strapi
    // This will use fallback data from client/src/lib/data/faq.ts
    // To enable Strapi FAQs: Create 'faq-item' collection in Strapi Content-Type Builder
    this.logger?.debug('FAQ items collection not found in Strapi, using fallback data.');
    return [];
  }
}


export const strapiService = new StrapiService();
