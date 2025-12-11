/**
 * Utility Services
 */

export class BrowserCacheService {
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

export class MemoryCacheService {
  private readonly cache = new Map<string, { value: any; expiry: number | null }>();
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  public set<T>(key: string, value: T, ttl?: number): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
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

export class ConsoleLoggerService {
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

export class ToastNotificationService {
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

const createCacheService = () => {
  return import.meta.env.NODE_ENV === 'production'
    ? new MemoryCacheService(1000)
    : new BrowserCacheService();
};

const createLoggerService = () => {
  if (import.meta.env.NODE_ENV === 'production') {
    // Return a dummy logger for now, as RemoteLoggerService is not used
    return new ConsoleLoggerService('error', true);
  } else {
    return new ConsoleLoggerService('debug');
  }
};

const createNotificationService = () => {
  return new ToastNotificationService(
    (window as any).toast || console.log
  );
};

// Placeholder remote logger for environments where remote logging is configured
export class RemoteLoggerService extends ConsoleLoggerService {
  constructor() {
    super('error', true);
  }
}

// Simple service factory to centralize creation of shared utilities
export class ServiceFactory {
  static createLogger() {
    return createLoggerService();
  }

  static createCache() {
    return createCacheService();
  }

  static createNotification() {
    return createNotificationService();
  }
}

export const cacheService = createCacheService();
export const loggerService = createLoggerService();
export const notificationService = createNotificationService();
