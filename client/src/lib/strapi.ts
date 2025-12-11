import {
  products as localProducts,
  services as localServices,
  testimonials as localTestimonials,
  jobListings as localJobListings,
  socialLinks as localSocialLinks,
  navItems as localNavItems,
  faqItems as localFAQItems,
  defaultTeamMembers,
  footerData,
  defaultSiteConfig,
} from '@/lib/data/';
import {
  NavItem,
  SocialLink,
  SiteConfig,
  LanguageConfig,
  TeamMember,
  JobListing,
  BlogPost,
  BlogCategory,
  ClientLogo,
  PageContent,
  ContactFormData,
  FooterColumn,
  FAQItem,
  DemoRequestFormData,
  ProductProps,
  ServiceProps,
  TestimonialProps,
  FooterProps,
  BlogComment
} from './types';

// Constants for API integration
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
}

/**
 * Fetch data from Strapi API with error handling and fallback to local data
 */
async function fetchStrapiData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, using fallback data');
      return fallbackData;
    }

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
  } catch (error) {
    console.warn(`Error fetching data (${endpoint}):`, error);
    return fallbackData;
  }
}

// Utility: Fetch with language fallback (current lang -> en -> local)
async function fetchWithLanguageFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // 1. Try current language
  let data = await fetchStrapiData<T>(endpoint, [] as any);
  if ((!data || (Array.isArray(data) && data.length === 0)) && currentLanguage !== 'en') {
    // 2. Try English
    const prevLang = currentLanguage;
    setCurrentLanguage('en');
    data = await fetchStrapiData<T>(endpoint, [] as any);
    setCurrentLanguage(prevLang);
  }
  // 3. Fallback to local data
  return (data && (!Array.isArray(data) || data.length > 0)) ? data : fallbackData;
}

/**
 * Get all products from API or fallback to local data
 */
export async function getProducts(): Promise<ProductProps[]> {
  return fetchWithLanguageFallback<ProductProps[]>('products', localProducts);
}

/**
 * Get a single product by ID from API or fallback to local data
 */
export async function getProductById(id: number): Promise<ProductProps | undefined> {
  try {
    if (!STRAPI_API_TOKEN) {
      return localProducts.find(product => product.id === id);
    }

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
    const services = await fetchStrapiData<ServiceProps[]>('services', []);
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
    if (!STRAPI_API_TOKEN) {
      return localServices.find(service => service.id === id);
    }

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
  } catch (error) {
    console.warn(`Error fetching service ${id}:`, error);
    return localServices.find(service => service.id === id);
  }
}

/**
 * Get all testimonials from API or fallback to local data
 */
export async function getTestimonials(): Promise<TestimonialProps[]> {
  return fetchWithLanguageFallback<TestimonialProps[]>('testimonials', localTestimonials);
}

/**
 * Get FAQ items from API
 */
export async function getFAQItems(): Promise<FAQItem[]> {
  return fetchStrapiData<FAQItem[]>('faq-items', localFAQItems);
}

/**
 * Get navigation menu items from API
 */
export async function getNavItems(): Promise<NavItem[]> {
  return fetchStrapiData<NavItem[]>('nav-items', localNavItems);
}

/**
 * Get social media links from API
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  return fetchStrapiData<SocialLink[]>('social-links', localSocialLinks);
}

/**
 * Get footer columns from API
 */
export async function getFooterColumns(): Promise<FooterColumn[]> {
  return fetchStrapiData<FooterColumn[]>('footer-columns', []);
}

/**
 * Get site configuration from API
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    if (!STRAPI_API_TOKEN) {
      return defaultSiteConfig;
    }

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
  } catch (error) {
    console.warn('Error fetching site config:', error);
    return defaultSiteConfig;
  }
}

/**
 * Get language configuration from Strapi API
 */
export async function getLanguageConfig(): Promise<{
  supportedLanguages: string[];
  defaultLanguage: string;
  enabledTranslations: Record<string, any>;
}> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token, using default language configuration');
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const response = await fetch(`${STRAPI_URL}/api/language-config?populate=*`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      console.warn(`Strapi language config API error: ${response.status}, using defaults`);
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const result = await response.json();
    if (!result.data) {
      return {
        supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
        defaultLanguage: 'en',
        enabledTranslations: {}
      };
    }

    const config = result.data.attributes;
    return {
      supportedLanguages: config.supportedLanguages || ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
      defaultLanguage: config.defaultLanguage || 'en',
      enabledTranslations: config.translations || {}
    };
  } catch (error) {
    console.warn('Error fetching language config:', error);
    return {
      supportedLanguages: ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'],
      defaultLanguage: 'en',
      enabledTranslations: {}
    };
  }
}

/**
 * Get translations for UI elements from Strapi
 */
export async function getUITranslations(language: string = currentLanguage): Promise<Record<string, any>> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token, using local translations');
      return {};
    }

    const response = await fetch(`${STRAPI_URL}/api/ui-translations?filters[language][$eq]=${language}&populate=*`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      console.warn(`Strapi UI translations API error: ${response.status}, using local translations`);
      return {};
    }

    const result = await response.json();
    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.warn(`No UI translations found for language: ${language}`);
      return {};
    }

    // Transform Strapi data to i18n format
    const translationData = result.data[0].attributes;
    return translationData.translations || {};
  } catch (error) {
    console.warn('Error fetching UI translations:', error);
    return {};
  }
}

/**
 * Get page content by slug from Strapi API (legacy function - use getPageContent with language awareness)
 */
export async function getPageContentBySlug(slug: string): Promise<PageContent | null> {
  try {
    if (!STRAPI_API_TOKEN) {
      console.warn('No Strapi API token provided, returning null');
      return null;
    }

    // Use Strapi API with language param
    const locale = currentLanguage;
    const localeSuffix = locale !== 'en' ? `&locale=${locale}` : '';

    const response = await fetch(`${STRAPI_URL}/api/page-contents?filters[slug][$eq]=${slug}&populate=*${localeSuffix}`, {
      headers: strapiHeaders
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Handle collection response from Strapi
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      const pageData = result.data[0];
      return {
        id: pageData.id,
        ...pageData.attributes
      };
    }

    // If no data found, try English fallback
    if (locale !== 'en') {
      const prevLang = currentLanguage;
      setCurrentLanguage('en');
      const englishResponse = await fetch(`${STRAPI_URL}/api/page-contents?filters[slug][$eq]=${slug}&populate=*`, {
        headers: strapiHeaders
      });
      setCurrentLanguage(prevLang);

      if (englishResponse.ok) {
        const englishResult = await englishResponse.json();
        if (englishResult.data && Array.isArray(englishResult.data) && englishResult.data.length > 0) {
          const pageData = englishResult.data[0];
          return {
            id: pageData.id,
            ...pageData.attributes
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`Error fetching page content (${slug}):`, error);
    return null;
  }
}

/**
 * Get ERPNext credentials securely from Strapi backend
 */
async function getERPNextCredentials() {
  try {
    // Try to get ERPNext credentials from Strapi SiteConfig first (secure)
    const siteConfig = await getSiteConfig();
    if (siteConfig.erpNextUrl && siteConfig.erpNextApiKey && siteConfig.erpNextApiSecret) {
      return {
        url: siteConfig.erpNextUrl,
        apiKey: siteConfig.erpNextApiKey,
        apiSecret: siteConfig.erpNextApiSecret
      };
    }
  } catch (error) {
    console.warn('Could not fetch ERPNext credentials from Strapi SiteConfig, using environment variables');
  }

  // Fallback to environment variables (less secure, for development only)
  return {
    url: import.meta.env.VITE_ERP_NEXT_URL,
    apiKey: import.meta.env.VITE_ERP_NEXT_API_KEY,
    apiSecret: import.meta.env.VITE_ERP_NEXT_API_SECRET
  };
}

/**
 * Get team members from ERPNext API
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    // Get ERPNext credentials securely from Strapi
    const erpCredentials = await getERPNextCredentials();

    if (erpCredentials.url && erpCredentials.apiKey && erpCredentials.apiSecret) {
      try {
        const response = await fetch(`${erpCredentials.url}/api/resource/Employee?filters=[["status","=","Active"]]&fields=["name","employee_name","designation","department","image","bio","email","phone","location","date_of_joining","linkedin","twitter","github"]`, {
          headers: {
            'Authorization': `token ${erpCredentials.apiKey}:${erpCredentials.apiSecret}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            return result.data.map((employee: any, index: number) => {
              const employeeName = employee.employee_name || 'Team Member';
              const slug = employeeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

              return {
                id: employee.name || index + 1,
                name: employeeName,
                slug: slug,
                position: employee.designation || 'Employee',
                bio: employee.bio || 'Dedicated team member contributing to our success.',
                image: employee.image || `https://images.unsplash.com/photo-${1500648767791 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                email: employee.email,
                phone: employee.phone,
                location: employee.location,
                joinDate: employee.date_of_joining,
                socialMedia: {
                  linkedin: employee.linkedin,
                  twitter: employee.twitter,
                  github: employee.github
                },
                erpNextId: employee.name,
                erpNextStatus: 'active',
                erpNextDepartment: employee.department
              };
            });
          }
        }
      } catch (erpError) {
        console.warn('Error fetching team members from ERPNext:', erpError);
      }
    }

    // Fallback to local data
    return defaultTeamMembers;
  } catch (error) {
    console.warn('Error fetching team members:', error);
    return defaultTeamMembers;
  }
}

/**
 * Get job listings from API with ERPNext integration
 */
export async function getJobListings(): Promise<JobListing[]> {
  try {
    // First try to get from Strapi
    const strapiJobs = await fetchStrapiData<JobListing[]>('job-listings', []);

    // If we have Strapi jobs, return them
    if (strapiJobs.length > 0) {
      return strapiJobs;
    }

    // If no Strapi jobs, try ERPNext with secure credentials
    const erpCredentials = await getERPNextCredentials();

    if (erpCredentials.url && erpCredentials.apiKey && erpCredentials.apiSecret) {
      try {
        const response = await fetch(`${erpCredentials.url}/api/resource/Job Opening?filters=[["status","=","Open"]]&fields=["name","job_title","department","location","employment_type","description","requirements","responsibilities","salary_min","salary_max","currency","deadline"]`, {
          headers: {
            'Authorization': `token ${erpCredentials.apiKey}:${erpCredentials.apiSecret}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            return result.data.map((job: any) => ({
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
              postedAt: new Date().toISOString(),
              erpNextId: job.name,
              erpNextStatus: 'open',
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
          }
        }
      } catch (erpError) {
        console.warn('Error fetching jobs from ERPNext:', erpError);
      }
    }

    // Fallback to local data
    return localJobListings;
  } catch (error) {
    console.warn('Error fetching job listings:', error);
    return localJobListings;
  }
}

/**
 * Get a single job by ID from API with ERPNext integration
 */
export async function getJobById(id: number): Promise<JobListing | undefined> {
  try {
    // First try Strapi
    if (STRAPI_API_TOKEN) {
      const response = await fetch(`${STRAPI_URL}/api/job-listings/${id}?populate=*`, {
        headers: strapiHeaders
      });

      if (response.ok) {
        const result = await response.json();
        return {
          id: result.data.id,
          ...result.data.attributes
        };
      }
    }

    // Try ERPNext if Strapi fails
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (ERP_NEXT_URL && ERP_NEXT_API_KEY && ERP_NEXT_API_SECRET) {
      try {
        const response = await fetch(`${ERP_NEXT_URL}/api/resource/Job Opening/${id}`, {
          headers: {
            'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const job = await response.json();
          return {
            id: job.data.name,
            title: job.data.job_title || 'Job Opening',
            department: job.data.department || 'General',
            location: job.data.location || 'Remote',
            type: job.data.employment_type || 'Full-time',
            description: job.data.description || '',
            responsibilities: job.data.responsibilities ? job.data.responsibilities.split('\n').filter((r: string) => r.trim()) : [],
            requirements: job.data.requirements ? job.data.requirements.split('\n').filter((r: string) => r.trim()) : [],
            benefits: ['Competitive salary', 'Health insurance', 'Professional development', 'Remote work options'],
            qualifications: ['Relevant experience', 'Strong communication skills', 'Team player'],
            salary: job.data.salary_min && job.data.salary_max ? `${job.data.currency || '$'}${job.data.salary_min} - ${job.data.salary_max}` : 'Competitive',
            featured: false,
            postedAt: new Date().toISOString(),
            erpNextId: job.data.name,
            erpNextStatus: 'open',
            erpNextDepartment: job.data.department,
            erpNextLocation: job.data.location,
            erpNextType: job.data.employment_type,
            erpNextSalary: {
              min: job.data.salary_min,
              max: job.data.salary_max,
              currency: job.data.currency,
              period: 'yearly'
            },
            erpNextApplicationDeadline: job.data.deadline
          };
        }
      } catch (erpError) {
        console.warn('Error fetching job from ERPNext:', erpError);
      }
    }

    // Fallback to local data
    return localJobListings.find(job => job.id === id);
  } catch (error) {
    console.warn(`Error fetching job ${id}:`, error);
    return localJobListings.find(job => job.id === id);
  }
}

/**
 * ERPNext Blog API functions
 */

// Base URL for ERPNext API - consolidated to use single URL
// Will be dynamically set from SiteConfig or environment variables
let ERP_NEXT_BASE_URL: string | undefined;

/**
 * Fetch data from ERPNext API with error handling
 */
async function fetchERPNextData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('No ERPNext API credentials provided, using fallback data');
      return fallbackData;
    }

    const response = await fetch(`${ERP_NEXT_BASE_URL}/api/${endpoint}`, {
      headers: {
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`,
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
 * Get all blog posts from ERPNext API with enhanced filtering
 */
export async function getBlogPosts(params: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
  author?: string;
  status?: 'draft' | 'published' | 'archived';
} = {}): Promise<BlogPost[]> {
  try {
    // Create query parameters
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.tag) queryParams.append('tag', params.tag);
    if (params.author) queryParams.append('author', params.author);
    if (params.status) queryParams.append('status', params.status);

    // Try to fetch from ERPNext API first
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (ERP_NEXT_URL && ERP_NEXT_API_KEY && ERP_NEXT_API_SECRET) {
      try {
        // Build ERPNext filters
        let filters = '[["published","=",1]]';
        if (params.category) {
          filters = `[["published","=",1],["blog_category","=","${params.category}"]]`;
        }
        if (params.featured) {
          filters = `[["published","=",1],["featured","=",1]]`;
        }

        const response = await fetch(`${ERP_NEXT_URL}/api/resource/Blog Post?filters=${filters}&fields=["name","title","blog_intro","content","published_on","blog_category","author","featured","meta_image","meta_title","meta_description","blog_category","tags"]&order_by=published_on desc`, {
          headers: {
            'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            const erpPosts = result.data.map((post: any) => ({
              id: post.name,
              name: post.name,
              title: post.title || 'Blog Post',
              slug: post.name.toLowerCase().replace(/\s+/g, '-'),
              blogCategories: post.blog_category ? [{
                id: post.blog_category,
                name: post.blog_category,
                slug: post.blog_category.toLowerCase().replace(/\s+/g, '-'),
                description: '',
                title: post.blog_category
              }] : [],
              blogIntro: post.blog_intro || '',
              content: post.content || '',
              publishedAt: post.published_on || new Date().toISOString(),
              published: true,
              featured: post.featured === 1,
              metaImage: post.meta_image,
              metaTitle: post.meta_title || post.title,
              metaDescription: post.meta_description || post.blog_intro,
              author: post.author || 'Admin',
              readTime: Math.ceil((post.content?.length || 0) / 200), // Rough estimate
              tags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : [],
              erpNextId: post.name,
              erpNextStatus: 'published',
              erpNextAuthor: post.author,
              erpNextCategory: post.blog_category,
              erpNextTags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : []
            }));

            // Apply additional filtering
            let filteredPosts = erpPosts;
            if (params.tag) {
              filteredPosts = filteredPosts.filter((post: BlogPost) =>
                post.tags?.some((tag: string) => tag.toLowerCase().includes(params.tag!.toLowerCase()))
              );
            }
            if (params.limit) {
              filteredPosts = filteredPosts.slice(0, params.limit);
            }

            return filteredPosts;
          }
        }
      } catch (erpError) {
        console.warn('Error fetching blog posts from ERPNext:', erpError);
      }
    }

    // Fallback to local blog posts with filtering
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
 * Filter blog posts based on parameters
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
      post.blogCategories.some((category: BlogCategory) =>
        category.name.toLowerCase() === params.category?.toLowerCase()
      )
    );
  }

  // Filter by featured
  if (params.featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === params.featured);
  }

  // Filter by tag (if tags are implemented)
  if (params.tag) {
    filteredPosts = filteredPosts.filter(post =>
      post.tags?.some(tag => tag.toLowerCase().includes(params.tag!.toLowerCase()))
    );
  }

  // Apply limit
  if (params.limit) {
    filteredPosts = filteredPosts.slice(0, params.limit);
  }

  return filteredPosts;
}

/**
 * Get a single blog post by slug with ERPNext integration
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Import dummy blog posts for fallback
    const { blogPosts } = await import('./data');

    // Try ERPNext first
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (ERP_NEXT_URL && ERP_NEXT_API_KEY && ERP_NEXT_API_SECRET) {
      try {
        // Convert slug back to ERPNext name format
        const postName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        const response = await fetch(`${ERP_NEXT_URL}/api/resource/Blog Post/${postName}`, {
          headers: {
            'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            const post = result.data;
            return {
              id: post.name,
              name: post.name,
              title: post.title || 'Blog Post',
              slug: post.name.toLowerCase().replace(/\s+/g, '-'),
              blogCategories: post.blog_category ? [{
                id: post.blog_category,
                name: post.blog_category,
                slug: post.blog_category.toLowerCase().replace(/\s+/g, '-'),
                description: '',
                title: post.blog_category
              }] : [],
              blogIntro: post.blog_intro || '',
              content: post.content || '',
              publishedAt: post.published_on || new Date().toISOString(),
              published: true,
              featured: post.featured === 1,
              metaImage: post.meta_image,
              metaTitle: post.meta_title || post.title,
              metaDescription: post.meta_description || post.blog_intro,
              author: post.author || 'Admin',
              readTime: Math.ceil((post.content?.length || 0) / 200),
              tags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : [],
              erpNextId: post.name,
              erpNextStatus: 'published',
              erpNextAuthor: post.author,
              erpNextCategory: post.blog_category,
              erpNextTags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()) : []
            };
          }
        }
      } catch (erpError) {
        console.warn('Error fetching blog post from ERPNext:', erpError);
      }
    }

    // Find matching post in dummy data
    const dummyPost = blogPosts.find(post => post.slug === slug) || null;
    return dummyPost;
  } catch (error) {
    console.warn(`Error fetching blog post by slug ${slug}:`, error);
    const { blogPosts } = await import('./data');
    return blogPosts.find(post => post.slug === slug) || null;
  }
}

/**
 * Get analytics configuration from Strapi CMS
 */
export async function getAnalyticsConfig(language?: string): Promise<any> {
  try {
    const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
    const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

    if (STRAPI_API_URL && STRAPI_API_TOKEN) {
      const lang = language || 'en';
      const response = await fetch(`${STRAPI_API_URL}/api/analytics-config?locale=${lang}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data?.attributes || null;
      }
    }

    // Fallback configuration - minimal defaults when Strapi is unavailable
    return {
      enabled: false, // Disabled by default when no Strapi config
      debugMode: false,
      cookieConsent: true,
      dataRetentionDays: 365,
      anonymizeIP: true,
      googleAnalytics: {
        measurementId: '',
        enabled: false,
        enhancedEcommerce: false,
        customDimensions: [],
        customMetrics: []
      },
      facebookPixel: {
        pixelId: '',
        enabled: false,
        advancedMatching: false,
        automaticMatching: false,
        customEvents: []
      },
      matomo: {
        siteId: '1',
        url: '',
        enabled: false,
        trackSubdomains: false,
        cookieDomain: window.location.hostname,
        domains: [window.location.hostname]
      }
    };
  } catch (error) {
    console.warn('Error fetching analytics config:', error);
    return null;
  }
}

/**
 * Enhanced language-aware content fetching with improved fallback
 */
export async function getLanguageAwareContent<T>(
  endpoint: string,
  language: string,
  fallbackLanguages: string[] = ['en'],
  options: {
    populate?: string;
    filters?: Record<string, any>;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  } = {}
): Promise<T | null> {
  const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
    console.warn('Strapi configuration missing');
    return null;
  }

  const languagesToTry = [language, ...fallbackLanguages].filter((lang, index, arr) =>
    arr.indexOf(lang) === index
  );

  for (const lang of languagesToTry) {
    try {
      const params = new URLSearchParams({
        locale: lang,
        ...(options.populate && { populate: options.populate }),
        ...(options.sort && { sort: options.sort }),
        ...(options.pagination && {
          'pagination[page]': options.pagination.page.toString(),
          'pagination[pageSize]': options.pagination.pageSize.toString()
        })
      });

      // Add filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, value);
        });
      }

      const response = await fetch(`${STRAPI_API_URL}/api/${endpoint}?${params}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && (Array.isArray(data.data) ? data.data.length > 0 : data.data)) {
          return data.data;
        }
      }
    } catch (error) {
      console.warn(`Error fetching ${endpoint} for language ${lang}:`, error);
    }
  }

  return null;
}

/**
 * Get page content with language awareness and section visibility
 */
export async function getPageContent(
  pageSlug: string,
  language: string = 'en',
  includeHidden: boolean = false
): Promise<any> {
  try {
    const content = await getLanguageAwareContent<any>(
      `pages/${pageSlug}`,
      language,
      ['en'],
      {
        populate: 'deep',
        filters: includeHidden ? {} : { isVisible: true }
      }
    );

    if (content && typeof content === 'object') {
      // Filter sections based on visibility if not including hidden
      if (!includeHidden && content.attributes && typeof content.attributes === 'object' && 'sections' in content.attributes) {
        const attributes = content.attributes as any;
        if (Array.isArray(attributes.sections)) {
          attributes.sections = attributes.sections.filter(
            (section: any) => section.isVisible !== false
          );
        }
      }
      return content;
    }

    // Fallback to local data
    const pagesModule = await import('./data/pages');
    const pageKey = `${pageSlug}PageContent`;
    return (pagesModule as any)[pageKey] || null;
  } catch (error) {
    console.warn(`Error fetching page content for ${pageSlug}:`, error);
    const pagesModule = await import('./data/pages');
    const pageKey = `${pageSlug}PageContent`;
    return (pagesModule as any)[pageKey] || null;
  }
}

/**
 * Get all blog categories from ERPNext
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    // Try ERPNext first
    const ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
    const ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
    const ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;

    if (ERP_NEXT_URL && ERP_NEXT_API_KEY && ERP_NEXT_API_SECRET) {
      try {
        const response = await fetch(`${ERP_NEXT_URL}/api/resource/Blog Category?fields=["name","title","description","route","published"]&filters=[["published","=",1]]`, {
          headers: {
            'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            return result.data.map((category: any) => ({
              id: category.name,
              name: category.title || category.name,
              slug: category.route || category.name.toLowerCase().replace(/\s+/g, '-'),
              description: category.description || '',
              title: category.title || category.name,
              erpNextId: category.name,
              erpNextStatus: 'published'
            }));
          }
        }
      } catch (erpError) {
        console.warn('Error fetching blog categories from ERPNext:', erpError);
      }
    }

    // Fallback to local blog categories
    const { blogCategories } = await import('./data');
    return blogCategories;
  } catch (error) {
    console.warn('Error fetching blog categories:', error);
    const { blogCategories } = await import('./data');
    return blogCategories;
  }
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
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_URL: string | undefined;
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('ERPNext credentials not configured, using fallback');
      // Simulate successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Comment submitted successfully' };
    }

    // Format data for ERPNext API - Blog Comment
    const erpNextData = {
      doctype: 'Blog Comment',
      blog_post: postId,
      comment: comment.comment,
      commenter: comment.name,
      commenter_email: comment.email,
      published: 1,
      source: 'Website'
    };

    // Call ERPNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Blog Comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting blog comment:', error);
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
    if (!STRAPI_API_TOKEN) {
      return footerData;
    }

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
  } catch (error) {
    console.warn('Error fetching footer:', error);
    return footerData;
  }
}

/**
 * Submit contact form data to ERPNext with enhanced lead management
 */
export async function submitContactForm(data: ContactFormData): Promise<any> {
  try {
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_URL: string | undefined;
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('ERPNext credentials not configured, using fallback');
      // Simulate successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Form submitted successfully' };
    }

    // Format data for ERPNext API - Lead creation
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

    // Call ERPNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting to ERPNext:', error);
    throw error;
  }
}

/**
 * Submit a demo request to ERPNext with enhanced event management
 */
export async function submitDemoRequest(data: DemoRequestFormData): Promise<any> {
  try {
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_URL: string | undefined;
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('ERPNext credentials not configured, using fallback');
      // Simulate successful demo request with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Demo request scheduled successfully' };
    }

    // Ensure required fields have sensible defaults
    const name = data.name || data.fullName || 'Prospect';
    const topic = data.topic || data.productInterest || 'Demo Request';
    const date = data.date || new Date().toISOString().slice(0, 10);
    const time = data.time || '09:00';
    const message = data.message || data.challenges || '';

    // Format data for ERPNext API - Enhanced Event creation
    const demoDate = new Date(`${date}T${time}`);
    // Add duration (default 1 hour)
    const endDate = new Date(demoDate.getTime() + 60 * 60 * 1000);

    const erpNextData = {
      doctype: 'Event',
      subject: `Demo Request: ${topic}`,
      event_type: 'Private',
      description: message,
      starts_on: demoDate.toISOString(),
      ends_on: endDate.toISOString(),
      all_day: 0,
      event_participants: [
        {
          reference_doctype: 'Contact',
          reference_docname: name,
          email: data.email,
          phone: data.phone
        }
      ]
    };

    // Call ERPNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    throw error;
  }
}

/**
 * Subscribe to newsletter - ERPNext Email Group Member
 */
export async function subscribeToNewsletter(email: string): Promise<any> {
  try {
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_URL: string | undefined;
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('ERPNext credentials not configured, using fallback');
      // Simulate successful subscription with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Newsletter subscription successful' };
    }

    // Format data for ERPNext API - Email Group Member
    const erpNextData = {
      doctype: 'Email Group Member',
      email_group: 'Newsletter Subscribers', // You can make this configurable
      email: email,
      status: 'Subscribed',
      source: 'Website'
    };

    // Call ERPNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Email Group Member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

/**
 * Submit job application to ERPNext HR module
 */
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
  try {
    // Try to get ERPNext credentials from SiteConfig first, then fallback to environment variables
    let ERP_NEXT_URL: string | undefined;
    let ERP_NEXT_API_KEY: string | undefined;
    let ERP_NEXT_API_SECRET: string | undefined;

    try {
      const siteConfig = await getSiteConfig();
      ERP_NEXT_URL = siteConfig.erpNextUrl;
      ERP_NEXT_API_KEY = siteConfig.erpNextApiKey;
      ERP_NEXT_API_SECRET = siteConfig.erpNextApiSecret;
    } catch (error) {
      console.warn('Could not fetch SiteConfig, using environment variables');
    }

    // Fallback to environment variables if SiteConfig doesn't have the credentials
    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      ERP_NEXT_URL = import.meta.env.VITE_ERP_NEXT_URL;
      ERP_NEXT_API_KEY = import.meta.env.VITE_ERP_NEXT_API_KEY;
      ERP_NEXT_API_SECRET = import.meta.env.VITE_ERP_NEXT_API_SECRET;
    }

    if (!ERP_NEXT_URL || !ERP_NEXT_API_KEY || !ERP_NEXT_API_SECRET) {
      console.warn('ERPNext credentials not configured, using fallback');
      // Simulate successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Job application submitted successfully' };
    }

    // Format data for ERPNext API - Job Applicant
    const erpNextData = {
      doctype: 'Job Applicant',
      applicant_name: data.fullName,
      email_id: data.email,
      phone_number: data.phone,
      cover_letter: data.coverLetter,
      experience: data.yearsOfExperience,
      job_title: data.jobTitle || 'General Application',
      source: 'Website',
      status: 'Open'
    };

    // Call ERPNext API
    const response = await fetch(`${ERP_NEXT_URL}/api/resource/Job Applicant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${ERP_NEXT_API_KEY}:${ERP_NEXT_API_SECRET}`
      },
      body: JSON.stringify(erpNextData)
    });

    if (!response.ok) {
      throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
}

/**
 * Fetch dynamic ads from Strapi
 */
export async function getAdsFromStrapi(filters?: {
  position?: string;
  targetAudience?: string[];
  maxAds?: number;
}): Promise<any[]> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('locale', currentLanguage);

    // Add active status filter
    params.append('filters[isActive][$eq]', 'true');

    // Add date filters for active campaigns
    const now = new Date().toISOString();
    params.append('filters[$or][0][startDate][$null]', 'true');
    params.append('filters[$or][1][startDate][$lte]', now);
    params.append('filters[$and][0][$or][0][endDate][$null]', 'true');
    params.append('filters[$and][0][$or][1][endDate][$gte]', now);

    // Add position filter if specified
    if (filters?.position) {
      params.append('filters[position][$eq]', filters.position);
    }

    // Add pagination
    if (filters?.maxAds) {
      params.append('pagination[limit]', filters.maxAds.toString());
    }

    // Sort by priority
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'createdAt:desc');

    const response = await fetch(
      `${STRAPI_URL}/api/ad-slides?${params.toString()}`,
      { headers: strapiHeaders }
    );

    if (!response.ok) {
      throw new Error(`Strapi ads fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return transformStrapiAds(data.data || []);
  } catch (error) {
    console.error('Error fetching ads from Strapi:', error);
    throw error;
  }
}

/**
 * Transform Strapi ads data to match local AdSlide interface
 */
function transformStrapiAds(strapiAds: any[]): any[] {
  return strapiAds.map(item => {
    const attributes = item.attributes;
    return {
      id: item.id,
      title: attributes.title,
      subtitle: attributes.subtitle,
      description: attributes.description,
      bgColor: attributes.bgColor || 'from-blue-600 to-blue-800',
      icon: attributes.icon || 'Star',
      cta: attributes.cta || 'Learn More',
      ctaUrl: attributes.ctaUrl,
      image: attributes.image?.data?.attributes?.url ?
        `${STRAPI_URL}${attributes.image.data.attributes.url}` : undefined,
      priority: attributes.priority || 999,
      startDate: attributes.startDate ? new Date(attributes.startDate) : undefined,
      endDate: attributes.endDate ? new Date(attributes.endDate) : undefined,
      targetAudience: attributes.targetAudience?.map((ta: any) => ta.audience) || [],
      clickTrackingId: attributes.clickTrackingId || `strapi-ad-${item.id}`,
      isActive: attributes.isActive,
      adType: attributes.adType,
      position: attributes.position
    };
  });
}

/**
 * Track ad analytics to Strapi
 */
export async function trackAdAnalytics(data: {
  adId: string;
  action: 'view' | 'click';
  timestamp?: Date;
  userAgent?: string;
  referrer?: string;
}): Promise<void> {
  try {
    const analyticsData = {
      data: {
        adId: data.adId,
        action: data.action,
        timestamp: data.timestamp || new Date(),
        userAgent: data.userAgent || navigator.userAgent,
        referrer: data.referrer || document.referrer,
        sessionId: sessionStorage.getItem('session-id') || 'anonymous'
      }
    };

    await fetch(`${STRAPI_URL}/api/ad-analytics`, {
      method: 'POST',
      headers: strapiHeaders,
      body: JSON.stringify(analyticsData)
    });
  } catch (error) {
    console.warn('Failed to track ad analytics:', error);
    // Don't throw error for analytics tracking failures
  }
}
