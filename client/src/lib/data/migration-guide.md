# Migration Guide: From data.ts to Organized Structure

This guide helps you migrate from the old monolithic `data.ts` file to the new organized data structure.

## Quick Migration

### Option 1: Use the Main Index (Recommended)

Replace your imports with:

```typescript
// Old
import { services, products, team } from "@/lib/data/";

// New
import { services, products, team } from "@/lib/data/";
```

**Note**: This still works because the main index re-exports everything!

### Option 2: Import from Specific Files (For Better Performance)

```typescript
// Old
import { services, products, team } from "@/lib/data/";

// New
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { team } from "@/lib/data/team";
```

## File Mapping

| Old Import             | New Import Path           | Description              |
| ---------------------- | ------------------------- | ------------------------ |
| `defaultSiteConfig`    | `@/lib/data/config`       | Site configuration       |
| `navItems`             | `@/lib/data/config`       | Navigation items         |
| `socialLinks`          | `@/lib/data/config`       | Social media links       |
| `heroSlides`           | `@/lib/data/hero`         | Hero slides              |
| `defaultHeroProps`     | `@/lib/data/hero`         | Default hero properties  |
| `services`             | `@/lib/data/services`     | Service offerings        |
| `extendedServices`     | `@/lib/data/services`     | Extended service details |
| `products`             | `@/lib/data/products`     | Product catalog          |
| `extendedProducts`     | `@/lib/data/products`     | Extended product details |
| `defaultTeamMembers`   | `@/lib/data/team`         | Team members             |
| `extendedTeamMembers`  | `@/lib/data/team`         | Extended team profiles   |
| `testimonials`         | `@/lib/data/testimonials` | Customer testimonials    |
| `clientLogos`          | `@/lib/data/testimonials` | Client logos             |
| `jobListings`          | `@/lib/data/jobs`         | Job listings             |
| `extendedJobListings`  | `@/lib/data/jobs`         | Extended job details     |
| `blogPosts`            | `@/lib/data/blog`         | Blog posts               |
| `blogCategories`       | `@/lib/data/blog`         | Blog categories          |
| `extendedBlogPosts`    | `@/lib/data/blog`         | Extended blog content    |
| `benefits`             | `@/lib/data/benefits`     | Career benefits          |
| `servicesBenefits`     | `@/lib/data/benefits`     | Service benefits         |
| `productsBenefits`     | `@/lib/data/benefits`     | Product benefits         |
| `faqContent`           | `@/lib/data/faq`          | FAQ content              |
| `faqItems`             | `@/lib/data/faq`          | FAQ items                |
| `servicesCaseStudies`  | `@/lib/data/case-studies` | Service case studies     |
| `productsCaseStudies`  | `@/lib/data/case-studies` | Product case studies     |
| `footerLinks`          | `@/lib/data/footer`       | Footer links             |
| `footerData`           | `@/lib/data/footer`       | Footer data              |
| `termsContent`         | `@/lib/data/policies`     | Terms of service         |
| `privacyContent`       | `@/lib/data/policies`     | Privacy policy           |
| `cookiesContent`       | `@/lib/data/policies`     | Cookie policy            |
| `accessibilityContent` | `@/lib/data/policies`     | Accessibility statement  |

## Migration Steps

### Step 1: Identify Your Imports

Find all files that import from `@/lib/data`:

```bash
grep -r "from '@/lib/data/'" src/
```

### Step 2: Update Imports

Choose your migration strategy:

#### Strategy A: Minimal Changes (Recommended)

Keep using `@/lib/data` - it still works!

#### Strategy B: Optimized Imports

Update to specific file imports for better tree-shaking:

```typescript
// Before
import { services, products, team, testimonials } from "@/lib/data/";

// After
import { services, products } from "@/lib/data/services";
import { team } from "@/lib/data/team";
import { testimonials } from "@/lib/data/testimonials";
```

### Step 3: Test Your Changes

Run the build to ensure everything works:

```bash
npm run build
```

## Benefits of Migration

### Performance Benefits

- **Tree Shaking**: Only import what you need
- **Smaller Bundles**: Reduced JavaScript bundle size
- **Faster Loading**: Better code splitting

### Developer Experience

- **Easier Navigation**: Find data quickly
- **Better Organization**: Related data grouped together
- **Easier Maintenance**: Smaller, focused files

### Scalability

- **Easy to Add**: New data types can be added to appropriate files
- **Clear Structure**: Obvious where to add new data
- **Better Collaboration**: Multiple developers can work on different data files

## Common Patterns

### Importing Multiple Items from Same File

```typescript
// Good
import { services, extendedServices } from "@/lib/data/services";

// Avoid
import { services } from "@/lib/data/services";
import { extendedServices } from "@/lib/data/services";
```

### Importing from Multiple Files

```typescript
// Good
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { team } from "@/lib/data/team";

// Alternative (if you need many items)
import { services, products, team } from "@/lib/data/";
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. **Check import paths**: Ensure the file paths are correct
2. **Verify exports**: Make sure the data is exported from the file
3. **Check types**: Ensure TypeScript types are properly imported

### Missing Data

If data seems to be missing:

1. **Check the file structure**: Ensure the data is in the correct file
2. **Verify exports**: Make sure the data is exported from the file
3. **Check the main index**: Ensure the data is re-exported from `index.ts`

## Support

The old `data.ts` file remains available for backward compatibility. You can gradually migrate your imports over time without breaking existing functionality.

For questions or issues, refer to the main `README.md` file in the data directory.
