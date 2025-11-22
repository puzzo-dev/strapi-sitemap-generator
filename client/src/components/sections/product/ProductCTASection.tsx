import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent, PageSection } from '@/lib/types/core';
import { fadeInUp } from '@/lib/animations';
import { ProductCTASectionProps } from '@/lib/types/components';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';

const ProductCTASection: React.FC<ProductCTASectionProps> = ({
  isLoading,
  pageContent
}) => {
  const { t } = useTranslation();
  
  // Get CTA section from pageContent
  const ctaSection = pageContent?.sections?.find(s => s.type === 'cta') as PageSection;

  // Extract data from ctaSection with fallbacks
  const title = ctaSection?.title || t('ui.readyToStart') || uiLabels.readyToStart;
  const subtitle = ctaSection?.subtitle || t('ui.contactUsToday') || uiLabels.contactUsToday;
  const primaryButton = ctaSection?.settings?.primaryButton;

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center max-w-3xl mx-auto">
              <div className="h-8 bg-white/20 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded mb-8 animate-pulse"></div>
              <div className="h-12 bg-white/20 rounded w-48 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp()}
          className="bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-white/90 mb-8">
              {subtitle}
            </p>
            <div className="flex justify-center">
              <GradientButton href={primaryButton?.href} size="lg" variant="light">
                {primaryButton?.children || primaryButton?.title || t('ui.getStarted') || uiLabels.getStarted}
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCTASection;
