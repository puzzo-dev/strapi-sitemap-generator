export interface HeroProps {
  // Common props
  heroContents?: {
    title?: string;
    subtitle?: string;
    settings?: Record<string, any>;
  }[];
  currentHeroIndex?: number;
  isHeroLoading?: boolean;
  isPageLoading?: boolean;
  pageContent?: PageContent | null;
  serviceSlides?: ServiceProps[];
  serviceImages?: string[];
  serviceIcons?: React.ReactNode[];
  currentSlide?: number;
  isServicesLoading?: boolean;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  
  // Additional props for ModernHero
  title?: string;
  subtitle?: string;
  location?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  isLoading?: boolean;
  companyLogo?: string;
}

// Keep these for backward compatibility but make them extend the base interface
export interface ModernHeroProps extends HeroProps {}

export interface OriginalHeroProps extends HeroProps {}

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
  sectionContent?: SectionContent;
}

export interface PageSection {
  id: number;
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'products' | 'services' | 'team' | 'contact' | 'about' | 'clients' | 'blog' | 'custom';
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundColor?: string;
  items?: any[];
  settings?: {
    // Hero section settings
    primaryButton?: {
      text: string;
      url: string;
    };
    secondaryButton?: {
      text: string;
      url: string;
    };
    backgroundImage?: string;
    // About section settings
    stats?: {
      value: string;
      label: string;
    }[];
    video?: {
      thumbnail: string;
      url: string;
      title: string;
      description: string;
    };
    // Products section settings
    maxDisplay?: number;
    layout?: 'grid' | 'list';
    // Services section settings
    featuredService?: string;
    // Blog section settings
    postsToShow?: number;
    showFeaturedOnly?: boolean;
    // Testimonials section settings
    testimonialCount?: number;
    // Clients section settings
    logoSize?: 'small' | 'medium' | 'large';
    [key: string]: any;
  };
}

export interface SectionContent {
  hero?: {
    slides: {
      title: string;
      subtitle: string;
      image: string;
    }[];
  };
  about?: {
    stats: {
      value: string;
      label: string;
    }[];
    video: {
      thumbnail: string;
      url: string;
      title: string;
      description: string;
    };
  };
  products?: {
    featured: ProductProps[];
  };
  services?: {
    featured: ServiceProps[];
  };
  testimonials?: {
    items: TestimonialProps[];
  };
  clients?: {
    logos: ClientLogo[];
  };
  blog?: {
    recentPosts: BlogPost[];
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
  // Company information
  companyDescription: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;

  // Social links
  socialLinks: SocialLink[];

  // Footer columns for navigation
  columns: FooterColumn[];

  // Legal links
  legalLinks: {
    label: string;
    url: string;
  }[];

  // Copyright information
  copyrightText?: string;
  companyName?: string;
}

// Update the OriginalHeroProps interface with more specific types
export interface OriginalHeroProps {
  heroContents: {
    title?: string;
    subtitle?: string;
    settings?: Record<string, any>;
  }[];
  currentHeroIndex: number;
  isHeroLoading: boolean;
  isPageLoading: boolean;
  pageContent: PageContent | null;
  serviceSlides: ServiceProps[];
  serviceImages: string[];
  serviceIcons: React.ReactNode[];
  currentSlide: number;
  isServicesLoading: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}