import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NavItem } from '@/lib/types/layout';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Default visibility state (true if not specified)
const DEFAULT_VISIBILITY = true;

// Check if a navigation item is visible
export const isNavItemVisible = (navItem: NavItem | null | undefined): boolean => {
  if (!navItem) return false;
  return navItem.isVisible ?? DEFAULT_VISIBILITY;
};

// Filter visible navigation items from an array
export const filterVisibleNavItems = (navItems: NavItem[]): NavItem[] => {
  return navItems.filter(isNavItemVisible).map(item => ({
    ...item,
    // Also filter children if they exist
    children: item.children ? filterVisibleNavItems(item.children) : undefined
  }));
};

/**
 * Extract URL path from UrlProps or string
 */
export function getUrlPath(url: any): string {
  if (typeof url === 'string') return url;
  return url?.url || '/';
}

export function formatDate(dateString: string | undefined): string {
  // Return empty string if dateString is undefined or empty
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}