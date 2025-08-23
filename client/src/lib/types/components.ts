/**
 * Component Props Types
 * 
 * Centralized type definitions for component props across the application
 * Extracted from inline declarations to improve maintainability
 */

import { PageSection, PageContent } from './core';
import { BlogPost, BlogCategory, FAQItem, FAQCategory, TestimonialProps, IndustryProps, CaseStudyProps } from './content';

// ============================================================================
// SECTION COMPONENT PROPS
// ============================================================================

// Base section props that extend PageSection
export interface BaseSectionProps extends PageSection {
  isLoading?: boolean;
  isPageLoading?: boolean;
  pageContent?: PageContent;
}

// Hero Section Props
export interface BlogHeroSectionProps {
  heroSection?: PageSection;
  pageContent?: any;
  search: string;
  setSearch: (value: string) => void;
  isLoading?: boolean;
}

export interface FAQHeroSectionProps {
  title: string;
  description: string;
  isLoading: boolean;
}

export interface CaseStudiesHeroSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

export interface IndustriesHeroSectionProps extends PageSection {
  isLoading?: boolean;
}

// CTA Section Props
export interface BlogCTASectionProps {
  pageContent: PageContent;
}

export interface CaseStudiesCTASectionProps {
  pageContent: any;
  isLoading?: boolean;
}

export interface IndustriesCTASectionProps extends PageSection {
  isLoading?: boolean;
}

export interface ProductCTASectionProps {
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface AboutCTAProps extends PageSection {
  isPageLoading: boolean;
}

// Content Section Props
export interface CaseStudiesContentSectionProps {
  pageContent?: any;
  isLoading?: boolean;
}

export interface IndustryDetailContentSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

// Grid Section Props
export interface CaseStudiesGridSectionProps {
  caseStudies: CaseStudyProps[];
  pageContent: any;
  isLoading?: boolean;
}

export interface IndustriesGridSectionProps {
  industries: IndustryProps[];
  title?: string;
  subtitle?: string;
  description?: string;
  isLoading?: boolean;
}

// Filter Section Props
export interface BlogFiltersSectionProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: BlogCategory[];
  isLoading?: boolean;
}

export interface CaseStudiesFilterSectionProps {
  pageContent: any;
  isLoading?: boolean;
  onFilterChange?: (filters: any) => void;
}

// Sidebar Section Props
export interface BlogSidebarSectionProps {
  categories: BlogCategory[];
  category: string;
  setCategory: (value: string) => void;
  pageContent: PageContent;
  isLoading?: boolean;
}

// Posts/Content Section Props
export interface BlogPostsSectionProps {
  blogPosts: BlogPost[];
  isLoading: boolean;
  pageContent: PageContent;
}

// Testimonials Section Props
export interface CaseStudiesTestimonialsSectionProps {
  testimonials: TestimonialProps[];
  pageContent: any;
  isLoading?: boolean;
}

export interface IndustriesTestimonialsSection extends PageSection {
  testimonials?: TestimonialProps[];
  isLoading?: boolean;
}

// FAQ Section Props
export interface FAQStatsSectionProps {
  categories: FAQCategory[];
  faqItems: FAQItem[];
  className?: string;
}

export interface FAQCategoriesSectionProps {
  categories: FAQCategory[];
  faqItems: FAQItem[];
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
  onQuestionClick: (itemId: number) => void;
  isLoading: boolean;
}

export interface FAQPopularSectionProps {
  faqItems: FAQItem[];
  onQuestionClick: (itemId: number) => void;
  className?: string;
}

export interface FAQSearchSectionProps {
  faqItems: FAQItem[];
  onSearchResults: (results: FAQItem[]) => void;
  className?: string;
}

// About Section Props
export interface MissionVisionSectionProps extends PageSection {
  isPageLoading?: boolean;
}

export interface CoreValuesSectionProps extends PageSection {
  isPageLoading?: boolean;
}

// Industry Detail Section Props
export interface IndustryDetailSolutionsSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

export interface IndustryDetailTechnologiesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

// Industries Section Props
export interface IndustriesSolutionsSectionProps extends PageSection {
  isLoading?: boolean;
}

// Product Section Props
export interface ProductFeaturesSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface ProductDetailDescriptionSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface ProductDetailHeroSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface ProductPricingSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface ProductRelatedSectionProps {
  currentProductSlug: string;
  relatedProducts: any[];
  isLoading: boolean;
  pageContent?: PageContent;
}

export interface ProductDetailErrorSectionProps {
  error?: string;
  pageContent?: PageContent;
}

// Service Detail Section Props
export interface ServiceDetailFAQSectionProps {
  service: any & {
    faqs?: { question: string; answer: string }[];
  };
  isLoading?: boolean;
}

export interface ServiceDetailDescriptionSectionProps {
  service: any & {
    fullDescription?: string;
    benefits?: string[];
  };
  isLoading?: boolean;
}

// Industry Detail Section Props (additional)
export interface IndustryDetailHeroSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

export interface IndustryDetailChallengesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

export interface IndustryDetailCaseStudiesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

export interface IndustryDetailCTASectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

// Home Section Props
export interface CaseStudiesSectionProps {
  caseStudies: CaseStudyProps[];
  homePageContent: PageContent;
  isLoading?: boolean;
}

export interface IndustriesSectionProps {
  industries: IndustryProps[];
  homePageContent: PageContent;
  isLoading?: boolean;
}

export interface SpecializationsSectionProps {
  homePageContent: PageContent;
  services: any[];
  isLoading: boolean;
}

export interface ClientsSectionProps {
  homePageContent: PageContent;
  clientLogos: any[];
  isLoading: boolean;
}

export interface ProductsSectionProps {
  homePageContent: PageContent;
  products: any[];
  isLoading: boolean;
}

export interface AboutSectionProps {
  homePageContent: PageContent;
  isLoading: boolean;
}

export interface TestimonialsSectionProps {
  homePageContent: PageContent;
  testimonials: TestimonialProps[];
  isLoading: boolean;
}

// Hero Section Props
export interface ModernHeroProps {
  currentIndex?: number;
  isPageLoading?: boolean;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  heroContents?: any;
  heroData?: any;
  siteConfig?: SiteConfig;
  services?: ServiceProps[];
  socialLinks?: SocialLink[];
  heroSlides?: HeroSlide[];
}

// ============================================================================
// PAGE COMPONENT PROPS
// ============================================================================

// Form Types for Pages
export interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File | null;
  linkedinProfile?: string;
  portfolioUrl?: string;
  expectedSalary?: string;
  availableStartDate?: string;
  workLocation?: 'remote' | 'onsite' | 'hybrid';
}

export interface CommentFormValues {
  name: string;
  email: string;
  comment: string;
}

// ============================================================================
// UI COMPONENT PROPS
// ============================================================================

// Extended Loading Skeleton Props (base LoadingSkeletonProps is in ui.ts)
export interface TextSkeletonProps {
  lines?: number;
  width?: string;
  className?: string;
}

export interface CardSkeletonProps {
  showImage?: boolean;
  showButton?: boolean;
  className?: string;
}

export interface HeroSkeletonProps {
  showButton?: boolean;
  showImage?: boolean;
  className?: string;
}

export interface GridSkeletonProps {
  items?: number;
  columns?: number;
  className?: string;
}

export interface FormSkeletonProps {
  fields?: number;
  showButton?: boolean;
  className?: string;
}

// Theme Provider Props
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

// Error Boundary Props
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// Gradient Button Props
export interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// HOC Props
export interface WithPageVisibilityProps {
  isVisible?: boolean;
  fallbackComponent?: React.ComponentType;
}
