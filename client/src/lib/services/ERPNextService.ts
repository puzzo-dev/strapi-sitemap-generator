/**
 * ERPNext Service
 *
 * This service is responsible for all communication with the ERPNext instance.
 */
import {
  submitContactForm,
  submitDemoRequest,
  getERPNextBlogPosts,
  getERPNextBlogPost,
  getERPNextBlogCategories,
  getERPNextJobListing,
  getERPNextJobListings,
  getERPNextTeamMember,
  getERPNextTeamMembers,
  checkERPNextHealth
} from '@/lib/erpnext';
import {
  BlogPost,
  BlogCategory,
  ContactFormData,
  DemoRequestFormData
} from '@/lib/types';

export class ERPNextService {
  // Grouped accessors maintained for compatibility with existing hooks
  public blog = {
    getAllPosts: () => this.getAllBlogPosts(),
    getPost: (slug: string) => this.getBlogPost(slug),
    getCategories: () => this.getBlogCategories()
  };

  public team = {
    getAll: () => getERPNextTeamMembers(),
    getBySlug: (slug: string) => getERPNextTeamMember(slug)
  };

  public jobs = {
    getAll: () => getERPNextJobListings(),
    getBySlug: (slug: string) => getERPNextJobListing(slug)
  };

  public service = {
    isHealthy: () => checkERPNextHealth()
  };

  public async getAllBlogPosts(): Promise<BlogPost[]> {
    return getERPNextBlogPosts();
  }

  public async getBlogPost(slug: string): Promise<BlogPost | null> {
    return getERPNextBlogPost(slug);
  }

  public async getBlogCategories(): Promise<BlogCategory[]> {
    return getERPNextBlogCategories();
  }

  public async submitContactForm(formData: ContactFormData): Promise<boolean> {
    await submitContactForm(formData);
    return true;
  }

  public async submitDemoRequest(formData: DemoRequestFormData): Promise<boolean> {
    await submitDemoRequest(formData);
    return true;
  }
}

export const erpNextService = new ERPNextService();
