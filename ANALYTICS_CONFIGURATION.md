# Analytics Configuration via Strapi CMS

## Overview

Analytics configuration is now fully managed through Strapi CMS, allowing real-time changes without rebuilding the client application. This eliminates downtime and provides dynamic control over analytics settings.

## Strapi Content Types

### Analytics Configuration (Single Type)

**API ID**: `analytics-config`
**Collection Name**: `analytics_configs`

#### Main Fields:
- `enabled` (Boolean) - Master switch for all analytics
- `debugMode` (Boolean) - Enable debug logging
- `cookieConsent` (Boolean) - Require user consent
- `dataRetentionDays` (Integer) - Data retention period (1-1095 days)
- `anonymizeIP` (Boolean) - Anonymize IP addresses

#### Components:

### Google Analytics Component
**Component**: `analytics.google-analytics`

- `enabled` (Boolean) - Enable Google Analytics
- `measurementId` (String) - GA4 Measurement ID (G-XXXXXXXXXX)
- `trackingId` (String) - Legacy UA tracking ID (UA-XXXXXXX-X)
- `enhancedEcommerce` (Boolean) - Enable enhanced ecommerce
- `customDimensions` (JSON) - Custom dimension configuration
- `customMetrics` (JSON) - Custom metric configuration

### Facebook Pixel Component
**Component**: `analytics.facebook-pixel`

- `enabled` (Boolean) - Enable Facebook Pixel
- `pixelId` (String) - Facebook Pixel ID (15-16 digits)
- `advancedMatching` (Boolean) - Enable advanced matching
- `automaticMatching` (Boolean) - Enable automatic matching
- `customEvents` (JSON) - Custom event configuration

### Matomo Component
**Component**: `analytics.matomo`

- `enabled` (Boolean) - Enable Matomo
- `siteId` (String) - Matomo site ID
- `url` (String) - Matomo instance URL
- `trackSubdomains` (Boolean) - Track subdomains
- `cookieDomain` (String) - Cookie domain
- `domains` (JSON) - Array of tracked domains

## Configuration Examples

### Example Analytics Configuration in Strapi:

```json
{
  "enabled": true,
  "debugMode": false,
  "cookieConsent": true,
  "dataRetentionDays": 365,
  "anonymizeIP": true,
  "googleAnalytics": {
    "enabled": true,
    "measurementId": "G-XXXXXXXXXX",
    "enhancedEcommerce": true,
    "customDimensions": [
      {
        "index": 1,
        "name": "User Type",
        "scope": "user"
      }
    ]
  },
  "facebookPixel": {
    "enabled": true,
    "pixelId": "123456789012345",
    "advancedMatching": true,
    "automaticMatching": true
  },
  "matomo": {
    "enabled": false,
    "siteId": "1",
    "url": "https://analytics.yoursite.com"
  }
}
```

## API Endpoints

### Get Analytics Configuration
```
GET /api/analytics-config?locale=en
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "enabled": true,
      "debugMode": false,
      // ... configuration data
    }
  }
}
```

## Environment Variables (Minimal)

Only Strapi connection details are needed as environment variables:

```env
# Strapi CMS Connection (Required)
VITE_STRAPI_API_URL=https://your-strapi-cms.com
VITE_STRAPI_API_TOKEN=your-api-token
```

## Benefits

1. **Zero Downtime Updates**: Change analytics settings without rebuilding
2. **Multi-language Support**: Different analytics configs per locale
3. **Centralized Management**: All analytics settings in one place
4. **Real-time Changes**: Updates take effect immediately
5. **Version Control**: Strapi provides audit trails for changes
6. **Role-based Access**: Control who can modify analytics settings

## Setup Instructions

1. **Install Strapi Content Types**: Copy the provided schema files to your Strapi backend
2. **Restart Strapi**: Restart your Strapi instance to register new content types
3. **Configure Analytics**: Use Strapi admin panel to set up analytics configuration
4. **Deploy Client**: Client will automatically fetch configuration from Strapi

## Fallback Behavior

If Strapi is unavailable:
- Analytics will be disabled by default
- No tracking scripts will be loaded
- Application continues to function normally
- Configuration is retried on next page load

## Security Considerations

- Analytics configuration is public (no sensitive data)
- API tokens should be read-only
- Use HTTPS for all Strapi communications
- Validate analytics IDs format in Strapi admin

## Troubleshooting

### Analytics Not Loading
1. Check Strapi API connection
2. Verify analytics-config content exists
3. Check browser console for errors
4. Ensure analytics IDs are valid format

### Configuration Not Updating
1. Clear browser cache
2. Check Strapi content is published
3. Verify API token permissions
4. Check network requests in browser dev tools
