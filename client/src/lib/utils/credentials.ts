/**
 * Credential helper that reads secrets from various sources based on environment:
 * 1. Cloudflare Pages: __CLOUDFLARE_SECRETS__ (runtime bindings)
 * 2. Vercel/Netlify: process.env (build-time injection)
 * 3. Local dev: Vite environment variables
 */
export function getSecret(key: string): string | undefined {
  // 1. Try Cloudflare runtime secrets (production on Cloudflare Pages)
  try {
    const secrets = (globalThis as any).__CLOUDFLARE_SECRETS__ as Record<string, string> | undefined;
    if (secrets && secrets[key]) {
      console.debug(`[Secrets] Loaded ${key} from Cloudflare secrets`);
      return secrets[key];
    }
  } catch {
    // Ignore access errors to globalThis in non-Cloudflare environments
  }

  // 2. Try process.env for Vercel/Netlify (server-side rendering)
  if (typeof process !== 'undefined' && process.env) {
    const envValue = process.env[key];
    if (envValue) {
      console.debug(`[Secrets] Loaded ${key} from process.env`);
      return envValue;
    }
  }

  // 3. Local dev fallback: Vite env vars (prefixed with VITE_)
  const envKey = `VITE_${key}`;
  const viteEnvValue = (import.meta as any).env?.[envKey] as string | undefined;
  if (viteEnvValue) {
    console.debug(`[Secrets] Loaded ${key} from Vite env (${envKey})`);
    return viteEnvValue;
  }

  console.warn(`[Secrets] Could not find secret: ${key}`);
  return undefined;
}
