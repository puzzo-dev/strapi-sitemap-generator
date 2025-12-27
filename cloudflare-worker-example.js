/**
 * Example Cloudflare Worker for Secure Token Management
 * 
 * Deploy this to Cloudflare Workers to serve Strapi API tokens securely
 * without exposing them in your frontend bundle.
 * 
 * Setup:
 * 1. Install Wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Create project: wrangler init secure-token-api
 * 4. Add this code to src/index.js
 * 5. Configure wrangler.toml
 * 6. Set secrets: wrangler secret put STRAPI_API_TOKEN
 * 7. Deploy: wrangler publish
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS configuration
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Rate limiting (simple in-memory - use Durable Objects for production)
    const clientIP = request.headers.get('CF-Connecting-IP');
    const rateLimitKey = `ratelimit:${clientIP}`;
    
    // Security headers
    const securityHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };

    try {
      // Route: GET /config/strapi-token
      if (url.pathname === '/config/strapi-token' && request.method === 'GET') {
        // Basic authentication check
        const authHeader = request.headers.get('Authorization');
        
        // Option 1: Bearer token authentication
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return new Response(
            JSON.stringify({ error: 'Unauthorized - Missing or invalid token' }),
            { status: 401, headers: securityHeaders }
          );
        }

        const userToken = authHeader.substring(7);
        
        // Validate user token (implement your logic)
        // Example: Check against a list of valid tokens or validate JWT
        const isValidUser = await validateUserToken(userToken, env);
        
        if (!isValidUser) {
          return new Response(
            JSON.stringify({ error: 'Unauthorized - Invalid credentials' }),
            { status: 401, headers: securityHeaders }
          );
        }

        // Return Strapi API token
        return new Response(
          JSON.stringify({
            token: env.STRAPI_API_TOKEN,
            expiresIn: 3600, // Optional: token expiry in seconds
          }),
          {
            status: 200,
            headers: securityHeaders,
          }
        );
      }

      // Route: GET /config/public
      // Returns non-sensitive public configuration
      if (url.pathname === '/config/public' && request.method === 'GET') {
        return new Response(
          JSON.stringify({
            strapiUrl: env.STRAPI_URL || 'http://localhost:1337',
            enableFeatures: {
              erpNext: env.ENABLE_ERPNEXT === 'true',
              strapi: env.ENABLE_STRAPI !== 'false',
              fallbacks: env.ENABLE_FALLBACKS !== 'false',
            },
          }),
          {
            status: 200,
            headers: securityHeaders,
          }
        );
      }

      // Health check endpoint
      if (url.pathname === '/health' && request.method === 'GET') {
        return new Response(
          JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
          {
            status: 200,
            headers: securityHeaders,
          }
        );
      }

      // 404 for unknown routes
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: securityHeaders }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: securityHeaders }
      );
    }
  },
};

/**
 * Validate user token
 * Implement your authentication logic here
 */
async function validateUserToken(token, env) {
  // Option 1: Simple token comparison (for demo/dev)
  if (env.VALID_USER_TOKENS) {
    const validTokens = env.VALID_USER_TOKENS.split(',');
    return validTokens.includes(token);
  }

  // Option 2: JWT validation (recommended for production)
  try {
    // You'll need to add a JWT library or use crypto.subtle
    // const payload = await verifyJWT(token, env.JWT_SECRET);
    // return payload && payload.exp > Date.now() / 1000;
    
    // For now, accept any token in development
    return env.ENVIRONMENT === 'development' ? true : false;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// Optional: Rate limiting helper (use Durable Objects for production)
async function checkRateLimit(key, limit = 100, window = 60) {
  // Implement rate limiting using KV or Durable Objects
  // This is a placeholder - implement based on your needs
  return true;
}
