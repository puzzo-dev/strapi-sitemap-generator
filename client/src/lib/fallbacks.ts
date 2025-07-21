/**
 * Fallback Data Pattern Architecture
 * 
 * This file defines the fallback patterns for all content types.
 * When Strapi or ERPNext data is not available, these fallbacks ensure
 * the website continues to function with minimal content.
 */

import { 
  PageContent, 
  BlogPost, 
  ProductProps, 
  ServiceProps, 
  TestimonialProps,
  TeamMember,
  CaseStudyProps,
  IndustryProps,
  JobListing,
  ClientLogo,
  FAQItem
} from '@/lib/types';

// =============================================================================
// FALLBACK CONFIGURATION
// =============================================================================

export interface FallbackConfig {
  enabled: boolean;
  showFallbackIndicator?: boolean;
  logMissingContent?: boolean;
}

export const FALLBACK_CONFIG: FallbackConfig = {
  enabled: true,
  showFallbackIndicator: process.env.NODE_ENV === 'development',
  logMissingContent: process.env.NODE_ENV === 'development'
};

// =============================================================================
// UI TEXT FALLBACKS (Strapi Content)
// =============================================================================

export const UI_TEXT_FALLBACKS = {
  buttons: {
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    viewAll: 'View All',
    contactUs: 'Contact Us',
    submit: 'Submit',
    submitting: 'Submitting...',
    bookAppointment: 'Book Appointment',
    booking: 'Booking...',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing...',
    backToHome: 'Back to Home',
    tryAgain: 'Try Again',
    download: 'Download',
    applyNow: 'Apply Now'
  },
  forms: {
    labels: {
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      company: 'Company',
      requestType: 'Request Type',
      topic: 'Topic',
      date: 'Date',
      time: 'Time',
      experience: 'Years of Experience'
    },
    placeholders: {
      fullName: 'Enter your full name',
      email: 'Enter your email address',
      phone: 'Enter your phone number',
      message: 'Tell us about your project',
      company: 'Your company name',
      topic: 'Meeting topic',
      search: 'Search...'
    },
    validation: {
      required: 'This field is required',
      emailInvalid: 'Please enter a valid email address',
      phoneInvalid: 'Please enter a valid phone number',
      minLength: 'Minimum {min} characters required',
      maxLength: 'Maximum {max} characters allowed'
    },
    messages: {
      success: 'Your message has been sent successfully!',
      error: 'There was a problem submitting your form. Please try again.',
      networkError: 'Network error. Please check your connection and try again.'
    }
  },
  errors: {
    pageNotFound: 'Page Not Found',
    productNotFound: 'Product Not Found',
    serviceNotFound: 'Service Not Found',
    jobNotFound: 'Job Not Found',
    blogNotFound: 'Blog Post Not Found',
    genericError: 'Something went wrong',
    loadingError: 'Failed to load content',
    networkError: 'Network connection error'
  },
  loading: {
    default: 'Loading...',
    content: 'Loading content...',
    products: 'Loading products...',
    services: 'Loading services...',
    team: 'Loading team...',
    blogs: 'Loading blog posts...'
  }
} as const;

// =============================================================================
// PAGE CONTENT FALLBACKS (Strapi Content)
// =============================================================================

export const PAGE_FALLBACKS: Record<string, Partial<PageContent>> = {
  home: {
    id: 1,
    title: 'I-Varse Technologies',
    slug: 'home',
    metaTitle: 'I-Varse Technologies - Digital Transformation Solutions',
    metaDescription: 'Leading provider of digital transformation solutions, custom software development, and enterprise technology services.',
    sections: [
      {
        id: 1,
        type: 'hero',
        title: 'Digital Transformation Solutions',
        subtitle: 'Empowering businesses with cutting-edge technology',
        content: 'We help organizations accelerate their digital journey with innovative solutions.',
        settings: { theme: 'modern' }
      }
    ]
  },
  about: {
    id: 2,
    title: 'About Us',
    slug: 'about',
    metaTitle: 'About I-Varse Technologies',
    metaDescription: 'Learn about our mission, vision, and commitment to delivering exceptional technology solutions.',
    sections: []
  },
  contact: {
    id: 3,
    title: 'Contact Us',
    slug: 'contact',
    metaTitle: 'Contact I-Varse Technologies',
    metaDescription: 'Get in touch with our team to discuss your technology needs and project requirements.',
    sections: []
  },
  products: {
    id: 4,
    title: 'Products',
    slug: 'products',
    metaTitle: 'Our Products - I-Varse Technologies',
    metaDescription: 'Explore our comprehensive suite of software products and digital solutions.',
    sections: []
  },
  services: {
    id: 5,
    title: 'Services',
    slug: 'services',
    metaTitle: 'Our Services - I-Varse Technologies',
    metaDescription: 'Professional technology services including custom development, consulting, and support.',
    sections: []
  }
};

// =============================================================================
// CONTENT TYPE FALLBACKS (Minimal data for when APIs fail)
// =============================================================================

export const CONTENT_FALLBACKS = {
  products: [] as ProductProps[],
  services: [] as ServiceProps[],
  blogs: [] as BlogPost[],
  testimonials: [] as TestimonialProps[],
  team: [] as TeamMember[],
  caseStudies: [] as CaseStudyProps[],
  industries: [] as IndustryProps[],
  jobs: [] as JobListing[],
  clients: [] as ClientLogo[],
  faqs: [] as FAQItem[]
};

// =============================================================================
// FALLBACK UTILITY FUNCTIONS
// =============================================================================

/**
 * Get fallback data with optional indicator
 */
export function withFallback<T>(
  data: T | null | undefined,
  fallback: T,
  contentType?: string
): T {
  if (data) {
    return data;
  }

  if (FALLBACK_CONFIG.logMissingContent && contentType) {
    console.warn(`Using fallback data for: ${contentType}`);
  }

  return fallback;
}

/**
 * Get UI text with fallback
 */
export function getUIText(
  strapiText: string | undefined,
  fallbackKey: string,
  fallbackCategory: keyof typeof UI_TEXT_FALLBACKS = 'buttons'
): string {
  if (strapiText) {
    return strapiText;
  }

  const category = UI_TEXT_FALLBACKS[fallbackCategory] as any;
  return category?.[fallbackKey] || fallbackKey;
}

/**
 * Get page content with fallback
 */
export function getPageContent(
  strapiContent: PageContent | null | undefined,
  pageSlug: string
): PageContent {
  if (strapiContent) {
    return strapiContent;
  }

  const fallback = PAGE_FALLBACKS[pageSlug];
  if (!fallback) {
    if (FALLBACK_CONFIG.logMissingContent) {
      console.warn(`No fallback defined for page: ${pageSlug}`);
    }
    
    return {
      id: 0,
      title: 'Page Not Found',
      slug: pageSlug,
      metaTitle: 'Page Not Found',
      metaDescription: 'The requested page could not be found.',
      sections: []
    };
  }

  return fallback as PageContent;
}

/**
 * Get content list with fallback
 */
export function getContentList<T>(
  strapiData: T[] | null | undefined,
  contentType: keyof typeof CONTENT_FALLBACKS
): T[] {
  if (strapiData && strapiData.length > 0) {
    return strapiData;
  }

  const fallback = CONTENT_FALLBACKS[contentType] as T[];
  
  if (FALLBACK_CONFIG.logMissingContent) {
    console.warn(`Using empty fallback for: ${contentType}`);
  }

  return fallback;
}

/**
 * Create empty state message
 */
export function getEmptyStateMessage(contentType: string): string {
  const messages: Record<string, string> = {
    products: 'No products available at the moment.',
    services: 'No services available at the moment.',
    blogs: 'No blog posts available at the moment.',
    team: 'No team members available at the moment.',
    jobs: 'No job openings available at the moment.',
    testimonials: 'No testimonials available at the moment.',
    caseStudies: 'No case studies available at the moment.',
    faqs: 'No FAQs available at the moment.'
  };

  return messages[contentType] || 'No content available at the moment.';
}

/**
 * Check if content is using fallback
 */
export function isUsingFallback<T>(data: T, fallback: T): boolean {
  return data === fallback;
}
