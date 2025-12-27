import React from 'react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';

interface ProductFeaturesSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

const ProductFeaturesSection: React.FC<ProductFeaturesSectionProps> = ({
  product,
  isLoading,
  pageContent
}) => {
  // Get features section content from pageContent
  const featuresSection = pageContent?.sections?.find(s => s.type === 'features');
  const featuresContent = featuresSection?.settings?.productContent?.features;

  // Use product-specific section data if available, otherwise fall back to defaults
  const content = {
    badge: product?.sectionBadge || featuresContent?.badge || "⚡ Key Capabilities",
    title: product?.sectionTitle || featuresContent?.title || "Powerful Features",
    subtitle: product?.sectionDescription || featuresContent?.subtitle || "Our software provides everything you need to streamline operations and boost performance."
  };

  if (isLoading) {
    return (
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom max-w-8xl">
          <div className="text-center mb-12">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Calculate grid columns based on card count (max 4 per row)
  const cardCount = product.features?.length || 0;
  const gridCols = Math.min(cardCount, 4);
  const gridColsClass = `grid-cols-${gridCols}`;

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {content.badge}
          </div>
          <div className="text-center mb-16">
            <h2 className="section-title text-blue-900 dark:text-blue-200">{content.title}</h2>
            <p className="section-subtitle">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${cardCount === 1 ? 'lg:grid-cols-1' : cardCount === 2 ? 'lg:grid-cols-2' : cardCount === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {product.features?.map((feature: any, index: number) => {
            const CardWrapper = feature.link ? 'a' : 'div';
            const cardProps = feature.link ? {
              href: feature.link.linkType === 'internal' && feature.link.solution
                ? `/solutions/${feature.link.solution.slug}`
                : feature.link.externalUrl || '#',
              target: feature.link.linkType === 'external' ? '_blank' : undefined,
              rel: feature.link.linkType === 'external' ? 'noopener noreferrer' : undefined,
              className: 'block group'
            } : {};

            return (
              <CardWrapper key={index} {...cardProps}>
                <div className={`relative p-0.5 rounded-lg h-full ${feature.link ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 transition-all duration-300' : ''}`}>
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full bg-white dark:bg-gray-900">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {feature.description}
                      </p>
                      {feature.link && (
                        <div className="mt-4">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            {feature.link.label || 'Learn More'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;