import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import { usePageContent, useServices, useTestimonials } from '@/hooks/useStrapiContent';
import { ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');
  
  // Fetch services from Strapi
  const { data: apiServices, isLoading: isServicesLoading } = useServices();
  
  // Fetch testimonials from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] pt-12 pb-20 md:pt-16 md:pb-24 lg:py-24 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 md:space-y-8">
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </div>
                ) : (
                  <h1 className="hero-title">
                    {pageContent?.sections?.find(s => s.type === 'hero')?.title || 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'}
                  </h1>
                )}
                
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 lg:pr-10 hidden md:block">
                    {pageContent?.sections?.find(s => s.type === 'hero')?.subtitle || 
                    'Embark on a successful innovative journey with cutting-edge solutions for your business. We\'re dedicated to elevating your digital experience.'}
                  </p>
                )}
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"} 
                    size="lg" 
                    endIcon={<ChevronRight />} 
                    className="sm:w-auto py-3 animate-snowfall" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                  </GradientButton>
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"} 
                    variant="outline" 
                    size="lg" 
                    className="sm:w-auto py-3" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;