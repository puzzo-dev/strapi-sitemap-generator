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

  // Default content if not available in pageContent
  const defaultContent = {
    badge: "⚡ Key Capabilities",
    title: "Powerful Features",
    subtitle: "Our software provides everything you need to streamline operations and boost performance."
  };

  const content = featuresContent || defaultContent;

  if (isLoading) {
    return (
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom max-w-7xl">
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

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom max-w-7xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features?.map((feature: any, index: number) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;