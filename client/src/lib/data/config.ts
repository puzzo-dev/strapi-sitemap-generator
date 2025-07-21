import {
  SiteConfig,
  NavItem,
  SocialLink
} from '@/lib/types';

export const defaultSiteConfig: SiteConfig = {
  siteName: "I-VARSE Technologies",
  siteDescription: "Digital solutions for modern businesses",
  siteUrl: "https://itechnologies.ng", // Added for SEO URLs
  contactEmail: "info@itechnologies.ng",
  contactPhone: "+234 803 123 4567",
  contactAddress: "4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria, 101283",
  logoLight: { variant: "light" },
  logoDark: { variant: "dark" },
  favicon: "../../assets/IconSolid.png",
  // ERPNext Configuration (fallback values)
  erpNextUrl: "https://i-erp.itechnologies.ng",
  erpNextApiKey: "",
  erpNextApiSecret: ""
};

export const defaultMetaTags = {
  title: defaultSiteConfig.siteName,
  description: defaultSiteConfig.siteDescription,
  keywords: ["technology", "digital solutions", "software development", "IT services", "Nigeria", "AI", "Business Automation"],
  ogImage: "/assets/I-VARSELogo3@3x.png",
  ogUrl: "https://itechnologies.ng",
  ogType: "website" as const,
  twitterCard: "summary_large_image" as const,
  canonicalUrl: "https://itechnologies.ng",
  noIndex: false,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": defaultSiteConfig.siteName,
    "description": defaultSiteConfig.siteDescription,
    "url": "https://itechnologies.ng",
    "logo": "https://itechnologies.ng/assets/I-VARSELogo3@3x.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": defaultSiteConfig.contactPhone,
      "email": defaultSiteConfig.contactEmail,
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": defaultSiteConfig.contactAddress
    }
  }
};

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    url: { url: "/" },
    order: 1,
    isButton: false
  },
  {
    id: 2,
    label: "About Us",
    url: { url: "/about" },
    order: 2,
    isButton: false,
    children: [
      {
        id: 22,
        label: "Team",
        url: { url: "/team" },
        order: 1,
        isButton: false
      }
    ]
  },
  {
    id: 3,
    label: "Services",
    url: { url: "/services" },
    order: 3,
    isButton: false
  },
  {
    id: 4,
    label: "Solutions",
    url: { url: "/products" },
    order: 4,
    isButton: false,
    children: [
      {
        id: 42,
        label: "Industries",
        url: { url: "/industries" },
        order: 1,
        isButton: false
      },
      {
        id: 43,
        label: "Case Studies",
        url: { url: "/case-studies" },
        order: 2,
        isButton: false
      }
    ]
  },
  {
    id: 5,
    label: "Tech Insights",
    url: { url: "/blog" },
    order: 5,
    isButton: false
  },
  {
    id: 6,
    label: "Careers",
    url: { url: "/careers" },
    order: 6,
    isButton: false
  },
  {
    id: 7,
    label: "Contact Us",
    url: { url: "/contact" },
    order: 7,
    isButton: true
  }
];

export const socialLinks: SocialLink[] = [{
  id: 1,
  platform: "Facebook",
  icon: "fa-facebook-f",
  href: "https://facebook.com/ivarse",
},
{
  id: 2,
  platform: "Twitter",
  icon: "fa-twitter",
  href: "https://twitter.com/ivarse",
},
{
  id: 3,
  platform: "LinkedIn",
  icon: "fa-linkedin-in",
  href: "https://linkedin.com/company/ivarse",
},
{
  id: 4,
  platform: "Instagram",
  icon: "fa-instagram",
  href: "https://instagram.com/ivarse",
},
{
  id: 5,
  platform: "YouTube",
  icon: "fa-youtube",
  href: "https://youtube.com/@ivarse",
}]; 