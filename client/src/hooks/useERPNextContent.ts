/**
 * ERPNext Content Hooks
 * 
 * Specialized hooks for fetching team and job data from ERPNext
 * Follows DRY principles and provides robust fallback mechanisms
 */

import { useGenericList, useGenericItem } from '@/hooks/useGenericContent';
import { createERPNextServices } from '@/lib/services/ERPNextService';
import { TeamMember, JobListing } from '@/lib/types';
import { IListQueryResult, IQueryResult } from '@/lib/abstractions';

/**
 * Hook to fetch team members from ERPNext
 */
export function useERPNextTeamMembers(): IListQueryResult<TeamMember> {
  const erpNextServices = createERPNextServices();
  
  return useGenericList(
    ['erpnext', 'team'],
    () => erpNextServices.team.getAll(),
    'team'
  );
}

/**
 * Hook to fetch a specific team member from ERPNext
 */
export function useERPNextTeamMember(slug: string): IQueryResult<TeamMember | null> {
  const erpNextServices = createERPNextServices();
  
  return useGenericItem(
    ['erpnext', 'team', slug],
    () => erpNextServices.team.getBySlug(slug)
  );
}

/**
 * Hook to fetch job listings from ERPNext
 */
export function useERPNextJobListings(): IListQueryResult<JobListing> {
  const erpNextServices = createERPNextServices();
  
  return useGenericList(
    ['erpnext', 'jobs'],
    () => erpNextServices.jobs.getAll(),
    'jobs'
  );
}

/**
 * Hook to fetch a specific job listing from ERPNext
 */
export function useERPNextJobListing(slug: string): IQueryResult<JobListing | null> {
  const erpNextServices = createERPNextServices();
  
  return useGenericItem(
    ['erpnext', 'jobs', slug],
    () => erpNextServices.jobs.getBySlug(slug)
  );
}

/**
 * Hook to get ERPNext service health status
 */
export function useERPNextHealth(): IQueryResult<boolean> {
  const erpNextServices = createERPNextServices();
  
  const result = useGenericItem(
    ['erpnext', 'health'],
    () => erpNextServices.service.isHealthy(),
    false
  );
  
  // Transform IQueryResult<boolean | null> to IQueryResult<boolean>
  return {
    data: result.data ?? false,
    isLoading: result.isLoading,
    error: result.error,
    isSuccess: result.isSuccess,
    isError: result.isError
  };
}
