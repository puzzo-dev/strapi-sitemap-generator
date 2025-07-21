/**
 * Example: Migrated Home Page
 * 
 * This shows how the Home page should look after migration to use
 * Strapi content with fallbacks instead of hardcoded data.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  usePageContent, 
  useProducts, 
  useServices, 
  useTestimonials, 
  useClientLogos,
  useCaseStudies,
  useContentStatus
} from '@/hooks/useContent';
import { 
  ModernHero,
  ProductsSection,
  TestimonialsSection,
  CaseStudiesSection,
  ClientsSection
} from '@/components/sections';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { generateSeoTitle, generateSeoDescription } from '@/lib/seo';

/**
 * Home Page - Fully Migrated Example
 * 
 * BEFORE: Used hardcoded data from client/src/lib/data/
 * AFTER: Uses Strapi CMS with automatic fallbacks
 */
const Home: React.FC = () => {
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading, error: pageError } = usePageContent('home');
  
  // Fetch dynamic content lists
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: services, isLoading: isServicesLoading } = useServices();
  const { data: testimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  const { data: clientLogos, isLoading: isClientsLoading } = useClientLogos();
  const { data: caseStudies, isLoading: isCaseStudiesLoading } = useCaseStudies();
  
  // Check overall content status
  const contentStatus = useContentStatus();

  // Extract sections from page content with fallbacks
  const heroSection = pageContent?.sections?.find(s => s.type === 'hero') || {
    id: 1,
    type: 'hero',
    title: 'Digital Transformation Solutions',
    subtitle: 'Empowering businesses with cutting-edge technology',
    content: 'We help organizations accelerate their digital journey with innovative solutions.',
    settings: { theme: 'modern' }
  };

  const productsSection = pageContent?.sections?.find(s => s.type === 'products') || {
    id: 2,
    type: 'products',
    title: 'Our Products',
    subtitle: 'Innovative software solutions for modern businesses',
    content: 'Discover our comprehensive suite of products designed to streamline your operations.'
  };

  const servicesSection = pageContent?.sections?.find(s => s.type === 'services') || {
    id: 3,
    type: 'services', 
    title: 'Our Services',
    subtitle: 'Professional technology services',
    content: 'From custom development to consulting, we provide end-to-end technology solutions.'
  };

  const testimonialsSection = pageContent?.sections?.find(s => s.type === 'testimonials') || {
    id: 4,
    type: 'testimonials',
    title: 'What Our Clients Say',
    subtitle: 'Real feedback from satisfied customers',
    content: 'See what our clients have to say about working with us.'
  };

  const caseStudiesSection = pageContent?.sections?.find(s => s.type === 'case-studies') || {
    id: 5,
    type: 'case-studies',
    title: 'Success Stories',
    subtitle: 'Real-world results from our projects',
    content: 'Explore how we\'ve helped businesses achieve their digital transformation goals.'
  };

  const clientsSection = pageContent?.sections?.find(s => s.type === 'clients') || {
    id: 6,
    type: 'clients',
    title: 'Trusted by Industry Leaders',
    subtitle: 'Companies that trust us with their technology needs',
    content: 'We\'re proud to work with organizations of all sizes across various industries.'
  };

  // Generate SEO metadata
  const pageTitle = generateSeoTitle(pageContent?.metaTitle);
  const pageDescription = generateSeoDescription(pageContent?.metaDescription);

  // Show loading state while essential content loads
  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Show error state if page content fails to load (rare with fallbacks)
  if (pageError && !pageContent) {
    return (
      <ErrorBoundary 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Unable to Load Page</h1>
              <p className="text-gray-600 mb-4">We're experiencing technical difficulties.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        }
      />
    );
  }

  return (
    <ErrorBoundary>
      {/* SEO Meta Tags - Dynamic from Strapi */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itechnologies.ng/" />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "I-Varse Technologies",
            "url": "https://itechnologies.ng",
            "description": pageDescription,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Nigeria"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section - Dynamic content with fallback */}
      <ModernHero
        {...heroSection}
        isLoading={isPageLoading}
      />

      {/* Products Section - Shows products from Strapi */}
      <ProductsSection
        {...productsSection}
        products={products || []}
        isLoading={isProductsLoading}
        showEmptyState={!isProductsLoading && (!products || products.length === 0)}
        emptyStateMessage="Our products are being updated. Please check back soon."
      />

      {/* Services Section - Shows services from Strapi */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {servicesSection.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {servicesSection.subtitle}
            </p>
          </div>
          
          {isServicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies?.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                Our services information is being updated. Please contact us for more details.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - Dynamic content */}
      <TestimonialsSection
        {...testimonialsSection}
        testimonials={testimonials || []}
        isLoading={isTestimonialsLoading}
      />

      {/* Case Studies Section - Dynamic content */}
      <CaseStudiesSection
        {...caseStudiesSection}
        caseStudies={caseStudies || []}
        isLoading={isCaseStudiesLoading}
      />

      {/* Clients Section - Dynamic logos */}
      <ClientsSection
        {...clientsSection}
        clientLogos={clientLogos || []}
        isLoading={isClientsLoading}
      />

      {/* Development Mode: Show Content Status */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-sm max-w-xs">
          <h4 className="font-bold mb-2">Content Status</h4>
          <div className="space-y-1">
            <div className={`flex items-center ${contentStatus.systemHealth.strapi ? 'text-green-400' : 'text-red-400'}`}>
              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
              Strapi: {contentStatus.systemHealth.strapi ? 'Connected' : 'Fallback'}
            </div>
            <div className="text-gray-300">
              Products: {contentStatus.isUsingFallbacks.products ? 'Fallback' : 'Live'}
            </div>
            <div className="text-gray-300">
              Services: {contentStatus.isUsingFallbacks.services ? 'Fallback' : 'Live'}
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Home;

/**
 * MIGRATION COMPARISON:
 * 
 * BEFORE (Hardcoded):
 * - Data imported from client/src/lib/data/hero.ts, products.ts, etc.
 * - No dynamic content updates
 * - No fallback handling
 * - Fixed content regardless of CMS status
 * 
 * AFTER (Dynamic with Fallbacks):
 * - Content fetched from Strapi CMS
 * - Automatic fallbacks when API is unavailable
 * - Loading states for better UX
 * - Error boundaries for robustness
 * - Development mode status indicators
 * - SEO-friendly with dynamic meta tags
 * 
 * KEY IMPROVEMENTS:
 * 1. Content can be updated without code changes
 * 2. Website works even if CMS is down
 * 3. Better performance with caching
 * 4. Multilingual support ready
 * 5. Professional content management workflow
 */
