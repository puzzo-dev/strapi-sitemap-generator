export interface ServiceProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
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

export interface ClientLogo {
  id?: number;
  name: string;
  image: string;
  url?: string;
}

export interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  featured?: boolean;
  postedAt?: string;
  applicationUrl?: string;
}

export interface Benefit {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

// ERPNext Blog Content Types
export interface BlogCategory {
  name: string;
  title: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  name: string;
  full_name: string;
  user_image?: string;
  bio?: string;
  email?: string;
}

export interface BlogPost {
  name: string;
  title: string;
  slug: string;
  blog_category: string;
  blog_intro: string;
  content: string;
  published_date: string;
  published: boolean;
  featured: boolean;
  meta_image?: string;
  meta_title?: string;
  meta_description?: string;
  author?: string;
  authorDetails?: BlogAuthor;
  categories?: BlogCategory[];
  readTime?: number;
  tags?: string[];
}

export interface BlogComment {
  id: number;
  post_id: string;
  name: string;
  email: string;
  comment: string;
  created_date: string;
  approved: boolean;
}
