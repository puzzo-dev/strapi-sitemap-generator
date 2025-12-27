/**
 * Minimal base service with shared utilities.
 * Currently acts as a marker to satisfy barrel exports.
 */
export class BaseService {
  protected buildQueryParams(params?: Record<string, string | number | boolean | undefined>): string {
    if (!params) return '';
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  }
}
