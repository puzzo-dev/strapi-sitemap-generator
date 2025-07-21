import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import AppLink from '@/components/ui/AppLink';

interface CaseStudiesCTASectionProps {
  pageContent: any;
  isLoading?: boolean;
}

const CaseStudiesCTASection: React.FC<CaseStudiesCTASectionProps> = ({
  isLoading = false
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse">
              <span className="text-lg mr-2">✨</span>
              Get Started
            </div>
            <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-8 animate-pulse"></div>
            <div className="h-12 bg-blue-100 dark:bg-blue-800/50 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
            <span className="text-lg mr-2">✨</span>
            {t('caseStudies.cta.badge', 'Success Stories')}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">
            {t('caseStudies.cta.title', 'Ready to Start Your Success Story?')}
          </h2>
          <p className="section-subtitle mb-8">
            {t('caseStudies.cta.description', 'Let\'s discuss how we can help transform your business with innovative technology solutions.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GradientButton href="/contact" size="lg">
              {t('caseStudies.cta.primary', 'Get Started Today')}
            </GradientButton>
            <AppLink
              href="/services"
              className="px-8 py-4 text-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-lg"
            >
              {t('caseStudies.cta.secondary', 'Explore Our Services')}
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCTASection; 