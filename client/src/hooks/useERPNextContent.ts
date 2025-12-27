/**
 * ERPNext Content Hooks
 *
 * Specialized hooks for fetching team and job data from ERPNext
 * Follows DRY principles and provides robust fallback mechanisms
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { erpNextService } from '@/lib/services/ERPNextService';
import { TeamMember, JobListing } from '@/lib/types';

/**
 * Hook to fetch team members from ERPNext
 */
export function useERPNextTeamMembers(): UseQueryResult<TeamMember[]> {
  const erpNextServices = erpNextService;

  return useQuery({
    queryKey: ['erpnext', 'team'],
    queryFn: () => erpNextServices.team.getAll(),
  });
}

/**
 * Hook to fetch a specific team member from ERPNext
 */
export function useERPNextTeamMember(slug: string): UseQueryResult<TeamMember | null> {
  const erpNextServices = erpNextService;

  return useQuery({
    queryKey: ['erpnext', 'team', slug],
    queryFn: () => erpNextServices.team.getBySlug(slug),
  });
}

/**
 * Hook to fetch job listings from ERPNext
 */
export function useERPNextJobListings(): UseQueryResult<JobListing[]> {
  const erpNextServices = erpNextService;

  return useQuery({
    queryKey: ['erpnext', 'jobs'],
    queryFn: () => erpNextServices.jobs.getAll(),
  });
}

/**
 * Hook to fetch a specific job listing from ERPNext
 */
export function useERPNextJobListing(slug: string): UseQueryResult<JobListing | null> {
  const erpNextServices = erpNextService;

  return useQuery({
    queryKey: ['erpnext', 'jobs', slug],
    queryFn: () => erpNextServices.jobs.getBySlug(slug),
  });
}

/**
 * Hook to get ERPNext service health status
 */
export function useERPNextHealth(): UseQueryResult<boolean> {
  const erpNextServices = erpNextService;

  return useQuery({
    queryKey: ['erpnext', 'health'],
    queryFn: () => erpNextServices.service.isHealthy(),
    initialData: false,
  });
}
