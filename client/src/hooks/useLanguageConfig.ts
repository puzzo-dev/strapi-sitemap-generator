import { useQuery } from '@tanstack/react-query';
import { getLanguageConfig, getUITranslations } from '@/lib/strapi';

/**
 * Hook to fetch available locales from Strapi's native i18n plugin
 * Uses the /api/i18n/locales endpoint
 */
export const useLanguageConfig = () => {
  return useQuery({
    queryKey: ['i18n-locales'],
    queryFn: getLanguageConfig,
    staleTime: 30 * 60 * 1000, // 30 minutes - locales rarely change
    gcTime: 60 * 60 * 1000, // 60 minutes
    retry: 1
  });
};

/**
 * Hook to fetch UI translations from Strapi for a specific language
 */
export const useUITranslations = (language: string) => {
  return useQuery({
    queryKey: ['ui-translations', language],
    queryFn: () => getUITranslations(language),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 60 minutes
    retry: 1,
    enabled: !!language
  });
};
