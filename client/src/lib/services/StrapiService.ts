/**
 * Strapi Service
 *
 * This service is responsible for all communication with the Strapi CMS.
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

export class StrapiService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly logger?: ILoggerService;
  private readonly cache?: ICacheService;

  constructor(logger?: ILoggerService, cache?: ICacheService) {
    this.baseUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
    this.headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
    this.logger = logger;
    this.cache = cache;
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
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
      'populate': 'deep'
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
    const response = await this.makeRequest<{ data: any[] }>('/api/products');
    return response.data.map(item => {
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
    });
  }
  
  
  public async getServices(): Promise<ServiceProps[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/services');
    return response.data.map(item => {
      const attrs = item.attributes || {};
      return {
        id: item.id,
        title: attrs.title || '',
        slug: attrs.slug || '',
        subtitle: attrs.subtitle || '',
        description: attrs.description || '',
        fullDescription: attrs.fullDescription || '',
        benefits: attrs.benefits || { id: 0, title: '', content: '', items: [] },
        casestudies: attrs.casestudies || { id: 0, title: '', content: '', items: [] },
        faqs: attrs.faqs || { id: 0, title: '', content: '', items: [] },
        icon: attrs.icon || 'fa-cog',
        image: attrs.image?.data?.attributes?.url || attrs.image
      };
    });
  }

  public async getTestimonials(): Promise<TestimonialProps[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/testimonials');
    return response.data.map(item => {
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
    });
  }

  public async getTeam(): Promise<TeamMember[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/team-members');
    return response.data.map(item => {
      const attrs = item.attributes || {};
      return {
        id: item.id,
        name: attrs.name || '',
        position: attrs.position || '',
        translationKey: attrs.translationKey,
        bio: attrs.bio || '',
        role: attrs.role || attrs.position || '',
        image: attrs.image?.data?.attributes?.url || '',
        slug: attrs.slug || '',
        description: attrs.description || '',
        email: attrs.email,
        phone: attrs.phone,
        location: attrs.location,
        joinDate: attrs.joinDate,
        socialLinks: attrs.socialLinks || [],
        projects: attrs.projects,
        relatedTeamMembers: attrs.relatedTeamMembers
      };
    });
  }

  public async getCaseStudies(): Promise<CaseStudyProps[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/case-studies');
    return response.data.map(item => {
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
        duration: attrs.duration || '3 months',
        status: attrs.status || 'completed',
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
        publishedDate: attrs.publishedAt || new Date().toISOString()
      };
    });
  }

  public async getIndustries(): Promise<IndustryProps[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/industries');
    return response.data.map(item => {
      const attrs = item.attributes || {};
      return {
        id: item.id,
        name: attrs.name || attrs.title || '',
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
    });
  }

  public async getJobs(): Promise<JobListing[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/job-listings');
    return response.data.map(item => {
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
        qualifications: attrs.qualifications || [],
        skills: attrs.skills || [],
        applicationDeadline: attrs.applicationDeadline,
        isActive: attrs.isActive !== false,
        featured: attrs.featured || false,
        postedAt: attrs.postedAt || new Date().toISOString()
      };
    });
  }

  public async getClientLogos(): Promise<ClientLogo[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/client-logos');
    return response.data.map(item => {
      const attrs = item.attributes || {};
      return {
        id: item.id,
        name: attrs.name || '',
        translationKey: attrs.translationKey,
        image: attrs.image?.data?.attributes?.url || '',
        url: attrs.url ? { url: attrs.url, isExternal: true } : undefined
      };
    });
  }

  public async getFaqs(): Promise<FAQItem[]> {
    const response = await this.makeRequest<{ data: any[] }>('/api/faq-items');
    return response.data.map(item => {
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
    });
  }
}


export const strapiService = new StrapiService();
