# Types Structure

This directory contains the modular TypeScript type definitions for the I-Varse application. The types have been split into logical categories for better maintainability and organization.

## File Structure

### Core Types (`core.ts`)
- **UrlProps**: URL configuration with external link handling
- **PageContent**: Main page content structure
- **PageSection**: Section configuration for pages
- **SectionItem**: Generic section item structure
- **SectionSettings**: Flexible section configuration
- **SiteConfig**: Site-wide configuration
- **AppLinkProps**: Link component properties
- **IVarseLogoProps**: Logo component properties
- **Stat**: Statistics display
- **Benefit**: Benefit item structure

### UI Component Types (`ui.ts`)
- **ButtonProps**: Button component properties
- **BadgeProps**: Badge component properties
- **InputProps**: Input component properties
- **TextareaProps**: Textarea component properties
- **BaseGradientButtonProps**: Gradient button properties
- **SheetContentProps**: Sheet component properties
- **CommandDialogProps**: Dialog component properties
- **SemanticSectionProps**: Semantic HTML section properties
- **LoadingSkeletonProps**: Loading skeleton properties
- **StarRatingProps**: Star rating component properties
- **ScrollToTopButtonProps**: Scroll to top button properties
- **DynamicContentProps**: Dynamic content properties
- **LanguageProviderProps**: Language provider properties
- **LanguageSelectorProps**: Language selector properties
- **LanguageButtonProps**: Language button properties
- **NewsletterFormProps**: Newsletter form properties

### Layout Types (`layout.ts`)
- **LanguageContextType**: Language context structure
- **NavItem**: Navigation item structure
- **MobileMenuProps**: Mobile menu properties
- **NavbarProps**: Navbar component properties
- **FooterProps**: Footer component properties
- **SocialLink**: Social media link structure
- **FooterColumn**: Footer column structure
- **ClientLogo**: Client logo structure
- **VideoContent**: Video content structure
- **SitemapLink**: Sitemap link structure
- **SitemapSection**: Sitemap section structure
- **SitemapContent**: Sitemap content structure

### Content Types (`content.ts`)
- **ServiceProps**: Service item structure
- **ServiceCardProps**: Service card properties
- **ExtendedServiceProps**: Extended service properties
- **ProductProps**: Product item structure
- **ProductCardProps**: Product card properties
- **ExtendedProductProps**: Extended product properties
- **TestimonialProps**: Testimonial structure
- **TestimonialCardProps**: Testimonial card properties
- **BlogPost**: Blog post structure
- **BlogCardProps**: Blog card properties
- **ExtendedBlogPost**: Extended blog post properties
- **BlogCategory**: Blog category structure
- **BlogAuthor**: Blog author structure
- **BlogComment**: Blog comment structure
- **FAQItem**: FAQ item structure
- **FAQCategory**: FAQ category structure
- **FAQPageContent**: FAQ page content structure
- **FAQCategoriesSectionProps**: FAQ categories section properties
- **TeamMember**: Team member structure
- **ExtendedTeamMember**: Extended team member properties
- **TeamSectionProps**: Team section properties
- **JobListing**: Job listing structure
- **ExtendedJobListing**: Extended job listing properties
- **HeroProps**: Hero section properties
- **HeroSlide**: Hero slide structure
- **AboutHeroProps**: About hero properties
- **MissionVisionSectionProps**: Mission/vision section properties
- **CoreValuesSectionProps**: Core values section properties
- **AboutCTAProps**: About CTA properties

### Form Types (`forms.ts`)
- **ContactFormData**: Contact form data structure
- **BookingFormData**: Booking form data structure
- **BookingFormProps**: Booking form properties
- **FormField**: Form field structure
- **FormContent**: Form content structure

### API Types (`api.ts`)
- **ApiError**: API error structure
- **ApiResponse**: API response structure
- **ErrorResponse**: Error response structure
- **ErrorContent**: Error content structure
- **PageErrorContent**: Page error content structure
- **NotFoundContent**: 404 page content structure

### SEO Types (`seo.ts`)
- **MetaTagsProps**: Meta tags properties
- **HardcodedSEOContent**: Hardcoded SEO content structure

### Toast Types (`toast.ts`)
- **State**: Toast state structure
- **ToasterToast**: Toaster toast structure
- **ToastActionElement**: Toast action element
- **ToastProps**: Toast properties
- **ToastActionType**: Toast action types
- **ToastAction**: Toast action union type

### Policy Types (`policy.ts`)
- **PolicyPageLayoutProps**: Policy page layout properties

## Usage

### Importing Types

```typescript
// Import specific types
import { ServiceProps, ProductProps } from '@/lib/types/content';
import { ButtonProps } from '@/lib/types/ui';
import { PageContent } from '@/lib/types/core';

// Import all types (not recommended for performance)
import * as Types from '@/lib/types';
```

### Best Practices

1. **Import Specific Types**: Import only the types you need to reduce bundle size
2. **Use Type Aliases**: Create type aliases for commonly used combinations
3. **Extend Interfaces**: Use interface extension for related types
4. **Document Complex Types**: Add JSDoc comments for complex type definitions

### Migration from Old Structure

The original `types.ts` file has been replaced with a re-export from the modular structure. All existing imports should continue to work without changes.

### Adding New Types

1. Identify the appropriate category for your new type
2. Add the type to the corresponding file
3. Export it from the file
4. The type will be automatically available through the main index

### Type Organization Principles

- **Core**: Fundamental types used throughout the application
- **UI**: Component-specific types
- **Layout**: Navigation, footer, and layout-related types
- **Content**: Business logic and content-related types
- **Forms**: Form and data input types
- **API**: API and data handling types
- **SEO**: SEO and metadata types
- **Toast**: Notification and toast types
- **Policy**: Policy page specific types

This modular structure makes the codebase more maintainable and allows for better type organization as the application grows. 