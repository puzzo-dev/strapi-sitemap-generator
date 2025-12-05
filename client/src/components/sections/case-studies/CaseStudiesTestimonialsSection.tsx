import React from 'react';
import { useTranslation } from 'react-i18next';
import { TestimonialProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface CaseStudiesTestimonialsSectionProps {
  testimonials: TestimonialProps[];
  pageContent: any;
  isLoading?: boolean;
}

const CaseStudiesTestimonialsSection: React.FC<CaseStudiesTestimonialsSectionProps> = ({
  testimonials = [],
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get testimonials section from page content
  const testimonialsSection = pageContent?.sections?.find((s: any) => s.type === 'testimonials');

  if (isLoading) {
    return (
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  return (
    <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-10 text-center">
          {testimonialsSection?.title || t('caseStudies.testimonials.title', 'What Our Clients Say')}
        </h2>
        {testimonialsSection?.subtitle && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto">
            {testimonialsSection.subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-lg">
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                {testimonial.rating && (
                  <div className="flex items-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesTestimonialsSection; 