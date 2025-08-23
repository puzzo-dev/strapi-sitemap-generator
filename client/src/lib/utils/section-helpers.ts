/**
 * Section Finder Utilities
 * 
 * Eliminates the repeated pattern of finding sections by type
 * that appears 100+ times across the codebase.
 */

import { PageContent, PageSection } from '@/lib/types';
import { isSectionVisible, filterVisibleSections } from './visibility-helpers';

export type SectionType = 
  | 'hero'
  | 'cta' 
  | 'features'
  | 'testimonials'
  | 'products'
  | 'services'
  | 'team'
  | 'contact'
  | 'about'
  | 'clients'
  | 'blog'
  | 'faq'
  | 'links'
  | 'jobs'
  | 'custom'
  | 'case-studies'
  | 'industries';

/**
 * Find a specific section by type
 */
export function findSection(
  pageContent: PageContent | null | undefined,
  type: SectionType
): PageSection | undefined {
  return pageContent?.sections?.find(s => s.type === type);
}

/**
 * Find a visible section by type
 */
export function findVisibleSection(
  pageContent: PageContent | null | undefined,
  type: SectionType
): PageSection | undefined {
  const section = findSection(pageContent, type);
  return section && isSectionVisible(section) ? section : undefined;
}

/**
 * Hook to get commonly used sections
 * Replaces the repeated pattern of multiple find() calls
 */
export function useSectionFinder(pageContent: PageContent | null | undefined) {
  return {
    hero: findSection(pageContent, 'hero'),
    cta: findSection(pageContent, 'cta'),
    features: findSection(pageContent, 'features'),
    testimonials: findSection(pageContent, 'testimonials'),
    products: findSection(pageContent, 'products'),
    services: findSection(pageContent, 'services'),
    team: findSection(pageContent, 'team'),
    contact: findSection(pageContent, 'contact'),
    about: findSection(pageContent, 'about'),
    clients: findSection(pageContent, 'clients'),
    blog: findSection(pageContent, 'blog'),
    faq: findSection(pageContent, 'faq'),
    jobs: findSection(pageContent, 'jobs'),
    caseStudies: findSection(pageContent, 'case-studies'),
    industries: findSection(pageContent, 'industries'),
    custom: findSection(pageContent, 'custom'),
  };
}

/**
 * Get sections by type with fallback
 */
export function getSectionWithFallback<T>(
  pageContent: PageContent | null | undefined,
  type: SectionType,
  fallback?: T
): PageSection | T | undefined {
  const section = findSection(pageContent, type);
  return section || fallback;
}

/**
 * Get visible section with fallback
 */
export function getVisibleSectionWithFallback<T>(
  pageContent: PageContent | null | undefined,
  type: SectionType,
  fallback?: T
): PageSection | T | undefined {
  const section = findVisibleSection(pageContent, type);
  return section || fallback;
}

/**
 * Check if a section exists
 */
export function hasSection(
  pageContent: PageContent | null | undefined,
  type: SectionType
): boolean {
  return !!findSection(pageContent, type);
}

/**
 * Check if a visible section exists
 */
export function hasVisibleSection(
  pageContent: PageContent | null | undefined,
  type: SectionType
): boolean {
  return !!findVisibleSection(pageContent, type);
}

/**
 * Get multiple sections at once
 */
export function findSections(
  pageContent: PageContent | null | undefined,
  types: SectionType[]
): Record<SectionType, PageSection | undefined> {
  const result: Partial<Record<SectionType, PageSection | undefined>> = {};
  
  for (const type of types) {
    result[type] = findSection(pageContent, type);
  }
  
  return result as Record<SectionType, PageSection | undefined>;
}

/**
 * Find multiple visible sections at once
 */
export function findVisibleSections(
  pageContent: PageContent | null | undefined,
  types: SectionType[]
): Record<SectionType, PageSection | undefined> {
  const result: Partial<Record<SectionType, PageSection | undefined>> = {};
  
  for (const type of types) {
    result[type] = findVisibleSection(pageContent, type);
  }
  
  return result as Record<SectionType, PageSection | undefined>;
}

/**
 * Get all visible sections from page content
 */
export function getAllVisibleSections(
  pageContent: PageContent | null | undefined
): PageSection[] {
  if (!pageContent?.sections) return [];
  return filterVisibleSections(pageContent.sections);
}
