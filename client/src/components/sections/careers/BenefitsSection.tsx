import React from 'react';
import { Benefit, PageContent } from '@/lib/types/core';
import { PieChart, Heart, Laptop, Award, Coffee, Globe } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: Benefit[];
  isLoading: boolean;
  pageContent?: PageContent | null;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits: displayBenefits,
  isLoading: isBenefitsLoading,
  pageContent
}) => {
  // Get benefits section from page content (Strapi)
  const benefitsSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title === 'Employee Benefits');

  const title = benefitsSection?.title || 'Employee Benefits';
  const subtitle = benefitsSection?.subtitle || 'Comprehensive benefits package designed for your well-being';
  const badge = benefitsSection?.settings?.badge || '🎁 Benefits';
  const content = benefitsSection?.content;
  const backgroundColor = benefitsSection?.backgroundColor;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'PieChart': return PieChart;
      case 'Heart': return Heart;
      case 'Laptop': return Laptop;
      case 'Award': return Award;
      case 'Coffee': return Coffee;
      case 'Globe': return Globe;
      default: return Award;
    }
  };

  return (
    <section className={`content-section ${backgroundColor || 'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]'}`}>
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {badge}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">{title}</h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {isBenefitsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBenefits.map((benefit) => {
              const IconComponent = getIconComponent(benefit.icon);
              return (
                <div key={benefit.id || benefit.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;