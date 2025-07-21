/**
 * Utility Services
 * 
 * Implements common utility services following SOLID principles.
 * Each service has a single responsibility and depends on abstractions.
 */

import { 
  ICacheService, 
  ILoggerService, 
  IAnalyticsService, 
  INotificationService 
} from '@/lib/abstractions';

/**
 * Browser Cache Service
 * Implements ICacheService using localStorage/sessionStorage
 */
export class BrowserCacheService implements ICacheService {
  private readonly storage: Storage;
  private readonly prefix: string;

  constructor(
    storage: Storage = localStorage,
    prefix: string = 'ivarse_cache_'
  ) {
    this.storage = storage;
    this.prefix = prefix;
  }

  public get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      
      // Check if item has expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.delete(key);
        return null;
      }

      return parsed.value;
    } catch {
      return null;
    }
  }

  public set<T>(key: string, value: T, ttl?: number): void {
    try {
      const item = {
        value,
        expiry: ttl ? Date.now() + ttl : null
      };

      this.storage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set cache item:', error);
    }
  }

  public delete(key: string): void {
    this.storage.removeItem(this.prefix + key);
  }

  public clear(): void {
    const keys = Object.keys(this.storage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key);
      }
    });
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }
}

/**
 * Memory Cache Service
 * Implements ICacheService using in-memory storage
 */
export class MemoryCacheService implements ICacheService {
  private readonly cache = new Map<string, { value: any; expiry: number | null }>();
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item has expired
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  public set<T>(key: string, value: T, ttl?: number): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiry: ttl ? Date.now() + ttl : null
    });
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }
}

/**
 * Console Logger Service
 * Implements ILoggerService for development/debugging
 */
export class ConsoleLoggerService implements ILoggerService {
  private readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
  private readonly enabledInProduction: boolean;

  constructor(
    logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info',
    enabledInProduction: boolean = false
  ) {
    this.logLevel = logLevel;
    this.enabledInProduction = enabledInProduction;
  }

  public debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  }

  public info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, meta);
    }
  }

  public warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, meta);
    }
  }

  public error(message: string, error?: Error, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error, meta);
    }
  }

  private shouldLog(level: string): boolean {
    if (import.meta.env.NODE_ENV === 'production' && !this.enabledInProduction) {
      return false;
    }

    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex;
  }
}

/**
 * Remote Logger Service
 * Implements ILoggerService for production logging to external service
 */
export class RemoteLoggerService implements ILoggerService {
  private readonly endpoint: string;
  private readonly apiKey: string;
  private readonly batchSize: number;
  private readonly flushInterval: number;
  private logQueue: any[] = [];
  private flushTimer?: NodeJS.Timeout;

  constructor(
    endpoint: string,
    apiKey: string,
    batchSize: number = 10,
    flushInterval: number = 5000
  ) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.startFlushTimer();
  }

  public debug(message: string, meta?: any): void {
    this.addToQueue('debug', message, undefined, meta);
  }

  public info(message: string, meta?: any): void {
    this.addToQueue('info', message, undefined, meta);
  }

  public warn(message: string, meta?: any): void {
    this.addToQueue('warn', message, undefined, meta);
  }

  public error(message: string, error?: Error, meta?: any): void {
    this.addToQueue('error', message, error, meta);
  }

  private addToQueue(level: string, message: string, error?: Error, meta?: any): void {
    this.logQueue.push({
      level,
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined,
      meta,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });

    if (this.logQueue.length >= this.batchSize) {
      this.flush();
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      if (this.logQueue.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.logQueue.length === 0) return;

    const logs = [...this.logQueue];
    this.logQueue = [];

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ logs })
      });
    } catch (error) {
      // Fallback to console if remote logging fails
      console.error('Failed to send logs to remote service:', error);
      logs.forEach(log => {
        console.log(`[${log.level.toUpperCase()}] ${log.message}`, log);
      });
    }
  }

  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

/**
 * Analytics Service (Google Analytics, Mixpanel, etc.)
 * Implements IAnalyticsService
 */
export class AnalyticsService implements IAnalyticsService {
  private readonly providers: Array<{
    name: string;
    track: (event: string, properties?: any) => void;
    page: (name: string, properties?: any) => void;
    identify: (userId: string, traits?: any) => void;
  }> = [];

  public addProvider(provider: any): void {
    this.providers.push(provider);
  }

  public track(event: string, properties?: Record<string, any>): void {
    this.providers.forEach(provider => {
      try {
        provider.track(event, properties);
      } catch (error) {
        console.warn(`Analytics provider ${provider.name} failed:`, error);
      }
    });
  }

  public page(name: string, properties?: Record<string, any>): void {
    this.providers.forEach(provider => {
      try {
        provider.page(name, properties);
      } catch (error) {
        console.warn(`Analytics provider ${provider.name} failed:`, error);
      }
    });
  }

  public identify(userId: string, traits?: Record<string, any>): void {
    this.providers.forEach(provider => {
      try {
        provider.identify(userId, traits);
      } catch (error) {
        console.warn(`Analytics provider ${provider.name} failed:`, error);
      }
    });
  }
}

/**
 * Toast Notification Service
 * Implements INotificationService using React Hot Toast
 */
export class ToastNotificationService implements INotificationService {
  private toastFunction: any;

  constructor(toastFunction: any) {
    this.toastFunction = toastFunction;
  }

  public success(message: string, options?: any): void {
    this.toastFunction.success(message, options);
  }

  public error(message: string, options?: any): void {
    this.toastFunction.error(message, options);
  }

  public warning(message: string, options?: any): void {
    this.toastFunction(message, { 
      icon: '⚠️',
      style: { background: '#f59e0b', color: 'white' },
      ...options 
    });
  }

  public info(message: string, options?: any): void {
    this.toastFunction(message, { 
      icon: 'ℹ️',
      style: { background: '#3b82f6', color: 'white' },
      ...options 
    });
  }
}

/**
 * Service Factory
 * Creates and configures all utility services
 * Follows Dependency Inversion Principle
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  
  private cacheService?: ICacheService;
  private loggerService?: ILoggerService;
  private analyticsService?: IAnalyticsService;
  private notificationService?: INotificationService;

  private constructor() {}

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public getCacheService(): ICacheService {
    if (!this.cacheService) {
      // Use memory cache for production, localStorage for development
      this.cacheService = import.meta.env.NODE_ENV === 'production'
        ? new MemoryCacheService(1000)
        : new BrowserCacheService();
    }
    return this.cacheService;
  }

  public getLoggerService(): ILoggerService {
    if (!this.loggerService) {
      if (import.meta.env.NODE_ENV === 'production') {
        this.loggerService = new RemoteLoggerService(
          import.meta.env.VITE_LOG_ENDPOINT || '',
          import.meta.env.VITE_LOG_API_KEY || ''
        );
      } else {
        this.loggerService = new ConsoleLoggerService('debug');
      }
    }
    return this.loggerService;
  }

  public getAnalyticsService(): IAnalyticsService {
    if (!this.analyticsService) {
      this.analyticsService = new AnalyticsService();
      
      // Add Google Analytics if available
      if (window.gtag) {
        this.analyticsService.addProvider({
          name: 'Google Analytics',
          track: (event: string, properties?: any) => {
            window.gtag('event', event, properties);
          },
          page: (name: string, properties?: any) => {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: name,
              ...properties
            });
          },
          identify: (userId: string, traits?: any) => {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
              user_id: userId,
              custom_map: traits
            });
          }
        });
      }
    }
    return this.analyticsService;
  }

  public getNotificationService(): INotificationService {
    if (!this.notificationService) {
      // Assume toast function is available globally or passed in
      this.notificationService = new ToastNotificationService(
        (window as any).toast || console.log
      );
    }
    return this.notificationService;
  }

  public setToastFunction(toastFunction: any): void {
    this.notificationService = new ToastNotificationService(toastFunction);
  }
}

// Global service instances
export const serviceFactory = ServiceFactory.getInstance();
export const cacheService = serviceFactory.getCacheService();
export const loggerService = serviceFactory.getLoggerService();
export const analyticsService = serviceFactory.getAnalyticsService();
export const notificationService = serviceFactory.getNotificationService();
