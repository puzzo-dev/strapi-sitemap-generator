import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailCaseStudiesSectionProps {
  service: ServiceProps & {
    casestudies?: { title: string; description: string; result: string }[];
  };
}

const ServiceDetailCaseStudiesSection: React.FC<ServiceDetailCaseStudiesSectionProps> = ({ service }) => {
  if (!service.casestudies) return null;

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            Case Studies
          </div>
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">Case Studies</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we've helped organizations like yours achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.casestudies.map((casestudy, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{casestudy.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{casestudy.description}</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <div className="font-medium text-gray-800 dark:text-white mb-1">Results:</div>
                  <div className="text-gray-600 dark:text-gray-300">{casestudy.result}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GradientButton href="/case-studies">
            View All Case Studies
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailCaseStudiesSection;