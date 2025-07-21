/**
 * ERPNext Service Implementation
 * 
 * Extends BaseFormService and provides ERPNext-specific functionality.
 * Follows Single Responsibility and Open/Closed principles.
 */

import { BaseFormService, BaseCMSService } from './BaseService';
import { IFormSubmissionProvider, ILoggerService } from '@/lib/abstractions';
import { BlogPost, BlogCategory, ContactFormData, BookingFormData } from '@/lib/types';

/**
 * ERPNext configuration interface
 */
interface IERPNextConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  siteName: string;
}

/**
 * ERPNext blog post interface (from ERPNext API)
 */
interface IERPNextBlogPost {
  name: string;
  title: string;
  slug: string;
  content_html: string;
  meta_description: string;
  meta_image: string;
  published: number;
  featured: number;
  blog_category: string;
  blogger: string;
  published_on: string;
  tags: string;
  blog_intro: string;
  meta_title: string;
  route: string;
}

/**
 * ERPNext blog category interface
 */
interface IERPNextBlogCategory {
  name: string;
  title: string;
  description: string;
  route: string;
}

/**
 * ERPNext CMS Service
 * Handles ERPNext API communication
 */
export class ERPNextService extends BaseCMSService {
  public readonly name = 'ERPNext';
  private config: IERPNextConfig | null = null;

  constructor(logger?: ILoggerService) {
    // Initial config - will be updated with actual credentials
    const initialConfig = {
      baseUrl: 'https://your-erpnext-instance.com',
      timeout: 15000,
      retries: 3,
      headers: {}
    };

    super(initialConfig, logger);
  }

  /**
   * Get ERPNext configuration from Strapi (secure approach)
   */
  private async getConfig(): Promise<IERPNextConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_STRAPI_API_URL}/api/erpnext-credentials`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ERPNext credentials');
      }

      const data = await response.json();
      this.config = {
        baseUrl: data.data.attributes.baseUrl,
        apiKey: data.data.attributes.apiKey,
        apiSecret: data.data.attributes.apiSecret,
        siteName: data.data.attributes.siteName || 'I-Varse Technologies'
      };

      // Update the service configuration
      (this as any).config = {
        ...this.config,
        baseUrl: this.config.baseUrl,
        timeout: 15000,
        retries: 3,
        headers: {
          'Authorization': `token ${this.config.apiKey}:${this.config.apiSecret}`,
        }
      };

      return this.config;
    } catch (error) {
      this.logger?.error('Failed to get ERPNext config', error as Error);
      throw error;
    }
  }

  /**
   * Override makeRequest to ensure config is loaded
   */
  protected async makeRequest<T>(endpoint: string, options: any): Promise<T> {
    await this.getConfig();
    return super.makeRequest<T>(`/api/resource/${endpoint}`, options);
  }

  public async isHealthy(): Promise<boolean> {
    try {
      await this.get('User');
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * ERPNext Blog Service
 * Handles blog-specific operations
 */
export class ERPNextBlogService {
  constructor(
    private readonly service: ERPNextService,
    private readonly logger?: ILoggerService
  ) {}

  /**
   * Get all blog posts
   */
  public async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await this.service.get<{ data: IERPNextBlogPost[] }>('Blog Post');
      return response.data.map(post => this.transformBlogPost(post));
    } catch (error) {
      this.logger?.error('Failed to fetch blog posts from ERPNext', error as Error);
      return [];
    }
  }

  /**
   * Get single blog post by slug
   */
  public async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await this.service.get<{ data: IERPNextBlogPost[] }>('Blog Post', {
        'filters': `[["route","=","/${slug}"]]`
      });

      return response.data?.[0] ? this.transformBlogPost(response.data[0]) : null;
    } catch (error) {
      this.logger?.error(`Failed to fetch blog post ${slug} from ERPNext`, error as Error);
      return null;
    }
  }

  /**
   * Get blog categories
   */
  public async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await this.service.get<{ data: IERPNextBlogCategory[] }>('Blog Category');
      return response.data.map(category => this.transformBlogCategory(category));
    } catch (error) {
      this.logger?.error('Failed to fetch blog categories from ERPNext', error as Error);
      return [];
    }
  }

  /**
   * Transform ERPNext blog post to our interface
   */
  private transformBlogPost(post: IERPNextBlogPost): BlogPost {
    return {
      id: post.name,
      name: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      title: post.title,
      slug: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      blogCategories: [{
        id: post.blog_category || 'general',
        name: post.blog_category || 'General',
        slug: post.blog_category?.toLowerCase() || 'general',
        description: '',
        title: post.blog_category || 'General'
      }],
      blogIntro: post.blog_intro || '',
      content: post.content_html || '',
      publishedAt: post.published_on || new Date().toISOString(),
      published: post.published === 1,
      featured: post.featured === 1,
      metaImage: post.meta_image,
      metaTitle: post.meta_title || post.title,
      metaDescription: post.meta_description || '',
      readTime: Math.ceil((post.content_html?.split(' ').length || 0) / 200),
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
      authorDetails: {
        fullName: post.blogger || 'I-Varse Team',
        userImage: '/assets/team/default-avatar.jpg',
        bio: 'Content creator at I-Varse Technologies'
      },
      author: post.blogger || 'admin'
    };
  }

  /**
   * Transform ERPNext blog category to our interface
   */
  private transformBlogCategory(category: IERPNextBlogCategory): BlogCategory {
    return {
      id: category.name,
      name: category.name,
      title: category.title,
      slug: category.route?.replace('/', '') || category.name.toLowerCase(),
      description: category.description || ''
    };
  }
}

/**
 * ERPNext Form Submission Service
 * Implements IFormSubmissionProvider
 */
export class ERPNextFormService extends BaseFormService implements IFormSubmissionProvider {
  public readonly name = 'ERPNext';

  constructor(service: ERPNextService, logger?: ILoggerService) {
    super(service, logger);
  }

  /**
   * Submit contact form as Lead
   */
  public async submitContact(formData: ContactFormData): Promise<boolean> {
    return this.submitForm('Lead', formData, this.transformContactData);
  }

  /**
   * Submit appointment booking as Event
   */
  public async submitBooking(formData: BookingFormData): Promise<boolean> {
    try {
      // Create Lead first
      const leadData = this.transformBookingToLead(formData);
      const leadResponse = await this.service.post<{ data: { name: string } }>('Lead', leadData);

      // Create Event/Appointment
      const eventData = this.transformBookingToEvent(formData, leadResponse.data.name);
      await this.service.post('Event', eventData);

      this.logger?.info('Appointment booking submitted successfully');
      return true;
    } catch (error) {
      this.logger?.error('Failed to submit appointment booking', error as Error);
      return false;
    }
  }

  /**
   * Submit newsletter subscription
   */
  public async submitNewsletter(email: string): Promise<boolean> {
    return this.submitForm('Email Group Member', { email }, (data) => ({
      email: data.email,
      enabled: 1
    }));
  }

  /**
   * Submit job application
   */
  public async submitJobApplication(formData: any): Promise<boolean> {
    return this.submitForm('Job Applicant', formData, this.transformJobApplicationData);
  }

  /**
   * Transform contact form data to ERPNext Lead format
   */
  private transformContactData(formData: ContactFormData) {
    return {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      company_name: formData.company || 'Not Provided',
      source: 'Website Contact Form',
      status: 'Lead',
      request_type: formData.requestType || 'General Inquiry',
      notes: formData.message,
      lead_owner: 'Administrator'
    };
  }

  /**
   * Transform booking data to ERPNext Lead format
   */
  private transformBookingToLead(formData: BookingFormData) {
    return {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      source: 'Website Appointment Booking',
      status: 'Open',
      notes: formData.message
    };
  }

  /**
   * Transform booking data to ERPNext Event format
   */
  private transformBookingToEvent(formData: BookingFormData, leadName: string) {
    return {
      subject: `Appointment: ${formData.topic}`,
      event_type: 'Public',
      starts_on: `${formData.date} ${formData.time}:00`,
      ends_on: `${formData.date} ${formData.time}:00`,
      description: formData.message,
      event_participants: [
        {
          reference_doctype: 'Lead',
          reference_docname: leadName,
          email: formData.email
        }
      ]
    };
  }

  /**
   * Transform job application data to ERPNext format
   */
  private transformJobApplicationData(formData: any) {
    return {
      applicant_name: formData.fullName,
      email_id: formData.email,
      phone_number: formData.phone,
      job_title: formData.position,
      notes: formData.coverLetter,
      status: 'Open',
      source: 'Website'
    };
  }
}

/**
 * Factory function to create ERPNext services
 * Follows Dependency Inversion Principle
 */
export function createERPNextServices(logger?: ILoggerService) {
  const service = new ERPNextService(logger);
  
  return {
    service,
    blog: new ERPNextBlogService(service, logger),
    forms: new ERPNextFormService(service, logger)
  };
}
