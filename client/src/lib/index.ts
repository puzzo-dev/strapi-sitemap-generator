// Utility functions
export * from './utils/index';
export * from './animations';
export * from './blogUtils';

// API integration
export * from './strapi';
export { queryClient } from './queryClient';

// i18n
export { default as i18n, loadStrapiTranslations } from './i18n';

// Data (for fallbacks and development)
export * from './data';

// Types
export * from './types';

// Constants
export { DEFAULT_SUPPORTED_LANGUAGES, getSupportedLanguages } from './utils/language';
