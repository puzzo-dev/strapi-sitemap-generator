/**
 * ERPNext Integration
 * 
 * This file handles all ERPNext API calls for:
 * - Blog management
 * - Contact form submissions
 * - Appointment bookings
 * - Lead management
 */

import { BlogPost, BlogCategory, ContactFormData, BookingFormData } from '@/lib/types';
import { withFallback, getContentList } from '@/lib/fallbacks';

// =============================================================================
// ERPNEXT CONFIGURATION
// =============================================================================

interface ERPNextConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  siteName: string;
}

// Get credentials from Strapi (secured approach)
let erpNextConfig: ERPNextConfig | null = null;

async function getERPNextConfig(): Promise<ERPNextConfig> {
  if (erpNextConfig) {
    return erpNextConfig;
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
    erpNextConfig = {
      baseUrl: data.data.attributes.baseUrl,
      apiKey: data.data.attributes.apiKey,
      apiSecret: data.data.attributes.apiSecret,
      siteName: data.data.attributes.siteName || 'I-Varse Technologies'
    };

    return erpNextConfig;
  } catch (error) {
    console.error('Failed to get ERPNext config:', error);
    throw error;
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

async function makeERPNextRequest(
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> {
  const config = await getERPNextConfig();
  
  const url = `${config.baseUrl}/api/resource/${endpoint}`;
  
  const headers = {
    'Authorization': `token ${config.apiKey}:${config.apiSecret}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// =============================================================================
// BLOG MANAGEMENT (ERPNext)
// =============================================================================

export interface ERPNextBlogPost {
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

export interface ERPNextBlogCategory {
  name: string;
  title: string;
  description: string;
  route: string;
}

/**
 * Fetch all blog posts from ERPNext
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await makeERPNextRequest('Blog Post', {
      method: 'GET'
    });

    const posts = response.data.map(transformERPNextBlogPost);
    return getContentList(posts, 'blogs');
  } catch (error) {
    console.error('Failed to fetch blog posts from ERPNext:', error);
    return getContentList(null, 'blogs');
  }
}

/**
 * Fetch a single blog post by slug from ERPNext
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await makeERPNextRequest(`Blog Post?filters=[["route","=","/${slug}"]]`, {
      method: 'GET'
    });

    if (response.data && response.data.length > 0) {
      return transformERPNextBlogPost(response.data[0]);
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug} from ERPNext:`, error);
    return null;
  }
}

/**
 * Fetch blog categories from ERPNext
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const response = await makeERPNextRequest('Blog Category', {
      method: 'GET'
    });

    return response.data.map((category: ERPNextBlogCategory) => ({
      id: category.name,
      name: category.name,
      title: category.title,
      slug: category.route?.replace('/', '') || category.name.toLowerCase(),
      description: category.description || ''
    }));
  } catch (error) {
    console.error('Failed to fetch blog categories from ERPNext:', error);
    return [];
  }
}

/**
 * Transform ERPNext blog post to our BlogPost interface
 */
function transformERPNextBlogPost(post: ERPNextBlogPost): BlogPost {
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
    readTime: Math.ceil((post.content_html?.split(' ').length || 0) / 200), // Estimate reading time
    tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
    authorDetails: {
      fullName: post.blogger || 'I-Varse Team',
      userImage: '/assets/team/default-avatar.jpg',
      bio: 'Content creator at I-Varse Technologies'
    },
    author: post.blogger || 'admin'
  };
}

// =============================================================================
// FORM SUBMISSIONS (ERPNext)
// =============================================================================

/**
 * Submit contact form to ERPNext as a Lead
 */
export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  try {
    const leadData = {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      company_name: formData.company || 'Not Provided',
      source: 'Website Contact Form',
      status: 'Lead',
      request_type: formData.requestType || 'General Inquiry',
      notes: formData.message,
      lead_owner: 'Administrator' // Default lead owner
    };

    await makeERPNextRequest('Lead', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });

    return true;
  } catch (error) {
    console.error('Failed to submit contact form to ERPNext:', error);
    return false;
  }
}

/**
 * Submit appointment booking to ERPNext as an Event
 */
export async function submitAppointmentBooking(formData: BookingFormData): Promise<boolean> {
  try {
    // Create Lead first
    const leadData = {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      source: 'Website Appointment Booking',
      status: 'Open',
      notes: formData.message
    };

    const leadResponse = await makeERPNextRequest('Lead', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });

    // Create Event/Appointment
    const eventData = {
      subject: `Appointment: ${formData.topic}`,
      event_type: 'Public',
      starts_on: `${formData.date} ${formData.time}:00`,
      ends_on: `${formData.date} ${formData.time}:00`, // Will be adjusted manually
      description: formData.message,
      event_participants: [
        {
          reference_doctype: 'Lead',
          reference_docname: leadResponse.data.name,
          email: formData.email
        }
      ]
    };

    await makeERPNextRequest('Event', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });

    return true;
  } catch (error) {
    console.error('Failed to submit appointment booking to ERPNext:', error);
    return false;
  }
}

/**
 * Submit newsletter subscription to ERPNext
 */
export async function submitNewsletterSubscription(email: string): Promise<boolean> {
  try {
    const subscriptionData = {
      email: email,
      enabled: 1
    };

    await makeERPNextRequest('Email Group Member', {
      method: 'POST',
      body: JSON.stringify(subscriptionData)
    });

    return true;
  } catch (error) {
    console.error('Failed to submit newsletter subscription to ERPNext:', error);
    return false;
  }
}

/**
 * Submit job application to ERPNext
 */
export async function submitJobApplication(formData: any): Promise<boolean> {
  try {
    const applicationData = {
      applicant_name: formData.fullName,
      email_id: formData.email,
      phone_number: formData.phone,
      job_title: formData.position,
      notes: formData.coverLetter,
      status: 'Open',
      source: 'Website'
    };

    await makeERPNextRequest('Job Applicant', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });

    return true;
  } catch (error) {
    console.error('Failed to submit job application to ERPNext:', error);
    return false;
  }
}

// =============================================================================
// HEALTH CHECK
// =============================================================================

/**
 * Check if ERPNext is available and configured
 */
export async function checkERPNextHealth(): Promise<boolean> {
  try {
    await getERPNextConfig();
    
    // Test connection with a simple request
    const response = await makeERPNextRequest('User', {
      method: 'GET'
    });

    return response && response.data;
  } catch (error) {
    console.error('ERPNext health check failed:', error);
    return false;
  }
}

// =============================================================================
// HOOKS FOR REACT QUERY INTEGRATION
// =============================================================================

export const erpNextQueryKeys = {
  blogPosts: ['erpnext', 'blog-posts'] as const,
  blogPost: (slug: string) => ['erpnext', 'blog-post', slug] as const,
  blogCategories: ['erpnext', 'blog-categories'] as const,
  health: ['erpnext', 'health'] as const
};
