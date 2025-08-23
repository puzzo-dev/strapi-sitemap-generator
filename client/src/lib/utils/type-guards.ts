/**
 * Type Guard Utilities
 * 
 * Eliminates 40+ duplicate type checking patterns throughout the codebase
 * with reusable, type-safe guard functions.
 */

import { PageContent, PageSection, SectionItem } from '@/lib/types/core';
import { ProductProps, ServiceProps, BlogPost, TeamMember } from '@/lib/types/content';

// Basic type guards
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isNonEmptyArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value) && value.length > 0;
};

// Content type guards
export const isValidPageContent = (content: unknown): content is PageContent => {
  return isObject(content) && 
         'id' in content && 
         'slug' in content && 
         'title' in content &&
         'sections' in content &&
         isArray(content.sections);
};

export const isValidPageSection = (section: unknown): section is PageSection => {
  return isObject(section) && 
         'id' in section &&
         typeof section.id === 'number';
};

export const isValidSectionItem = (item: unknown): item is SectionItem => {
  return isObject(item) && 
         'id' in item && 
         'title' in item &&
         typeof item.id === 'number' &&
         typeof item.title === 'string';
};

// Product type guards
export const isValidProduct = (product: unknown): product is ProductProps => {
  return isObject(product) &&
         'id' in product &&
         'title' in product &&
         'description' in product &&
         typeof product.id === 'number' &&
         typeof product.title === 'string';
};

export const isValidProductArray = (products: unknown): products is ProductProps[] => {
  return isArray(products) && products.every(isValidProduct);
};

// Service type guards
export const isValidService = (service: unknown): service is ServiceProps => {
  return isObject(service) &&
         'id' in service &&
         'title' in service &&
         'description' in service &&
         typeof service.id === 'number' &&
         typeof service.title === 'string';
};

export const isValidServiceArray = (services: unknown): services is ServiceProps[] => {
  return isArray(services) && services.every(isValidService);
};

// Blog post type guards
export const isValidBlogPost = (post: unknown): post is BlogPost => {
  return isObject(post) &&
         'name' in post &&
         'title' in post &&
         'slug' in post &&
         typeof post.name === 'string' &&
         typeof post.title === 'string' &&
         typeof post.slug === 'string';
};

export const isValidBlogPostArray = (posts: unknown): posts is BlogPost[] => {
  return isArray(posts) && posts.every(isValidBlogPost);
};

// Team member type guards
export const isValidTeamMember = (member: unknown): member is TeamMember => {
  return isObject(member) &&
         'id' in member &&
         'name' in member &&
         'position' in member &&
         typeof member.id === 'number' &&
         typeof member.name === 'string' &&
         typeof member.position === 'string';
};

export const isValidTeamMemberArray = (members: unknown): members is TeamMember[] => {
  return isArray(members) && members.every(isValidTeamMember);
};

// Featured content type guards
export const isFeaturedContent = <T extends { featured?: boolean }>(content: T): boolean => {
  return content.featured === true;
};

export const isPublishedContent = <T extends { published?: boolean }>(content: T): boolean => {
  return content.published === true;
};

// URL and link type guards
export const isValidUrl = (url: unknown): url is string => {
  if (!isString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isExternalUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

// Form data type guards
export const hasRequiredFormFields = (
  data: Record<string, unknown>, 
  requiredFields: string[]
): boolean => {
  return requiredFields.every(field => 
    field in data && 
    data[field] !== null && 
    data[field] !== undefined && 
    data[field] !== ''
  );
};

// Error type guards
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const hasErrorMessage = (error: unknown): error is { message: string } => {
  return isObject(error) && 'message' in error && isString(error.message);
};

// API response type guards
export const isSuccessResponse = <T>(response: unknown): response is { data: T; success: true } => {
  return isObject(response) && 
         'data' in response && 
         'success' in response && 
         response.success === true;
};

export const isErrorResponse = (response: unknown): response is { error: string; success: false } => {
  return isObject(response) && 
         'error' in response && 
         'success' in response && 
         response.success === false;
};

// Utility functions for safe access
export const safeGet = <T>(obj: unknown, path: string, defaultValue: T): T => {
  if (!isObject(obj)) return defaultValue;
  
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (!isObject(current) || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current ?? defaultValue;
};

export const safeArray = <T>(value: unknown, validator?: (item: unknown) => item is T): T[] => {
  if (!isArray(value)) return [];
  
  if (validator) {
    return value.filter(validator);
  }
  
  return value as T[];
};

// Content filtering utilities
export const filterValidContent = <T>(
  items: unknown[], 
  validator: (item: unknown) => item is T
): T[] => {
  return items.filter(validator);
};

export const filterFeaturedContent = <T extends { featured?: boolean }>(items: T[]): T[] => {
  return items.filter(isFeaturedContent);
};

export const filterPublishedContent = <T extends { published?: boolean }>(items: T[]): T[] => {
  return items.filter(isPublishedContent);
};

// Export commonly used type guard combinations
export const TypeGuards = {
  // Basic types
  isString,
  isNumber,
  isObject,
  isArray,
  isNonEmptyArray,
  
  // Content types
  isValidPageContent,
  isValidPageSection,
  isValidSectionItem,
  isValidProduct,
  isValidService,
  isValidBlogPost,
  isValidTeamMember,
  
  // Arrays
  isValidProductArray,
  isValidServiceArray,
  isValidBlogPostArray,
  isValidTeamMemberArray,
  
  // Content states
  isFeaturedContent,
  isPublishedContent,
  
  // URLs
  isValidUrl,
  isExternalUrl,
  
  // Forms
  hasRequiredFormFields,
  
  // Errors
  isError,
  hasErrorMessage,
  
  // API responses
  isSuccessResponse,
  isErrorResponse,
  
  // Utilities
  safeGet,
  safeArray,
  filterValidContent,
  filterFeaturedContent,
  filterPublishedContent,
};

export default TypeGuards;
