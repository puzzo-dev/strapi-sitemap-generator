import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types/core';

interface ServicesCTASectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ServicesCTASection: React.FC<ServicesCTASectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  // Get CTA section from page content
  const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container-custom max-w-8xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse">
              ✨ Get Started
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
      <div className="container-custom max-w-8xl">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
            {ctaSection?.badge || "🚀 Get Started"}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">
            {ctaSection?.title}
          </h2>
          <p className="section-subtitle mb-8">
            {ctaSection?.subtitle}
          </p>
          <GradientButton href="/contact" size="lg">
            {ctaSection?.settings?.primaryButton?.children}
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTASection;