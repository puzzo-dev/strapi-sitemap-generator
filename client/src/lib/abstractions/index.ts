/**
 * Core Abstractions and Interfaces
 * 
 * This file defines the main abstractions that follow SOLID principles:
 * - Single Responsibility: Each interface has one clear purpose
 * - Open/Closed: Interfaces are open for extension, closed for modification
 * - Interface Segregation: Small, focused interfaces
 * - Dependency Inversion: Depend on abstractions, not implementations
 */

// =============================================================================
// DATA SOURCE ABSTRACTIONS (Dependency Inversion Principle)
// =============================================================================

/**
 * Generic data source interface - allows different implementations
 * (Strapi, ERPNext, Local storage, etc.)
 */
export interface IDataSource<T> {
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create?(data: Partial<T>): Promise<T>;
  update?(id: string, data: Partial<T>): Promise<T>;
  delete?(id: string): Promise<boolean>;
  search?(query: string): Promise<T[]>;
}

/**
 * Content management system interface
 */
export interface ICMSProvider {
  readonly name: string;
  readonly baseUrl: string;
  isHealthy(): Promise<boolean>;
  get<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  put<T>(endpoint: string, data: any): Promise<T>;
  delete(endpoint: string): Promise<boolean>;
}

/**
 * Form submission interface
 */
export interface IFormSubmissionProvider {
  readonly name: string;
  submitContact(data: any): Promise<boolean>;
  submitBooking(data: any): Promise<boolean>;
  submitNewsletter(email: string): Promise<boolean>;
  submitJobApplication(data: any): Promise<boolean>;
}

// =============================================================================
// CONTENT INTERFACES (Interface Segregation Principle)
// =============================================================================

/**
 * Base content interface - minimal required properties
 */
export interface IBaseContent {
  readonly id: string | number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Content with metadata
 */
export interface IContentWithMeta extends IBaseContent {
  readonly title: string;
  readonly slug?: string;
  readonly description?: string;
}

/**
 * SEO-enabled content
 */
export interface ISEOContent {
  readonly metaTitle?: string;
  readonly metaDescription?: string;
  readonly metaImage?: string;
  readonly canonicalUrl?: string;
}

/**
 * Translatable content
 */
export interface ITranslatableContent {
  readonly translationKey?: string;
  readonly language?: string;
}

/**
 * Publishable content
 */
export interface IPublishableContent {
  readonly published: boolean;
  readonly publishedAt?: string;
  readonly featured?: boolean;
}

// =============================================================================
// QUERY INTERFACES (Interface Segregation Principle)
// =============================================================================

/**
 * Base query options
 */
export interface IQueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly orderBy?: string;
  readonly orderDirection?: 'asc' | 'desc';
}

/**
 * Search query options
 */
export interface ISearchOptions extends IQueryOptions {
  readonly query: string;
  readonly fields?: string[];
  readonly fuzzy?: boolean;
}

/**
 * Filter query options
 */
export interface IFilterOptions extends IQueryOptions {
  readonly filters: Record<string, any>;
  readonly include?: string[];
}

// =============================================================================
// HOOK RESULT INTERFACES (Interface Segregation Principle)
// =============================================================================

/**
 * Base query result
 */
export interface IQueryResult<T> {
  readonly data: T | undefined;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly isSuccess: boolean;
  readonly isError: boolean;
}

/**
 * List query result
 */
export interface IListQueryResult<T> extends IQueryResult<T[]> {
  readonly isEmpty: boolean;
  readonly hasData: boolean;
  readonly count: number;
}

/**
 * Content status result
 */
export interface IContentStatus {
  readonly isUsingFallbacks: Record<string, boolean>;
  readonly systemHealth: Record<string, boolean>;
  readonly loading: Record<string, boolean>;
  readonly errors: Record<string, Error | null>;
}

// =============================================================================
// VALIDATION INTERFACES (Interface Segregation Principle)
// =============================================================================

/**
 * Field validation rule
 */
export interface IValidationRule {
  readonly type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern';
  readonly value?: any;
  readonly message: string;
}

/**
 * Form field configuration
 */
export interface IFormField {
  readonly name: string;
  readonly type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time';
  readonly label: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly validation?: IValidationRule[];
  readonly options?: Array<{ value: string; label: string }>;
}

/**
 * Form configuration
 */
export interface IFormConfig {
  readonly fields: IFormField[];
  readonly submitButton: {
    readonly text: string;
    readonly submittingText: string;
  };
  readonly messages: {
    readonly success: string;
    readonly error: string;
  };
}

// =============================================================================
// COMPONENT INTERFACES (Interface Segregation Principle)
// =============================================================================

/**
 * Base component props
 */
export interface IBaseComponentProps {
  readonly className?: string;
  readonly testId?: string;
}

/**
 * Loading state component props
 */
export interface ILoadingProps extends IBaseComponentProps {
  readonly isLoading: boolean;
  readonly loadingText?: string;
  readonly skeleton?: boolean;
}

/**
 * Error state component props
 */
export interface IErrorProps extends IBaseComponentProps {
  readonly error: Error | null;
  readonly fallback?: React.ReactNode;
  readonly onRetry?: () => void;
}

/**
 * Empty state component props
 */
export interface IEmptyStateProps extends IBaseComponentProps {
  readonly message: string;
  readonly action?: {
    readonly text: string;
    readonly onClick: () => void;
  };
}

// =============================================================================
// SERVICE INTERFACES (Single Responsibility Principle)
// =============================================================================

/**
 * Cache service interface
 */
export interface ICacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
}

/**
 * Logger service interface
 */
export interface ILoggerService {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
}

/**
 * Analytics service interface
 */
export interface IAnalyticsService {
  track(event: string, properties?: Record<string, any>): void;
  page(name: string, properties?: Record<string, any>): void;
  identify(userId: string, traits?: Record<string, any>): void;
}

/**
 * Notification service interface
 */
export interface INotificationService {
  success(message: string, options?: any): void;
  error(message: string, options?: any): void;
  warning(message: string, options?: any): void;
  info(message: string, options?: any): void;
}

// =============================================================================
// CONFIGURATION INTERFACES (Open/Closed Principle)
// =============================================================================

/**
 * Environment configuration
 */
export interface IEnvironmentConfig {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly API_BASE_URL: string;
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN: string;
  readonly ENABLE_FALLBACKS: boolean;
  readonly LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Feature flags configuration
 */
export interface IFeatureFlags {
  readonly enableERPNextIntegration: boolean;
  readonly enableStrapiCMS: boolean;
  readonly enableFallbacks: boolean;
  readonly enableAnalytics: boolean;
  readonly enableDevelopmentTools: boolean;
}

/**
 * Application configuration
 */
export interface IAppConfig {
  readonly environment: IEnvironmentConfig;
  readonly features: IFeatureFlags;
  readonly cache: {
    readonly defaultTTL: number;
    readonly maxSize: number;
  };
  readonly retry: {
    readonly maxAttempts: number;
    readonly delay: number;
  };
}

// =============================================================================
// TYPE GUARDS AND UTILITIES
// =============================================================================

/**
 * Type guard to check if content has meta properties
 */
export function hasMetaContent(content: any): content is IContentWithMeta {
  return content && typeof content.title === 'string';
}

/**
 * Type guard to check if content is publishable
 */
export function isPublishableContent(content: any): content is IPublishableContent {
  return content && typeof content.published === 'boolean';
}

/**
 * Type guard to check if content has SEO properties
 */
export function hasSEOContent(content: any): content is ISEOContent {
  return content && (content.metaTitle || content.metaDescription);
}

/**
 * Type guard to check if query result has data
 */
export function hasQueryData<T>(result: IQueryResult<T>): result is IQueryResult<T> & { data: T } {
  return result.isSuccess && result.data !== undefined;
}
