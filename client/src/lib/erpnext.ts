/**
 * ERPNext Integration
 * 
 * This file handles ERPNext-specific API calls for:
 * - HR/Recruitment (Job Applications, Employee data)
 * - CRM (Leads, Events, Contacts)
 * - Email Groups (Newsletter subscriptions)
 * 
 * NOTE: Blog management has been consolidated in strapi.ts
 * NOTE: Form submissions (contact, appointment, newsletter) are in strapi.ts
 */

import { ContactFormData, BookingFormData } from '@/lib/types';

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
// FORM SUBMISSIONS (ERPNext) - Delegated to Strapi
// =============================================================================

/**
 * @deprecated Use submitContactForm from strapi.ts instead
 * This function is kept for backward compatibility
 */
export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  console.warn('ERPNext submitContactForm is deprecated. Use strapi.submitContactForm instead');
  // Delegate to makeERPNextRequest for actual implementation
  try {
    const leadData = {
      lead_name: formData.fullName,
      email_id: formData.email,
      phone: formData.phone,
      company_name: formData.erpNextCompany || 'Not Provided',
      source: 'Website Contact Form',
      status: 'Lead',
      request_type: formData.requestType || 'General Inquiry',
      notes: formData.message,
      lead_owner: 'Administrator'
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
 * @deprecated Use scheduleAppointment from strapi.ts instead
 * This function is kept for backward compatibility
 */
export async function submitAppointmentBooking(formData: BookingFormData): Promise<boolean> {
  console.warn('ERPNext submitAppointmentBooking is deprecated. Use strapi.scheduleAppointment instead');
  try {
    const leadData = {
      lead_name: formData.name,
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

    const appointmentDate = new Date(`${formData.date}T${formData.time}`);
    const endDate = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour default

    const eventData = {
      subject: `Appointment: ${formData.topic}`,
      event_type: 'Public',
      starts_on: appointmentDate.toISOString(),
      ends_on: endDate.toISOString(),
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
 * @deprecated Use subscribeToNewsletter from strapi.ts instead
 * This function is kept for backward compatibility
 */
export async function submitNewsletterSubscription(email: string): Promise<boolean> {
  console.warn('ERPNext submitNewsletterSubscription is deprecated. Use strapi.subscribeToNewsletter instead');
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
 * @deprecated Use submitJobApplication from strapi.ts instead
 * This function is kept for backward compatibility
 */
export async function submitJobApplication(formData: any): Promise<boolean> {
  console.warn('ERPNext submitJobApplication is deprecated. Use strapi.submitJobApplication instead');
  try {
    const applicationData = {
      applicant_name: formData.fullName,
      email_id: formData.email,
      phone_number: formData.phone,
      job_title: formData.jobTitle || formData.position,
      notes: formData.coverLetter,
      experience: formData.yearsOfExperience,
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
// UTILITY EXPORTS
// =============================================================================

/**
 * Export ERPNext request utility for other modules
 */
export { makeERPNextRequest, getERPNextConfig };
