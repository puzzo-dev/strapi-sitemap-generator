import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { usePageContent, useSiteConfig } from '@/hooks/useStrapiContent';
import MetaTags from '@/components/seo/MetaTags';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';
import { productsPageContent as localProductsPageContent } from '@/lib/data/pages';
import { defaultSiteConfig } from '@/lib/data/';
import { ProductProps, TestimonialProps } from '@/lib/types/content';
import { products as fallbackProducts } from '@/lib/data/products';

// Import section components
import {
  ProductsHeroSection,
  ProductsBenefitsSection,
  ProductsListSection,
  ProductsTechnologiesSection,
  ProductsCaseStudiesSection,
  ProductsTestimonialsSection,
  ProductsCTASection
} from '@/components/sections/products';

const Products: React.FC = () => {
  useTranslation();
  useLanguage();
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();
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
    ...generateWebsiteSchema(),
    ...generateOrganizationSchema()
  };

  // SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`${displaySiteConfig.siteUrl}/products`}
        ogImage={`${displaySiteConfig.siteUrl}/og-products.jpg`}
        ogUrl={`${displaySiteConfig.siteUrl}/products`}
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
        alternateLanguages={[
          { lang: 'en', url: `${displaySiteConfig.siteUrl}/products` },
          { lang: 'yo', url: `${displaySiteConfig.siteUrl}/yo/products` },
          { lang: 'ig', url: `${displaySiteConfig.siteUrl}/ig/products` },
          { lang: 'ha', url: `${displaySiteConfig.siteUrl}/ha/products` },
          { lang: 'fr', url: `${displaySiteConfig.siteUrl}/fr/products` },
          { lang: 'es', url: `${displaySiteConfig.siteUrl}/es/products` },
          { lang: 'sw', url: `${displaySiteConfig.siteUrl}/sw/products` }
        ]}
        structuredData={structuredData}
      />

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
    </>
  );
};

export default Products;
