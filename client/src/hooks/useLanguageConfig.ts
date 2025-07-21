import { useQuery } from '@tanstack/react-query';
import { getLanguageConfig, getUITranslations } from '@/lib/strapi';

/**
 * Hook to fetch language configuration from Strapi
 */
export const useLanguageConfig = () => {
  return useQuery({
    queryKey: ['language-config'],
    queryFn: getLanguageConfig,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
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
