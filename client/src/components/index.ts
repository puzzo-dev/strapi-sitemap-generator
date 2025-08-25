// Layout components
export { default as Navbar } from './layout/Navbar';
export { default as Footer } from './layout/Footer';
export { default as MobileMenu } from './layout/MobileMenu';
export { default as FloatingButtons } from './layout/FloatingButtons';
export { default as PolicyPageLayout } from './layout/PolicyPageLayout';

// UI components
export { Button, buttonVariants } from './ui/button';
export { default as BlogCard } from './ui/BlogCard';
export { default as ProductCard } from './ui/ProductCard';
export { default as ServiceCard } from './ui/ServiceCard';
export { default as TestimonialCard } from './ui/TestimonialCard';
export { default as GradientButton } from './ui/GradientButton';
export { default as AppLink } from './ui/AppLink';
export { default as IVarseLogo } from './ui/IVarseLogo';
export { default as LanguageSelector } from './ui/LanguageSelector';
export { default as LanguageButton } from './ui/LanguageButton';
export { default as NewsletterForm } from './ui/NewsletterForm';
export { default as SocialShareButtons } from './ui/SocialShareButtons';
export { default as ContactForm } from './ui/ContactForm';
export { default as BookingForm } from './ui/BookingForm';
export { default as LoadingSkeleton } from './ui/LoadingSkeleton';
export { default as ErrorBoundary } from './ui/ErrorBoundary';
export { default as ScrollToTopButton } from './ui/ScrollToTopButton';
export { default as StarRating } from './ui/StarRating';
export { default as ThemeToggle } from './ui/ThemeToggle';
export { default as DynamicContent } from './ui/DynamicContent';

// SEO components
export { default as MetaTags } from './seo/MetaTags';
export * from './seo/StructuredData';

// Context providers
export { LanguageProvider, useLanguage } from './context/LanguageContext';
export { ThemeProvider, useTheme } from './ui/theme-provider';

// Section components (re-export from sections index)
export * from './sections';
