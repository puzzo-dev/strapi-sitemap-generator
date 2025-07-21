import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLink from '@/components/ui/AppLink';
import { Card, CardContent } from '@/components/ui/card';

interface ServicesCaseStudiesSectionProps {
  pageContent: any;
  isLoading?: boolean;
}

const ServicesCaseStudiesSection: React.FC<ServicesCaseStudiesSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      title: 'Digital Banking Transformation',
      description: 'Complete digital transformation for First Bank Nigeria',
      image: '/src/assets/images/case-study-banking.jpg',
      industry: 'Banking & Finance',
      results: ['40% increase in customer satisfaction', '60% reduction in processing time']
    },
    {
      id: 2,
      title: 'E-commerce Platform Development',
      description: 'Scalable e-commerce solution for retail chains',
      image: '/src/assets/images/case-study-retail.jpg',
      industry: 'Retail',
      results: ['300% increase in online sales', '50% reduction in inventory management time']
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
          {t('services.caseStudies.title', 'Success Stories')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map(cs => (
            <Card key={cs.id} className="shadow-lg overflow-hidden">
              <img src={cs.image} alt={cs.title} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-100">{cs.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{cs.description}</p>
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                    {cs.industry}
                  </span>
                </div>
                <ul className="space-y-1 mb-4">
                  {cs.results.map((result, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
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

export default ServicesCaseStudiesSection; 