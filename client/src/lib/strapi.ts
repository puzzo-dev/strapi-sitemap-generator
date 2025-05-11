import {
  products as localProducts,
  services as localServices,
  testimonials as localTestimonials,
  clientLogos as localClientLogos,
  jobListings as localJobListings,
  benefits as localBenefits,
  socialLinks as localSocialLinks,
  navItems as localNavItems,
  footerData,
  contactPageContent,
  defaultHeroProps
} from '@/lib/data';
import {
  ProductProps,
  ServiceProps,
  TestimonialProps,
  ContactFormData,
  NavItem,
  SocialLink,
  FooterColumn,
  SiteConfig,
  PageContent,
  TeamMember,
  ClientLogo,
  JobListing,
  HeroProps,
  HeroSlide,
  Benefit,
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogComment,
  FooterProps
} from '@/lib/types';
import { apiRequest } from './queryClient';

// Constants for API integration
const USE_LOCAL_API = false; // Set to false to use Strapi instead of local API
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Default headers for API requests
const strapiHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {})
};

// Current language for localization
let currentLanguage = 'en';

// Function to set current language for Strapi requests
export function setCurrentLanguage(lang: string) {
  currentLanguage = lang;
  console.log('Language changed to:', lang);

  // Invalidate and refetch data if needed
  // Here we could trigger refetches for any data that depends on language
}

// Get current language for Strapi requests
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Fetch data from API with error handling and fallback to local data
 */
async function fetchData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    if (USE_LOCAL_API) {
      // Use local API (Express backend)
      return await apiRequest<T>(`/api/${endpoint}`);
    } else if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, using fallback data');
      return fallbackData;
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Handle both collection and single type responses from Strapi
      if (Array.isArray(result.data)) {
        return result.data.map((item: any) => ({
          id: item.id,
          ...item.attributes
        })) as T;
      } else if (result.data && result.data.attributes) {
        return {
          id: result.data.id,
          ...result.data.attributes
        } as T;
      }

      return fallbackData;
    }
  } catch (error) {
    console.warn(`Error fetching data (${endpoint}):`, error);
    return fallbackData;
  }
}
/**
 * Get all products from API or fallback to local data
 */
export async function getProducts(): Promise<ProductProps[]> {
  return fetchData<ProductProps[]>('products', localProducts);
}

/**
 * Get a single product by ID from API or fallback to local data
 */
export async function getProductById(id: number): Promise<ProductProps | undefined> {
  try {
    if (USE_LOCAL_API) {
      const products = await fetchData<ProductProps[]>('products', localProducts);
      return products.find(product => product.id === id);
    } else if (!STRAPI_API_TOKEN) {
      return localProducts.find(product => product.id === id);
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        id: result.data.id,
        ...result.data.attributes
      };
    }
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
    const services = await fetchData<ServiceProps[]>('services', []);
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
    if (USE_LOCAL_API) {
      const services = await fetchData<ServiceProps[]>('services', localServices);
      return services.find(service => service.id === id);
    } else if (!STRAPI_API_TOKEN) {
      return localServices.find(service => service.id === id);
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/services/${id}?populate=*${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        id: result.data.id,
        ...result.data.attributes
      };
    }
  } catch (error) {
    console.warn(`Error fetching service ${id}:`, error);
    return localServices.find(service => service.id === id);
  }
}

/**
 * Get all testimonials from API or fallback to local data
 */
export async function getTestimonials(): Promise<TestimonialProps[]> {
  return fetchData<TestimonialProps[]>('testimonials', localTestimonials);
}

/**
 * Get navigation menu items from API
 /**
 * Get navigation menu items from API
 */
export async function getNavItems(): Promise<NavItem[]> {
  const defaultNavItems: NavItem[] = localNavItems;

  return fetchData<NavItem[]>('nav-items', defaultNavItems);
}

/**
 * Get social media links from API
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const defaultSocialLinks: SocialLink[] = localSocialLinks;

  return fetchData<SocialLink[]>('social-links', defaultSocialLinks);
}

/**
 * Get footer columns from API
 */
export async function getFooterColumns(): Promise<FooterColumn[]> {
  const defaultFooterColumns: FooterColumn[] = [
    {
      id: 1,
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' },
        { label: 'Insights Pages', url: '/blog' },
        { label: 'Our Team', url: '/about#team' }
      ]
    },
    {
      id: 2,
      title: 'Services',
      links: [
        { label: 'Web Development', url: '/services/web-development' },
        { label: 'Mobile App Development', url: '/services/mobile-development' },
        { label: 'Cloud Solutions', url: '/services/cloud-solutions' },
        { label: 'AI Solutions', url: '/services/ai-solutions' },
        { label: 'Digital Marketing', url: '/services/digital-marketing' },
        { label: 'View All Services', url: '/services' }
      ]
    },
    {
      id: 3,
      title: 'Resources',
      links: [
        { label: 'Blog', url: '/blog' },
        { label: 'Documentation', url: '/docs' },
        { label: 'Support', url: '/support' }
      ]
    }
  ];

  return fetchData<FooterColumn[]>('footer-columns', defaultFooterColumns);
}

/**
 * Get site configuration from API
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const defaultSiteConfig: SiteConfig = {
    siteName: 'I-Varse Technologies',
    siteDescription: 'Digital solutions for modern businesses',
    contactEmail: 'info@itechnologies.ng',
    contactPhone: '+1234567890',
    contactAddress: '123 Tech Boulevard, Silicon Valley, CA',
    logoLight: '/assets/I-VARSELogo3@3x.png',
    logoDark: '/assets/I-VARSELogo4@3x.png',
    favicon: '/assets/I-VARSEIcon1@3x.png'
  };

  try {
    if (USE_LOCAL_API) {
      // First attempt to get from internal API
      try {
        const result = await apiRequest<{ value: any }>(`/api/site-config`);
        if (result && result.value) {
          const config = result.value as unknown as SiteConfig;
          return config;
        }
      } catch (e) {
        console.warn('Error fetching site config from internal API:', e);
      }
      return defaultSiteConfig;
    } else if (!STRAPI_API_TOKEN) {
      return defaultSiteConfig;
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/site-config?populate=*${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.data) {
        return defaultSiteConfig;
      }

      return {
        id: result.data.id,
        ...result.data.attributes
      };
    }
  } catch (error) {
    console.warn('Error fetching site config:', error);
    return defaultSiteConfig;
  }
}

/**
 * Get page content by slug from API
 */
export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    if (USE_LOCAL_API) {
      try {
        const data = await apiRequest<PageContent>(`/api/pages/${slug}`);
        return data;
      } catch (e) {
        console.warn(`Error fetching page content for ${slug} from internal API:`, e);

        // Check if we have a local fallback for this page
        if (slug === 'contact' && contactPageContent) {
          return contactPageContent;
        }

        return null;
      }
    } else if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, checking for local page content');

      // Check if we have a local fallback for this page
      if (slug === 'contact' && contactPageContent) {
        return contactPageContent;
      }

      return null;
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=deep${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.data || result.data.length === 0) {
        // Check if we have a local fallback for this page
        if (slug === 'contact' && contactPageContent) {
          return contactPageContent;
        }

        return null;
      }

      return {
        id: result.data[0].id,
        ...result.data[0].attributes
      };
    }
  } catch (error) {
    console.warn(`Error fetching page content for ${slug}:`, error);

    // Check if we have a local fallback for this page
    if (slug === 'contact' && contactPageContent) {
      return contactPageContent;
    }

    return null;
  }
}

/**
 * Get team members from API
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const defaultTeamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      position: 'CEO',
      bio: 'Experienced leader with a passion for technology innovation.',
      image: 'https://source.unsplash.com/random/300x300/?portrait'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Tech enthusiast with deep expertise in software architecture.',
      image: 'https://source.unsplash.com/random/300x300/?portrait'
    },
    {
      id: 3,
      name: 'Alex Johnson',
      position: 'Design Lead',
      bio: 'Creative professional focused on delivering exceptional user experiences.',
      image: 'https://source.unsplash.com/random/300x300/?portrait'
    },
    {
      id: 3,
      name: 'Alex Johnson',
      position: 'Design Lead',
      bio: 'Creative professional focused on delivering exceptional user experiences.',
      image: 'https://source.unsplash.com/random/300x300/?portrait'
    }
  ];

  return fetchData<TeamMember[]>('team-members', defaultTeamMembers);
}

/**
 * Submit contact form data to erpNext
 */
export async function submitContactForm(data: ContactFormData): Promise<any> {
  try {
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('erpNext credentials not configured, using fallback');
      // Simulate successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Form submitted successfully' };
    }

    // Format data for erpNext API
    const erpNextData = {
      doctype: 'Lead',
      lead_name: data.fullName,
      email_id: data.email,
      phone: data.phone,
      notes: data.message,
      source: 'Website'
    };

    // Call erpNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`erpNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting to erpNext:', error);
    throw error;
  }
}

/**
 * Submit newsletter subscription to erpNext
 */
export async function subscribeToNewsletter(email: string): Promise<any> {
  try {
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('erpNext credentials not configured, using fallback');
      // Simulate successful subscription with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Subscription successful' };
    }

    // Format data for erpNext API - using Email Group Subscriber
    const erpNextData = {
      doctype: 'Email Group Member',
      email_group: 'Newsletter Subscribers',
      email: email,
      unsubscribed: 0
    };

    // Call erpNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Email Group Member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`erpNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

/**
 * Get client logos from API or fallback to local data
 */
export async function getClientLogos(): Promise<ClientLogo[]> {
  return fetchData<ClientLogo[]>('client-logos', localClientLogos);
}

/**
 * Submit a booking/appointment request to erpNext
 */
export async function scheduleAppointment(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  message: string;
}): Promise<any> {
  try {
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('erpNext credentials not configured, using fallback');
      // Simulate successful booking with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Appointment scheduled successfully' };
    }

    // Format data for erpNext API - using Event doctype
    const appointmentDate = new Date(`${data.date}T${data.time}`);
    // Add 1 hour for appointment length
    const endDate = new Date(appointmentDate.getTime() + 60 * 60 * 1000);

    const erpNextData = {
      doctype: 'Event',
      subject: `Consultation: ${data.topic}`,
      event_type: 'Private',
      description: data.message,
      starts_on: appointmentDate.toISOString(),
      ends_on: endDate.toISOString(),
      all_day: 0,
      event_participants: [
        {
          reference_doctype: 'Contact',
          reference_docname: data.name,
          email: data.email,
          phone: data.phone
        }
      ]
    };

    // Call erpNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`erpNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    throw error;
  }
}

/**
 * Get job listings from API or fallback to local data
 */
export async function getJobListings(): Promise<JobListing[]> {
  // Using the jobListings data from data.ts as fallback
  return fetchData<JobListing[]>('job-listings', localJobListings);
}

/**
 * Get a single job listing by ID from API or fallback to local data
 */
export async function getJobById(id: number): Promise<JobListing | undefined> {
  try {
    const allJobs = await getJobListings();
    return allJobs.find(job => job.id === id);
  } catch (error) {
    console.error('Error fetching job:', error);
    return undefined;
  }
}

/**
 * Get benefits from API or fallback to local data
 */
export async function getBenefits(): Promise<Benefit[]> {
  // Using the benefits data from data.ts as fallback
  return fetchData<Benefit[]>('benefits', localBenefits);
}

/**
 * ERPNext Blog API functions
 */

// Base URL for ERPNext API - should be stored in an environment variable
const ERPNEXT_API_BASE_URL = import.meta.env.VITE_ERPNEXT_API_URL || 'https://i-erp.itechnologies.ng';

/**
 * Fetch data from ERPNext API with error handling
 */
async function fetchERPNextData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    // Check if ERPNext API token is available
    const erpnextToken = import.meta.env.VITE_ERPNEXT_API_TOKEN;
    if (!erpnextToken) {
      console.warn('No ERPNext API token provided, using fallback data');
      return fallbackData;
    }

    const response = await fetch(`${ERPNEXT_API_BASE_URL}/api/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${erpnextToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || fallbackData;
  } catch (error) {
    console.error(`Error fetching from ERPNext API: ${error}`);
    return fallbackData;
  }
}

/**
 * Get all blog posts from ERPNext API
 */
export async function getBlogPosts(params: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
} = {}): Promise<BlogPost[]> {
  try {
    // Create query parameters
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.tag) queryParams.append('tag', params.tag);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

    // Try to fetch from ERPNext API
    const posts = await fetchERPNextData<BlogPost[]>(`blogger/posts${queryString}`, []);

    // If we got posts from the API, return them
    if (posts.length > 0) {
      return posts;
    }

    // Otherwise, use the local blog posts with filtering
    const { blogPosts } = await import('./data');
    return filterBlogPosts(blogPosts, params);
  } catch (error) {
    console.error(`Error fetching blog posts:`, error);
    // Use the local blog posts with filtering as fallback
    const { blogPosts } = await import('./data');
    return filterBlogPosts(blogPosts, params);
  }
}
/**
 * Filter blog posts based on params for fallback data
 */
function filterBlogPosts(posts: BlogPost[], params: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
} = {}): BlogPost[] {
  let filteredPosts = [...posts];

  // Filter by category
  if (params.category) {
    filteredPosts = filteredPosts.filter(post =>
      post.blog_category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  // Filter by featured
  if (params.featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === params.featured);
  }

  // Filter by tag
  if (params.tag) {
    filteredPosts = filteredPosts.filter(post =>
      post.tags?.some(tag => tag.toLowerCase() === params.tag?.toLowerCase())
    );
  }

  // Limit results
  if (params.limit && params.limit > 0) {
    filteredPosts = filteredPosts.slice(0, params.limit);
  }

  return filteredPosts;
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Import dummy blog posts
  const { blogPosts } = await import('./data');

  // Find matching post in dummy data
  const dummyPost = blogPosts.find(post => post.slug === slug) || null;

  // Use the matching post from dummy data as fallback
  return fetchERPNextData<BlogPost | null>(`blogger/posts/${slug}`, dummyPost);
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  // Import dummy blog categories
  const { blogCategories } = await import('./data');

  // Use blog categories from data.ts as fallback
  return fetchERPNextData<BlogCategory[]>('blogger/categories', blogCategories);
}

/**
 * Submit a blog comment to ERPNext
 */
export async function submitBlogComment(postId: string, comment: {
  name: string;
  email: string;
  comment: string;
}): Promise<any> {
  try {
    // Check if ERPNext API token is available
    const erpnextToken = import.meta.env.VITE_ERPNEXT_API_TOKEN;
    if (!erpnextToken) {
      console.warn('No ERPNext API token provided, comment submission failed');
      throw new Error('API token not available');
    }

    const response = await fetch(`${ERPNEXT_API_BASE_URL}/api/blogger/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${erpnextToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error submitting comment to ERPNext API: ${error}`);
    throw error;
  }
}

/**
 * Get comments for a specific blog post
 */
export async function getBlogComments(postId: string): Promise<BlogComment[]> {
  // Use empty array as fallback
  return fetchERPNextData<BlogComment[]>(`blogger/posts/${postId}/comments`, []);
}

/**
 * Get footer data from API
 */
export async function getFooter(): Promise<FooterProps> {
  try {
    if (USE_LOCAL_API) {
      try {
        const data = await apiRequest<FooterProps>(`/api/footer`);
        return data || footerData;
      } catch (e) {
        console.warn('Error fetching footer from internal API:', e);
        return footerData;
      }
    } else if (!STRAPI_API_TOKEN) {
      return footerData;
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/footer?populate=deep${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.data) {
        return footerData;
      }

      // Ensure we have all required properties from the footerData
      const strapiFooter = {
        id: result.data.id,
        ...result.data.attributes
      };

      // Merge with default footer data to ensure all properties exist
      return {
        ...footerData,
        ...strapiFooter,
        // Ensure nested properties are properly merged
        columns: strapiFooter.columns || footerData.columns,
        socialLinks: strapiFooter.socialLinks || footerData.socialLinks,
        legalLinks: strapiFooter.legalLinks || footerData.legalLinks
      };
    }
  } catch (error) {
    console.warn('Error fetching footer:', error);
    return footerData;
  }
}

/**
 * Get hero slides from API or fallback to local data
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    if (USE_LOCAL_API) {
      try {
        const data = await apiRequest<HeroSlide[]>(`/api/hero-slides`);
        return data;
      } catch (e) {
        console.warn('Error fetching hero slides from internal API:', e);
        // Import heroSlides from data.ts as fallback
        const { heroSlides } = await import('./data');
        return heroSlides;
      }
    } else if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, using fallback hero slides');
      // Import heroSlides from data.ts as fallback
      const { heroSlides } = await import('./data');
      return heroSlides;
    } else {
      // Use Strapi API with language param
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/hero-slides?populate=*${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.data || result.data.length === 0) {
        // Import heroSlides from data.ts as fallback
        const { heroSlides } = await import('./data');
        return heroSlides;
      }

      // Map Strapi response to HeroSlide format
      return result.data.map((item: any) => ({
        title: item.attributes.title || 'INNOVATIVE DIGITAL SOLUTIONS',
        subtitle: item.attributes.subtitle || 'Elevate your business with our cutting-edge digital solutions.',
        backgroundImage: item.attributes.backgroundImage?.data?.attributes?.url || undefined,
        primaryButton: item.attributes.primaryButton ? {
          text: item.attributes.primaryButton.text || 'Get Started',
          url: item.attributes.primaryButton.url || '#',
          variant: item.attributes.primaryButton.variant || 'primary',
        } : undefined,
        secondaryButton: item.attributes.secondaryButton ? {
          text: item.attributes.secondaryButton.text || 'Learn More',
          url: item.attributes.secondaryButton.url || '#',
          variant: item.attributes.secondaryButton.variant || 'secondary',
        } : undefined,
      }));
    }
  } catch (error) {
    console.warn('Error fetching hero slides:', error);
    // Import heroSlides from data.ts as fallback
    const { heroSlides } = await import('./data');
    return heroSlides;
  }
}

/**
 * Get hero content with randomized slides for the hero section
 */
export async function getHeroContent(): Promise<HeroProps> {
  try {
    // Try to fetch complete HeroProps from Strapi first
    if (!USE_LOCAL_API && STRAPI_API_TOKEN) {
      const locale = currentLanguage;
      const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

      const response = await fetch(`${STRAPI_URL}/api/hero-content?populate=deep${localeSuffix}`, {
        headers: strapiHeaders
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.attributes) {
          // Return the Strapi data with default functions for handlers
          const strapiHeroProps = result.data.attributes;
          return {
            ...strapiHeroProps,
            isHeroLoading: false,
            isPageLoading: false,
            isServicesLoading: false,
            handleMouseEnter: () => {}, 
            handleMouseLeave: () => {},
          };
        }
      }
    }
    
    // If no direct HeroProps from Strapi, build it from components
    const heroSlides = await getHeroSlides();
    const randomIndex = Math.floor(Math.random() * heroSlides.length);
    const services = await getServices();
    const products = await getProducts();
    
    return {
      heroContents: heroSlides,
      currentHeroIndex: randomIndex,
      isHeroLoading: false,
      isPageLoading: false,
      services: services,
      products: products,
      currentIndex: 0,
      isServicesLoading: false,
      handleMouseEnter: () => {}, 
      handleMouseLeave: () => {}, 
      companyLogo: '/assets/I-VARSELogo3@3x.png',
    };
  } catch (error) {
    console.warn('Error fetching hero content:', error);
    return { ...defaultHeroProps };
  }
}