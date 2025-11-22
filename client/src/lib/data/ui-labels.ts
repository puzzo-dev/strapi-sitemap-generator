/**
 * UI Labels - Static fallback data for UI text elements
 * 
 * This file serves as the final fallback when:
 * 1. Strapi CMS content is unavailable
 * 2. i18n translations are missing
 * 
 * Priority Chain:
 * Strapi CMS → i18n translations → This fallback data
 */

export const uiLabels = {
  // Common Actions
  learnMore: "Learn More",
  readMore: "Read More",
  getStarted: "Get Started",
  viewMore: "View More",
  viewAll: "View All",
  seeMore: "See More",
  requestDemo: "Request Demo",
  exploreProducts: "Explore Products",
  readSuccessStories: "Read Success Stories",
  learnMoreAboutUs: "Learn More About Us",
  
  // Navigation & Buttons
  home: "Home",
  back: "Back",
  next: "Next",
  previous: "Previous",
  submit: "Submit",
  cancel: "Cancel",
  close: "Close",
  save: "Save",
  edit: "Edit",
  delete: "Delete",
  
  // Product/Service Labels
  keyFeatures: "Key Features",
  benefits: "Benefits",
  industries: "Industries",
  caseStudies: "Case Studies",
  faqs: "FAQs",
  pricing: "Pricing",
  testimonials: "Testimonials",
  
  // Section Headers
  ourProjects: "Our Projects",
  ourServices: "Our Services",
  whyChooseUs: "Why Choose Us",
  
  // CTA Phrases
  readyToStart: "Ready to Get Started?",
  contactUsToday: "Contact us today to discuss how we can help you achieve your business goals.",
  
  // Products Page
  products: {
    heroSubtitle: "Unlock your business potential with our suite of powerful, innovative software solutions designed to streamline operations and drive growth.",
    benefitsTitle: "Transformative Solutions for Modern Businesses",
    benefitsSubtitle: "Our products are designed with your success in mind, combining powerful features with intuitive interfaces.",
    technologiesTitle: "Powered by Advanced Technologies",
    technologiesSubtitle: "Our products are built using cutting-edge technologies to deliver powerful, scalable, and secure solutions.",
    listTitle: "Our Digital Solutions",
    listSubtitle: "Comprehensive products for modern businesses",
    ctaTitle: "Ready to Transform Your Business?",
    ctaSubtitle: "Our products are designed to help you achieve your business goals. Contact us today to learn how we can customize our products to meet your specific needs.",
    relatedBadge: "Related Products",
    relatedTitle: "Related Products",
    relatedSubtitle: "Explore our other products that might be a better fit for your needs.",
  }
} as const;

export type UILabels = typeof uiLabels;
