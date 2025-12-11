/**
 * ERPNext Service
 *
 * This service is responsible for all communication with the ERPNext instance.
 */
import {
  BlogPost,
  BlogCategory,
  ContactFormData,
  DemoRequestFormData,
  TeamMember,
  JobListing
} from '@/lib/types';

interface ERPNextConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
}

export class ERPNextService {
  private config: ERPNextConfig | null = null;

  // Provide grouped accessors that match existing hook usage patterns
  public blog = {
    getAllPosts: () => this.getAllBlogPosts(),
    getPost: (slug: string) => this.getBlogPost(slug),
    getCategories: () => this.getBlogCategories()
  };

  public team = {
    // ERPNext endpoints for team members are not defined yet; return empty arrays to keep UI stable
    getAll: async () => [] as TeamMember[],
    getBySlug: async (_slug: string) => null as TeamMember | null
  };

  public jobs = {
    getAll: async () => [] as JobListing[],
    getBySlug: async (_slug: string) => null as JobListing | null
  };

  public service = {
    isHealthy: async () => true
  };

  private async getConfig(): Promise<ERPNextConfig> {
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
      };

      return this.config;
    } catch (error) {
      console.error('Failed to get ERPNext config', error as Error);
      throw error;
    }
  }

  private async makeRequest<T>(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<T> {
    const config = await this.getConfig();
    const response = await fetch(`${config.baseUrl}/api/resource/${endpoint}`, {
      method,
      headers: {
        'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  public async getAllBlogPosts(): Promise<BlogPost[]> {
    const response = await this.makeRequest<{ data: any[] }>('Blog Post');
    return response.data.map(this.transformBlogPost);
  }

  public async getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await this.makeRequest<{ data: any[] }>('Blog Post', 'GET', {
      filters: `[["route","=","/${slug}"]]`
    });
    const post = response.data?.[0];
    return post ? this.transformBlogPost(post) : null;
  }

  public async getBlogCategories(): Promise<BlogCategory[]> {
    const response = await this.makeRequest<{ data: any[] }>('Blog Category');
    return response.data.map(this.transformBlogCategory);
  }

  public async submitContactForm(formData: ContactFormData): Promise<boolean> {
    const leadData = {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      company_name: 'Not Provided',
      source: 'Website Contact Form',
      status: 'Lead',
      request_type: formData.requestType || 'General Inquiry',
      notes: formData.message,
      lead_owner: 'Administrator'
    };
    await this.makeRequest('Lead', 'POST', leadData);
    return true;
  }

  public async submitDemoRequest(formData: DemoRequestFormData): Promise<boolean> {
    const leadData = {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      source: 'Website Demo Request',
      status: 'Open',
      notes: formData.message
    };
    const leadResponse = await this.makeRequest<{ data: { name: string } }>('Lead', 'POST', leadData);

    const eventData = {
      subject: `Demo Request: ${formData.topic}`,
      event_type: 'Public',
      starts_on: `${formData.date} ${formData.time}:00`,
      ends_on: `${formData.date} ${formData.time}:00`,
      description: formData.message,
      event_participants: [{
        reference_doctype: 'Lead',
        reference_docname: leadResponse.data.name,
        email: formData.email
      }]
    };
    await this.makeRequest('Event', 'POST', eventData);
    return true;
  }

  private transformBlogPost(post: any): BlogPost {
    return {
      id: post.name,
      name: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      title: post.title,
      slug: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      blogCategories: [{
        id: (post.blog_category || 'general'),
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
      tags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : [],
      authorDetails: {
        fullName: post.blogger || 'I-Varse Team',
        userImage: '/assets/team/default-avatar.jpg',
        bio: 'Content creator at I-Varse Technologies'
      },
      author: post.blogger || 'admin'
    };
  }

  private transformBlogCategory(category: any): BlogCategory {
    return {
      id: category.name,
      name: category.name,
      title: category.title,
      slug: category.route?.replace('/', '') || category.name.toLowerCase(),
      description: category.description || ''
    };
  }
}

export const erpNextService = new ERPNextService();
