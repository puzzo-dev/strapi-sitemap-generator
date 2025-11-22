import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';

interface ServiceDetailOtherServicesSectionProps {
  otherServices: ServiceProps[];
}

const ServiceDetailOtherServicesSection: React.FC<ServiceDetailOtherServicesSectionProps> = ({ otherServices }) => {
  const { t } = useTranslation();
  
  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            Other Services
          </div>
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">Other Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of services designed to help your business succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherServices.map((otherService) => (
            <Card key={otherService.id} className="hover-lift group">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M9 8V16M6 10V14M15 8V16M18 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{otherService.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {otherService.description}
                </p>
                <Link href={`/services/${otherService.id}`}>
                  <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                    <span>{otherService.learnMoreText || otherService.readMoreText || t('ui.learnMore') || uiLabels.learnMore}</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GradientButton href="/services" variant="outline">
            View All Services
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailOtherServicesSection;