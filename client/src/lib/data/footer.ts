import {
  FooterProps,
  FooterColumn,
  AppLinkProps
} from '@/lib/types';
import { socialLinks } from './config';
import { services } from './services';

// Extract service links from services using prop drilling
const extractServiceLinks = (): AppLinkProps[] => {
  const serviceLinks: AppLinkProps[] = [];

  services.forEach((service) => {
    serviceLinks.push({
      title: service.title,
      href: `/services/${service.slug || service.id}`,
      translationKey: `footer-service-${service.slug || service.id}`
    });
  });

  // Add "View All Services" link
  serviceLinks.push({
    title: "View All Services",
    href: "/services",
    translationKey: "footer-view-all-services"
  });

  return serviceLinks;
};

// Create footer columns using prop drilling
const createFooterColumns = (): FooterColumn[] => [
  {
    id: 1,
    title: "Important Links",
    translationKey: "footer-important-links",
    isVisible: true,
    links: [
      { title: "About Us", href: "/about-us", translationKey: "footer-about" },
      { title: "Services", href: "/services", translationKey: "footer-services" },
      { title: "Products", href: "/solutions", translationKey: "footer-products" },
      { title: "Insights", href: "/blog", translationKey: "footer-insights" },
      { title: "Careers", href: "/careers", translationKey: "footer-careers" },
      { title: "Contact", href: "/contact", translationKey: "footer-contact" },
      { title: "Our Team", href: "/team", translationKey: "footer-team" },
      { title: "FAQ", href: "/faq", translationKey: "footer-faq" },
      { title: "Insights Pages", href: "/blog", translationKey: "footer-insights-pages" },
    ],
  },
  {
    id: 2,
    title: "Services",
    translationKey: "footer-services-column",
    isVisible: true,
    links: extractServiceLinks(), // Use prop drilling from services
  },
];

export const footerLinks: {
  columns: FooterColumn[];
  legalLinks: AppLinkProps[];
} = {
  columns: createFooterColumns(),
  legalLinks: [
    { title: "Terms of Service", href: "/terms", translationKey: "footer-terms" },
    { title: "Privacy Policy", href: "/privacy", translationKey: "footer-privacy" },
    { title: "Cookie Policy", href: "/cookies", translationKey: "footer-cookies" },
    { title: "Accessibility", href: "/accessibility", translationKey: "footer-accessibility" },
    { title: "Sitemap", href: "/sitemap", translationKey: "footer-sitemap" },
  ],
};

export const footerData: FooterProps = {
  companyDescription:
    "Leading digital innovation company providing premium web development and IT consulting services for businesses looking to transform their digital presence.",
  contactAddress: "4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria",
  contactPhone: "+234 123 456 7890",
  contactEmail: "contact@itechnologies.ng",
  contactSectionTitle: "Contact Info",
  socialLinks: socialLinks,
  columns: footerLinks.columns,
  legalLinks: footerLinks.legalLinks,
  companyName: "I-VARSE Technologies",
};

// Helper functions for accessing footer data
export const footerHelpers = {
  // Get all service links
  getServiceLinks: (): AppLinkProps[] => extractServiceLinks(),

  // Get service links without "View All Services"
  getServiceLinksOnly: (): AppLinkProps[] => {
    return extractServiceLinks().filter(link => link.title !== "View All Services");
  },

  // Get service by slug
  getServiceBySlug: (slug: string): AppLinkProps | undefined => {
    return extractServiceLinks().find(link =>
      link.href.includes(slug) && link.title !== "View All Services"
    );
  },

  // Get all footer columns
  getColumns: (): FooterColumn[] => footerLinks.columns,

  // Get column by ID
  getColumnById: (id: number): FooterColumn | undefined => {
    return footerLinks.columns.find(column => column.id === id);
  },

  // Get column by title
  getColumnByTitle: (title: string): FooterColumn | undefined => {
    return footerLinks.columns.find(column =>
      column.title.toLowerCase().includes(title.toLowerCase())
    );
  },

  // Get legal links
  getLegalLinks: (): AppLinkProps[] => footerLinks.legalLinks,

  // Get total number of services
  getServiceCount: (): number => services.length,

  // Get services by category (if needed in future)
  getServicesByCategory: (category: string): AppLinkProps[] => {
    return extractServiceLinks().filter(link =>
      link.title?.toLowerCase().includes(category.toLowerCase()) &&
      link.title !== "View All Services"
    );
  }
};

// Export default for backward compatibility
export default footerData;
