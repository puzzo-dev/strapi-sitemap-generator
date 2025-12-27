import React from 'react';
import { Check } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

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
  const { t } = useTranslation();

  // Get description section content from pageContent
  const descriptionSection = pageContent?.sections?.find(s => s.type === 'custom');
  const descriptionContent = descriptionSection?.settings?.productContent?.description;

  const content = {
    keyFeatures: product?.keyFeaturesLabel || getTranslation(t, 'ui.keyFeatures', uiLabels.keyFeatures),
    benefits: product?.benefitsLabel || getTranslation(t, 'ui.benefits', uiLabels.benefits)
  };

  if (isLoading) {
    return (
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom max-w-8xl">
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
      <div className="container-custom max-w-8xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            {/* Justified Description */}
            <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:text-justify prose-p:leading-relaxed">
              <div className="pl-0 md:pl-6">
                {(() => {
                  const description = product.fullDescription || product.description;

                  if (description) {
                    // If it contains line breaks, use existing paragraph splitting
                    if (description.includes('\n\n')) {
                      return description.split('\n\n').map((paragraph: string, index: number) => (
                        <p key={index} className={`mb-4 md:mb-6 text-justify leading-relaxed font-medium text-sm md:text-base lg:text-lg ${index === 0 ? 'first-line:font-semibold' : 'indent-0 md:indent-8'}`}>
                          {paragraph}
                        </p>
                      ));
                    }

                    // Otherwise, split at first full stop for two-paragraph layout
                    const firstDotIndex = description.indexOf('. ');

                    if (firstDotIndex !== -1 && firstDotIndex < description.length - 2) {
                      const firstParagraph = description.substring(0, firstDotIndex + 1);
                      const secondParagraph = description.substring(firstDotIndex + 2);

                      return (
                        <>
                          <p className="mb-6 md:mb-8 text-justify leading-relaxed font-medium text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-200 first-line:font-semibold">
                            {firstParagraph}
                          </p>
                          <p className="mb-4 md:mb-6 text-justify leading-relaxed font-medium text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 indent-0 md:indent-8">
                            {secondParagraph}
                          </p>
                        </>
                      );
                    }

                    // Fallback: single paragraph if no suitable split point
                    return (
                      <p className="mb-4 md:mb-6 text-justify leading-relaxed font-medium text-sm md:text-base lg:text-lg first-line:font-semibold">
                        {description}
                      </p>
                    );
                  }

                  return null;
                })()}
              </div>
            </div>
          </div>

          {/* Sidebar with Key Features Only */}
          <div className="lg:col-span-4">
            <Card className="sticky top-8">
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Width Stylish Benefits Section - Pill Cards */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{content.benefits}</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {product.benefits?.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 dark:border-blue-800 group hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailDescriptionSection;