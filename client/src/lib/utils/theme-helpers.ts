/**
 * Theme Consistency Helpers
 * 
 * Provides unified theming utilities to ensure consistent design
 * across all components and pages
 */

import { cn } from '@/lib/utils/cn';

// Color palette constants
export const colors = {
  primary: {
    50: 'hsl(214, 85%, 95%)',
    100: 'hsl(214, 85%, 90%)',
    200: 'hsl(214, 85%, 80%)',
    300: 'hsl(214, 85%, 70%)',
    400: 'hsl(214, 85%, 60%)',
    500: 'hsl(214, 85%, 50%)', // Primary color from theme.json
    600: 'hsl(214, 85%, 40%)',
    700: 'hsl(214, 85%, 30%)',
    800: 'hsl(214, 85%, 20%)',
    900: 'hsl(214, 85%, 10%)',
  },
  gray: {
    50: 'hsl(210, 20%, 98%)',
    100: 'hsl(210, 20%, 95%)',
    200: 'hsl(210, 16%, 93%)',
    300: 'hsl(210, 14%, 89%)',
    400: 'hsl(210, 14%, 83%)',
    500: 'hsl(210, 11%, 71%)',
    600: 'hsl(210, 7%, 56%)',
    700: 'hsl(210, 9%, 31%)',
    800: 'hsl(210, 10%, 23%)',
    900: 'hsl(210, 24%, 16%)',
  },
  dark: {
    background: 'hsl(210, 50%, 5%)', // #0a1929 from App.tsx
    surface: 'hsl(210, 40%, 8%)',
    border: 'hsl(210, 30%, 15%)',
  }
};

// Typography scale
export const typography = {
  // Font sizes
  xs: 'text-xs',      // 12px
  sm: 'text-sm',      // 14px
  base: 'text-base',  // 16px
  lg: 'text-lg',      // 18px
  xl: 'text-xl',      // 20px
  '2xl': 'text-2xl',  // 24px
  '3xl': 'text-3xl',  // 30px
  '4xl': 'text-4xl',  // 36px
  '5xl': 'text-5xl',  // 48px
  '6xl': 'text-6xl',  // 60px
  
  // Font weights
  light: 'font-light',     // 300
  normal: 'font-normal',   // 400
  medium: 'font-medium',   // 500
  semibold: 'font-semibold', // 600
  bold: 'font-bold',       // 700
  
  // Line heights
  tight: 'leading-tight',   // 1.25
  snug: 'leading-snug',     // 1.375
  normalLeading: 'leading-normal', // 1.5
  relaxed: 'leading-relaxed', // 1.625
  loose: 'leading-loose',   // 2
};

// Spacing scale
export const spacing = {
  none: '0',
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
};

// Border radius scale (matching theme.json radius: 0.6)
export const borderRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',     // 2px
  md: 'rounded-md',     // 6px (calc(var(--radius) - 2px))
  lg: 'rounded-lg',     // 8px (var(--radius))
  xl: 'rounded-xl',     // 12px
  '2xl': 'rounded-2xl', // 16px
  full: 'rounded-full',
};

// Shadow scale
export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
};

// Component variants
export const variants = {
  button: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  card: {
    default: 'bg-card text-card-foreground border border-border rounded-lg shadow-sm',
    elevated: 'bg-card text-card-foreground border border-border rounded-lg shadow-md',
    interactive: 'bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow',
  },
  input: {
    default: 'border border-input bg-background text-foreground rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
    error: 'border border-destructive bg-background text-foreground rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-destructive focus:border-transparent',
  }
};

// Animation classes
export const animations = {
  // From tailwind.config.ts
  float: {
    slow: 'animate-float-slow',    // 6s
    medium: 'animate-float-medium', // 4s
    fast: 'animate-float-fast',    // 3s
  },
  fade: {
    in: 'animate-fade-in',         // 1s
    inDown: 'animate-fade-in-down', // 0.7s
  },
  expand: {
    width: 'animate-width-expand',  // 1s
  },
  // Standard Tailwind animations
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
  bounce: 'animate-bounce',
};

// Utility functions for consistent theming
export const getButtonClasses = (
  variant: keyof typeof variants.button = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  className?: string
) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return cn(
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    variants.button[variant],
    sizeClasses[size],
    className
  );
};

export const getCardClasses = (
  variant: keyof typeof variants.card = 'default',
  className?: string
) => {
  return cn(variants.card[variant], className);
};

export const getInputClasses = (
  hasError: boolean = false,
  className?: string
) => {
  return cn(
    hasError ? variants.input.error : variants.input.default,
    className
  );
};

export const getTextClasses = (
  size: keyof typeof typography = 'base',
  weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' = 'normal',
  color: 'default' | 'muted' | 'accent' | 'destructive' = 'default',
  className?: string
) => {
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    accent: 'text-accent-foreground',
    destructive: 'text-destructive',
  };

  return cn(
    typography[size],
    typography[weight],
    colorClasses[color],
    className
  );
};

// Responsive breakpoint helpers
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const responsive = {
  // Mobile-first responsive classes
  sm: (classes: string) => `sm:${classes}`,
  md: (classes: string) => `md:${classes}`,
  lg: (classes: string) => `lg:${classes}`,
  xl: (classes: string) => `xl:${classes}`,
  '2xl': (classes: string) => `2xl:${classes}`,
};

// Dark mode helpers
export const darkMode = {
  bg: {
    primary: 'bg-white dark:bg-[#0a1929]',
    secondary: 'bg-gray-50 dark:bg-gray-900/50',
    accent: 'bg-blue-50 dark:bg-blue-950/30',
  },
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
  },
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    accent: 'border-blue-200 dark:border-blue-800',
  }
};

// Theme utility functions
export const getThemeColors = (
  type: 'background' | 'text' | 'border',
  variant: 'default' | 'muted' | 'accent' | 'gradient' = 'default'
) => {
  const themeMap = {
    background: {
      default: darkMode.bg.primary,
      muted: darkMode.bg.secondary,
      accent: darkMode.bg.accent,
      gradient: 'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]',
    },
    text: {
      default: darkMode.text.primary,
      muted: darkMode.text.muted,
      accent: 'text-blue-600 dark:text-blue-400',
      gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
    },
    border: {
      default: darkMode.border.default,
      muted: 'border-b border-blue-100 dark:border-blue-900/40',
      accent: darkMode.border.accent,
      gradient: 'border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800',
    },
  };

  return themeMap[type][variant];
};

export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size];
};

export const getAnimationVariants = (type: 'fadeIn' | 'slideUp' | 'scale' = 'fadeIn') => {
  const variantMap = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.3 }
    }
  };

  return variantMap[type];
};

// Export theme configuration object
export const themeConfig = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  variants,
  animations,
  breakpoints,
  darkMode,
};

export default themeConfig;
