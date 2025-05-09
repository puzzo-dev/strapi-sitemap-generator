/**
 * Schema.org structured data generators for various content types
 * Used to enhance search engine understanding of page content
 */

// Common organization details
const organization = {
  "@type": "Organization",
  "name": "I-VARSE Technologies",
  "url": "https://www.ivarse.com",
  "logo": "https://www.ivarse.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/ivarselimited",
    "https://www.twitter.com/ivarselimited",
    "https://www.linkedin.com/company/ivarse-limited",
    "https://www.instagram.com/ivarselimited"
  ]
};

/**
 * Generate Website Schema
 * @returns Website schema for the homepage
 */
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.ivarse.com",
    "name": "I-VARSE Technologies",
    "description": "Innovative technology solutions for businesses and individuals",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.ivarse.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": organization
  };
};

/**
 * Generate Organization Schema
 * @returns Organization schema for About page and footer
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    ...organization,
    "description": "I-VARSE Technologies provides cutting-edge technology solutions to empower businesses and individuals.",
    "foundingDate": "2018",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Technology Drive",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos",
      "postalCode": "100001",
      "addressCountry": "Nigeria"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-123-456-7890",
      "contactType": "Customer Service",
      "email": "info@ivarse.com",
      "availableLanguage": ["English", "Yoruba", "Igbo", "Hausa"]
    }
  };
};

/**
 * Generate Product Schema
 * @param product - Product data
 * @returns Product schema for product pages
 */
export const generateProductSchema = (product: {
  id: number;
  name: string;
  description: string;
  price?: number;
  currency?: string;
  image: string;
  url: string;
  sku?: string;
  brand?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  reviewCount?: number;
  reviewRating?: number;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku || `IVARSE-PROD-${product.id}`,
    "mpn": `IVARSE-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "I-Varse"
    },
    "offers": {
      "@type": "Offer",
      "url": product.url,
      "priceCurrency": product.currency || "NGN",
      "price": product.price || 0,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": `https://schema.org/${product.availability || "InStock"}`
    },
    ...(product.reviewCount && product.reviewRating ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.reviewRating,
        "reviewCount": product.reviewCount
      }
    } : {})
  };
};

/**
 * Generate Service Schema
 * @param service - Service data
 * @returns Service schema for service pages
 */
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  areaServed?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    ...(service.image ? { "image": service.image } : {}),
    "provider": {
      "@type": "Organization",
      "name": service.provider || "I-VARSE Technologies",
      "url": organization.url,
      "logo": organization.logo,
      "sameAs": organization.sameAs
    },
    ...(service.areaServed ? {
      "areaServed": service.areaServed.map(area => ({
        "@type": "Place",
        "name": area
      }))
    } : {})
  };
};

/**
 * Generate Article Schema
 * @param article - Blog article data
 * @returns Article schema for blog posts
 */
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  authorName: string;
  publishDate: string;
  modifiedDate?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "I-VARSE Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ivarse.com/logo.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate
  };
};

/**
 * Generate FAQPage Schema
 * @param faqs - List of FAQs with questions and answers
 * @returns FAQPage schema for FAQ sections
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate BreadcrumbList Schema
 * @param items - Breadcrumb items with name and url
 * @returns BreadcrumbList schema for navigation
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate JobPosting Schema
 * @param job - Job posting data
 * @returns JobPosting schema for career pages
 */
export const generateJobPostingSchema = (job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  hiringOrganization: string;
  jobLocation: string;
  applicantLocationRequirements?: string[];
  baseSalary?: {
    currency: string;
    value: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  jobBenefits?: string[];
  skills?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    "validThrough": job.validThrough,
    "employmentType": job.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.hiringOrganization || "I-VARSE Technologies",
      "sameAs": "https://www.ivarse.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.jobLocation
      }
    },
    ...(job.applicantLocationRequirements ? {
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": job.applicantLocationRequirements
      }
    } : {}),
    ...(job.baseSalary ? {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": job.baseSalary.currency,
        "value": {
          "@type": "QuantitativeValue",
          "value": job.baseSalary.value,
          "unitText": job.baseSalary.unitText
        }
      }
    } : {}),
    ...(job.jobBenefits ? { "jobBenefits": job.jobBenefits.join(", ") } : {}),
    ...(job.skills ? { "skills": job.skills.join(", ") } : {})
  };
};

/**
 * Generate ContactPage Schema
 * @returns ContactPage schema for contact page
 */
export const generateContactPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "description": "Contact I-VARSE Technologies for innovative technology solutions",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.ivarse.com/contact"
    },
    "provider": organization
  };
};