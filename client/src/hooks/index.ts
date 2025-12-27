// Core hooks
export { useLanguage } from '../components/context/LanguageContext';

// Custom hooks
export { useScrollToTop } from './useScrollToTop';
export { useLanguageConfig, useUITranslations } from './useLanguageConfig';
export { useCareersPageState } from './useCareersPageState';
export { useSeoHelpers } from './useSeoHelpers';

// Strapi content hooks
// useStrapiContent has been merged into useContent.ts
export { useAds } from './useAds';

// UI hooks
export { useToast } from './useToast';
export { useIsMobile } from './useMobile';

// Theme hook is exported from theme-provider component
export { useTheme } from '../components/ui/theme-provider';
