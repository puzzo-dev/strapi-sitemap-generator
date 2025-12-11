/**
 * Credential helper that reads secrets from Cloudflare's secret store (in prod)
 * and falls back to Vite environment variables for local development.
 */
export function getSecret(key: string): string | undefined {
  try {
    const secrets = (globalThis as any).__CLOUDFLARE_SECRETS__ as Record<string, string> | undefined;
    if (secrets && secrets[key]) {
      return secrets[key];
    }
  } catch {
    // Ignore access errors to globalThis in non-Cloudflare environments
  }

  // Local dev fallback: Vite env vars
  const envKey = `VITE_${key}`;
  return (import.meta as any).env?.[envKey] as string | undefined;
}
