import { useState, useCallback } from 'react';
import { useJobListings } from '@/hooks/useContent';
import { jobListings as fallbackJobListings } from '@/lib/data/';

export interface CareersFormState {
  showExpressionForm: boolean;
  formSubmitted: boolean;
}

export const useCareersPageState = () => {
  // Expression form state
  const [formState, setFormState] = useState<CareersFormState>({
    showExpressionForm: false,
    formSubmitted: false
  });

  // Fetch job listings from Strapi
  const { data: apiJobListings, isLoading: isJobsLoading, error: jobsError } = useJobListings();

  // Get the data, either from API or fallback
  const displayJobListings = apiJobListings?.length ? apiJobListings : fallbackJobListings;

  // Expression form actions
  const showExpressionForm = useCallback(() => {
    setFormState(prev => ({ ...prev, showExpressionForm: true }));
  }, []);

  const hideExpressionForm = useCallback(() => {
    setFormState(prev => ({ ...prev, showExpressionForm: false }));
  }, []);

  const markFormAsSubmitted = useCallback(() => {
    setFormState(prev => ({ ...prev, formSubmitted: true }));
  }, []);

  const resetFormState = useCallback(() => {
    setFormState({
      showExpressionForm: false,
      formSubmitted: false
    });
  }, []);

  return {
    // Job listings
    jobListings: displayJobListings,
    isJobsLoading,
    jobsError,

    // Expression form state
    showExpressionForm: formState.showExpressionForm,
    formSubmitted: formState.formSubmitted,
    showExpressionFormAction: showExpressionForm,
    hideExpressionForm,
    markFormAsSubmitted,
    resetFormState
  };
};