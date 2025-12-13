# Data Structure Organization

This directory contains the organized data files for the I-Varse Technologies website. The data has been split into logical modules for better maintainability and organization.

## File Structure

### Core Configuration

- `config.ts` - Site configuration, navigation, meta tags, and social links
- `hero.ts` - Hero slides and default hero properties

### Business Data

- `services.ts` - Service offerings and extended service details
- `products.ts` - Product catalog and extended product information
- `team.ts` - Team members and extended team member profiles
- `jobs.ts` - Job listings and extended job information

### Content

- `blog.ts` - Blog posts, categories, and extended blog content
- `testimonials.ts` - Customer testimonials and client logos
- `faq.ts` - FAQ content and categories
- `case-studies.ts` - Service and product case studies

### UI Components

- `benefits.ts` - Benefits for careers, services, and products
- `footer.ts` - Footer links and data
- `policies.ts` - Legal pages (Terms, Privacy, Cookies, Accessibility)

### Main Files

- `index.ts` - Main export file that re-exports all data
- `README.md` - This documentation file

## Usage

### Importing Data

You can import data in several ways:

1. **Import from specific files:**

```typescript
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/solutions";
```

2. **Import from the main index:**

```typescript
import { services, products, team } from "@/lib/data/";
```

3. **Import from the legacy data file (for backward compatibility):**

```typescript
import { services, products } from "@/lib/data.ts";
```

### Migration Guide

To migrate from the old `data.ts` file to the new structure:

1. **Update imports in your components:**

   - Replace `import { ... } from '@/lib/data/'` with `import { ... } from '@/lib/data/[specific-file]'`
   - Or use the main index: `import { ... } from '@/lib/data/'`

2. **The old `data.ts` file is still available for backward compatibility**

3. **New data should be added to the appropriate organized file**

## Benefits

- **Better Organization**: Related data is grouped together
- **Easier Maintenance**: Smaller, focused files are easier to update
- **Improved Performance**: Only import what you need
- **Better Developer Experience**: Clear structure and documentation
- **Scalability**: Easy to add new data types and categories

## Adding New Data

When adding new data:

1. **Identify the appropriate file** based on the data type
2. **Add the data** to the existing structure
3. **Export it** from the file
4. **Update this README** if adding new file types

## Data Types

Each file exports specific TypeScript interfaces. Refer to `@/lib/types` for the complete type definitions.

## Notes

- All files maintain the same data structure as the original `data.ts`
- The old `data.ts` file remains for backward compatibility
- The new structure is fully compatible with existing components
- Build process has been tested and verified to work correctly
