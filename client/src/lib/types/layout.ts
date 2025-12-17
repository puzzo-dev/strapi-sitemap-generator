import React from "react";
import { AppLinkProps } from "./core";

// Layout and Navigation Types
export interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: string[];
}

export interface NavItem {
  id: number;
  label: string;
  translationKey?: string;
  url: UrlProps;
  order: number;
  isButton: boolean;
  children?: NavItem[]; // Add this line for dropdown support
  // Visibility control
  isVisible?: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  translationKey?: string;
}

export interface NavbarProps {
  onMenuToggle?: () => void;
}

export interface FooterProps {
  // Footer now fetches data from useGlobalLayout internally
}

export interface SocialLink extends AppLinkProps {
  id: number;
  platform: string;
  translationKey?: string;
  icon: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  translationKey?: string;
  links: AppLinkProps[];
  // Visibility control
  isVisible?: boolean;
}

export interface ClientLogo {
  id: number | string;
  name: string;
  translationKey?: string;
  image: string;
  url?: UrlProps;
}

export interface VideoContent {
  thumbnail: string;
  url: UrlProps;
  title: string;
  translationKey?: string;
  description: string;
}

export interface SitemapLink extends AppLinkProps {
  title: string;
  translationKey?: string;
  description?: string;
}

export interface SitemapSection extends PageSection {
  title: string;
  links: SitemapLink[];
}

export interface SitemapContent extends PageContent {
  sections: SitemapSection[];
}

// =============================================================================
// GLOBAL LAYOUT CMS TYPES (Strapi v5)
// =============================================================================

export interface CMSLink {
  label: string;
  linkType: 'internal' | 'external';
  page?: {
    slug: string;
    title?: string;
    documentId?: string;
  };
  externalUrl?: string;
  service?: {
    slug: string;
    title?: string;
    documentId?: string;
  };
}

export interface CMSMenuItem {
  id: number;
  documentId?: string;
  order?: number;
  menuLink: CMSLink[];
  menu_items?: CMSMenuItem[];
}

export interface CMSSocialLink {
  id: number;
  platform: string;
  socialIcon?: {
    url: string;
    documentId?: string;
  };
  linkUrl: {
    label: string;
    externalUrl: string;
  };
}

export interface CMSFooterMenu {
  id: number;
  footerMenuTitle: string;
  footerMenuLink: CMSLink[];
}

export interface GlobalLayoutData {
  header: {
    siteLogo: {
      logoText: string;
      logoImageLight: {
        url: string;
        alternativeText?: string;
      };
      logoImageDark: {
        url: string;
        alternativeText?: string;
      };
    };
    menu_items: CMSMenuItem[];
  };
  footer: {
    companyDescFooter: string;
    footerLogo: {
      logoText: string;
      logoImageLight: { url: string };
      logoImageDark: { url: string };
    };
    companyContactInfo: {
      phone: string;
      email: string;
      address: {
        formatted: string;
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postalCode?: string;
        latitude?: number;
        longitude?: number;
      };
      socialLinks: CMSSocialLink[];
    };
    FooterMenu: CMSFooterMenu[];
    legalFooter?: {
      copyright?: string;
      legalLink?: CMSLink[];
    };
  };
}

// Transformed data interfaces for component use
export interface TransformedFooterLink {
  title: string;
  href: string;
}

export interface TransformedSocialLink {
  id: number;
  platform: string;
  href: string;
}

export interface TransformedFooterColumn {
  id: number;
  title: string;
  links: TransformedFooterLink[];
}

// Import types from core
import { UrlProps, PageSection, PageContent } from "./core"; 
