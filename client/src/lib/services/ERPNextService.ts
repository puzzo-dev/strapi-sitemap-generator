/**
 * ERPNext Service Implementation
 * 
 * Extends BaseFormService and provides ERPNext-specific functionality.
 * Follows Single Responsibility and Open/Closed principles.
 */

import { BaseFormService, BaseCMSService } from './BaseService';
import { IFormSubmissionProvider, ILoggerService } from '@/lib/abstractions';
import { BlogPost, BlogCategory, ContactFormData, BookingFormData, TeamMember, JobListing } from '@/lib/types';

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
 * ERPNext employee interface (from ERPNext API)
 */
interface IERPNextEmployee {
  name: string;
  employee_name: string;
  designation: string;
  department: string;
  email: string;
  cell_number?: string;
  image?: string;
  status: 'Active' | 'Inactive' | 'Left';
  date_of_joining: string;
  employee_number: string;
  bio?: string;
  personal_email?: string;
  current_address?: string;
}

/**
 * ERPNext job opening interface (from ERPNext API)
 */
interface IERPNextJobOpening {
  name: string;
  job_title: string;
  department: string;
  designation: string;
  description: string;
  status: 'Open' | 'Closed';
  posted_on: string;
  application_deadline?: string;
  location?: string;
  employment_type?: string;
  experience?: string;
  qualifications?: string;
  responsibilities?: string;
  benefits?: string;
  salary_range?: string;
}

/**
 * ERPNext CMS Service
 * Handles ERPNext API communication
 */
export class ERPNextService extends BaseCMSService {
  public readonly name = 'ERPNext';
  protected erpNextConfig: IERPNextConfig | null = null;

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
  private async getERPNextConfig(): Promise<IERPNextConfig> {
    if (this.erpNextConfig) {
      return this.erpNextConfig;
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
      this.erpNextConfig = {
        baseUrl: data.data.attributes.baseUrl,
        apiKey: data.data.attributes.apiKey,
        apiSecret: data.data.attributes.apiSecret,
        siteName: data.data.attributes.siteName || 'I-Varse Technologies'
      };

      return this.erpNextConfig;
    } catch (error) {
      this.logger?.error('Failed to get ERPNext config', error as Error);
      throw error;
    }
  }

  /**
   * Get team members from ERPNext
   */
  public async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const config = await this.getERPNextConfig();
      const response = await fetch(`${config.baseUrl}/api/resource/Employee?filters=[["status","=","Active"]]`, {
        headers: {
          'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return (data.data || []).map((emp: IERPNextEmployee) => this.transformEmployeeToTeamMember(emp));
    } catch (error) {
      this.logger?.error('Failed to fetch team members', error as Error);
      return [];
    }
  }

  /**
   * Get team member by employee number
   */
  public async getTeamMemberByEmployeeNumber(employeeNumber: string): Promise<TeamMember | null> {
    try {
      const config = await this.getERPNextConfig();
      const response = await fetch(`${config.baseUrl}/api/resource/Employee/${employeeNumber}`, {
        headers: {
          'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.data ? this.transformEmployeeToTeamMember(data.data) : null;
    } catch (error) {
      this.logger?.error(`Failed to fetch team member ${employeeNumber}`, error as Error);
      return null;
    }
  }

  /**
   * Get job listings from ERPNext
   */
  public async getJobListings(): Promise<JobListing[]> {
    try {
      const config = await this.getERPNextConfig();
      const response = await fetch(`${config.baseUrl}/api/resource/Job Opening?filters=[["status","=","Open"]]`, {
        headers: {
          'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return (data.data || []).map((job: IERPNextJobOpening) => this.transformJobOpeningToJobListing(job));
    } catch (error) {
      this.logger?.error('Failed to fetch job listings', error as Error);
      return [];
    }
  }

  /**
   * Get job listing by ID
   */
  public async getJobListingById(jobId: string): Promise<JobListing | null> {
    try {
      const config = await this.getERPNextConfig();
      const response = await fetch(`${config.baseUrl}/api/resource/Job Opening/${jobId}`, {
        headers: {
          'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.data ? this.transformJobOpeningToJobListing(data.data) : null;
    } catch (error) {
      this.logger?.error(`Failed to fetch job listing ${jobId}`, error as Error);
      return null;
    }
  }

  /**
   * Override makeRequest to ensure config is loaded
   */
  protected async makeRequest<T>(endpoint: string, options: any): Promise<T> {
    await this.getERPNextConfig();
    return super.makeRequest<T>(`/api/resource/${endpoint}`, options);
  }

  public async isHealthy(): Promise<boolean> {
    try {
      const config = await this.getERPNextConfig();
      const response = await fetch(`${config.baseUrl}/api/resource/User`, {
        headers: {
          'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Transform ERPNext employee to TeamMember
   */
  private transformEmployeeToTeamMember(employee: IERPNextEmployee): TeamMember {
    return {
      id: employee.employee_number as any,
      name: employee.employee_name,
      position: employee.designation,
      role: employee.designation,
      bio: employee.bio || `${employee.employee_name} is a ${employee.designation} at I-Varse Technologies.`,
      description: `${employee.designation} specializing in ${employee.department}`,
      email: employee.email,
      phone: employee.cell_number,
      location: employee.current_address,
      joinDate: employee.date_of_joining,
      image: employee.image || '/assets/team/default-avatar.jpg',
      slug: employee.employee_name.toLowerCase().replace(/\s+/g, '-'),
      translationKey: employee.employee_name.toLowerCase().replace(/\s+/g, '-'),
      socialLinks: [],
      erpNextId: employee.name,
      erpNextStatus: employee.status.toLowerCase() as 'active' | 'inactive' | 'terminated',
      erpNextDepartment: employee.department
    };
  }

  /**
   * Transform ERPNext job opening to JobListing
   */
  private transformJobOpeningToJobListing(job: IERPNextJobOpening): JobListing {
    return {
      id: job.name as any,
      title: job.job_title,
      slug: job.job_title.toLowerCase().replace(/\s+/g, '-'),
      translationKey: job.job_title.toLowerCase().replace(/\s+/g, '-'),
      department: job.department,
      location: job.location || 'Remote',
      type: job.employment_type || 'Full-time',
      description: job.description,
      responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter(Boolean) : [],
      requirements: job.qualifications ? job.qualifications.split('\n').filter(Boolean) : [],
      benefits: job.benefits ? job.benefits.split('\n').filter(Boolean) : [],
      qualifications: job.qualifications ? job.qualifications.split('\n').filter(Boolean) : [],
      salary: job.salary_range || 'Competitive',
      featured: false,
      postedAt: job.posted_on,
      erpNextId: job.name,
      erpNextStatus: job.status.toLowerCase() as 'open' | 'closed' | 'draft'
    };
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
      id: post.name as any,
      name: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      title: post.title,
      slug: post.slug || post.name.toLowerCase().replace(/\s+/g, '-'),
      blogCategories: [{
        id: (post.blog_category || 'general') as any,
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
      id: category.name as any,
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
  private erpNextService: ERPNextService;

  constructor(service: ERPNextService, logger?: ILoggerService) {
    super(service, logger);
    this.erpNextService = service;
  }

  /**
   * Get ERPNext config
   */
  private async getConfig() {
    return (this.erpNextService as any).getERPNextConfig();
  }

  /**
   * HTTP GET method
   */
  private async get<T>(endpoint: string): Promise<T> {
    const config = await this.getConfig();
    const response = await fetch(`${config.baseUrl}/api/resource/${endpoint}`, {
      headers: {
        'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  /**
   * HTTP POST method
   */
  private async post<T>(endpoint: string, data: any): Promise<T> {
    const config = await this.getConfig();
    const response = await fetch(`${config.baseUrl}/api/resource/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
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
      const leadResponse = await this.post<{ data: { name: string } }>('Lead', leadData);

      // Create Event/Appointment
      const eventData = this.transformBookingToEvent(formData, leadResponse.data.name);
      await this.post('Event', eventData);

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
      company_name: (formData as any).company || 'Not Provided',
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
   * Transform ERPNext employee to TeamMember
   */
  private transformEmployeeToTeamMember(employee: IERPNextEmployee): TeamMember {
    return {
      id: employee.employee_number as any,
      name: employee.employee_name,
      position: employee.designation,
      role: employee.designation,
      bio: employee.bio || `${employee.employee_name} is a ${employee.designation} at I-Varse Technologies.`,
      description: `${employee.designation} specializing in ${employee.department}`,
      email: employee.email,
      phone: employee.cell_number,
      location: employee.current_address,
      joinDate: employee.date_of_joining,
      image: employee.image || '/assets/team/default-avatar.jpg',
      slug: employee.employee_name.toLowerCase().replace(/\s+/g, '-'),
      translationKey: employee.employee_name.toLowerCase().replace(/\s+/g, '-'),
      socialLinks: [],
      erpNextId: employee.name,
      erpNextStatus: employee.status.toLowerCase() as 'active' | 'inactive' | 'terminated',
      erpNextDepartment: employee.department
    };
  }

  /**
   * Transform ERPNext job opening to JobListing
   */
  private transformJobOpeningToJobListing(job: IERPNextJobOpening): JobListing {
    return {
      id: job.name as any,
      title: job.job_title,
      slug: job.job_title.toLowerCase().replace(/\s+/g, '-'),
      translationKey: job.job_title.toLowerCase().replace(/\s+/g, '-'),
      department: job.department,
      location: job.location || 'Remote',
      type: job.employment_type || 'Full-time',
      description: job.description,
      responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter(Boolean) : [],
      requirements: job.qualifications ? job.qualifications.split('\n').filter(Boolean) : [],
      benefits: job.benefits ? job.benefits.split('\n').filter(Boolean) : [],
      qualifications: job.qualifications ? job.qualifications.split('\n').filter(Boolean) : [],
      salary: job.salary_range || 'Competitive',
      featured: false,
      postedAt: job.posted_on,
      erpNextId: job.name,
      erpNextStatus: job.status.toLowerCase() as 'open' | 'closed' | 'draft',
      erpNextDepartment: job.department,
      erpNextLocation: job.location,
      erpNextType: job.employment_type,
      erpNextApplicationDeadline: job.application_deadline
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
 * ERPNext Team Data Source
 * Handles team member CRUD operations with ERPNext
 */
export class ERPNextTeamSource {
  constructor(
    private service: ERPNextService,
    private logger?: ILoggerService
  ) {}

  public async getAll(): Promise<TeamMember[]> {
    return this.service.getTeamMembers();
  }

  public async getById(id: string): Promise<TeamMember | null> {
    return this.service.getTeamMemberByEmployeeNumber(id);
  }

  public async getBySlug(slug: string): Promise<TeamMember | null> {
    try {
      const allMembers = await this.getAll();
      return allMembers.find(member => member.slug === slug) || null;
    } catch (error) {
      this.logger?.error(`Failed to fetch team member with slug ${slug}`, error as Error);
      return null;
    }
  }
}

/**
 * ERPNext Jobs Data Source
 * Handles job listing CRUD operations with ERPNext
 */
export class ERPNextJobsSource {
  constructor(
    private service: ERPNextService,
    private logger?: ILoggerService
  ) {}

  public async getAll(): Promise<JobListing[]> {
    return this.service.getJobListings();
  }

  public async getById(id: string): Promise<JobListing | null> {
    return this.service.getJobListingById(id);
  }

  public async getBySlug(slug: string): Promise<JobListing | null> {
    try {
      const allJobs = await this.getAll();
      return allJobs.find(job => job.slug === slug) || null;
    } catch (error) {
      this.logger?.error(`Failed to fetch job listing with slug ${slug}`, error as Error);
      return null;
    }
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
    forms: new ERPNextFormService(service, logger),
    team: new ERPNextTeamSource(service, logger),
    jobs: new ERPNextJobsSource(service, logger)
  };
}
