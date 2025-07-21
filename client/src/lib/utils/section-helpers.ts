/**
 * Section Finder Utilities
 * 
 * Eliminates the repeated pattern of finding sections by type
 * that appears 100+ times across the codebase.
 */

import { PageContent, SectionItem } from '@/lib/types';

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
): SectionItem | undefined {
  return pageContent?.sections?.find(s => s.type === type);
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
): SectionItem | T | undefined {
  const section = findSection(pageContent, type);
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
 * Get multiple sections at once
 */
export function findSections(
  pageContent: PageContent | null | undefined,
  types: SectionType[]
): Record<SectionType, SectionItem | undefined> {
  const result: Partial<Record<SectionType, SectionItem | undefined>> = {};
  
  for (const type of types) {
    result[type] = findSection(pageContent, type);
  }
  
  return result as Record<SectionType, SectionItem | undefined>;
}
