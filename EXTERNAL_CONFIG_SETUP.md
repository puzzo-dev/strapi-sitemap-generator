# External Configuration Setup Guide

## Overview

This document explains how to securely manage external integration credentials (Strapi, ERPNext) using a layered security approach.

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Browser)                       │
│  - Only has public Strapi URL                                │
│  - No API tokens or secrets in bundle                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Requests config
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Worker (Secure Proxy)                │
│  - Validates user session/auth                               │
│  - Returns Strapi API token if authorized                    │
│  - Rate limiting & security headers                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Uses token to fetch
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Strapi CMS                              │
│  - Stores ERPNext credentials in content type                │
│  - Protected by API token authentication                     │
│  - Returns site config with ERPNext details                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Used for backend operations
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                       ERPNext                                │
│  - Receives API calls with credentials from Strapi           │
│  - Processes blog, HR, CRM operations                        │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Steps

### 1. Strapi Content Type Setup

Create a **Site Config** single type in Strapi with these fields:

```json
{
  "siteName": "text",
  "siteDescription": "textarea",
  "siteUrl": "text",
  "contactEmail": "email",
  "contactPhone": "text",
  "contactAddress": "textarea",
  "logoLight": "media",
  "logoDark": "media",
  "favicon": "media",
  "erpNextUrl": "text",
  "erpNextApiKey": "text (encrypted)",
  "erpNextApiSecret": "text (encrypted)",
  "supportedLanguages": "json",
  "defaultLanguage": "text"
}
```

**Security Note**: Mark `erpNextApiKey` and `erpNextApiSecret` as **private fields** in Strapi so they're not exposed in public API responses.

### 2. Cloudflare Worker Setup

Create a Cloudflare Worker to securely serve the Strapi API token:

```javascript
// worker.js
export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || 'https://yourdomain.com',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    };

    // Handle OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Validate request (add your auth logic here)
    const authHeader = request.headers.get('Authorization');
    
    // Simple example - in production, validate JWT or session
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders 
      });
    }

    // Return Strapi token from environment variables
    return new Response(
      JSON.stringify({ 
        token: env.STRAPI_API_TOKEN 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
```

Deploy with:
```bash
wrangler publish
```

Set environment variables:
```bash
wrangler secret put STRAPI_API_TOKEN
wrangler secret put ALLOWED_ORIGIN
```

### 3. Environment Variables

**Frontend (.env):**
```bash
# Public - Safe to expose
VITE_STRAPI_API_URL=https://cms.yourdomain.com
VITE_SECURE_TOKEN_ENDPOINT=https://config.yourdomain.workers.dev

# Feature flags
VITE_ENABLE_FALLBACKS=true
VITE_ENABLE_ERPNEXT_INTEGRATION=true
VITE_ENABLE_STRAPI_CMS=true

# Development only - DO NOT use in production
VITE_STRAPI_API_TOKEN=your-dev-token-here
```

**Backend/Strapi (.env):**
```bash
# Strapi
DATABASE_URL=postgresql://...
JWT_SECRET=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...

# ERPNext - Never expose these
ERPNEXT_URL=https://erp.yourdomain.com
ERPNEXT_API_KEY=...
ERPNEXT_API_SECRET=...
```

**Cloudflare Worker Secrets:**
```bash
STRAPI_API_TOKEN=your-strapi-read-only-token
ALLOWED_ORIGIN=https://yourdomain.com
```

### 4. Update Frontend Code

The config is already implemented in `client/src/lib/config.ts`. To use it:

```typescript
import { fetchExternalConfig, getERPNextConfig, PUBLIC_CONFIG } from '@/lib/config';

// In your app initialization (main.tsx or App.tsx)
import { initializeConfig } from '@/lib/config';

// Initialize on app start
await initializeConfig();

// Use in components/services
const siteConfig = await fetchExternalConfig();
// siteConfig includes all site config but ERPNext credentials are filtered

// For server-side operations (if you add SSR)
const erpNextConfig = await getERPNextConfig();
// Returns { url, apiKey, apiSecret } - NEVER call from client side
```

### 5. Update Strapi Service

Modify `client/src/lib/strapi.ts` to use the new config system:

```typescript
import { fetchExternalConfig, PUBLIC_CONFIG } from './config';

// Replace hardcoded STRAPI_URL and STRAPI_API_TOKEN
const STRAPI_URL = PUBLIC_CONFIG.strapiUrl;

// Use secure token fetching
async function getStrapiHeaders() {
  const config = await fetchExternalConfig();
  // Token comes from secure endpoint, not exposed in bundle
  return {
    'Content-Type': 'application/json',
    // Token is fetched securely, not from env
  };
}
```

### 6. Update ERPNext Service

Modify `client/src/lib/erpnext.ts` to fetch credentials from Strapi:

```typescript
import { getERPNextConfig } from './config';

export async function getERPNextCredentials() {
  // This should only be called server-side or through a proxy
  const config = await getERPNextConfig();
  
  if (!config) {
    throw new Error('ERPNext configuration not available');
  }
  
  return config;
}
```

## Security Best Practices

### ✅ DO

1. **Store Strapi token in Cloudflare Worker secrets**
2. **Store ERPNext credentials in Strapi CMS**
3. **Use environment variables for backend services only**
4. **Implement rate limiting on token endpoint**
5. **Use HTTPS everywhere**
6. **Rotate API keys regularly**
7. **Audit access logs**
8. **Use read-only tokens when possible**

### ❌ DON'T

1. **Never commit secrets to Git**
2. **Never expose API tokens in frontend bundle**
3. **Never store credentials in localStorage/sessionStorage**
4. **Never log sensitive credentials**
5. **Never use production credentials in development**
6. **Never share secrets via insecure channels**

## Production Deployment Checklist

- [ ] Strapi CMS deployed with HTTPS
- [ ] ERPNext credentials stored in Strapi
- [ ] Cloudflare Worker deployed and secured
- [ ] Worker secrets configured
- [ ] Frontend environment variables set (public only)
- [ ] Remove VITE_STRAPI_API_TOKEN from production .env
- [ ] Test token endpoint with authentication
- [ ] Enable rate limiting on Worker
- [ ] Set up monitoring and alerts
- [ ] Document credential rotation process
- [ ] Test fallback behavior when services are down

## Credential Rotation Process

1. Generate new ERPNext API credentials in ERPNext admin panel
2. Update credentials in Strapi CMS Site Config
3. Clear config cache: Call `clearConfigCache()` in your app
4. Monitor for errors during transition
5. Invalidate old credentials in ERPNext after verification

## Troubleshooting

### Config not loading
```typescript
import { clearConfigCache, fetchExternalConfig } from '@/lib/config';

// Force refresh
clearConfigCache();
const config = await fetchExternalConfig();
console.log('Config:', config);
```

### Token endpoint errors
- Check Cloudflare Worker logs
- Verify CORS headers
- Confirm authentication headers
- Check worker secrets are set

### ERPNext connection fails
- Verify credentials in Strapi
- Test ERPNext API directly
- Check network connectivity
- Review ERPNext API logs

## Development vs Production

**Development:**
- Use local Strapi instance
- Store token in `.env.local` (gitignored)
- Mock Cloudflare Worker with local endpoint

**Production:**
- Use Cloudflare Worker for token endpoint
- No secrets in frontend bundle
- All credentials fetched dynamically
- Implement proper authentication

## Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Strapi API Authentication](https://docs.strapi.io/dev-docs/configurations/api-tokens)
- [ERPNext API Guide](https://frappeframework.com/docs/user/en/api)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
