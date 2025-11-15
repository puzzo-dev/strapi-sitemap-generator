import { PageSection } from "./core";
import { SocialLink } from "./layout";

// Re-export CaseStudyProps from its own module to avoid duplication
export { CaseStudyProps } from "./case-studies";

// Content-Specific Types
export interface ServiceProps {
  id: number;
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  fullDescription?: string
  benefits?: PageSection;
  casestudies?: PageSection;
  faqs?: PageSection;
  icon: string;
  image?: string;
}

// Use generic CardProps<ServiceProps> instead

export interface PricingProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  period: string;
  currency?: string;
  features: string[];
  isRecommended?: boolean;
  translationKey?: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  type: 'screenshot' | 'feature' | 'demo' | 'interface';
  size?: 'large' | 'medium' | 'small' | 'tall';
  description?: string;
}

export interface ProductProps {
  id: number;
  title: string;
  slug?: string;
  translationKey?: string;
  description: string;
  shortDescription?: string;
  image?: string;
  gallery?: GalleryItem[];
  keyFeatures: string[];
  benefits: PageSection;
  industries: PageSection;
  casestudies: PageSection;
  faqs: PageSection;
  pricing: PricingProps[];
  demoUrl: string;
  downloadUrl: string;
  supportUrl: string;
  category: string[];
  tags: string[];
  status: 'Active' | 'Beta' | 'Coming Soon' | 'Deprecated';
}

// Use generic CardProps<ProductProps> instead

export interface TestimonialProps {
  id: number;
  name: string;
  content: string;
  translationKey?: string;
  rating: number;
  image?: string; // Primary image field (standardized naming)
  avatar?: string; // Legacy field for backwards compatibility
  position?: string; // Job position/title
  company?: string; // Company name
}

// Use generic CardProps<TestimonialProps> instead

export interface BlogPost {
  id?: number;
  name: string;
  title: string;
  translationKey?: string;
  slug: string;
  blogCategories: BlogCategory[];
  blogIntro: string;
  content: string;
  publishedAt: string; // Primary date field (standardized naming)
  publishedDate?: string; // Legacy field for backwards compatibility
  published: boolean;
  featured: boolean;
  image?: string; // Primary image field (standardized naming)
  metaImage?: string; // Legacy field for backwards compatibility
  featuredImage?: string; // Legacy field for backwards compatibility
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  authorDetails?: BlogAuthor;
  categories?: BlogCategory[];
  readTime?: number;
  tags?: string[];
  ctaButton?: any; // ButtonProps from core
  // Additional fields referenced in components
  blogCategory?: string; // Single category convenience field
  description?: string; // Description field used in components
  // Add ERPNext specific fields
  erpNextId?: string;
  erpNextStatus?: 'draft' | 'published' | 'archived';
  erpNextAuthor?: string;
  erpNextCategory?: string;
  erpNextTags?: string[];
  erpNextComments?: BlogComment[];
}

// Use generic CardProps<BlogPost> instead

export interface BlogCategory {
  id?: number;
  name: string;
  title: string;
  translationKey?: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id?: number;
  fullName: string;
  translationKey?: string;
  userImage?: string;
  bio?: string;
  email?: string;
}

export interface BlogComment {
  id: number;
  postId: string;
  name: string;
  email: string;
  comment: string;
  translationKey?: string;
  createdDate: string;
  approved: boolean;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  translationKey?: string;
  categoryIds?: number[];
  order?: number;
  featured?: boolean;
}

export interface FAQCategory {
  id: number;
  name: string;
  title: string;
  translationKey?: string;
  description?: string;
}

export interface FAQPageContent {
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  content?: string;
  categories: FAQCategory[];
  items: FAQItem[];
}

export interface FAQCategoriesSectionProps {
  categories: FAQCategory[];
  faqItems: FAQItem[];
  activeCategory: number;
  setActiveCategory: (category: number) => void;
  expandedItems: Set<number>;
  toggleItem: (id: number) => void;
  isLoading?: boolean;
}

export interface BlogCardProps {
  item: BlogPost;
  isReversed?: boolean;
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: TestimonialProps;
  className?: string;
}

// Moved to components.ts

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  translationKey?: string;
  bio: string;
  role?: string;
  image?: string; // Primary image field (standardized naming)
  slug?: string;
  description?: string;
  // Contact information
  email?: string;
  phone?: string;
  location?: string;
  joinedAt?: string; // Standardized date field naming
  joinDate?: string; // Legacy field for backwards compatibility
  socialLinks?: SocialLink[];
  projects?: PageSection;
  relatedTeamMembers?: PageSection;
  // ERPNext specific fields
  erpNextId?: string;
  erpNextStatus?: 'active' | 'inactive' | 'terminated';
  erpNextDepartment?: string;
}

export interface TeamSectionProps extends PageSection {
  teamMembers?: TeamMember[];
  isLoading?: boolean;
  isTeamLoading?: boolean;
}

export interface JobListing {
  id: number | string;
  title: string;
  slug?: string;
  translationKey?: string;
  experience?: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  qualifications: string[];
  salary: string;
  featured?: boolean;
  postedAt?: string;
  applicationProcess?: PageSection;
  applicationUrl?: any; // AppLinkProps from core
  // Add ERPNext specific fields
  erpNextId?: string;
  erpNextStatus?: 'open' | 'closed' | 'draft';
  erpNextDepartment?: string;
  erpNextLocation?: string;
  erpNextType?: string;
  erpNextSalary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };
  erpNextApplicationDeadline?: string;
  applicationDeadline?: string;
  isActive?: boolean;
  // Extended job information
  teamDetails?: {
    teamMembers?: number;
    teamLead?: string;
    reportsTo?: string;
  };
  skills?: string[];
}

// Hero stats and features types
export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroFeature {
  icon: string;
  label: string;
}

// Hero and Page-specific types
export interface HeroProps {
  heroContents?: HeroSlide;
  badge?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  isHeroLoading: boolean;
  isPageLoading: boolean;
  currentIndex: number;
  isServicesLoading: boolean;
  translationKey?: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  companyLogo: string;
  heroSlides?: HeroSlide[]; // Add this property to include all slides
  stats?: HeroStat[];
  features?: HeroFeature[];
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  translationKey?: string;
  primaryButton?: any; // AppLinkProps from core
  secondaryButton?: any; // AppLinkProps from core
  backgroundImage?: string;
}


export interface IndustryProps {
  id: number;
  title?: string;
  name: string;
  slug: string;
  translationKey?: string;
  description: string;
  content?: string;
  icon?: string;
  image?: string;
  challenges?: string[];
  solutions?: string[];
  caseStudies?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  technologies?: string[];
  benefits?: string[];
  stats?: Array<{
    label: string;
    value: string;
  }>;
  featured?: boolean;
}



// Additional missing interfaces referenced in components
export interface AboutHeroProps extends PageSection {
  pageContent?: import('./core').PageContent;
  isLoading?: boolean;
  isPageLoading?: boolean;
}

export interface ExtendedJobListing extends JobListing {
  additionalInfo?: string;
  internalNotes?: string;
  teamDetails?: {
    teamMembers?: number;
    teamLead?: string;
    department?: string;
  };
}

export interface ExtendedTeamMember extends TeamMember {
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  expertise?: string[];
  achievements?: string[];
}

