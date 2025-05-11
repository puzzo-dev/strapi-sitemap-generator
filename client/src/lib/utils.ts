import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Define supported languages
export const SUPPORTED_LANGUAGES = ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
