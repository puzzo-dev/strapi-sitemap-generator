import React, { ReactNode } from "react";
import { SUPPORTED_LANGUAGES } from "./utils";
import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DialogProps } from "@radix-ui/react-dialog";
import { ClickHandler } from "@/components/ui/GradientButton";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { sheetVariants } from "@/components/ui/sheet";


// Core/Foundational Types
export interface UrlProps {
  url: string;
  openInNewTab?: boolean;
  isExternal?: boolean;
}

export interface PageContent {
  id: number;
  slug: string;
  title: string;
  translationKey?: string; // Add this line
  description: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
}

export interface PageSection {
  id: number;
  type?: 'hero' | 'features' | 'testimonials' | 'cta' | 'products' | 'services' | 'team' | 'contact' | 'about' | 'clients' | 'blog' | 'faq' | 'links' | 'custom';
  title?: string;
  subtitle?: string;
  translationKey?: string; // Add this line
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  itemScope?: boolean;
  itemType?: string;
  itemProp?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  role?: string;
  dataTestId?: string;
  items?: Array<any>;
  settings?: {
    primaryButton?: ButtonProps | AppLinkProps;
    secondaryButton?: ButtonProps | AppLinkProps;
    backgroundImage?: string;
    url?: UrlProps;
    stats?: Stat[];
    video?: VideoContent;
    maxDisplay?: number;
    layout?: 'grid' | 'list' | 'carousel' | 'tabs' | 'masonry' | 'featured';
    columns?: number;
    gap?: 'small' | 'medium' | 'large';
    padding?: 'small' | 'medium' | 'large' | 'none';
    featuredService?: string;
    postsToShow?: number;
    showFeaturedOnly?: boolean;
    testimonialCount?: number;
    logoSize?: 'small' | 'medium' | 'large';
    slides?: HeroSlide[];
    featured?: ProductProps[] | ServiceProps[] | TestimonialProps[] | FAQItem[] | BlogPost[];
    logos?: ClientLogo[];
    recentPosts?: BlogPost[];
    animation?: {
      type?: 'fade' | 'slide' | 'zoom' | 'none';
      duration?: number;
      delay?: number;
    };
    seo?: {
      hidden?: boolean;
      structuredData?: Record<string, any>;
    };
    [key: string]: any;
  };
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  translationKey?: string; // Add this line
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  logoLight: IVarseLogoProps;
  logoDark: IVarseLogoProps;
  favicon: string;
}

// Component-Specific Types
export interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

export interface AppLinkProps {
  title?: string;
  translationKey?: string; // Add this line
  href: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isExternal?: boolean
  openInNewTab?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  // Button-like properties
  variant?: 'default' | 'outline' | 'ghost' | 'light' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  asButton?: boolean; // Flag to indicate if the link should be styled as a button
}
export interface SemanticSectionProps {
  as?: 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav' | 'div';
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  role?: string;
  itemScope?: boolean;
  itemType?: string;
  itemProp?: string;
  ariaHidden?: boolean;
  tabIndex?: number;
  dataTestId?: string;
}

export interface HeroProps {
  heroContents: HeroSlide;
  isHeroLoading: boolean;
  isPageLoading: boolean;
  currentIndex: number;
  isServicesLoading: boolean;
  translationKey?: string; // Add this line
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  companyLogo: string;
  heroSlides?: HeroSlide[]; // Add this property to include all slides
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  translationKey?: string; // Add this line
  primaryButton?: AppLinkProps;
  secondaryButton?: AppLinkProps;
  backgroundImage?: string;
}

export interface NavItem {
  id: number;
  label: string;
  translationKey?: string; // Add this line
  url: UrlProps;
  order: number;
  isButton: boolean;
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export interface BaseGradientButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'light';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  as?: 'button' | 'a' | 'div' | 'span';
  onClick?: ClickHandler;
  href?: string;
}

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

export interface CommandDialogProps extends DialogProps { }

// Content-Specific Types
export interface ServiceProps {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ServiceCardProps {
  service: ServiceProps;
  compact?: boolean;
  featured?: boolean;
}

export interface ProductProps {
  id: number;
  title: string;
  translationKey?: string; // Add this line
  description: string;
  image?: string;
  keyFeatures: string[];
  benefits: string[];
}

export interface TestimonialProps {
  id: number;
  name: string;
  content: string;
  translationKey?: string; // Add this line
  rating: number;
  image?: string;
}

export interface BlogPost {
  id?: number;
  name: string;
  title: string;
  translationKey?: string; // Add this line
  slug: string;
  blogCategory: string;
  blogIntro: string;
  content: string;
  publishedDate: string;
  published: boolean;
  featured: boolean;
  metaImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  authorDetails?: BlogAuthor;
  categories?: BlogCategory[];
  readTime?: number;
  tags?: string[];
  ctaButton?: ButtonProps;
}

export interface BlogCategory {
  id?: number;
  name: string;
  title: string;
  translationKey?: string; // Add this line
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id?: number;
  fullName: string;
  translationKey?: string; // Add this line
  userImage?: string;
  bio?: string;
  email?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  translationKey?: string; // Add this line
  answer: string;
  categoryIds: number[];
}

export interface FAQCategory {
  id: number;
  name: string;
  title: string;
  translationKey?: string; // Add this line
  description?: string;
}

export interface FAQPageContent extends PageContent {
  categories: FAQCategory[];
  items: FAQItem[];
  content?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  translationKey?: string; // Add this line
  bio: string;
  image?: string;
  socialLinks?: SocialLink[];
}

export interface ExtendedTeamMember extends Partial<TeamMember> {
  role?: string;
  translationKey?: string; // Add this line
  expertise?: string[];
  location?: string;
  joinDate?: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  projects?: Array<{
    title: string;
    description: string;
    year: string;
  }>;
  relatedTeamMembers?: number[];
}

export interface JobListing {
  id: number;
  title: string;
  translationKey?: string; // Add this line
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
  applicationUrl?: AppLinkProps;
}

export interface FooterProps {
  companyDescription: string;
  translationKey?: string; // Add this line
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  legalLinks: AppLinkProps[];
  copyrightText?: string;
  companyName?: string;
}


export interface SocialLink extends AppLinkProps {
  id: number;
  platform: string;
  translationKey?: string; // Add this line
  icon: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  translationKey?: string; // Add this line
  links: AppLinkProps[];
}

export interface ClientLogo {
  id?: number;
  name: string;
  translationKey?: string; // Add this line
  image: string;
  url?: UrlProps;
}

export interface Stat {
  value: string;
  label: string;
  translationKey?: string; // Add this line
}

export interface VideoContent {
  thumbnail: string;
  url: UrlProps;
  title: string;
  translationKey?: string; // Add this line
  description: string;
}

export interface Benefit {
  id?: number;
  title: string;
  translationKey?: string; // Add this line
  description: string;
  icon: string;
}

export interface SitemapLink extends AppLinkProps {
  title: string;
  translationKey?: string; // Add this line
  description?: string;
}

export interface SitemapSection extends PageSection {
  title: string;
  links: SitemapLink[];
}

export interface BlogCardProps extends BlogPost {
  url?: UrlProps;
}

export interface BlogComment {
  id: number;
  postId: string;
  name: string;
  email: string;
  comment: string;
  translationKey?: string; // Add this line
  createdDate: string;
  approved: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  translationKey?: string; // Add this line
}


export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  message: string;
  translationKey?: string; // Add this line
}

export interface BookingFormProps {
  className?: string;
  onSubmit?: (data: BookingFormData) => void;
  defaultValues?: Partial<BookingFormData>;
  successMessage?: string;
  errorMessage?: string;
}


export interface PolicyPageLayoutProps {
  title: string;
  slug: string;
  translationKey?: string; // Add this line
  description?: string;
  content: React.ReactNode;
}

export interface DynamicContentProps {
  content: string | { [key: string]: any };
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageSelectorProps {
  compact?: boolean;
}

export interface LanguageButtonProps {
  variant?: "ghost" | "link" | "default" | "destructive" | "outline" | "secondary";
  size?: "icon" | "default' | 'sm" | "lg";
  className?: string;
}

export interface LoadingSkeletonProps {
  lines?: number;
  variant?: 'text' | 'card' | 'image';
}

export interface ProductCardProps {
  product?: ProductProps;
  isReversed?: boolean;
}

export interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export interface ScrollToTopButtonProps {
  threshold?: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left';
  ariaLabel?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  translationKey?: string; // Add this line
}

export interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  translationKey?: string; // Add this line
  onMenuToggle?: () => void;
}

export interface IVarseLogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'auto';
}

// Toast-related types
export interface State {
  toasts: ToasterToast[]
}

export interface ToasterToast extends ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>

export type ToastProps = {
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionType = {
  ADD_TOAST: "ADD_TOAST"
  UPDATE_TOAST: "UPDATE_TOAST"
  DISMISS_TOAST: "DISMISS_TOAST"
  REMOVE_TOAST: "REMOVE_TOAST"
}

export type ToastAction =
  | {
    type: ToastActionType["ADD_TOAST"]
    toast: ToasterToast
  }
  | {
    type: ToastActionType["UPDATE_TOAST"]
    toast: Partial<ToasterToast>
  }
  | {
    type: ToastActionType["DISMISS_TOAST"]
    toastId?: ToasterToast["id"]
  }
  | {
    type: ToastActionType["REMOVE_TOAST"]
    toastId?: ToasterToast["id"]
  }

// Add this to the existing types
export interface ExtendedServiceProps extends ServiceProps {
  fullDescription?: string
  benefits?: string[]
  translationKey?: string; // Add this line
  process?: { title: string; description: string }[]
  casestudies?: { title: string; description: string; result: string }[]
  faqs?: { question: string; answer: string }[]
}

export interface MetaTagsProps {
  title?: string;
  description: string;
  translationKey?: string; // Add this line
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
}

export interface ExtendedProductProps extends ProductProps {
  fullDescription: string;
  technicalSpecs: {
    platform: string;
    technologies: string[];
    integrations: string[];
    security: string[];
    performance: {
      uptime: string;
      responseTime: string;
      concurrentUsers: string;
      dataBackup: string;
    };
  };
  pricing: {
    plans: {
      name: string;
      price: string;
      features: string[];
      recommended: boolean;
    }[];
    trialPeriod: string;
    setupFee: string;
  };
  screenshots: {
    title: string;
    image: string;
    description: string;
  }[];
  testimonials: {
    id: number;
    name: string;
    company: string;
    content: string;
    rating: number;
    image: string;
  }[];
  caseStudies: {
    title: string;
    description: string;
    metrics: {
      [key: string]: string;
    };
    challenge: string;
    solution: string;
    results: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  demoUrl: string;
  downloadUrl: string;
  supportUrl: string;
  category: string;
  tags: string[];
  status: 'Active' | 'Beta' | 'Coming Soon' | 'Deprecated';
  launchDate: string;
  lastUpdated: string;
}