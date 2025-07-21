import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce stale time to ensure fresh data on refresh
      staleTime: 1000 * 60 * 2, // 2 minutes instead of longer
      // Enable refetch on window focus for better UX
      refetchOnWindowFocus: true,
      // Retry failed requests
      retry: 2,
      // Refetch on mount if data is stale
      refetchOnMount: 'always',
      // Enable background refetching
      refetchOnReconnect: true,
    },
  },
});
