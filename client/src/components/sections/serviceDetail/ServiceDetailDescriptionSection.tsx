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
  // Get base-row section from content dynamic zone (why choose us section)
  const baseRowSection = service.content?.find((item: any) => item.__component === 'blocks.base-row');
  const baseCards = baseRowSection?.baseCards || [];

  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom max-w-8xl">
        {/* Base row section with cards side by side */}
        {baseRowSection && (
          <div className="mb-12">
            {baseRowSection.title && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {baseRowSection.title}
              </h2>
            )}
            {baseRowSection.description && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                {baseRowSection.description}
              </p>
            )}

            {/* Cards grid - 2 columns side by side */}
            {baseCards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {baseCards.map((card: any, index: number) => (
                  <Card key={index} className="h-full">
                    <CardContent className="p-6">
                      {card.cardBadge?.text && (
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                          {card.cardBadge.text}
                        </div>
                      )}
                      {card.title && (
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                          {card.title}
                        </h3>
                      )}
                      {card.content && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {card.content}
                        </p>
                      )}
                      {card.cardLink && (
                        <GradientButton
                          href={
                            card.cardLink.externalUrl ||
                            (card.cardLink.page ? `/page/${card.cardLink.page.slug}` : '') ||
                            (card.cardLink.service ? `/services/${card.cardLink.service.slug}` : '') ||
                            (card.cardLink.solution ? `/solutions/${card.cardLink.solution.slug}` : '') ||
                            '#'
                          }
                          variant="outline"
                          className="w-full justify-center"
                        >
                          {card.cardLink.label || 'Learn More'}
                        </GradientButton>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Original fullDescription section */}
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