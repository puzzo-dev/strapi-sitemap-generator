import React from 'react';
import { Check } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';

interface ProductDetailDescriptionSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

const ProductDetailDescriptionSection: React.FC<ProductDetailDescriptionSectionProps> = ({
  product,
  isLoading,
  pageContent
}) => {
  // Get description section content from pageContent
  const descriptionSection = pageContent?.sections?.find(s => s.type === 'custom');
  const descriptionContent = descriptionSection?.settings?.productContent?.description;

  // Default content if not available in pageContent
  const defaultContent = {
    keyFeatures: "Key Features",
    benefits: "Benefits"
  };

  const content = descriptionContent || defaultContent;

  if (isLoading) {
    return (
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="space-y-2">
                      {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300">
              {product.fullDescription?.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              )) || (
                <p>{product.description}</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{content.keyFeatures}</h3>
                <ul className="space-y-3">
                  {product.keyFeatures?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{content.benefits}</h3>
                <ul className="space-y-3">
                  {product.benefits?.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailDescriptionSection;