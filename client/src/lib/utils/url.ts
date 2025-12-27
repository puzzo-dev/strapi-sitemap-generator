/**
 * Extract URL path from UrlProps or string
 */
export function getUrlPath(url: any): string {
  if (typeof url === 'string') return url;
  return url?.url || '/';
}
