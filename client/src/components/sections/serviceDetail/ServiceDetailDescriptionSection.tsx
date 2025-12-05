import React from 'react';
import { Check } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailDescriptionSectionProps {
  service: ServiceProps & {
    fullDescription?: string;
    benefits?: string[];
    settings?: {
      whyChooseUsTitle?: string;
      ctaButtonText?: string;
    };
  };
}

const ServiceDetailDescriptionSection: React.FC<ServiceDetailDescriptionSectionProps> = ({ service }) => {
  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300">
              {service.fullDescription && (
                service.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            {service.benefits && service.benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {service.settings?.whyChooseUsTitle || 'Why Choose Us'}
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <GradientButton href="/contact" className="w-full justify-center">
                      {service.settings?.ctaButtonText || 'Request a Consultation'}
                    </GradientButton>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailDescriptionSection;