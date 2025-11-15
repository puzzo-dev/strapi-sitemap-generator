# I-Varse Website - AI Coding Agent Instructions

## Project Overview

**React + TypeScript corporate website** with Strapi CMS v5 backend, ERPNext integration, and comprehensive fallback system. The architecture prioritizes resilience: site functions fully even when APIs are unavailable.

**Tech Stack**: Vite, React Query, Wouter routing, shadcn/ui, Tailwind, Framer Motion

## Critical Architecture Patterns

### 1. Three-Tier Data Flow (Always Follow This)

```
Static Fallback ← Strapi CMS ← ERPNext → React Query → Components
```

Every data fetch must implement this pattern with fallbacks:
- **Primary**: Try Strapi CMS first (`client/src/lib/strapi.ts`)
- **Secondary**: Fall back to ERPNext if applicable (`client/src/lib/erpnext.ts`)  
- **Tertiary**: Always fall back to local static data (`client/src/lib/data/`)

Example from `useStrapiContent.ts`:
```typescript
const { data } = useQuery({
  queryFn: async () => {
    try {
      return await getStrapiContent() || localFallbackData;
    } catch {
      return localFallbackData;
    }
  }
});
```

### 2. Service Layer Architecture (Use for Complex Features)

Located in `client/src/lib/services/`:
- **BaseService**: Abstract class for all services with error handling
- **BaseCMSService**: Extends BaseService for CMS operations
- **StrapiService**: Implements BaseCMSService with data sources pattern
- **ERPNextService**: Handles ERP integration (blog, HR, CRM)

When adding new data sources, extend `BaseDataSource<T>` in `StrapiService.ts`:
```typescript
export class StrapiNewTypeSource extends BaseDataSource<NewType> {
  protected entityName = 'new-types';
  // Transform Strapi response to local type
}
```

### 3. Path Aliases (Never Use Relative Imports)

Configured in `vite.config.ts`:
```typescript
"@/*"      → "client/src/*"
"@assets"  → "attached_assets"
```

Always: `import { Component } from '@/components/ui/button'`  
Never: `import { Component } from '../../../components/ui/button'`

## Development Commands

```bash
# Frontend (from project root)
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build
npm run check      # TypeScript type checking
npm run lint       # ESLint

# Strapi Backend (from "I-VarseTech CMS Backend" directory)
cd "I-VarseTech CMS Backend"
npm run dev        # Start Strapi (localhost:1337)
npm run build      # Build admin panel
```

**Critical**: Always run both servers for full functionality. Frontend works without backend via fallbacks.

## Component Conventions (Strict Adherence Required)

### Props Naming Consistency
```typescript
// ✅ Correct - use 'item' prop for generic card components
<ProductCard item={product} isReversed={index % 2 !== 0} />
<ServiceCard service={service} />  // or use specific prop name

// ❌ Wrong - inconsistent naming breaks existing components
<ProductCard product={product} />
```

### Typography Scale (From CODING_STANDARDS.md)
```typescript
className="text-lg font-semibold"        // Card/section titles
className="text-base leading-relaxed"    // Descriptions
className="text-sm text-gray-500"        // Meta info (dates, authors)
```

**Never use `text-xs`** for main content - readability issue fixed in production.

### Button Interaction Pattern
When mixing `href` and `onClick` on `GradientButton`:
```typescript
const handleClick = (e: React.MouseEvent) => {
  if (onClick) onClick(e);
};

<GradientButton href="#target" onClick={handleClick}>
```

## Type System Organization

All types in `client/src/lib/types/`:
- `core.ts` - Base interfaces (PageSection, AppLink, SiteConfig)
- `content.ts` - Content types (Service, Product, BlogPost, etc.)
- `layout.ts` - Layout components (NavItem, FooterProps)
- `forms.ts` - Form schemas and validation types
- `ads.ts` - Advertisement types

**Field naming standards**:
- Images: `image` (primary), `avatar` (user pictures)
- Dates: `publishedAt`, `createdAt`, `updatedAt`
- Status: `isActive`, `isPublished`, `featured` (booleans)

## ERPNext Integration Points

Credentials stored in Strapi for security (fallback to env vars):
```typescript
// Fetched from Strapi site-config, not hardcoded
const credentials = await getSiteConfig();
// credentials.erpNextUrl, erpNextApiKey, erpNextApiSecret
```

**Integration Types**:
- **Blog**: Posts, categories, comments → `getBlogPosts()`, `getBlogPostBySlug()`
- **HR**: Job listings, applications → `getJobListings()`, `submitJobApplication()`
- **CRM**: Leads, contacts, events → `submitContactForm()`, `scheduleAppointment()`
- **Newsletter**: Email group members → `subscribeToNewsletter()`

## Dynamic Ad System

Context-aware ads from `client/src/hooks/useAds.ts`:
```typescript
const { data: ads } = useAds({
  position: 'blog_sidebar',      // blog_sidebar, banner, inline
  targetAudience: ['developers'], // Contextual targeting
  maxAds: 3
});
```

Fallback chain: Strapi CMS → Static data (`client/src/lib/data/ads.ts`)

## Content Migration Workflow

When adding new content types:

1. **Define Strapi Schema** (see STRAPI_GUIDE.md)
2. **Create TypeScript Interface** in `client/src/lib/types/content.ts`
3. **Add Static Fallback Data** in `client/src/lib/data/`
4. **Implement Strapi Fetch Function** in `client/src/lib/strapi.ts`
5. **Create React Query Hook** in `client/src/hooks/useStrapiContent.ts`
6. **Use in Components** with proper error/loading states

## Known Issues & Workarounds

### Duplication Prevention
**Service Detail Pages**: `fullDescription` replaces `description` in detail view to prevent duplication:
```typescript
// ❌ Causes duplication
{service.fullDescription || service.description}

// ✅ Correct - only show full description
{service.fullDescription && service.fullDescription.split('\n\n').map(...)}
```

### Team Size Display
**Case Studies**: Do NOT show team size on cards (removed per production fix):
```typescript
// ❌ Removed from CaseStudiesGridSection
<span>👥 {cs.teamSize}</span>

// ✅ Only show duration
<span>📅 {cs.duration}</span>
```

## SEO & Analytics

- **MetaTags Component**: Page-specific SEO in every route component
- **StructuredData**: JSON-LD schemas in `client/src/components/seo/`
- **Analytics Config**: Fetched from Strapi → `getAnalyticsConfig()`
- **Canonical URLs**: Always set `canonicalUrl` prop on MetaTags

## Testing Checklist

Before submitting changes:
1. ✅ TypeScript compiles: `npm run check`
2. ✅ ESLint passes: `npm run lint`
3. ✅ Works WITHOUT Strapi running (fallbacks active)
4. ✅ Works WITH Strapi running (CMS content loads)
5. ✅ Mobile responsive (check at 375px, 768px, 1024px)
6. ✅ Dark/light theme compatible

## Environment Variables

Required in `.env`:
```bash
# Strapi
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_token_here

# Feature flags (used throughout codebase)
VITE_ENABLE_FALLBACKS=true
VITE_ENABLE_ERPNEXT_INTEGRATION=true
VITE_ENABLE_STRAPI_CMS=true
```

## Additional Context

- **AGENT.md**: Quick reference for commands and structure
- **CODING_STANDARDS.md**: Comprehensive style guide
- **STRAPI_GUIDE.md**: Complete CMS setup and content types
- **REFACTORING_SUMMARY.md**: Recent architectural changes

When in doubt about patterns, check existing implementations in `client/src/pages/` - they follow established conventions.
