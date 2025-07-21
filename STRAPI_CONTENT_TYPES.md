# Strapi Content Types Configuration

This document defines the exact Strapi content types needed to match our fallback data structure. These content types ensure seamless integration between Strapi CMS and the existing website architecture.

## 📋 Content Types Overview

| Content Type | API ID | Description |
|-------------|--------|-------------|
| Page Content | `page-content` | Dynamic page content and sections |
| Services | `services` | Service offerings and descriptions |
| Products | `products` | Product catalog and details |
| Testimonials | `testimonials` | Customer testimonials and reviews |
| Case Studies | `case-studies` | Project case studies and success stories |
| Industries | `industries` | Industry-specific content |
| Client Logos | `client-logos` | Client logo gallery |
| FAQ Items | `faq-items` | Frequently asked questions |

## 🏗️ Content Type Definitions

### 1. Page Content (`page-content`)

```json
{
  "kind": "collectionType",
  "collectionName": "page_contents",
  "info": {
    "singularName": "page-content",
    "pluralName": "page-contents",
    "displayName": "Page Content"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "slug": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "metaTitle": {
      "type": "string"
    },
    "metaDescription": {
      "type": "text"
    },
    "sections": {
      "type": "json"
    }
  }
}
```

### 2. Services (`services`)

```json
{
  "kind": "collectionType",
  "collectionName": "services",
  "info": {
    "singularName": "service",
    "pluralName": "services",
    "displayName": "Services"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "unique": true
    },
    "subtitle": {
      "type": "string"
    },
    "description": {
      "type": "text",
      "required": true
    },
    "fullDescription": {
      "type": "richtext"
    },
    "benefits": {
      "type": "json"
    },
    "casestudies": {
      "type": "json"
    },
    "faqs": {
      "type": "json"
    },
    "icon": {
      "type": "string",
      "default": "fa-cog"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    }
  }
}
```

### 3. Products (`products`)

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Products"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "unique": true
    },
    "translationKey": {
      "type": "string"
    },
    "description": {
      "type": "text",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "keyFeatures": {
      "type": "json"
    },
    "benefits": {
      "type": "json"
    },
    "industries": {
      "type": "json"
    },
    "casestudies": {
      "type": "json"
    },
    "faqs": {
      "type": "json"
    },
    "pricing": {
      "type": "json"
    },
    "demoUrl": {
      "type": "string"
    },
    "downloadUrl": {
      "type": "string"
    },
    "supportUrl": {
      "type": "string"
    },
    "category": {
      "type": "json"
    },
    "tags": {
      "type": "json"
    },
    "status": {
      "type": "enumeration",
      "enum": ["Active", "Beta", "Coming Soon", "Deprecated"],
      "default": "Active"
    }
  }
}
```

### 4. Testimonials (`testimonials`)

```json
{
  "kind": "collectionType",
  "collectionName": "testimonials",
  "info": {
    "singularName": "testimonial",
    "pluralName": "testimonials",
    "displayName": "Testimonials"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "text",
      "required": true
    },
    "translationKey": {
      "type": "string"
    },
    "rating": {
      "type": "integer",
      "default": 5,
      "min": 1,
      "max": 5
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "avatar": {
      "type": "string"
    },
    "position": {
      "type": "string"
    },
    "company": {
      "type": "string"
    }
  }
}
```

### 5. Case Studies (`case-studies`)

```json
{
  "kind": "collectionType",
  "collectionName": "case_studies",
  "info": {
    "singularName": "case-study",
    "pluralName": "case-studies",
    "displayName": "Case Studies"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "unique": true
    },
    "translationKey": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "client": {
      "type": "string"
    },
    "industry": {
      "type": "string"
    },
    "challenge": {
      "type": "text"
    },
    "solution": {
      "type": "text"
    },
    "results": {
      "type": "json"
    },
    "technologies": {
      "type": "json"
    },
    "timeline": {
      "type": "string"
    },
    "teamSize": {
      "type": "integer"
    },
    "testimonial": {
      "type": "json"
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images"]
    },
    "tags": {
      "type": "json"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "publishedAt": {
      "type": "datetime"
    }
  }
}
```

### 6. Industries (`industries`)

```json
{
  "kind": "collectionType",
  "collectionName": "industries",
  "info": {
    "singularName": "industry",
    "pluralName": "industries",
    "displayName": "Industries"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "unique": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "icon": {
      "type": "string"
    },
    "featured": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### 7. Client Logos (`client-logos`)

```json
{
  "kind": "collectionType",
  "collectionName": "client_logos",
  "info": {
    "singularName": "client-logo",
    "pluralName": "client-logos",
    "displayName": "Client Logos"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "url": {
      "type": "json"
    },
    "featured": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### 8. FAQ Items (`faq-items`)

```json
{
  "kind": "collectionType",
  "collectionName": "faq_items",
  "info": {
    "singularName": "faq-item",
    "pluralName": "faq-items",
    "displayName": "FAQ Items"
  },
  "attributes": {
    "question": {
      "type": "string",
      "required": true
    },
    "answer": {
      "type": "text",
      "required": true
    },
    "translationKey": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

## 🚀 Setup Instructions

### Step 1: Create Content Types in Strapi Admin

1. Navigate to Strapi Admin Panel (`http://localhost:1337/admin`)
2. Go to **Content-Types Builder**
3. Click **"Create new collection type"**
4. For each content type above:
   - Copy the JSON configuration
   - Use the **"Import from JSON"** feature or create manually
   - Save and restart Strapi when prompted

### Step 2: Import Existing Data

After creating the content types, import the existing fallback data:

```bash
# Export current fallback data to JSON format
npm run export-fallback-data

# Import to Strapi (requires custom script)
npm run import-to-strapi
```

### Step 3: Verify API Endpoints

Test that all endpoints are working:

- `GET /api/page-contents`
- `GET /api/services`
- `GET /api/products`
- `GET /api/testimonials`
- `GET /api/case-studies`
- `GET /api/industries`
- `GET /api/client-logos`
- `GET /api/faq-items`

### Step 4: Enable CMS Integration

Once content types are set up and data is imported, gradually re-enable the CMS integration:

1. Uncomment the Strapi service calls in page components
2. Test each page individually
3. Verify fallback mechanisms work when Strapi is unavailable
4. Remove fallback data files once fully migrated

## 📝 Migration Checklist

- [ ] Create all 8 content types in Strapi
- [ ] Import existing data to Strapi
- [ ] Test API endpoints
- [ ] Re-enable CMS integration in Home page
- [ ] Re-enable CMS integration in About page
- [ ] Re-enable CMS integration in Services page
- [ ] Re-enable CMS integration in Products page
- [ ] Test fallback mechanisms
- [ ] Remove unused fallback data files
- [ ] Update documentation

## 🔧 Troubleshooting

### Common Issues:

1. **Content Type Creation Fails**
   - Check JSON syntax
   - Ensure unique field names
   - Restart Strapi after changes

2. **API Endpoints Not Working**
   - Verify content type permissions
   - Check API routes configuration
   - Ensure data exists in Strapi

3. **Data Import Issues**
   - Validate data structure matches content types
   - Check required fields are present
   - Use Strapi's built-in import tools

### Support Commands:

```bash
# Check Strapi status
npm run strapi:status

# Reset Strapi database (if needed)
npm run strapi:reset

# Generate API documentation
npm run strapi:docs
```

---

**Note**: This configuration ensures perfect compatibility between Strapi CMS and the existing website architecture. The fallback data structure has been preserved exactly, allowing for seamless migration and robust fallback mechanisms.
