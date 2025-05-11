import React from "react";


// Type for a section in the PageContent from database
// interface PageSection {
//   title: string | undefined;
//   items: Array<{
//     title: string;
//     path: string;
//     description?: string;
//   }>;
// }

export interface IVarseLogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'auto';
}

// Base URL interface for reusability
export interface UrlProps {
  url: string;
  openInNewTab?: boolean;
  isExternal?: boolean;
}

// Button type that extends UrlProps
export interface ButtonProps extends UrlProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

// Shared Link item
export interface LinkItem extends UrlProps {
  label: string;
}

// Hero content type
export interface HeroSlide {
  title: string;
  subtitle: string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  backgroundImage?: string;
}

// Enhanced ServiceProps
// export interface ServiceProps {
//   id: number;
//   title: string;
//   description: string;
//   icon: string;                   // String identifier for the icon
//   iconComponent?: React.ReactNode; // The actual React icon component
//   images?: string[];              // Allow multiple images per service
//   primaryImage?: string;          // Main image to display
// }

export interface ServiceProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

// Main HeroProps
export interface HeroProps {
  heroContents: HeroSlide[];
  currentHeroIndex: number;
  isHeroLoading: boolean;
  isPageLoading: boolean;    // Properly typed as PageContent
  services?: ServiceProps[];
  products?: ProductProps[];// Consolidated service data
  currentIndex: number;    // Renamed from currentSlide for clarity
  isServicesLoading: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  companyLogo?: string;           // Optional for ModernHero
}
// Compatibility extensions
export interface ModernHeroProps extends HeroProps { }
export interface OriginalHeroProps extends HeroProps { }


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

export interface NavItem {
  id: number;
  label: string;
  url: UrlProps;
  order: number;
}

export interface SocialLink extends UrlProps {
  id: number;
  platform: string;
  icon: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: LinkItem[];
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
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'products' | 'services' | 'team' | 'contact' | 'about' | 'clients' | 'blog' | 'faq' | 'links' | 'custom';
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundColor?: string;
  items?: any[];
  // Enhanced settings to include all possible section content
  settings?: {
    primaryButton?: ButtonProps;
    secondaryButton?: ButtonProps;
    backgroundImage?: string;
    stats?: { value: string; label: string }[];
    video?: { thumbnail: string; url: UrlProps; title: string; description: string };
    maxDisplay?: number;
    layout?: 'grid' | 'list';
    featuredService?: string;
    postsToShow?: number;
    showFeaturedOnly?: boolean;
    testimonialCount?: number;
    logoSize?: 'small' | 'medium' | 'large';
    slides?: {
      title: string;
      subtitle: string;
      image: string;
      buttons?: ButtonProps[];
    }[];
    featured?: ProductProps[] | ServiceProps[];
    logos?: ClientLogo[];
    recentPosts?: BlogPost[];
    [key: string]: any;
  };
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
  url?: UrlProps;
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
  applicationUrl?: LinkItem;
}

export interface Benefit {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export interface BlogCategory {
  id?: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id?: number;
  name: string;
  full_name: string;
  user_image?: string;
  bio?: string;
  email?: string;
}

export interface BlogPost {
  id?: number;
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
  ctaButton?: ButtonProps;
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

export interface FooterProps {
  companyDescription: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  legalLinks: LinkItem[];
  copyrightText?: string;
  companyName?: string;
}

export interface PolicyPageLayoutProps {
  title: string;
  slug: string;
  description?: string;
  content: React.ReactNode;
}

// Define the structure for sitemap sections and links
export interface SitemapLink extends UrlProps {
  title: string;
  description?: string;
}

export interface SitemapSection extends PageSection {
  title: string;
  links: SitemapLink[];
}

// FAQ types
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  categoryIds: number[]; // Changed from category? string to categoryIds array to allow multiple categories
}

export interface FAQCategory {
  id: number;
  name: string;
  title: string;
  description?: string;
}

export interface FAQPageContent extends PageContent {
  categories: FAQCategory[];
  items: FAQItem[]; // Moved items to the page content level instead of being nested in categories
  content?: string;
}