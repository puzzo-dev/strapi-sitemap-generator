/**
 * Base Service Class
 * 
 * Implements common patterns to avoid duplication across services.
 * Follows Single Responsibility and DRY principles.
 */

import { ICMSProvider, ILoggerService, ICacheService } from '@/lib/abstractions';

/**
 * Base HTTP client configuration
 */
export interface IHttpConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retries: number;
  readonly headers: Record<string, string>;
}

/**
 * HTTP request options
 */
export interface IRequestOptions {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, any>;
  readonly body?: any;
  readonly timeout?: number;
}

/**
 * Base service class that provides common functionality
 * Follows Single Responsibility Principle
 */
export abstract class BaseService {
  protected readonly config: IHttpConfig;
  protected readonly logger?: ILoggerService;
  protected readonly cache?: ICacheService;

  constructor(
    config: IHttpConfig,
    logger?: ILoggerService,
    cache?: ICacheService
  ) {
    this.config = config;
    this.logger = logger;
    this.cache = cache;
  }

  /**
   * Make HTTP request with common error handling and retry logic
   * DRY principle: Centralizes request logic
   */
  protected async makeRequest<T>(
    endpoint: string,
    options: IRequestOptions = { method: 'GET' }
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const requestConfig = this.buildRequestConfig(options);

    // Check cache first for GET requests
    if (options.method === 'GET' && this.cache) {
      const cached = this.cache.get<T>(url);
      if (cached) {
        this.logger?.debug(`Cache hit for ${url}`);
        return cached;
      }
    }

    let lastError: Error;
    
    // Retry logic
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        this.logger?.debug(`Making request to ${url} (attempt ${attempt})`);
        
        const response = await fetch(url, requestConfig);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache successful GET requests
        if (options.method === 'GET' && this.cache) {
          this.cache.set(url, data, 5 * 60 * 1000); // 5 minutes
        }

        this.logger?.debug(`Request successful for ${url}`);
        return data;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.logger?.warn(`Request failed for ${url}`, lastError);

        if (attempt < this.config.retries) {
          await this.delay(attempt * 1000); // Exponential backoff
        }
      }
    }

    this.logger?.error(`All retries failed for ${url}`, lastError!);
    throw lastError!;
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const baseUrl = this.config.baseUrl.endsWith('/') 
      ? this.config.baseUrl.slice(0, -1) 
      : this.config.baseUrl;
    
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${baseUrl}${cleanEndpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  }

  /**
   * Build fetch request configuration
   */
  private buildRequestConfig(options: IRequestOptions): RequestInit {
    const headers = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...options.headers
    };

    const config: RequestInit = {
      method: options.method,
      headers,
      signal: this.createAbortSignal(options.timeout || this.config.timeout)
    };

    if (options.body && options.method !== 'GET') {
      config.body = typeof options.body === 'string' 
        ? options.body 
        : JSON.stringify(options.body);
    }

    return config;
  }

  /**
   * Create abort signal for request timeout
   */
  private createAbortSignal(timeout: number): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Health check method - to be implemented by subclasses
   */
  public abstract isHealthy(): Promise<boolean>;
}

/**
 * CMS Service base class
 * Implements ICMSProvider interface
 */
export abstract class BaseCMSService extends BaseService implements ICMSProvider {
  public abstract readonly name: string;
  public get baseUrl(): string {
    return this.config.baseUrl;
  }

  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET', params });
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'POST', body: data });
  }

  public async put<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'PUT', body: data });
  }

  public async delete(endpoint: string): Promise<boolean> {
    try {
      await this.makeRequest(endpoint, { method: 'DELETE' });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Data source base class
 * Implements common CRUD operations
 */
export abstract class BaseDataSource<T extends { id: string | number }> {
  protected readonly service: BaseCMSService;
  protected readonly endpoint: string;
  protected readonly logger?: ILoggerService;

  constructor(service: BaseCMSService, endpoint: string, logger?: ILoggerService) {
    this.service = service;
    this.endpoint = endpoint;
    this.logger = logger;
  }

  public async getAll(): Promise<T[]> {
    try {
      const response = await this.service.get<{ data: T[] }>(this.endpoint);
      return this.transformList(response.data || []);
    } catch (error) {
      this.logger?.error(`Failed to fetch all ${this.endpoint}`, error as Error);
      return [];
    }
  }

  public async get(id: string): Promise<T | null> {
    try {
      const response = await this.service.get<{ data: T }>(`${this.endpoint}/${id}`);
      return this.transformItem(response.data);
    } catch (error) {
      this.logger?.error(`Failed to fetch ${this.endpoint}/${id}`, error as Error);
      return null;
    }
  }

  public async create(data: Partial<T>): Promise<T> {
    const response = await this.service.post<{ data: T }>(this.endpoint, { data });
    return this.transformItem(response.data);
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const response = await this.service.put<{ data: T }>(`${this.endpoint}/${id}`, { data });
    return this.transformItem(response.data);
  }

  public async delete(id: string): Promise<boolean> {
    return this.service.delete(`${this.endpoint}/${id}`);
  }

  public async search(query: string): Promise<T[]> {
    try {
      const response = await this.service.get<{ data: T[] }>(this.endpoint, {
        'filters[title][$containsi]': query
      });
      return this.transformList(response.data || []);
    } catch (error) {
      this.logger?.error(`Failed to search ${this.endpoint}`, error as Error);
      return [];
    }
  }

  /**
   * Transform single item - to be overridden by subclasses if needed
   */
  protected transformItem(item: any): T {
    return item;
  }

  /**
   * Transform list of items - to be overridden by subclasses if needed
   */
  protected transformList(items: any[]): T[] {
    return items.map(item => this.transformItem(item));
  }
}

/**
 * Form submission base class
 * Follows Single Responsibility Principle for form handling
 */
export abstract class BaseFormService {
  protected readonly service: BaseCMSService;
  protected readonly logger?: ILoggerService;

  constructor(service: BaseCMSService, logger?: ILoggerService) {
    this.service = service;
    this.logger = logger;
  }

  /**
   * Generic form submission method
   * DRY principle: Centralizes form submission logic
   */
  protected async submitForm<T>(
    endpoint: string,
    data: T,
    transformFn?: (data: T) => any
  ): Promise<boolean> {
    try {
      const payload = transformFn ? transformFn(data) : data;
      await this.service.post(endpoint, payload);
      this.logger?.info(`Form submitted successfully to ${endpoint}`);
      return true;
    } catch (error) {
      this.logger?.error(`Form submission failed for ${endpoint}`, error as Error);
      return false;
    }
  }
}
