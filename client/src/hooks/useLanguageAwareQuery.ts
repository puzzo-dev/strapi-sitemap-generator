import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useLanguage } from '@/components/context/LanguageContext';
import { queryClient } from '@/lib/queryClient';

/**
 * A custom hook that wraps useQuery to make it language-aware
 * This automatically includes the current language in the query key
 * and refetches the data when the language changes
 */
export function useLanguageAwareQuery<TData = unknown, TError = unknown>(
  baseKey: string | readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  const { currentLanguage } = useLanguage();
  
  // Convert the base key to array if it's a string
  const baseKeyArray = typeof baseKey === 'string' ? [baseKey] : [...baseKey];
  
  // Create a language-aware query key
  const queryKey = [...baseKeyArray, { lang: currentLanguage }];
  
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * Invalidate queries that match a given base key for all languages
 * This is useful when you want to invalidate all language variants of a query
 */
export function invalidateLanguageQueries(baseKey: string | readonly unknown[]): Promise<void> {
  const baseKeyArray = typeof baseKey === 'string' ? [baseKey] : [...baseKey];
  return queryClient.invalidateQueries({ queryKey: baseKeyArray });
}