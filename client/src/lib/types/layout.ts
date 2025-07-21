import React from "react";
import { SupportedLanguage } from "../utils";
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
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  translationKey?: string;
}

export interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  translationKey?: string;
  onMenuToggle?: () => void;
}

export interface FooterProps {
  companyDescription: string;
  translationKey?: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactSectionTitle: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  legalLinks: AppLinkProps[];
  copyrightText?: string;
  companyName?: string;
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
}

export interface ClientLogo {
  id?: number;
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

// Import types from core
import { UrlProps, PageSection, PageContent } from "./core"; 