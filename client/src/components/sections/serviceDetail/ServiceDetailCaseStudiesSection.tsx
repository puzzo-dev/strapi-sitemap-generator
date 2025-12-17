import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailCaseStudiesSectionProps {
  service: ServiceProps & {
    casestudies?: { title: string; description: string; result: string }[];
  };
  blockTitle?: string;
  blockDescription?: string;
}

const ServiceDetailCaseStudiesSection: React.FC<ServiceDetailCaseStudiesSectionProps> = ({ service, blockTitle, blockDescription }) => {
  if (!service.casestudies) return null;

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-16">
          {blockTitle && (
            <>
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                Case Studies
              </div>
              <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">{blockTitle}</h2>
            </>
          )}
          {blockDescription && (
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {blockDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.casestudies.map((casestudy, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{casestudy.title}</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                  {/* Render Overview (description field) */}
                  {casestudy.description && casestudy.description.split('\n').map((line, idx) => {
                    if (!line.trim()) return null;
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const parts = line.split(boldRegex);
                    return (
                      <div key={`desc-${idx}`}>
                        {parts.map((part, i) => {
                          if (i % 2 === 1) {
                            return <div key={i} className="font-bold text-gray-900 dark:text-white text-base mb-2">{part}</div>;
                          } else if (part.trim()) {
                            return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">{part}</p>;
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}

                  {/* Render Results (result field) */}
                  {casestudy.result && casestudy.result.split('\n').map((line, idx) => {
                    if (!line.trim()) return null;
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const parts = line.split(boldRegex);
                    return (
                      <div key={`result-${idx}`}>
                        {parts.map((part, i) => {
                          if (i % 2 === 1) {
                            return <div key={i} className="font-bold text-gray-900 dark:text-white text-base mb-2 mt-4">{part}</div>;
                          } else if (part.trim()) {
                            return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">{part}</p>;
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
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