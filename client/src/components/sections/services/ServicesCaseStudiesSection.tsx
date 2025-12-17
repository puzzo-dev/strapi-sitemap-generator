import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLink from '@/components/ui/AppLink';
import { Card, CardContent } from '@/components/ui/card';
import { PageContent } from '@/lib/types/core';

interface ServicesCaseStudiesSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ServicesCaseStudiesSection: React.FC<ServicesCaseStudiesSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get case studies from page content
  const caseStudiesSection = pageContent?.sections?.find(s => s.type === 'case-studies');
  const caseStudies = caseStudiesSection?.settings?.featured || [];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-8xl">
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

  // Don't render if no case studies
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]">
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="text-center mb-10">
          {caseStudiesSection?.badge && (
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              {caseStudiesSection.badge}
            </div>
          )}
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
            {caseStudiesSection?.title || t('services.caseStudies.title', 'Success Stories')}
          </h2>
          {caseStudiesSection?.subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {caseStudiesSection.subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs: any, index: number) => (
            <Card key={index} className="shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={cs.image} alt={cs.title} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-100">{cs.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{cs.description}</p>
                {cs.metrics && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(cs.metrics).slice(0, 4).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{value}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{key}</p>
                      </div>
                    ))}
                  </div>
                )}
                <AppLink href="/case-studies" className="text-blue-600 dark:text-blue-300 hover:underline font-medium inline-flex items-center">
                  View More Case Studies
                  <span className="ml-1">→</span>
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