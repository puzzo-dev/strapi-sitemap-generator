import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

// Define supported languages
// Default supported languages - will be overridden by Strapi configuration
export const DEFAULT_SUPPORTED_LANGUAGES = ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'] as const;
export type SupportedLanguage = string; // Now dynamic from Strapi

/**
 * Get supported languages from language config hook
 * This is a utility function that components can use to access current supported languages
 */
export const getSupportedLanguages = (languageConfig?: { supportedLanguages: string[] }): string[] => {
  return languageConfig?.supportedLanguages || [...DEFAULT_SUPPORTED_LANGUAGES];
};

/**
 * Extract URL path from UrlProps or string
 */
export function getUrlPath(url: any): string {
  if (typeof url === 'string') return url;
  return url?.url || '/';
}

/**
 * Filter navigation items to show only visible ones
 */
export function filterVisibleNavItems(navItems: any[]): any[] {
  return navItems.filter(item => item.isVisible !== false);
}
