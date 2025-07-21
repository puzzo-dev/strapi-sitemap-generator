# I-Varse Corporate Website - Coding Standards

## 🎯 Overview
This document defines the uniform coding patterns and standards for the I-Varse corporate website codebase.

## 📁 File Naming Conventions

### Components
- **React Components**: PascalCase `.tsx` files (e.g., `BlogCard.tsx`, `ProductDetail.tsx`)
- **Sections**: Descriptive but concise names (e.g., `HeroSection.tsx`, `TestimonialsSection.tsx`)
- **Pages**: PascalCase matching route names (e.g., `Home.tsx`, `About.tsx`)

### Hooks
- **Custom Hooks**: camelCase with `.ts` extension (e.g., `useLanguageConfig.ts`, `useStrapiContent.ts`)
- **Always start with `use` prefix**

### Utilities & Types
- **Utility Files**: camelCase with `.ts` extension (e.g., `utils.ts`, `constants.ts`)
- **Type Files**: camelCase with `.ts` extension (e.g., `content.ts`, `core.ts`)

### Index Files
- All major directories should have `index.ts` files for clean imports
- Use named exports for utilities, default exports for single main components

## 🏗️ Import/Export Patterns

### Import Order
1. React and external libraries
2. Internal types and interfaces
3. Internal components and utilities
4. Relative imports (avoid when possible)

```typescript
// ✅ Correct
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { ProductProps, PageContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/lib/strapi';

// ❌ Avoid relative imports when possible
import '../styles/component.css';
```

### Import Style
- **Always use absolute imports** with `@/` alias
- **Destructure imports** when importing multiple items
- **Single line** for single imports, **multi-line** for multiple imports

### Export Style
- **Default exports** for React components
- **Named exports** for utilities, hooks, and multiple items
- **Both** when component has utility exports (e.g., Button + buttonVariants)

## 🧩 React Component Patterns

### Component Declaration
```typescript
// ✅ Standard Pattern
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
  children?: React.ReactNode;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = defaultValue,
  children,
  ...rest
}) => {
  // Component logic
  return (
    <div {...rest}>
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Props Handling
- **Always destructure props** in component signature
- **Default values** in destructuring when possible
- **Rest props** with `...rest` for HTML attributes
- **No props parameter** - always destructure immediately

### Component Structure
1. **Props interface** (immediately before component)
2. **Component declaration** with destructured props
3. **Hooks** (state, effects, queries) at the top
4. **Event handlers** as const arrow functions
5. **Derived values** and computations
6. **Early returns** for loading/error states
7. **Main JSX return**

### Conditional Rendering
```typescript
// ✅ Preferred patterns
{isLoading && <LoadingSpinner />}
{error ? <ErrorMessage error={error} /> : <Content />}
{items.length > 0 ? (
  <ItemList items={items} />
) : (
  <EmptyState />
)}

// ❌ Avoid
{isLoading ? <LoadingSpinner /> : null}
{isLoading === true && <LoadingSpinner />}
```

## 🔧 Hook Patterns

### Custom Hook Structure
```typescript
// ✅ Standard Hook Pattern
export const useCustomHook = (param: string) => {
  const [state, setState] = useState<Type>(initialValue);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['hook-name', param],
    queryFn: () => fetchData(param),
    enabled: !!param
  });
  
  const handleAction = useCallback((value: string) => {
    setState(value);
  }, []);
  
  return {
    state,
    data,
    isLoading,
    error,
    handleAction
  };
};
```

### Hook Return Patterns
- **Object return** for multiple values
- **Consistent naming** (data, isLoading, error, actions)
- **Memoized functions** with useCallback for functions returned
- **Proper dependencies** in useEffect and useCallback

## 📝 TypeScript Patterns

### Interface Naming
```typescript
// ✅ Component Props
interface ComponentNameProps {
  prop: string;
}

// ✅ Entity/Data Types
interface User {
  id: number;
  name: string;
}

// ✅ Configuration Types
interface SiteConfig {
  siteName: string;
}

// ✅ Hook Return Types
interface UseCustomHookReturn {
  data: Data | null;
  isLoading: boolean;
}
```

### Interface Patterns
- **Props interfaces**: Always end with `Props`
- **Base interfaces**: Use for common patterns (extend PageSection)
- **Entity types**: Represent data structures
- **Optional properties**: Use `?` for truly optional, not for nullable

### Type vs Interface
- **Interface** for object shapes, component props, extendable types
- **Type** for unions, intersections, computed types, function types

```typescript
// ✅ Use interface
interface UserProps {
  user: User;
  onUpdate: (user: User) => void;
}

// ✅ Use type
type Theme = 'light' | 'dark' | 'system';
type EventHandler<T> = (event: T) => void;
```

### Field Naming Consistency
- **Images**: Use `image` for primary image, `avatar` for user pictures
- **Dates**: Use `createdAt`, `updatedAt`, `publishedAt` pattern
- **Names**: Use `name` for short names, `fullName` for complete names
- **Status**: Use `status` for enums, `isActive` for booleans

## 🎨 Styling Patterns

### Class Names
- **Use cn() utility** for conditional classes
- **Tailwind classes** in logical order: layout, spacing, typography, colors, effects
- **Component variants** using class-variance-authority pattern

```typescript
// ✅ Proper class organization
<div className={cn(
  "flex items-center justify-between", // Layout
  "px-4 py-2 space-x-2", // Spacing
  "text-sm font-medium", // Typography
  "bg-white text-gray-900", // Colors
  "rounded-lg shadow-sm", // Effects
  "hover:bg-gray-50", // States
  className // Custom classes last
)}>
```

## 🔍 Error Handling

### Error Patterns
```typescript
// ✅ Component Error Handling
if (error) {
  return <ErrorFallback error={error} />;
}

if (isLoading) {
  return <LoadingSkeleton />;
}

// ✅ API Error Handling
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  throw error; // Re-throw for React Query
}
```

## 📦 Export Patterns

### Index Files
```typescript
// ✅ Clean re-exports
export { default as ComponentName } from './ComponentName';
export { default as AnotherComponent } from './AnotherComponent';

// ✅ Utility exports
export * from './utils';
export * from './constants';

// ✅ Type exports
export type { InterfaceName } from './types';
```

### Component Exports
```typescript
// ✅ Component with utilities
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
const buttonVariants = cva(...);

export { Button, buttonVariants };
export type { ButtonProps };
```

## 🧪 Testing Patterns

### Test File Naming
- **Component tests**: `ComponentName.test.tsx`
- **Hook tests**: `useHookName.test.ts`
- **Utility tests**: `utilityName.test.ts`

### Test Structure
- **Descriptive test names**
- **Arrange, Act, Assert** pattern
- **Mock external dependencies**
- **Test user interactions**, not implementation details

## 📚 Documentation

### Component Documentation
```typescript
/**
 * ProductCard displays product information with interactive elements.
 * 
 * @param product - The product data to display
 * @param isReversed - Whether to reverse the layout
 * @param className - Additional CSS classes
 */
interface ProductCardProps {
  product: ProductProps;
  isReversed?: boolean;
  className?: string;
}
```

### Complex Logic Documentation
- **JSDoc comments** for complex functions
- **Inline comments** for business logic
- **README files** for complex modules

This standards document should be followed for all new code and existing code should be gradually refactored to match these patterns.
