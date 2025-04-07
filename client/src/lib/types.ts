export interface ServiceProps {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  keyFeatures: string[];
  benefits: string[];
}

export interface TestimonialProps {
  id: number;
  name: string;
  content: string;
  rating: number;
  image?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

// New types for Strapi CMS content management

export interface NavItem {
  id: number;
  label: string;
  url: string;
  order: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: { label: string; url: string }[];
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  logoLight: string;
  logoDark: string;
  favicon: string;
}

export interface PageContent {
  id: number;
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
}

export interface PageSection {
  id: number;
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'products' | 'services' | 'team' | 'contact' | 'custom';
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundColor?: string;
  items?: any[];
  settings?: Record<string, any>;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
  socialLinks?: SocialLink[];
}
