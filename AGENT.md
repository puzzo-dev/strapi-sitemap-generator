# AGENT.md - I-Varse Corporate Website

## Build/Development Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript checking
- `npm run lint` - Run ESLint with TypeScript support
- **Strapi CMS Backend**: `cd "I-VarseTech CMS Backend" && npm run dev` - Start Strapi backend

## Architecture & Structure
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **CMS Backend**: Strapi v5.16.1 in `I-VarseTech CMS Backend/` directory  
- **Client Structure**: `client/src/` - Main React app with components, pages, hooks, lib
- **Path Aliases**: `@/*` → `client/src/*`, `@shared/*` → `shared/*`, `@assets` → `attached_assets`
- **Routing**: Uses wouter for client-side routing
- **State Management**: TanStack React Query, React Hook Form + Zod validation
- **UI Framework**: Radix UI primitives + shadcn/ui components + Tailwind
- **Database**: SQLite with better-sqlite3 (Strapi backend)

## Code Style & Conventions
- **Imports**: Use path aliases (`@/components`, `@/lib`, `@/hooks`), external imports first
- **Components**: React.FC typing, PascalCase naming, co-located with types
- **Types**: Organized in `client/src/lib/types/` with index exports
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Formatting**: Prettier via shadcn/ui conventions, semicolons, double quotes
- **Error Handling**: Zod schemas for validation, React Hook Form for forms
- **Styling**: Tailwind utility classes, CSS custom properties for theming
