import { useJobListings, useBenefits } from '@/hooks/useStrapiContent';
import { jobListings as fallbackJobListings, benefits as fallbackBenefits } from '@/lib/data';

export const useCareersPageState = () => {
  // Fetch job listings from Strapi
  const { data: apiJobListings, isLoading: isJobsLoading, error: jobsError } = useJobListings();
  
  // Fetch benefits from Strapi
  const { data: apiBenefits, isLoading: isBenefitsLoading, error: benefitsError } = useBenefits();

  // Get the data, either from API or fallback
  const displayJobListings = apiJobListings?.length ? apiJobListings : fallbackJobListings;
  const displayBenefits = apiBenefits?.length ? apiBenefits : fallbackBenefits;

  return {
    // Job listings
    jobListings: displayJobListings,
    isJobsLoading,
    jobsError,
    
    // Benefits
    benefits: displayBenefits,
    isBenefitsLoading,
    benefitsError,
  };
};