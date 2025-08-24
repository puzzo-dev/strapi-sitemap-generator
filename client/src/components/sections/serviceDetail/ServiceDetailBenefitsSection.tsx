import React from 'react';
import { BarChart, Check } from 'lucide-react';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailBenefitsSectionProps {
  service: ServiceProps & {
    benefits?: string[];
  };
}

const ServiceDetailBenefitsSection: React.FC<ServiceDetailBenefitsSectionProps> = ({ service }) => {

  const benefits = service.benefits;

  return (
    <section id="benefits" className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            Benefits
          </div>
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">How You'll Benefit</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our {service.title.toLowerCase()} services are designed to deliver tangible business value and address your specific challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits?.map((benefit, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{benefit.split(':')[0]}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.includes(':') ? benefit.split(':')[1].trim() : 'Leverage our expertise to achieve optimal results for your business.'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailBenefitsSection;