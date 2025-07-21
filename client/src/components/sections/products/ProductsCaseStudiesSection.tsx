import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLink from '@/components/ui/AppLink';
import { Card, CardContent } from '@/components/ui/card';

interface ProductsCaseStudiesSectionProps {
  pageContent: any;
  isLoading?: boolean;
}

const ProductsCaseStudiesSection: React.FC<ProductsCaseStudiesSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      title: 'Enterprise Software Implementation',
      description: 'Large-scale software deployment for manufacturing company',
      image: '/src/assets/images/case-study-manufacturing.jpg',
      product: 'ERP System',
      results: ['25% increase in productivity', '30% reduction in operational costs']
    },
    {
      id: 2,
      title: 'Cloud Migration Success',
      description: 'Seamless cloud migration for financial services firm',
      image: '/src/assets/images/case-study-cloud.jpg',
      product: 'Cloud Platform',
      results: ['99.9% uptime achieved', '50% reduction in infrastructure costs']
    }
  ];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-10 text-center">
          {t('products.caseStudies.title', 'Product Success Stories')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map(cs => (
            <Card key={cs.id} className="shadow-lg overflow-hidden">
              <img src={cs.image} alt={cs.title} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-100">{cs.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{cs.description}</p>
                <div className="mb-4">
                  <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">
                    {cs.product}
                  </span>
                </div>
                <ul className="space-y-1 mb-4">
                  {cs.results.map((result, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {result}
                    </li>
                  ))}
                </ul>
                <AppLink href="/case-studies" className="text-blue-600 dark:text-blue-300 hover:underline font-medium">
                  View More Case Studies
                </AppLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCaseStudiesSection; 