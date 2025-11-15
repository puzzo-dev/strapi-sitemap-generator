# Security Architecture - External Configuration Management

## Overview

This document describes the secure external configuration system for managing sensitive credentials (Strapi API tokens, ERPNext credentials) without exposing them in the frontend bundle.

## Problem Statement

**Before:**
- ❌ Strapi API token hardcoded in `.env` → exposed in frontend bundle
- ❌ ERPNext credentials in environment variables → potential security risk
- ❌ Secrets committed to Git → security vulnerability
- ❌ No credential rotation strategy

**After:**
- ✅ Strapi API token served securely via Cloudflare Worker
- ✅ ERPNext credentials stored in Strapi CMS (encrypted at rest)
- ✅ No secrets in frontend bundle
- ✅ Easy credential rotation without code changes
- ✅ Centralized configuration management

## Architecture Layers

### Layer 1: Frontend (Client-Side)
**File:** `client/src/lib/config.ts`

**What it knows:**
- Public Strapi URL only
- Cloudflare Worker endpoint URL
- Feature flags (non-sensitive)

**What it does NOT know:**
- Strapi API token
- ERPNext credentials
- Any sensitive keys

**Security measures:**
- No secrets in bundle
- Read-only configuration
- Automatic fallback to local data

### Layer 2: Cloudflare Worker (Secure Proxy)
**File:** `cloudflare-worker-example.js`

**Responsibilities:**
- Authenticates frontend requests
- Serves Strapi API token to authorized clients
- Implements rate limiting
- Provides security headers
- Logs access for auditing

**Security measures:**
- Token stored in Worker secrets (encrypted)
- CORS protection
- Rate limiting per IP
- Request validation
- HTTPS only

### Layer 3: Strapi CMS (Configuration Store)
**Content Type:** Site Config (Single Type)

**Stores:**
- Site configuration (public)
- ERPNext URL
- ERPNext API key (private field)
- ERPNext API secret (private field)
- Language settings
- Feature flags

**Security measures:**
- API token authentication required
- Private fields not exposed in API
- Role-based access control
- Encrypted database storage
- Audit logging

### Layer 4: ERPNext (External Integration)
**Purpose:** HR, CRM, Blog backend

**Accessed via:**
- Server-side only
- Credentials from Strapi
- Never exposed to frontend

**Security measures:**
- API key authentication
- IP whitelisting (optional)
- Rate limiting
- Audit trail

## Data Flow Diagrams

### Configuration Fetch Flow

```
┌──────────────┐
│   Browser    │
│   (React)    │
└──────┬───────┘
       │ 1. Request config with auth
       ▼
┌──────────────────────┐
│ Cloudflare Worker    │
│ config.domain.workers│
│      .dev            │
└──────┬───────────────┘
       │ 2. Validate & return token
       ▼
┌──────────────┐
│   Browser    │◄──────────────┐
└──────┬───────┘               │
       │ 3. Use token          │
       │    to fetch config    │
       ▼                       │
┌──────────────────────┐       │
│   Strapi CMS         │       │
│   cms.domain.com     │       │
└──────┬───────────────┘       │
       │ 4. Return config      │
       │    (includes ERPNext  │
       │     credentials)      │
       └───────────────────────┘
```

### ERPNext Integration Flow

```
┌──────────────┐
│   Browser    │
│  (Frontend)  │
└──────┬───────┘
       │ 1. User submits form
       ▼
┌──────────────────────┐
│  Form Submission     │
│  Handler (Frontend)  │
└──────┬───────────────┘
       │ 2. Send to backend/proxy
       ▼
┌──────────────────────┐
│  Strapi Webhook or   │
│  Backend Service     │
└──────┬───────────────┘
       │ 3. Fetch ERPNext config
       │    from Strapi
       ▼
┌──────────────────────┐
│    Strapi CMS        │
│  (Config Store)      │
└──────┬───────────────┘
       │ 4. Return credentials
       ▼
┌──────────────────────┐
│  Backend Service     │
│  with Credentials    │
└──────┬───────────────┘
       │ 5. Call ERPNext API
       ▼
┌──────────────────────┐
│     ERPNext          │
│  (HR, CRM, Blog)     │
└──────────────────────┘
```

## Implementation Files

### Core Files

1. **`client/src/lib/config.ts`**
   - External configuration management
   - Secure token fetching
   - Configuration caching
   - Public API

2. **`cloudflare-worker-example.js`**
   - Cloudflare Worker implementation
   - Token serving endpoint
   - Authentication logic
   - Rate limiting

3. **`wrangler.toml`**
   - Cloudflare Worker configuration
   - Environment-specific settings
   - Secret bindings

4. **`deploy-config.sh`**
   - Deployment script
   - Secret validation
   - Environment selection

### Documentation

1. **`EXTERNAL_CONFIG_SETUP.md`**
   - Complete setup guide
   - Step-by-step instructions
   - Best practices
   - Troubleshooting

2. **`SECURITY_ARCHITECTURE.md`** (this file)
   - Architecture overview
   - Security measures
   - Data flows
   - Threat model

## Security Measures by Layer

### Frontend Security

- **No Secrets in Bundle**
  - All sensitive data fetched at runtime
  - Environment variables only for public config
  - No API tokens in localStorage/sessionStorage

- **Secure Communication**
  - HTTPS only
  - Secure token endpoint
  - CORS validation

- **Fallback Strategy**
  - Works without external services
  - Degrades gracefully
  - Local data as ultimate fallback

### Worker Security

- **Authentication**
  - Bearer token validation
  - Optional JWT verification
  - Session validation

- **Rate Limiting**
  - Per-IP throttling
  - Configurable limits
  - Abuse prevention

- **Security Headers**
  - CORS protection
  - XSS prevention
  - Content type validation
  - HSTS enabled

### Strapi Security

- **Access Control**
  - API token required
  - Role-based permissions
  - Private fields protection

- **Data Protection**
  - Encrypted database
  - Private field filtering
  - Audit logging

### ERPNext Security

- **API Security**
  - API key + secret authentication
  - IP whitelisting (optional)
  - Request signing

- **Access Isolation**
  - Server-side only access
  - Never exposed to frontend
  - Credentials rotation support

## Threat Model & Mitigations

### Threat: API Token Exposure in Frontend Bundle

**Risk Level:** High  
**Mitigation:**
- Tokens served via secure Worker
- No secrets in frontend code
- Runtime token fetching

### Threat: Man-in-the-Middle Attack

**Risk Level:** Medium  
**Mitigation:**
- HTTPS everywhere
- HSTS headers
- Certificate pinning (optional)

### Threat: Token Theft from Network

**Risk Level:** Medium  
**Mitigation:**
- Short-lived tokens (implement expiry)
- Secure token endpoint
- Token rotation

### Threat: Unauthorized Worker Access

**Risk Level:** Medium  
**Mitigation:**
- Authentication required
- Rate limiting
- IP-based throttling
- Logging & monitoring

### Threat: Strapi Data Breach

**Risk Level:** High  
**Mitigation:**
- Encrypted database
- Private fields
- Access control
- Regular security audits

### Threat: ERPNext Credential Leak

**Risk Level:** High  
**Mitigation:**
- Stored in Strapi (encrypted)
- Server-side only access
- API key rotation
- IP whitelisting

### Threat: Credential Rotation Downtime

**Risk Level:** Low  
**Mitigation:**
- Configuration caching
- Gradual rollover
- Fallback mechanisms

## Compliance & Best Practices

### OWASP Top 10 Compliance

- ✅ **A01:2021 - Broken Access Control**
  - Token-based authentication
  - Role-based access in Strapi

- ✅ **A02:2021 - Cryptographic Failures**
  - HTTPS everywhere
  - Encrypted secrets storage

- ✅ **A03:2021 - Injection**
  - Input validation
  - Parameterized queries in Strapi

- ✅ **A05:2021 - Security Misconfiguration**
  - Security headers
  - Least privilege principle

- ✅ **A07:2021 - Identification and Authentication Failures**
  - Strong authentication
  - Token validation

### Industry Standards

- **PCI DSS Alignment**
  - No sensitive data in logs
  - Encrypted transmission
  - Access logging

- **GDPR Compliance**
  - Data minimization
  - Right to erasure support
  - Audit trails

- **SOC 2 Type II Preparation**
  - Access controls
  - Change management
  - Monitoring & logging

## Monitoring & Alerting

### Metrics to Track

1. **Worker Metrics**
   - Request count
   - Error rate
   - Response time
   - Rate limit hits

2. **Authentication Metrics**
   - Successful authentications
   - Failed attempts
   - Token requests

3. **Configuration Metrics**
   - Config fetch success rate
   - Cache hit rate
   - Fallback usage

### Alerts to Configure

- Worker error rate > 5%
- Authentication failures > 10/minute
- Rate limit threshold reached
- Config fetch failures
- Strapi API errors

## Incident Response

### Token Compromise

1. Immediately rotate Strapi API token
2. Clear all configuration caches
3. Review access logs
4. Update Worker secret
5. Monitor for unauthorized access

### ERPNext Credential Leak

1. Rotate ERPNext API credentials
2. Update credentials in Strapi
3. Clear configuration cache
4. Review ERPNext audit logs
5. Check for unauthorized actions

### Worker Compromise

1. Disable compromised Worker
2. Deploy new Worker instance
3. Rotate all secrets
4. Review logs for unauthorized access
5. Update Worker authentication logic

## Future Enhancements

### Planned Improvements

1. **JWT-Based Authentication**
   - Replace simple tokens with JWT
   - Implement token expiry
   - Add refresh token support

2. **Advanced Rate Limiting**
   - Use Durable Objects
   - Per-user limits
   - Dynamic throttling

3. **Secret Rotation Automation**
   - Automatic rotation schedule
   - Zero-downtime updates
   - Rotation notifications

4. **Enhanced Monitoring**
   - Real-time dashboards
   - Anomaly detection
   - Security alerts

5. **Multi-Region Support**
   - Geographic distribution
   - Failover handling
   - Latency optimization

## Conclusion

This security architecture provides:

- ✅ **Defense in Depth**: Multiple security layers
- ✅ **Principle of Least Privilege**: Minimal access rights
- ✅ **Separation of Concerns**: Clear responsibility boundaries
- ✅ **Fail-Safe Defaults**: Secure by default configuration
- ✅ **Complete Mediation**: All access verified
- ✅ **Open Design**: Security through architecture, not obscurity

The system is designed to be:
- **Secure**: Multiple layers of protection
- **Scalable**: Handles growth without security degradation
- **Maintainable**: Easy to update and rotate credentials
- **Auditable**: Complete access logging
- **Resilient**: Graceful degradation on failures

For questions or security concerns, contact: security@yourdomain.com
