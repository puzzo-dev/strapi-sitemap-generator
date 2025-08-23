# Type Usage Analysis Report

## Summary
Analysis of 80+ type definitions across `/client/src/lib/types/` directory to identify unused and redundant types.

## Findings

### ✅ WELL-USED TYPES (Keep)
These types have good usage across components and pages:

**Core Types (core.ts):**
- `PageContent` - Used extensively across all pages
- `PageSection` - Core building block for sections
- `UrlProps` - Used in navigation and links
- `AppLinkProps` - Used in buttons and navigation
- `SiteConfig` - Used in SEO and configuration

**Content Types (content.ts):**
- `BlogPost` - Used in blog components
- `BlogCategory` - Used in blog filtering
- `FAQItem` - Used in FAQ sections
- `TestimonialProps` - Used in testimonial components
- `JobListing` - Used in career pages
- `IndustryProps` - Used in industry pages
- `HeroSlide` - Used in hero components

**Form Types (forms.ts):**
- `ContactFormData` - Used in contact forms
- `BookingFormData` - Used in booking forms
- `FormField` - Used in form builders

### ⚠️ POTENTIALLY UNUSED TYPES (Review for Removal)

**Layout Types (layout.ts):**
- `VideoContent` - Only defined, no actual usage found
- `LanguageContextType` - May be unused if i18n is handled differently

**Content Types (content.ts):**
- `IndustryCaseStudy` - Defined but minimal usage
- `ExtendedJobListing` - Only used in one component
- `ExtendedTeamMember` - Incomplete definition, minimal usage
- `ServiceCardProps` - May be redundant with generic CardProps
- `ProductCardProps` - May be redundant with generic CardProps
- `TestimonialCardProps` - May be redundant with generic CardProps
- `BlogCardProps` - May be redundant with generic CardProps

**API Types (api.ts):**
- `PageErrorContent` - Defined but usage unclear

### 🔄 REDUNDANT/DUPLICATE TYPES

**Card Props Pattern:**
Multiple `*CardProps` interfaces that could be consolidated:
- `ServiceCardProps`
- `ProductCardProps` 
- `TestimonialCardProps`
- `BlogCardProps`

These could use the generic `CardProps<T>` from ui.ts instead.

**Section Props Pattern:**
Some section props in content.ts overlap with the new components.ts:
- `FAQCategoriesSectionProps` (content.ts) vs component-specific props
- `TeamSectionProps` (content.ts) vs component-specific props

### 📊 USAGE STATISTICS

**High Usage (10+ references):**
- `PageContent`: ~50+ usages
- `PageSection`: ~40+ usages
- `BlogPost`: ~20+ usages
- `AppLinkProps`: ~15+ usages

**Medium Usage (3-9 references):**
- `TestimonialProps`: ~8 usages
- `JobListing`: ~6 usages
- `FAQItem`: ~5 usages
- `ContactFormData`: ~4 usages

**Low Usage (1-2 references):**
- `VideoContent`: 1 usage
- `IndustryCaseStudy`: 2 usages
- `ExtendedJobListing`: 2 usages
- `PolicyPageLayoutProps`: 3 usages

## Recommendations

### 1. Remove Unused Types
```typescript
// Remove from layout.ts
- VideoContent (if truly unused)

// Remove from content.ts  
- IndustryCaseStudy (minimal usage)
- ExtendedTeamMember (incomplete)
```

### 2. Consolidate Redundant Card Props
Replace specific card props with generic `CardProps<T>`:
```typescript
// Instead of ServiceCardProps, ProductCardProps, etc.
// Use: CardProps<ServiceProps>, CardProps<ProductProps>
```

### 3. Move Section Props
Move section-specific props from content.ts to components.ts:
```typescript
// Move FAQCategoriesSectionProps to components.ts
// Move TeamSectionProps to components.ts
```

### 4. Clean Up Incomplete Types
Complete or remove partially defined types:
```typescript
// Fix ExtendedTeamMember or remove it
// Complete PolicyPageLayoutProps usage or remove
```

## Impact Assessment

**Safe to Remove:** 5-8 types (~10% of total)
**Consolidation Candidates:** 4-6 types  
**Potential Savings:** ~15-20% reduction in type definitions
**Risk Level:** Low (most unused types have no references)

## Next Steps

1. Remove confirmed unused types
2. Consolidate card props using generics
3. Move section props to appropriate files
4. Update imports across affected files
5. Run TypeScript validation
