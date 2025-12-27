/**
 * ERPNext Integration (separated from Strapi concerns)
 *
 * Handles ERPNext-specific API calls: leads, events, newsletter, blogs, health.
 */

import {
  ContactFormData,
  DemoRequestFormData,
  BlogComment,
  BlogPost,
  BlogCategory,
  TeamMember,
  JobListing
} from '@/lib/types';
import { getSiteConfig } from './strapi';
import { getSecret } from './utils/credentials';

interface ERPNextCredentials {
  url?: string;
  apiKey?: string;
  apiSecret?: string;
}

async function getERPNextCredentials(): Promise<ERPNextCredentials> {
  let ERP_NEXT_URL: string | undefined;
  let ERP_NEXT_API_KEY: string | undefined;
  let ERP_NEXT_API_SECRET: string | undefined;

  // Production: prefer Cloudflare secret store if available
  if (import.meta.env.PROD) {
    ERP_NEXT_URL = getSecret('ERP_NEXT_URL');
    ERP_NEXT_API_KEY = getSecret('ERP_NEXT_API_KEY');
    ERP_NEXT_API_SECRET = getSecret('ERP_NEXT_API_SECRET');
  }

  // Try to fetch dynamic config (can override CF secrets if present)
  if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl || ERP_NEXT_URL;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey || ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret || ERP_NEXT_API_SECRET;
    } catch {
      console.warn('Could not fetch SiteConfig; using secrets/env for ERPNext');
    }
  }

  if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
    ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
  }

  return { url: ERP_NEXT_URL, apiKey: ERP_NEXT_API_KEY, apiSecret: ERP_NEXT_API_SECRET };
}

async function fetchERPNext<T>(endpoint: string, options: RequestInit): Promise<T> {
  const creds = await getERPNextCredentials();
  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    throw new Error('ERPNext credentials not configured');
  }

  const response = await fetch(`${creds.url}/api/resource/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${creds.apiKey}:${creds.apiSecret}`,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function submitContactForm(data: ContactFormData): Promise<any> {
  const creds = await getERPNextCredentials();

  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    console.warn('ERPNext credentials not configured, using fallback for contact form');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Form submitted successfully' };
  }

  const erpNextData = {
    doctype: 'Lead',
    lead_name: data.fullName,
    email_id: data.email,
    phone: data.phone,
    custom_message: data.message,
    company: data.erpNextCompany,
    request_type: data.requestType,
    source: 'website',
  };

  return fetchERPNext<any>('Lead', {
    method: 'POST',
    body: JSON.stringify(erpNextData)
  });
}

export async function submitDemoRequest(data: DemoRequestFormData): Promise<any> {
  const creds = await getERPNextCredentials();

  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    console.warn('ERPNext credentials not configured, using fallback for demo request');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Demo request scheduled successfully' };
  }

  const name = data.fullName || data.name || 'Prospect';
  const topic = data.productInterest || 'Demo Request';
  const message = data.message || data.challenges || '';

  const date = new Date();
  const startsOn = date.toISOString();
  const endsOn = new Date(date.getTime() + 60 * 60 * 1000).toISOString();

  const erpNextData = {
    doctype: 'Event',
    subject: `Demo Request: ${topic}`,
    event_type: 'Private',
    description: [
      message,
      `Company: ${data.companyName || 'N/A'}`,
      `Company Size: ${data.companySize || 'N/A'}`,
      `Industry: ${data.industry || 'N/A'}`,
      `Decision Timeframe: ${data.decisionTimeframe || 'N/A'}`
    ].filter(Boolean).join('\n'),
    starts_on: startsOn,
    ends_on: endsOn,
    all_day: 0,
    event_participants: [
      {
        reference_doctype: 'Contact',
        reference_docname: name,
        email: data.email,
        phone: data.phone
      }
    ],
    custom_company_name: data.companyName,
    custom_company_size: data.companySize,
    custom_industry: data.industry,
    custom_decision_timeframe: data.decisionTimeframe,
    custom_challenges: data.challenges
  };

  return fetchERPNext<any>('Event', {
    method: 'POST',
    body: JSON.stringify(erpNextData)
  });
}

export async function subscribeToNewsletter(email: string): Promise<any> {
  const creds = await getERPNextCredentials();

  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    console.warn('ERPNext credentials not configured, using fallback for newsletter');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Newsletter subscription successful' };
  }

  const erpNextData = {
    doctype: 'Email Group Member',
    email_group: 'Newsletter Subscribers',
    email: email,
    status: 'Subscribed',
    source: 'Website'
  };

  return fetchERPNext<any>('Email Group Member', {
    method: 'POST',
    body: JSON.stringify(erpNextData)
  });
}

export async function submitBlogComment(postId: string, comment: {
  name: string;
  email: string;
  comment: string;
}): Promise<any> {
  const creds = await getERPNextCredentials();

  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    console.warn('ERPNext credentials not configured, using fallback for blog comment');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Comment submitted successfully' };
  }

  const erpNextData = {
    doctype: 'Blog Comment',
    blog_post: postId,
    comment: comment.comment,
    commenter: comment.name,
    commenter_email: comment.email,
    published: 1,
    source: 'Website'
  };

  return fetchERPNext<any>('Blog Comment', {
    method: 'POST',
    body: JSON.stringify(erpNextData)
  });
}

export async function checkERPNextHealth(): Promise<boolean> {
  try {
    const creds = await getERPNextCredentials();

    if (!creds.url || !creds.apiKey || !creds.apiSecret) {
      console.warn('ERPNext credentials not configured; skipping health check');
      return false;
    }

    const response = await fetch(`${creds.url}/api/resource/User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${creds.apiKey}:${creds.apiSecret}`
      }
    });

    return response.ok;
  } catch (error) {
    console.error('ERPNext health check failed:', error);
    return false;
  }
}

function transformERPNextBlogPost(post: any): BlogPost {
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

function transformERPNextBlogCategory(category: any): BlogCategory {
  return {
    id: category.name,
    name: category.name,
    title: category.title,
    slug: category.route?.replace('/', '') || category.name.toLowerCase(),
    description: category.description || ''
  };
}

export async function getERPNextBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await fetchERPNext<{ data: any[] }>('Blog Post', { method: 'GET' });
    return result.data.map(transformERPNextBlogPost);
  } catch (error) {
    console.error('Failed to fetch ERPNext blog posts:', error);
    return [];
  }
}

export async function getERPNextBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filter = encodeURIComponent(`[["route","=","/${slug}"]]`);
    const result = await fetchERPNext<{ data: any[] }>(`Blog Post?filters=${filter}`, {
      method: 'GET'
    });
    const post = result.data?.[0];
    return post ? transformERPNextBlogPost(post) : null;
  } catch (error) {
    console.error('Failed to fetch ERPNext blog post:', error);
    return null;
  }
}

export async function getERPNextBlogCategories(): Promise<BlogCategory[]> {
  try {
    const result = await fetchERPNext<{ data: any[] }>('Blog Category', { method: 'GET' });
    return result.data.map(transformERPNextBlogCategory);
  } catch (error) {
    console.error('Failed to fetch ERPNext blog categories:', error);
    return [];
  }
}

export async function getERPNextTeamMembers(): Promise<TeamMember[]> {
  // Endpoint not defined; keep stable return
  return [];
}

export async function getERPNextTeamMember(_slug: string): Promise<TeamMember | null> {
  return null;
}

export async function getERPNextJobListings(): Promise<JobListing[]> {
  try {
    const filters = encodeURIComponent('[["status","=","Open"]]');
    const result = await fetchERPNext<{ data: any[] }>(`Job Opening?filters=${filters}`, {
      method: 'GET'
    });

    return (result.data || []).map((job: any) => ({
      id: job.name,
      title: job.job_title || 'Job Opening',
      department: job.department || 'General',
      location: job.location || 'Remote',
      type: job.employment_type || 'Full-time',
      description: job.description || '',
      responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter((r: string) => r.trim()) : [],
      requirements: job.requirements ? job.requirements.split('\n').filter((r: string) => r.trim()) : [],
      benefits: ['Competitive salary', 'Health insurance', 'Professional development', 'Remote work options'],
      qualifications: ['Relevant experience', 'Strong communication skills', 'Team player'],
      salary: job.salary_min && job.salary_max ? `${job.currency || '$'}${job.salary_min} - ${job.salary_max}` : 'Competitive',
      featured: false,
      postedAt: job.published_on || new Date().toISOString(),
      erpNextId: job.name,
      erpNextStatus: job.status || 'open',
      erpNextDepartment: job.department,
      erpNextLocation: job.location,
      erpNextType: job.employment_type,
      erpNextSalary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: job.currency,
        period: 'yearly'
      },
      erpNextApplicationDeadline: job.deadline
    }));
  } catch (error) {
    console.error('Failed to fetch ERPNext job listings:', error);
    return [];
  }
}

export async function getERPNextJobListing(idOrName: string): Promise<JobListing | null> {
  try {
    const result = await fetchERPNext<{ data: any }>(`Job Opening/${idOrName}`, { method: 'GET' });
    const job: any = (result as any).data;
    if (!job) return null;

    return {
      id: job.name,
      title: job.job_title || 'Job Opening',
      department: job.department || 'General',
      location: job.location || 'Remote',
      type: job.employment_type || 'Full-time',
      description: job.description || '',
      responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter((r: string) => r.trim()) : [],
      requirements: job.requirements ? job.requirements.split('\n').filter((r: string) => r.trim()) : [],
      benefits: ['Competitive salary', 'Health insurance', 'Professional development', 'Remote work options'],
      qualifications: ['Relevant experience', 'Strong communication skills', 'Team player'],
      salary: job.salary_min && job.salary_max ? `${job.currency || '$'}${job.salary_min} - ${job.salary_max}` : 'Competitive',
      featured: false,
      postedAt: job.published_on || new Date().toISOString(),
      erpNextId: job.name,
      erpNextStatus: job.status || 'open',
      erpNextDepartment: job.department,
      erpNextLocation: job.location,
      erpNextType: job.employment_type,
      erpNextSalary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: job.currency,
        period: 'yearly'
      },
      erpNextApplicationDeadline: job.deadline
    };
  } catch (error) {
    console.error('Failed to fetch ERPNext job listing:', error);
    return null;
  }
}

export async function getERPNextBlogComments(postId: string): Promise<BlogComment[]> {
  try {
    const filters = encodeURIComponent(`[["blog_post","=","${postId}"]]`);
    const result = await fetchERPNext<{ data: any[] }>(`Blog Comment?filters=${filters}`, {
      method: 'GET'
    });

    return (result.data || []).map((comment: any, index: number) => ({
      id: index + 1,
      postId,
      name: comment.commenter || comment.author || 'Anonymous',
      email: comment.commenter_email || 'noreply@example.com',
      comment: comment.comment || '',
      createdDate: comment.creation || new Date().toISOString(),
      approved: comment.published === undefined ? true : Boolean(comment.published)
    }));
  } catch (error) {
    console.error('Failed to fetch ERPNext blog comments:', error);
    return [];
  }
}

export async function submitJobApplication(data: {
  fullName: string;
  email: string;
  phone: string;
  yearsOfExperience: string;
  coverLetter: string;
  resume?: File | null;
  agreeToTerms: boolean;
  jobTitle?: string;
  jobId?: string;
}): Promise<any> {
  // resume is not posted to ERPNext in this flow; avoid lint warnings for unused fields
  void data.resume;
  void data.agreeToTerms;

  const creds = await getERPNextCredentials();

  if (!creds.url || !creds.apiKey || !creds.apiSecret) {
    console.warn('ERPNext credentials not configured, using fallback for job application');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Job application submitted successfully' };
  }

  const erpNextData = {
    doctype: 'Job Applicant',
    applicant_name: data.fullName,
    email_id: data.email,
    phone_number: data.phone,
    cover_letter: data.coverLetter,
    experience: data.yearsOfExperience,
    job_title: data.jobTitle || 'General Application',
    job_posting: data.jobId,
    source: 'Website',
    status: 'Open'
  };

  return fetchERPNext<any>('Job Applicant', {
    method: 'POST',
    body: JSON.stringify(erpNextData)
  });
}

// Utility exports if needed elsewhere
export { getERPNextCredentials as getERPNextConfig, fetchERPNext as makeERPNextRequest };
