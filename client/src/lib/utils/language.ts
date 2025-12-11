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
