# Content Migration Guide

This guide outlines the complete refactoring plan to remove all hardcoded data and implement a unified content management system using Strapi and ERPNext.

## 🎯 Overview

The website is being refactored to use a **fallback data pattern** where:
- **Primary source**: Strapi CMS or ERPNext
- **Fallback**: Minimal hardcoded data when APIs are unavailable
- **Zero downtime**: Website always functions even if CMS is down

## 📋 Content Distribution Strategy

### Strapi CMS (UI Content & Static Data)
- **Pages**: All page content, sections, and metadata
- **UI Text**: Button labels, form labels, error messages, placeholders
- **Products & Services**: Business offerings and descriptions
- **Team Members**: Staff profiles and information
- **Testimonials**: Customer reviews and feedback
- **Case Studies**: Project showcases and success stories
- **Industries**: Target market information
- **Clients**: Logo galleries and client information
- **FAQs**: Frequently asked questions
- **Site Configuration**: Navigation, footer, social links

### ERPNext (Dynamic Business Data)
- **Blog Posts**: All blog content and categories
- **Contact Forms**: Lead capture and management
- **Appointment Bookings**: Event scheduling
- **Job Applications**: Career management
- **Newsletter Subscriptions**: Email list management

## 🔧 Implementation Status

### ✅ Completed
1. **Fallback Pattern Architecture** (`client/src/lib/fallbacks.ts`)
2. **ERPNext Integration** (`client/src/lib/erpnext.ts`)
3. **Content Hooks** (`client/src/hooks/useContent.ts`)
4. **Enhanced Strapi Integration** (Updated `client/src/lib/strapi.ts`)
5. **Form Components** (Updated ContactForm and BookingForm)

### 🔄 In Progress
1. **Component Updates**: Migrating remaining components to use hooks
2. **UI Text Migration**: Moving hardcoded strings to Strapi
3. **Error Handling**: Enhanced error states and loading indicators

### ⏳ Pending
1. **Strapi Content Models**: Create content types in Strapi admin
2. **ERPNext Configuration**: Set up custom doctypes and workflows
3. **Data Migration**: Move existing data to new systems
4. **Testing & Validation**: Comprehensive testing of all functionality

## 📁 Files to Remove After Migration

### Hardcoded Data Files (client/src/lib/data/)
```
benefits.ts          → Strapi: Page Sections
blog.ts             → ERPNext: Blog Posts
case-studies-page.ts → Strapi: Page Content
case-studies.ts     → Strapi: Case Studies
clients.ts          → Strapi: Client Logos
config.ts           → Strapi: Site Configuration
errors.ts           → Strapi: UI Text
faq.ts              → Strapi: FAQ Items
footer.ts           → Strapi: Site Configuration
hero.ts             → Strapi: Page Sections
industries.ts       → Strapi: Industries
jobs.ts             → Strapi: Job Listings
pages.ts            → Strapi: Page Content
policies.ts         → Strapi: Page Content
products.ts         → Strapi: Products
services.ts         → Strapi: Services
sitemap.ts          → Strapi: Site Configuration
team.ts             → Strapi: Team Members
testimonials.ts     → Strapi: Testimonials
```

## 🔄 Migration Process

### Phase 1: Strapi Content Models Setup

Create the following content types in Strapi:

#### 1. Page Content
```typescript
{
  title: "Text",
  slug: "UID",
  metaTitle: "Text",
  metaDescription: "Text",
  sections: "Component (repeatable)"
}
```

#### 2. UI Text Collections
```typescript
{
  category: "Enumeration", // buttons, forms, errors, loading
  key: "Text",
  value: "Text",
  language: "Relation to Language"
}
```

#### 3. Products
```typescript
{
  title: "Text",
  slug: "UID",
  description: "Rich Text",
  image: "Media",
  keyFeatures: "JSON",
  benefits: "Component",
  pricing: "Component (repeatable)",
  status: "Enumeration"
}
```

#### 4. Services
```typescript
{
  title: "Text",
  slug: "UID", 
  description: "Rich Text",
  features: "JSON",
  technologies: "JSON",
  process: "Component"
}
```

### Phase 2: ERPNext Configuration

#### 1. Blog Management
- **DocType**: Blog Post (enhanced with custom fields)
- **Fields**: title, content_html, meta_description, featured, blog_category
- **Workflow**: Draft → Review → Published

#### 2. Lead Management
- **DocType**: Lead (standard)
- **Custom Fields**: request_type, source_page, form_type
- **Automation**: Auto-assign leads, email notifications

#### 3. Event Management
- **DocType**: Event (standard)
- **Integration**: Link appointments to leads
- **Calendar**: Booking availability management

### Phase 3: Component Updates

#### Pattern for Updating Components
```typescript
// Before (Hardcoded)
const title = "Our Products";
const buttonText = "Learn More";

// After (Dynamic with Fallback)
const { data: pageContent } = usePageContent('products');
const getUIText = useUIText();

const title = pageContent?.sections?.find(s => s.type === 'hero')?.title || 'Our Products';
const buttonText = getUIText('learnMore', 'buttons');
```

#### Priority Components to Update
1. **Hero Sections**: Home, About, Products, Services
2. **Navigation**: Header, Footer, Mobile Menu
3. **Forms**: Contact, Booking, Job Application, Newsletter
4. **Cards**: Product Cards, Service Cards, Team Cards
5. **Error Pages**: 404, 500, Network errors

### Phase 4: Data Migration

#### Automated Migration Script
```typescript
// client/src/scripts/migrate-content.ts
export async function migrateToStrapi() {
  // Migrate products
  await migrateProducts();
  
  // Migrate services
  await migrateServices();
  
  // Migrate team members
  await migrateTeamMembers();
  
  // Migrate UI text
  await migrateUIText();
}
```

#### Manual Migration (Content Team)
1. **Blog Posts**: Export from current system, import to ERPNext
2. **Images**: Upload to Strapi media library
3. **SEO Data**: Update meta titles and descriptions
4. **Translations**: Set up multilingual content

## 🔒 Security & Credentials

### Environment Variables
```env
# Strapi
VITE_STRAPI_API_URL=https://cms.your-domain.com
VITE_STRAPI_API_TOKEN=your-strapi-token

# ERPNext (managed via Strapi for security)
# Credentials stored in Strapi and fetched securely
```

### Strapi Security Setup
- API tokens with specific permissions
- Role-based access control for content editors
- Secure credential storage for ERPNext integration

## 📊 Testing Strategy

### Automated Tests
```typescript
describe('Fallback Pattern', () => {
  it('should use fallback when API fails', async () => {
    // Mock API failure
    mockStrapi.failure();
    
    const { result } = renderHook(() => useProducts());
    
    // Should return empty array (fallback)
    expect(result.current.data).toEqual([]);
  });
});
```

### Manual Testing Checklist
- [ ] Forms submit to ERPNext correctly
- [ ] Content loads from Strapi with fallbacks
- [ ] Error handling works when APIs are down
- [ ] Performance is acceptable with API calls
- [ ] SEO metadata is properly set
- [ ] Multilingual content switches correctly

## 🚀 Deployment Strategy

### Rolling Deployment
1. **Phase 1**: Deploy new architecture with fallbacks active
2. **Phase 2**: Set up Strapi and migrate critical content
3. **Phase 3**: Set up ERPNext and migrate forms/blogs
4. **Phase 4**: Remove hardcoded data files
5. **Phase 5**: Optimize and monitor performance

### Rollback Plan
- Keep hardcoded data files until migration is fully verified
- Feature flags to switch between new and old systems
- Database backups before any migration

## 📈 Benefits After Migration

### For Content Teams
- **Easy Updates**: No code changes needed for content updates
- **Multilingual**: Built-in translation management
- **Workflow**: Content approval processes
- **Media Management**: Centralized asset storage

### For Development Teams
- **Clean Code**: No hardcoded content in components
- **Maintainable**: Single source of truth for all content
- **Scalable**: Easy to add new content types
- **Type Safe**: Full TypeScript support with fallbacks

### For Business
- **SEO Friendly**: Easy meta tag management
- **Fast Loading**: Optimized API calls with caching
- **Reliable**: Website works even if CMS is down
- **Professional**: Better content management workflow

## 🎯 Success Metrics

- **Zero Hardcoded Strings**: All text managed via CMS
- **API Response Time**: < 200ms for content queries
- **Fallback Coverage**: 100% of content has fallbacks
- **Error Rate**: < 1% for API calls
- **Content Update Time**: < 5 minutes from CMS to live site

## 📞 Support & Maintenance

### Content Team Training
- Strapi admin panel usage
- ERPNext blog management
- Content approval workflows
- Image optimization guidelines

### Developer Handoff
- Hook usage patterns
- Adding new content types
- Fallback implementation
- Performance monitoring

---

**Next Actions:**
1. Set up Strapi content models
2. Configure ERPNext custom fields
3. Begin component migration
4. Plan content team training
