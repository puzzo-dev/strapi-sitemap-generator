import { products, services, testimonials } from '@/lib/data';
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
  TeamMember
} from '@/lib/types';
import { apiRequest } from './queryClient';

// Strapi API URL should be set in environment variables
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Default headers for Strapi API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {})
};

/**
 * Fetch data from Strapi with error handling and fallback to local data
 */
async function fetchFromStrapi<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, using fallback data');
      return fallbackData;
    }
    
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers: defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data?.map((item: any) => ({
      id: item.id,
      ...item.attributes
    })) || fallbackData;
  } catch (error) {
    console.warn(`Error fetching from Strapi (${endpoint}):`, error);
    return fallbackData;
  }
}

/**
 * Get all products from Strapi or fallback to local data
 */
export async function getProducts(): Promise<ProductProps[]> {
  return fetchFromStrapi<ProductProps[]>('products?populate=*', products);
}

/**
 * Get a single product by ID from Strapi or fallback to local data
 */
export async function getProductById(id: number): Promise<ProductProps | undefined> {
  try {
    if (!STRAPI_API_TOKEN) {
      return products.find(product => product.id === id);
    }
    
    const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`, {
      headers: defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return {
      id: result.data.id,
      ...result.data.attributes
    };
  } catch (error) {
    console.warn(`Error fetching product ${id} from Strapi:`, error);
    return products.find(product => product.id === id);
  }
}

/**
 * Get all services from Strapi or fallback to local data
 */
export async function getServices(): Promise<ServiceProps[]> {
  return fetchFromStrapi<ServiceProps[]>('services?populate=*', services);
}

/**
 * Get a single service by ID from Strapi or fallback to local data
 */
export async function getServiceById(id: number): Promise<ServiceProps | undefined> {
  try {
    if (!STRAPI_API_TOKEN) {
      return services.find(service => service.id === id);
    }
    
    const response = await fetch(`${STRAPI_URL}/api/services/${id}?populate=*`, {
      headers: defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return {
      id: result.data.id,
      ...result.data.attributes
    };
  } catch (error) {
    console.warn(`Error fetching service ${id} from Strapi:`, error);
    return services.find(service => service.id === id);
  }
}

/**
 * Get all testimonials from Strapi or fallback to local data
 */
export async function getTestimonials(): Promise<TestimonialProps[]> {
  return fetchFromStrapi<TestimonialProps[]>('testimonials?populate=*', testimonials);
}

/**
 * Get navigation menu items from Strapi
 */
export async function getNavItems(): Promise<NavItem[]> {
  const defaultNavItems: NavItem[] = [
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'Services', url: '/services', order: 2 },
    { id: 3, label: 'Products', url: '/products', order: 3 },
    { id: 4, label: 'About', url: '/about', order: 4 },
    { id: 5, label: 'Contact', url: '/contact', order: 5 },
  ];
  
  return fetchFromStrapi<NavItem[]>('nav-items?sort=order:asc', defaultNavItems);
}

/**
 * Get social media links from Strapi
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const defaultSocialLinks: SocialLink[] = [
    { id: 1, platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { id: 3, platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' }
  ];
  
  return fetchFromStrapi<SocialLink[]>('social-links', defaultSocialLinks);
}

/**
 * Get footer columns from Strapi
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
  
  return fetchFromStrapi<FooterColumn[]>('footer-columns?populate=*', defaultFooterColumns);
}

/**
 * Get site configuration from Strapi
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
    if (!STRAPI_API_TOKEN) {
      return defaultSiteConfig;
    }
    
    const response = await fetch(`${STRAPI_URL}/api/site-config?populate=*`, {
      headers: defaultHeaders
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
  } catch (error) {
    console.warn('Error fetching site config from Strapi:', error);
    return defaultSiteConfig;
  }
}

/**
 * Get page content by slug from Strapi
 */
export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, cannot fetch page content');
      return null;
    }
    
    const response = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=deep`, {
      headers: defaultHeaders
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
  } catch (error) {
    console.warn(`Error fetching page content for ${slug} from Strapi:`, error);
    return null;
  }
}

/**
 * Get team members from Strapi
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
  
  return fetchFromStrapi<TeamMember[]>('team-members?populate=*', defaultTeamMembers);
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