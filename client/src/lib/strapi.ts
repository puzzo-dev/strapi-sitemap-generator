import { products as localProducts, services as localServices, testimonials as localTestimonials, clientLogos as localClientLogos } from '@/lib/data';
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
  ClientLogo
} from '@/lib/types';
import type { SiteContent } from '@shared/schema';
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
      // Use Strapi API
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        headers: strapiHeaders
      });
      
      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.data?.map((item: any) => ({
        id: item.id,
        ...item.attributes
      })) || fallbackData;
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
      // Use Strapi API
      const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`, {
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
  return fetchData<ServiceProps[]>('services', localServices);
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
      // Use Strapi API
      const response = await fetch(`${STRAPI_URL}/api/services/${id}?populate=*`, {
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
 */
export async function getNavItems(): Promise<NavItem[]> {
  const defaultNavItems: NavItem[] = [
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'Services', url: '/services', order: 2 },
    { id: 3, label: 'Products', url: '/products', order: 3 },
    { id: 4, label: 'About', url: '/about', order: 4 },
    { id: 5, label: 'Contact', url: '/contact', order: 5 },
  ];
  
  return fetchData<NavItem[]>('nav-items', defaultNavItems);
}

/**
 * Get social media links from API
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const defaultSocialLinks: SocialLink[] = [
    { id: 1, platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { id: 3, platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' }
  ];
  
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
        { label: 'Contact', url: '/contact' }
      ]
    },
    { 
      id: 2, 
      title: 'Services', 
      links: [
        { label: 'Web Development', url: '/services' },
        { label: 'Mobile App Development', url: '/services' },
        { label: 'Cloud Solutions', url: '/services' }
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
    siteName: 'I-Varse Limited',
    siteDescription: 'Digital solutions for modern businesses',
    contactEmail: 'info@ivarse.com',
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
        const result = await apiRequest<{value: any}>(`/api/site-config`);
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
      // Use Strapi API
      const response = await fetch(`${STRAPI_URL}/api/site-config?populate=*`, {
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
        return null;
      }
    } else if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, cannot fetch page content');
      return null;
    } else {
      // Use Strapi API
      const response = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=deep`, {
        headers: strapiHeaders
      });
      
      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      if (!result.data || result.data.length === 0) {
        return null;
      }
      
      return {
        id: result.data[0].id,
        ...result.data[0].attributes
      };
    }
  } catch (error) {
    console.warn(`Error fetching page content for ${slug}:`, error);
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