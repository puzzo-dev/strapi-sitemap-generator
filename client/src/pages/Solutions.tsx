import React, { useMemo } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import { usePageContent, useSiteConfig } from '@/hooks/useContent';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';
import { productsPageContent as localProductsPageContent } from '@/lib/data/pages';
import { defaultSiteConfig } from '@/lib/data/';
import { ProductProps, TestimonialProps } from '@/lib/types/content';
import { products as fallbackProducts } from '@/lib/data/solutions';

// Import section components
import {
  ProductsHeroSection,
  ProductsBenefitsSection,
  ProductsListSection,
  ProductsTechnologiesSection,
  ProductsCaseStudiesSection,
  ProductsTestimonialsSection,
  ProductsCTASection
} from '@/components/sections/solutions';

const Products: React.FC = () => {
  useTranslation();
  useLanguage();
  const { data: siteConfig } = useSiteConfig();

  // Fetch page content from Strapi with fallback to local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('products');

  // Use Strapi data if available, otherwise fall back to local data
  const displayPageContent = pageContent || localProductsPageContent;
  const displaySiteConfig = siteConfig || defaultSiteConfig;

  // Only show loading if we're loading AND don't have fallback content
  const shouldShowLoading = isPageLoading && !displayPageContent;

  // Use fallback products data (temporarily until Strapi is configured)
  const displayProducts = fallbackProducts;

  // Get testimonials from page content
  const testimonialsSection = displayPageContent.sections?.find(s => s.type === 'testimonials');
  const displayTestimonials = useMemo((): TestimonialProps[] => {
    if (testimonialsSection?.settings?.featured) {
      const featured = testimonialsSection.settings.featured;
      if (Array.isArray(featured) && featured.length > 0) {
        return featured as TestimonialProps[];
      } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
        return [featured as TestimonialProps];
      }
    }
    return [];
  }, [testimonialsSection]);

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebsiteSchema(),
      generateOrganizationSchema()
    ]
  };

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl={`${displaySiteConfig.siteUrl}/solutions`}
      ogImage={`${displaySiteConfig.siteUrl}/og-products.jpg`}
      ogType="website"
      twitterCard="summary_large_image"
      keywords={[
        'software products',
        'business solutions',
        'enterprise software',
        'digital transformation',
        'I-Varse Technologies',
        'cloud solutions',
        'business automation',
        'scalable software'
      ]}
      pageContent={displayPageContent}
      isLoading={shouldShowLoading}
      structuredData={structuredData}
      animationType="fade"
    >
      <main>
        {/* Hero Section */}
        <ProductsHeroSection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Product Benefits Section */}
        <ProductsBenefitsSection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Products List Section */}
        <ProductsListSection
          pageContent={displayPageContent}
          products={displayProducts}
          isLoading={shouldShowLoading}
        />

        {/* Technologies Section */}
        <ProductsTechnologiesSection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Case Studies Section */}
        <ProductsCaseStudiesSection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Testimonials Section */}
        <ProductsTestimonialsSection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* CTA Section */}
        <ProductsCTASection
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />
      </main>
    </PageLayout>
  );
};

export default Products;
