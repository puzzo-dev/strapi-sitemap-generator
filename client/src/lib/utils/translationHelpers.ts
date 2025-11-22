/**
 * Translation helper utilities
 * Handles fallback chain: Strapi CMS → i18n → static data
 */

import { TFunction } from 'i18next';

/**
 * Safely get a translation with fallback to static data
 * Returns the translation if found, otherwise returns the fallback
 * Handles the case where i18next returns the key itself when translation is missing
 * 
 * @param t - i18next translation function
 * @param key - Translation key (e.g., 'ui.learnMore')
 * @param fallback - Fallback value from uiLabels
 * @returns Translated string or fallback
 */
export function getTranslation(
  t: TFunction,
  key: string,
  fallback: string
): string {
  const translated = t(key);
  
  // If translation returns the key itself (missing translation), use fallback
  // This happens when: key not in hardcoded i18n AND not loaded from Strapi
  if (translated === key) {
    return fallback;
  }
  
  return translated;
}

/**
 * Safely get a translation that might be empty
 * Similar to getTranslation but allows empty strings as valid translations
 * 
 * @param t - i18next translation function
 * @param key - Translation key
 * @param fallback - Fallback value
 * @returns Translated string or fallback
 */
export function getTranslationAllowEmpty(
  t: TFunction,
  key: string,
  fallback: string
): string {
  const translated = t(key);
  
  // Only use fallback if translation returns the key itself
  if (translated === key) {
    return fallback;
  }
  
  // Allow empty strings as valid translations
  return translated;
}

/**
 * Get nested translation with fallback
 * Handles nested keys like 'products.hero.subtitle'
 * 
 * @param t - i18next translation function
 * @param key - Translation key
 * @param fallback - Fallback value
 * @returns Translated string or fallback
 */
export function getNestedTranslation(
  t: TFunction,
  key: string,
  fallback: string
): string {
  return getTranslation(t, key, fallback);
}
