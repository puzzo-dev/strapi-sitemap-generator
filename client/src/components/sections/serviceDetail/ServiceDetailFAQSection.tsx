import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailFAQSectionProps {
  service: ServiceProps & {
    faqs?: { question: string; answer: string }[];
  };
}

const ServiceDetailFAQSection: React.FC<ServiceDetailFAQSectionProps> = ({ service }) => {
  if (!service.faqs) return null;

  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            ❓ FAQs
          </div>
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our {service.title.toLowerCase()} services.
          </p>
        </div>

        <div className="space-y-6">
          {service.faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have more questions? We're here to help.
          </p>
          <GradientButton href="/contact">
            Contact Us
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailFAQSection;