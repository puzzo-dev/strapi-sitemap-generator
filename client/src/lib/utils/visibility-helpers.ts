import { PageContent, PageSection } from '@/lib/types/core';
import { NavItem, FooterColumn } from '@/lib/types/layout';

/**
 * Visibility helper utilities for pages, sections, and navigation items
 */

// Default visibility state (true if not specified)
const DEFAULT_VISIBILITY = true;

/**
 * Check if a page is visible
 */
export const isPageVisible = (page: PageContent | null | undefined): boolean => {
  if (!page) return false;
  return page.isVisible ?? DEFAULT_VISIBILITY;
};

/**
 * Check if a section is visible
 */
export const isSectionVisible = (section: PageSection | null | undefined): boolean => {
  if (!section) return false;
  return section.isVisible ?? DEFAULT_VISIBILITY;
};

/**
 * Check if a navigation item is visible
 */
export const isNavItemVisible = (navItem: NavItem | null | undefined): boolean => {
  if (!navItem) return false;
  return navItem.isVisible ?? DEFAULT_VISIBILITY;
};

/**
 * Check if a footer column is visible
 */
export const isFooterColumnVisible = (column: FooterColumn | null | undefined): boolean => {
  if (!column) return false;
  return column.isVisible ?? DEFAULT_VISIBILITY;
};

/**
 * Filter visible pages from an array
 */
export const filterVisiblePages = (pages: PageContent[]): PageContent[] => {
  return pages.filter(isPageVisible);
};

/**
 * Filter visible sections from an array
 */
export const filterVisibleSections = (sections: PageSection[]): PageSection[] => {
  return sections.filter(isSectionVisible);
};

/**
 * Filter visible navigation items from an array
 */
export const filterVisibleNavItems = (navItems: NavItem[]): NavItem[] => {
  return navItems.filter(isNavItemVisible).map(item => ({
    ...item,
    // Also filter children if they exist
    children: item.children ? filterVisibleNavItems(item.children) : undefined
  }));
};

/**
 * Filter visible footer columns from an array
 */
export const filterVisibleFooterColumns = (columns: FooterColumn[]): FooterColumn[] => {
  return columns.filter(isFooterColumnVisible);
};

/**
 * Get visible sections from page content
 */
export const getVisibleSections = (pageContent: PageContent | null | undefined): PageSection[] => {
  if (!pageContent || !isPageVisible(pageContent)) return [];
  return filterVisibleSections(pageContent.sections || []);
};

/**
 * Check if page has any visible sections
 */
export const hasVisibleSections = (pageContent: PageContent | null | undefined): boolean => {
  return getVisibleSections(pageContent).length > 0;
};

/**
 * Get visible sections by type
 */
export const getVisibleSectionsByType = (
  pageContent: PageContent | null | undefined,
  type: PageSection['type']
): PageSection[] => {
  return getVisibleSections(pageContent).filter(section => section.type === type);
};

/**
 * Find first visible section by type
 */
export const findVisibleSection = (
  pageContent: PageContent | null | undefined,
  type: PageSection['type']
): PageSection | undefined => {
  return getVisibleSectionsByType(pageContent, type)[0];
};

/**
 * Utility to toggle visibility of a page
 */
export const togglePageVisibility = (page: PageContent): PageContent => {
  return {
    ...page,
    isVisible: !isPageVisible(page)
  };
};

/**
 * Utility to toggle visibility of a section
 */
export const toggleSectionVisibility = (section: PageSection): PageSection => {
  return {
    ...section,
    isVisible: !isSectionVisible(section)
  };
};

/**
 * Utility to toggle visibility of a nav item
 */
export const toggleNavItemVisibility = (navItem: NavItem): NavItem => {
  return {
    ...navItem,
    isVisible: !isNavItemVisible(navItem)
  };
};

/**
 * Set visibility for a page
 */
export const setPageVisibility = (page: PageContent, visible: boolean): PageContent => {
  return {
    ...page,
    isVisible: visible
  };
};

/**
 * Set visibility for a section
 */
export const setSectionVisibility = (section: PageSection, visible: boolean): PageSection => {
  return {
    ...section,
    isVisible: visible
  };
};

/**
 * Set visibility for a nav item
 */
export const setNavItemVisibility = (navItem: NavItem, visible: boolean): NavItem => {
  return {
    ...navItem,
    isVisible: visible
  };
};

/**
 * Batch update visibility for multiple pages
 */
export const batchUpdatePageVisibility = (
  pages: PageContent[],
  updates: Record<number, boolean>
): PageContent[] => {
  return pages.map(page => 
    updates.hasOwnProperty(page.id) 
      ? setPageVisibility(page, updates[page.id])
      : page
  );
};

/**
 * Batch update visibility for multiple sections
 */
export const batchUpdateSectionVisibility = (
  sections: PageSection[],
  updates: Record<number, boolean>
): PageSection[] => {
  return sections.map(section => 
    updates.hasOwnProperty(section.id) 
      ? setSectionVisibility(section, updates[section.id])
      : section
  );
};

/**
 * Get visibility statistics for debugging/admin purposes
 */
export const getVisibilityStats = (pageContent: PageContent | null | undefined) => {
  if (!pageContent) return { totalSections: 0, visibleSections: 0, hiddenSections: 0 };
  
  const totalSections = pageContent.sections?.length || 0;
  const visibleSections = getVisibleSections(pageContent).length;
  const hiddenSections = totalSections - visibleSections;
  
  return {
    pageVisible: isPageVisible(pageContent),
    totalSections,
    visibleSections,
    hiddenSections,
    visibilityPercentage: totalSections > 0 ? Math.round((visibleSections / totalSections) * 100) : 0
  };
};

export default {
  isPageVisible,
  isSectionVisible,
  isNavItemVisible,
  isFooterColumnVisible,
  filterVisiblePages,
  filterVisibleSections,
  filterVisibleNavItems,
  filterVisibleFooterColumns,
  getVisibleSections,
  hasVisibleSections,
  getVisibleSectionsByType,
  findVisibleSection,
  togglePageVisibility,
  toggleSectionVisibility,
  toggleNavItemVisibility,
  setPageVisibility,
  setSectionVisibility,
  setNavItemVisibility,
  batchUpdatePageVisibility,
  batchUpdateSectionVisibility,
  getVisibilityStats
};
