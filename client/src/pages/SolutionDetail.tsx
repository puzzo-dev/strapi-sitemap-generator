import React, { useMemo } from 'react';
import { useParams } from 'wouter';
import { Shield, Zap, HeartPulse, BarChart } from 'lucide-react';
import { useProductById, usePageContent } from '@/hooks/useContent';
import PageLayout from '@/components/layout/PageLayout';
import { productDetailPageContent as localProductDetailPageContent } from '@/lib/data/pages';
import { products } from '@/lib/data/';
import { ProductProps } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';

// Import section components
import {
  ProductDetailHeroSection,
  ProductDetailDescriptionSection,
  ProductGallerySection,
  ProductFeaturesSection,
  ProductPricingSection,
  ProductRelatedSection,
  ProductCTASection,
  ProductDetailLoadingSection,
  ProductDetailErrorSection
} from '@/components/sections/solution';

// Helper function to map icon strings to React components
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'shield':
      return <Shield className="h-6 w-6 text-blue-500" />;
    case 'zap':
      return <Zap className="h-6 w-6 text-purple-500" />;
    case 'heart-pulse':
      return <HeartPulse className="h-6 w-6 text-red-500" />;
    case 'bar-chart':
      return <BarChart className="h-6 w-6 text-green-500" />;
    default:
      return <Shield className="h-6 w-6 text-blue-500" />;
  }
};

// Transform product data to match component expectations
const transformProductForComponents = (product: ProductProps) => {
  if (!product) return null;

  return {
    ...product,
    // Transform benefits from PageSection to string array
    benefits: product.benefits?.items?.map(item => item.title) || [
      "Improved operational efficiency",
      "Cost optimization and reduced overhead",
      "Enhanced security and compliance",
      "Scalable solutions for business growth"
    ],
    // Transform industries from PageSection to string array
    industries: product.industries?.items?.map(item => item.title) || [
      "Technology",
      "Healthcare",
      "Finance",
      "Education"
    ],
    // Transform case studies from PageSection to array
    casestudies: product.casestudies?.items?.map(item => ({
      title: item.title,
      description: item.description,
      result: item.description // Using description as result for now
    })) || [],
    // Transform FAQs from PageSection to array
    faqs: product.faqs?.items?.map(item => ({
      question: item.title,
      answer: item.description
    })) || [],
    // Add features array if it doesn't exist, using technicalSpecs data
    features: (product as any).features || [
      {
        icon: 'shield',
        title: 'Security',
        description: 'Enterprise-grade security'
      },
      {
        icon: 'zap',
        title: 'Performance',
        description: 'High performance'
      },
      {
        icon: 'heart-pulse',
        title: 'Reliability',
        description: '99.9% uptime'
      },
      {
        icon: 'bar-chart',
        title: 'Analytics',
        description: 'Comprehensive analytics and reporting'
      }
    ].map(feature => ({
      ...feature,
      icon: getIconComponent(feature.icon)
    }))
  };
};

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch page content from Strapi or use fallback
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('product-detail');
  const displayPageContent = pageContent || localProductDetailPageContent;

  // Find product by slug from local products
  const matchedProduct = useMemo(() => {
    return products.find((product: ProductProps) => product.slug === slug);
  }, [slug]);

  // Get product from API using the hook (if we have an ID)
  const { data: apiProduct, isLoading } = useProductById(matchedProduct?.id || 0);

  // Combine API product data with matched data, or fall back to just the matched data
  const rawProduct = useMemo(() => {
    return apiProduct
      ? {
        ...apiProduct,
        ...matchedProduct
      }
      : matchedProduct;
  }, [apiProduct, matchedProduct]);

  // Transform product data for components
  const product = useMemo(() => {
    if (!rawProduct) return null;
    return transformProductForComponents(rawProduct) as any;
  }, [rawProduct]);

  // Show loading state
  if (isLoading) {
    return <ProductDetailLoadingSection />;
  }

  // Handle not found case
  if (!product) {
    return <ProductDetailErrorSection pageContent={displayPageContent} />;
  }

  return (
    <PageLayout
      title={product ? `${product.title} | Products` : 'Product Not Found'}
      description={product ? `${product.description} Discover the features and benefits of ${product.title}.` : 'The requested product could not be found.'}
      canonicalUrl={`https://itechnologies.ng/solutions/${slug}`}
      ogImage={product?.image || 'https://itechnologies.ng/og-product.jpg'}
      pageContent={product}
      isLoading={isLoading}
    >
      <main>
        {/* Hero Section */}
        <ProductDetailHeroSection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Main Product Description */}
        <ProductDetailDescriptionSection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Gallery Section */}
        <ProductGallerySection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Features Section */}
        <ProductFeaturesSection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Pricing Section */}
        <ProductPricingSection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Related Products Section */}
        <ProductRelatedSection
          currentProductSlug={slug}
          relatedProducts={products}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* CTA Section */}
        <ProductCTASection
          product={product}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />
      </main>
    </PageLayout>
  );
};

export default ProductDetail;