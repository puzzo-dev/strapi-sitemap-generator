import React from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

interface ProductRelatedSectionProps {
  currentProductSlug: string;
  relatedProducts: any[];
  isLoading: boolean;
  pageContent?: PageContent;
}

const ProductRelatedSection: React.FC<ProductRelatedSectionProps> = ({
  currentProductSlug,
  relatedProducts,
  isLoading,
  pageContent,
}) => {
  const { t } = useTranslation();

  // Get related products content from page content settings
  const relatedSection = pageContent?.sections?.find(s => s.type === 'products');
  const relatedContent = relatedSection?.settings?.productContent?.related;

  // Filter out the current product and limit to 3 related products
  const filteredProducts = relatedProducts
    .filter(product => product.slug !== currentProductSlug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom max-w-8xl">
          <div className="text-center mb-16">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-full"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {t('products.relatedBadge') || uiLabels.products.relatedBadge}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">
            {relatedContent?.title || t('products.relatedTitle') || uiLabels.products.relatedTitle}
          </h2>
          <p className="section-subtitle">
            {relatedContent?.subtitle || t('products.relatedSubtitle') || uiLabels.products.relatedSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{product.shortDescription || product.description}</p>
                <Link href={`/solutions/${product.slug}`}>
                  <a className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                    <span>{product.learnMoreText || relatedContent?.learnMore || getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRelatedSection;