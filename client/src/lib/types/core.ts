import React from "react";

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
  translationKey?: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
  // Add ERPNext specific fields for blog and careers
  erpNextId?: string;
  erpNextType?: 'blog' | 'career' | 'contact' | 'lead';
}

export interface PageSection {
  id: number;
  type?: 'hero' | 'features' | 'testimonials' | 'cta' | 'products' | 'services' | 'team' | 'contact' | 'about' | 'clients' | 'blog' | 'faq' | 'links' | 'jobs' | 'custom' | 'case-studies' | 'industries';
  title?: string;
  badge?: string;
  subtitle?: string;
  translationKey?: string;
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
  items?: SectionItem[];
  settings?: SectionSettings;
  isLoading?: boolean;
}

export interface SectionItem {
  id: number;
  title: string;
  description?: string;
  subtitle?: string;
  icon?: string;
  image?: string;
  url?: string;
  [key: string]: any; // Allow any additional properties
}

export interface SectionSettings {
  // Common settings
  primaryButton?: AppLinkProps;
  secondaryButton?: AppLinkProps;
  backgroundImage?: string;
  layout?: 'grid' | 'list' | 'carousel' | 'tabs' | 'masonry' | 'featured';
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large' | 'none';
  maxDisplay?: number;
  postsToShow?: number;
  showFeaturedOnly?: boolean;
  
  // Generic content - flexible for any section
  content?: Record<string, any>;
  
  // Generic items - for any section that displays items
  items?: SectionItem[];
  
  // Generic featured content
  featured?: any[];
  
  // Animation settings
  animation?: {
    type?: 'fade' | 'slide' | 'zoom' | 'none';
    duration?: number;
    delay?: number;
  };
  
  // SEO settings
  seo?: {
    hidden?: boolean;
    structuredData?: Record<string, any>;
  };
  
  // Allow any additional properties
  [key: string]: any;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string; // Added for SEO URLs
  translationKey?: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  logoLight: IVarseLogoProps;
  logoDark: IVarseLogoProps;
  favicon: string;
  // ERPNext Configuration
  erpNextUrl?: string;
  erpNextApiKey?: string;
  erpNextApiSecret?: string;
  // Language Configuration
  supportedLanguages?: string[];
  defaultLanguage?: string;
}

export interface LanguageConfig {
  supportedLanguages: string[];
  defaultLanguage: string;
  enabledTranslations: Record<string, any>;
}

export interface UITranslations {
  language: string;
  translations: Record<string, any>;
}

export interface AppLinkProps {
  title?: string;
  translationKey?: string;
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

export interface IVarseLogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'auto';
}

export interface Stat {
  value: string;
  label: string;
  translationKey?: string;
}

export interface Benefit {
  id?: number;
  title: string;
  translationKey?: string;
  description?: string;
  icon: string;
}

// Additional missing interfaces referenced in components
export interface ErrorContent {
  title: string;
  subtitle?: string;
  description?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
} 