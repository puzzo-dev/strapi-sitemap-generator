import { useJobListings } from '@/hooks/useStrapiContent';
import { jobListings as fallbackJobListings } from '@/lib/data/';

export const useCareersPageState = () => {
  // Fetch job listings from Strapi
  const { data: apiJobListings, isLoading: isJobsLoading, error: jobsError } = useJobListings();

  // Get the data, either from API or fallback
  const displayJobListings = apiJobListings?.length ? apiJobListings : fallbackJobListings;

  return {
    // Job listings
    jobListings: displayJobListings,
    isJobsLoading,
    jobsError,
  };
};