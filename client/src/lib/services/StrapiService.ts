/**
 * Strapi Service Implementation
 * 
 * Extends BaseCMSService to provide Strapi-specific functionality.
 * Follows Single Responsibility and Open/Closed principles.
 */

import { BaseCMSService, BaseDataSource } from './BaseService';
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

/**
 * Strapi CMS Service
 * Implements Strapi-specific API communication
 */
export class StrapiService extends BaseCMSService {
  public readonly name = 'Strapi';

  constructor(logger?: ILoggerService, cache?: ICacheService) {
    const config = {
      baseUrl: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337',
      timeout: 10000,
      retries: 2,
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      }
    };

    super(config, logger, cache);
  }

  public async isHealthy(): Promise<boolean> {
    try {
      await this.get('/api/users/me');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get language configuration
   */
  public async getLanguageConfig(): Promise<any> {
    return this.get('/api/language-config');
  }

  /**
   * Get UI translations for a specific language
   */
  public async getUITranslations(language: string): Promise<any> {
    return this.get('/api/ui-translations', { language });
  }

  /**
   * Get site configuration
   */
  public async getSiteConfig(): Promise<any> {
    return this.get('/api/site-config');
  }
}

/**
 * Strapi Page Content Data Source
 * Handles page content CRUD operations
 */
export class StrapiPageContentSource extends BaseDataSource<PageContent> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/pages', logger);
  }

  public async getBySlug(slug: string): Promise<PageContent | null> {
    try {
      const response = await this.service.get<{ data: PageContent[] }>('/api/pages', {
        'filters[slug][$eq]': slug,
        'populate': 'deep'
      });
      
      return response.data?.[0] ? this.transformItem(response.data[0]) : null;
    } catch (error) {
      this.logger?.error(`Failed to fetch page with slug ${slug}`, error as Error);
      return null;
    }
  }

  protected transformItem(item: any): PageContent {
    return {
      id: item.id,
      title: item.attributes?.title || '',
      slug: item.attributes?.slug || '',
      metaTitle: item.attributes?.metaTitle || '',
      metaDescription: item.attributes?.metaDescription || '',
      sections: item.attributes?.sections || []
    };
  }
}

/**
 * Strapi Products Data Source
 */
export class StrapiProductsSource extends BaseDataSource<ProductProps> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/products', logger);
  }

  protected transformItem(item: any): ProductProps {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      title: attrs.title || '',
      slug: attrs.slug || '',
      translationKey: attrs.translationKey,
      description: attrs.description || '',
      image: attrs.image?.data?.attributes?.url,
      keyFeatures: attrs.keyFeatures || [],
      benefits: attrs.benefits || { id: 0, title: '', content: '', items: [] },
      industries: attrs.industries || { id: 0, title: '', content: '', items: [] },
      casestudies: attrs.casestudies || { id: 0, title: '', content: '', items: [] },
      faqs: attrs.faqs || { id: 0, title: '', content: '', items: [] },
      pricing: attrs.pricing || [],
      demoUrl: attrs.demoUrl || '',
      downloadUrl: attrs.downloadUrl || '',
      supportUrl: attrs.supportUrl || '',
      category: attrs.category || [],
      tags: attrs.tags || [],
      status: attrs.status || 'Active'
    };
  }
}

/**
 * Strapi Services Data Source
 */
export class StrapiServicesSource extends BaseDataSource<ServiceProps> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/services', logger);
  }

  protected transformItem(item: any): ServiceProps {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      title: attrs.title || '',
      slug: attrs.slug || '',
      translationKey: attrs.translationKey,
      description: attrs.description || '',
      image: attrs.image?.data?.attributes?.url,
      features: attrs.features || [],
      technologies: attrs.technologies || [],
      process: attrs.process || { id: 0, title: '', content: '', items: [] },
      benefits: attrs.benefits || { id: 0, title: '', content: '', items: [] },
      caseStudies: attrs.caseStudies || [],
      pricing: attrs.pricing || [],
      category: attrs.category || [],
      tags: attrs.tags || []
    };
  }
}

/**
 * Strapi Testimonials Data Source
 */
export class StrapiTestimonialsSource extends BaseDataSource<TestimonialProps> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/testimonials', logger);
  }

  protected transformItem(item: any): TestimonialProps {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      name: attrs.name || '',
      content: attrs.content || '',
      translationKey: attrs.translationKey,
      rating: attrs.rating || 5,
      image: attrs.image?.data?.attributes?.url || attrs.avatar,
      avatar: attrs.avatar, // Legacy support
      position: attrs.position,
      company: attrs.company
    };
  }
}

/**
 * Strapi Team Members Data Source
 */
export class StrapiTeamSource extends BaseDataSource<TeamMember> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/team-members', logger);
  }

  protected transformItem(item: any): TeamMember {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      name: attrs.name || '',
      position: attrs.position || '',
      bio: attrs.bio || '',
      image: attrs.image?.data?.attributes?.url || '',
      email: attrs.email,
      phone: attrs.phone,
      socialLinks: attrs.socialLinks || [],
      skills: attrs.skills || [],
      experience: attrs.experience || '',
      education: attrs.education || [],
      certifications: attrs.certifications || [],
      languages: attrs.languages || []
    };
  }
}

/**
 * Strapi Case Studies Data Source
 */
export class StrapiCaseStudiesSource extends BaseDataSource<CaseStudyProps> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/case-studies', logger);
  }

  protected transformItem(item: any): CaseStudyProps {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      title: attrs.title || '',
      slug: attrs.slug || '',
      translationKey: attrs.translationKey,
      description: attrs.description || '',
      image: attrs.image?.data?.attributes?.url,
      client: attrs.client || '',
      industry: attrs.industry || '',
      challenge: attrs.challenge || '',
      solution: attrs.solution || '',
      results: attrs.results || [],
      technologies: attrs.technologies || [],
      timeline: attrs.timeline || '',
      teamSize: attrs.teamSize,
      testimonial: attrs.testimonial,
      gallery: attrs.gallery || [],
      tags: attrs.tags || [],
      featured: attrs.featured || false,
      publishedAt: attrs.publishedAt || new Date().toISOString()
    };
  }
}

/**
 * Strapi Industries Data Source
 */
export class StrapiIndustriesSource extends BaseDataSource<IndustryProps> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/industries', logger);
  }

  protected transformItem(item: any): IndustryProps {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      title: attrs.title || '',
      slug: attrs.slug || '',
      translationKey: attrs.translationKey,
      description: attrs.description || '',
      image: attrs.image?.data?.attributes?.url,
      challenges: attrs.challenges || [],
      solutions: attrs.solutions || [],
      technologies: attrs.technologies || [],
      caseStudies: attrs.caseStudies || [],
      benefits: attrs.benefits || [],
      stats: attrs.stats || [],
      featured: attrs.featured || false
    };
  }
}

/**
 * Strapi Job Listings Data Source
 */
export class StrapiJobsSource extends BaseDataSource<JobListing> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/job-listings', logger);
  }

  protected transformItem(item: any): JobListing {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      title: attrs.title || '',
      slug: attrs.slug || '',
      translationKey: attrs.translationKey,
      department: attrs.department || '',
      location: attrs.location || '',
      type: attrs.type || 'Full-time',
      experience: attrs.experience || '',
      salary: attrs.salary,
      description: attrs.description || '',
      requirements: attrs.requirements || [],
      responsibilities: attrs.responsibilities || [],
      benefits: attrs.benefits || [],
      skills: attrs.skills || [],
      applicationDeadline: attrs.applicationDeadline,
      isActive: attrs.isActive !== false,
      featured: attrs.featured || false,
      postedAt: attrs.postedAt || new Date().toISOString()
    };
  }
}

/**
 * Strapi Client Logos Data Source
 */
export class StrapiClientLogosSource extends BaseDataSource<ClientLogo> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/client-logos', logger);
  }

  protected transformItem(item: any): ClientLogo {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      name: attrs.name || '',
      translationKey: attrs.translationKey,
      image: attrs.image?.data?.attributes?.url || '',
      url: attrs.url ? { href: attrs.url, external: true } : undefined
    };
  }
}

/**
 * Strapi FAQ Items Data Source
 */
export class StrapiFAQSource extends BaseDataSource<FAQItem> {
  constructor(service: StrapiService, logger?: ILoggerService) {
    super(service, '/api/faq-items', logger);
  }

  protected transformItem(item: any): FAQItem {
    const attrs = item.attributes || {};
    return {
      id: item.id,
      question: attrs.question || '',
      answer: attrs.answer || '',
      translationKey: attrs.translationKey,
      category: attrs.category || 'General',
      order: attrs.order || 0,
      featured: attrs.featured || false
    };
  }
}

/**
 * Factory function to create all Strapi data sources
 * Follows Dependency Inversion Principle
 */
export function createStrapiDataSources(logger?: ILoggerService, cache?: ICacheService) {
  const service = new StrapiService(logger, cache);

  return {
    service,
    pages: new StrapiPageContentSource(service, logger),
    products: new StrapiProductsSource(service, logger),
    services: new StrapiServicesSource(service, logger),
    testimonials: new StrapiTestimonialsSource(service, logger),
    team: new StrapiTeamSource(service, logger),
    caseStudies: new StrapiCaseStudiesSource(service, logger),
    industries: new StrapiIndustriesSource(service, logger),
    jobs: new StrapiJobsSource(service, logger),
    clientLogos: new StrapiClientLogosSource(service, logger),
    faqs: new StrapiFAQSource(service, logger)
  };
}
