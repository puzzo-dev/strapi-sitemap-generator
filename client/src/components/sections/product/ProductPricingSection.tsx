import React from 'react';
import { Check } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProductPricingSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

const ProductPricingSection: React.FC<ProductPricingSectionProps> = ({
  product,
  isLoading,
  pageContent
}) => {
  // Get pricing section content from pageContent
  const pricingSection = pageContent?.sections?.find(s => s.type === 'custom');
  const pricingContent = pricingSection?.settings?.productContent?.pricing;

  // Default content if not available in pageContent
  const defaultContent = {
    badge: "💰 Pricing Options",
    title: "Flexible Plans for Every Need",
    subtitle: "Choose the right plan for your business size and requirements.",
    mostPopular: "Most Popular",
    getStarted: "Get Started"
  };

  const content = pricingContent || defaultContent;

  if (isLoading) {
    return (
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom max-w-7xl">
          <div className="text-center mb-12">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="space-y-2">
                      {Array(4).fill(0).map((_, j) => (
                        <div key={j} className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!product.pricing?.plans) {
    return null;
  }

  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.pricing.plans.map((plan: any, index: number) => (
            <Card
              key={index}
              className={`relative ${
                plan.recommended
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg'
                  : 'hover:shadow-lg transition-shadow duration-300'
              }`}
            >
              <CardContent className="p-6">
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {content.mostPopular}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {plan.price}
                  </div>
                  {plan.price !== 'Custom' && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {product.pricing.trialPeriod}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <GradientButton
                  href="/contact"
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                >
                  {content.getStarted}
                </GradientButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {product.pricing.setupFee && (
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300">
              Setup fee: {product.pricing.setupFee}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPricingSection;