/**
 * Generic Content Hooks
 * 
 * Eliminates duplication in content fetching hooks by providing
 * generic, reusable hook patterns that follow DRY principles.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  IQueryResult, 
  IListQueryResult, 
  IContentStatus,
  IDataSource
} from '@/lib/abstractions';
import { 
  withFallback, 
  getContentList, 
  getPageContent as getFallbackPageContent 
} from '@/lib/fallbacks';
import { PageContent } from '@/lib/types';

/**
 * Generic query options
 */
interface IGenericQueryOptions {
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

/**
 * Default query options to avoid repetition
 */
const DEFAULT_QUERY_OPTIONS: IGenericQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  retry: 1,
  refetchOnWindowFocus: false
};

/**
 * Content-specific query options
 */
const CONTENT_QUERY_OPTIONS: Record<string, IGenericQueryOptions> = {
  page: { staleTime: 10 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  ui: { staleTime: 15 * 60 * 1000, gcTime: 120 * 60 * 1000 },
  products: { staleTime: 10 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  services: { staleTime: 10 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  testimonials: { staleTime: 15 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  team: { staleTime: 20 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  caseStudies: { staleTime: 15 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  industries: { staleTime: 20 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  jobs: { staleTime: 10 * 60 * 1000, gcTime: 30 * 60 * 1000 },
  clients: { staleTime: 30 * 60 * 1000, gcTime: 120 * 60 * 1000 },
  faqs: { staleTime: 20 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  blogs: { staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000 }
};

/**
 * Generic single item hook
 * DRY principle: Eliminates repetition across single item hooks
 */
export function useGenericItem<T>(
  queryKey: string[],
  fetcher: () => Promise<T | null>,
  fallback?: T,
  options?: IGenericQueryOptions
): IQueryResult<T | null> {
  const mergedOptions = { ...DEFAULT_QUERY_OPTIONS, ...options };
  
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await fetcher();
        return data || fallback || null;
      } catch (error) {
        console.error(`Query failed for ${queryKey.join('/')}:`, error);
        return fallback || null;
      }
    },
    ...mergedOptions
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess,
    isError: query.isError
  };
}

/**
 * Generic list hook
 * DRY principle: Eliminates repetition across list hooks
 */
export function useGenericList<T>(
  queryKey: string[],
  fetcher: () => Promise<T[]>,
  contentType: string,
  options?: IGenericQueryOptions
): IListQueryResult<T> {
  const mergedOptions = { 
    ...DEFAULT_QUERY_OPTIONS, 
    ...CONTENT_QUERY_OPTIONS[contentType],
    ...options 
  };
  
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await fetcher();
        return getContentList(data, contentType as any);
      } catch (error) {
        console.error(`Query failed for ${queryKey.join('/')}:`, error);
        return getContentList(null, contentType as any);
      }
    },
    ...mergedOptions
  });

  const data = (query.data || []) as T[];

  return {
    data,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isEmpty: data.length === 0,
    hasData: data.length > 0,
    count: data.length
  };
}

/**
 * Generic page content hook
 * DRY principle: Centralized page content logic
 */
export function useGenericPageContent(
  slug: string,
  fetcher: (slug: string) => Promise<PageContent | null>,
  options?: IGenericQueryOptions
): IQueryResult<PageContent> {
  const mergedOptions = { 
    ...DEFAULT_QUERY_OPTIONS, 
    ...CONTENT_QUERY_OPTIONS.page,
    ...options 
  };

  const query = useQuery({
    queryKey: ['page-content', slug],
    queryFn: async () => {
      try {
        const data = await fetcher(slug);
        return getFallbackPageContent(data, slug);
      } catch (error) {
        console.error(`Failed to fetch page content for ${slug}:`, error);
        return getFallbackPageContent(null, slug);
      }
    },
    ...mergedOptions
  });

  return {
    data: query.data!,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess,
    isError: query.isError
  };
}

/**
 * Generic data source hook
 * DRY principle: Reusable data source pattern
 */
export function useDataSource<T extends { id: string | number }>(
  dataSource: IDataSource<T>,
  contentType: string,
  options?: IGenericQueryOptions
): IListQueryResult<T> {
  return useGenericList(
    ['data-source', contentType],
    () => dataSource.getAll(),
    contentType,
    options
  );
}

/**
 * Generic search hook
 * DRY principle: Reusable search pattern
 */
export function useGenericSearch<T>(
  queryKey: string[],
  searcher: (query: string) => Promise<T[]>,
  searchQuery: string,
  contentType: string,
  options?: IGenericQueryOptions
): IListQueryResult<T> {
  const mergedOptions = { 
    ...DEFAULT_QUERY_OPTIONS, 
    enabled: !!searchQuery && searchQuery.length > 2,
    ...options 
  };

  return useGenericList(
    [...queryKey, 'search', searchQuery],
    () => searcher(searchQuery),
    contentType,
    mergedOptions
  );
}

/**
 * Generic mutation hook helper
 * DRY principle: Standardized mutation patterns
 */
export function createMutationConfig<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) {
  return {
    mutationFn,
    onSuccess: (data: TData, variables: TVariables) => {
      if (options?.successMessage) {
        // Use notification service here
        console.log(options.successMessage);
      }
      options?.onSuccess?.(data, variables);
    },
    onError: (error: Error, variables: TVariables) => {
      if (options?.errorMessage) {
        // Use notification service here
        console.error(options.errorMessage, error);
      }
      options?.onError?.(error, variables);
    }
  };
}

/**
 * Content status aggregator hook
 * DRY principle: Centralized status checking
 */
export function useContentStatusAggregator(
  queries: Array<{ key: string; query: UseQueryResult<any> | IListQueryResult<any> | IQueryResult<any> }>
): IContentStatus {
  const isUsingFallbacks: Record<string, boolean> = {};
  const systemHealth: Record<string, boolean> = {};
  const loading: Record<string, boolean> = {};
  const errors: Record<string, Error | null> = {};

  queries.forEach(({ key, query }) => {
    isUsingFallbacks[key] = query.isSuccess && (!query.data || (Array.isArray(query.data) && query.data.length === 0));
    systemHealth[key] = query.isSuccess;
    loading[key] = query.isLoading;
    errors[key] = query.error;
  });

  return {
    isUsingFallbacks,
    systemHealth,
    loading,
    errors
  };
}

/**
 * Batch query hook
 * DRY principle: Execute multiple queries efficiently
 */
export function useBatchQueries<T extends Record<string, any>>(
  queries: Array<{
    key: string;
    queryKey: string[];
    fetcher: () => Promise<any>;
    options?: IGenericQueryOptions;
  }>
): Record<keyof T, IQueryResult<any>> {
  const results: Record<string, IQueryResult<any>> = {};

  queries.forEach(({ key, queryKey, fetcher, options }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[key] = useGenericItem(queryKey, fetcher, undefined, options);
  });

  return results as Record<keyof T, IQueryResult<any>>;
}

/**
 * Hook composition helper
 * DRY principle: Combine multiple hooks with consistent patterns
 */
export function useCompositeContent<T extends Record<string, any>>(
  contentMap: Record<keyof T, {
    queryKey: string[];
    fetcher: () => Promise<any>;
    contentType?: string;
    options?: IGenericQueryOptions;
  }>
): {
  data: Partial<T>;
  loading: Record<keyof T, boolean>;
  errors: Record<keyof T, Error | null>;
  isAllLoaded: boolean;
  hasAnyError: boolean;
} {
  const data: Partial<T> = {};
  const loading: Record<keyof T, boolean> = {} as Record<keyof T, boolean>;
  const errors: Record<keyof T, Error | null> = {} as Record<keyof T, Error | null>;

  Object.entries(contentMap).forEach(([key, config]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const result = useGenericItem(
      config.queryKey,
      config.fetcher,
      undefined,
      config.options
    );

    data[key as keyof T] = result.data;
    loading[key as keyof T] = result.isLoading;
    errors[key as keyof T] = result.error;
  });

  const isAllLoaded = Object.values(loading).every(isLoading => !isLoading);
  const hasAnyError = Object.values(errors).some(error => error !== null);

  return {
    data,
    loading,
    errors,
    isAllLoaded,
    hasAnyError
  };
}
