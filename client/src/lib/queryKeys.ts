/**
 * Centralized Query Key Factory
 * 
 * This file provides type-safe, consistent query keys for React Query.
 * Centralizing keys here enables:
 * - Easy cache invalidation
 * - Prevents key collisions
 * - Better debugging and devtools experience
 * - Type-safe cache management
 */

/**
 * Query key factory following best practices from TanStack Query docs
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 */
export const queryKeys = {
  // ============================================================================
  // CONTENT MANAGEMENT
  // ============================================================================

  /** Products query keys */
  products: {
    all: () => ['products'] as const,
    lists: () => ['products', 'list'] as const,
    list: (filters?: Record<string, any>) => ['products', 'list', filters] as const,
    details: () => ['products', 'detail'] as const,
    detail: (id: number | string) => ['products', 'detail', id] as const,
    bySlug: (slug: string) => ['products', 'slug', slug] as const,
  },

  /** Services query keys */
  services: {
    all: () => ['services'] as const,
    lists: () => ['services', 'list'] as const,
    list: (filters?: Record<string, any>) => ['services', 'list', filters] as const,
    details: () => ['services', 'detail'] as const,
    detail: (id: number | string) => ['services', 'detail', id] as const,
    bySlug: (slug: string) => ['services', 'slug', slug] as const,
  },

  /** Blog query keys */
  blog: {
    all: () => ['blog'] as const,
    posts: (params?: {
      limit?: number;
      category?: string;
      featured?: boolean;
      tag?: string;
      author?: string;
      status?: string;
    }) => ['blog', 'posts', params] as const,
    post: (slug: string) => ['blog', 'post', slug] as const,
    categories: () => ['blog', 'categories'] as const,
    comments: (postId: string) => ['blog', 'comments', postId] as const,
  },

  /** Case Studies query keys */
  caseStudies: {
    all: () => ['case-studies'] as const,
    lists: () => ['case-studies', 'list'] as const,
    list: (filters?: Record<string, any>) => ['case-studies', 'list', filters] as const,
    details: () => ['case-studies', 'detail'] as const,
    detail: (id: number | string) => ['case-studies', 'detail', id] as const,
    bySlug: (slug: string) => ['case-studies', 'slug', slug] as const,
  },

  /** Industries query keys */
  industries: {
    all: () => ['industries'] as const,
    lists: () => ['industries', 'list'] as const,
    list: (filters?: Record<string, any>) => ['industries', 'list', filters] as const,
    details: () => ['industries', 'detail'] as const,
    detail: (id: number | string) => ['industries', 'detail', id] as const,
    bySlug: (slug: string) => ['industries', 'slug', slug] as const,
  },

  /** Team Members query keys */
  team: {
    all: () => ['team-members'] as const,
    lists: () => ['team-members', 'list'] as const,
    list: (filters?: Record<string, any>) => ['team-members', 'list', filters] as const,
    details: () => ['team-members', 'detail'] as const,
    detail: (id: number | string) => ['team-members', 'detail', id] as const,
    bySlug: (slug: string) => ['team-members', 'slug', slug] as const,
  },

  /** Job Listings query keys */
  jobs: {
    all: () => ['job-listings'] as const,
    lists: () => ['job-listings', 'list'] as const,
    list: (filters?: Record<string, any>) => ['job-listings', 'list', filters] as const,
    details: () => ['job-listings', 'detail'] as const,
    detail: (id: number | string) => ['job-listings', 'detail', id] as const,
    bySlug: (slug: string) => ['job-listings', 'slug', slug] as const,
  },

  /** Testimonials query keys */
  testimonials: {
    all: () => ['testimonials'] as const,
    lists: () => ['testimonials', 'list'] as const,
    list: (filters?: Record<string, any>) => ['testimonials', 'list', filters] as const,
  },

  // ============================================================================
  // SITE CONFIGURATION
  // ============================================================================

  /** Navigation and layout query keys */
  navigation: {
    all: () => ['navigation'] as const,
    items: () => ['navigation', 'items'] as const,
    footer: () => ['footer'] as const,
    footerColumns: () => ['footer', 'columns'] as const,
  },

  /** Site configuration query keys */
  site: {
    all: () => ['site-config'] as const,
    config: () => ['site-config', 'main'] as const,
    socialLinks: () => ['site-config', 'social-links'] as const,
  },

  /** Page content query keys */
  pages: {
    all: () => ['page-content'] as const,
    content: (slug: string) => ['page-content', slug] as const,
    bySlug: (slug: string) => ['page-content', 'slug', slug] as const,
  },

  /** FAQ query keys */
  faq: {
    all: () => ['faq'] as const,
    items: () => ['faq', 'items'] as const,
    categories: () => ['faq', 'categories'] as const,
    byCategory: (categoryId: number) => ['faq', 'category', categoryId] as const,
  },

  /** Client logos query keys */
  clients: {
    all: () => ['client-logos'] as const,
    logos: () => ['client-logos', 'list'] as const,
  },

  // ============================================================================
  // INTERNATIONALIZATION
  // ============================================================================

  /** Language and translation query keys (uses Strapi's native i18n) */
  i18n: {
    all: () => ['i18n'] as const,
    // Native Strapi i18n locales from /api/i18n/locales
    locales: () => ['i18n-locales'] as const,
    // UI translations (custom collection, optional)
    translations: (language: string) => ['ui-translations', language] as const,
    uiContent: (language: string) => ['ui-content', language] as const,
  },

  // ============================================================================
  // ANALYTICS & ADVERTISING
  // ============================================================================

  /** Analytics configuration query keys */
  analytics: {
    all: () => ['analytics'] as const,
    config: (language?: string) => ['analytics', 'config', language] as const,
  },

  /** Advertisement query keys */
  ads: {
    all: () => ['ads'] as const,
    byPosition: (position: string, targetAudience?: string[], maxAds?: number) =>
      ['ads', position, targetAudience, maxAds] as const,
  },

  // ============================================================================
  // EXTERNAL INTEGRATIONS
  // ============================================================================

  /** ERPNext integration query keys */
  erpNext: {
    all: () => ['erpnext'] as const,
    health: () => ['erpnext', 'health'] as const,
    blog: {
      posts: () => ['erpnext', 'blog-posts'] as const,
      post: (slug: string) => ['erpnext', 'blog-post', slug] as const,
      categories: () => ['erpnext', 'blog-categories'] as const,
    },
  },
} as const;

/**
 * Helper to invalidate related queries
 * Usage: queryClient.invalidateQueries({ queryKey: queryKeys.products.all() })
 */
export const invalidationHelpers = {
  /** Invalidate all product-related queries */
  invalidateProducts: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
  },

  /** Invalidate all service-related queries */
  invalidateServices: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.services.all() });
  },

  /** Invalidate all blog-related queries */
  invalidateBlog: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.blog.all() });
  },

  /** Invalidate all site configuration queries */
  invalidateSiteConfig: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.site.all() });
  },

  /** Invalidate all navigation queries */
  invalidateNavigation: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.navigation.all() });
  },

  /** Invalidate all translation queries */
  invalidateTranslations: (queryClient: any) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.i18n.all() });
  },

  /** Invalidate everything (use sparingly) */
  invalidateAll: (queryClient: any) => {
    queryClient.invalidateQueries();
  },
};

/**
 * Type helpers for extracting query key types
 */
export type ProductQueryKey = ReturnType<typeof queryKeys.products.detail>;
export type ServiceQueryKey = ReturnType<typeof queryKeys.services.detail>;
export type BlogPostQueryKey = ReturnType<typeof queryKeys.blog.post>;
export type PageContentQueryKey = ReturnType<typeof queryKeys.pages.content>;
