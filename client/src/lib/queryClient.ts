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

// Utility function for API requests with better error handling
export async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
}
