import { products, services, testimonials } from '@/lib/data';
import { ProductProps, ServiceProps, TestimonialProps, ContactFormData } from '@/lib/types';
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