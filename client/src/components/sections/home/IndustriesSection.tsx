import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import AppLink from '@/components/ui/AppLink';
import { ArrowRight, Building2, Heart, ShoppingCart, Factory, GraduationCap, Home, Truck, Zap } from 'lucide-react';
import { IndustryProps } from '@/lib/types/content';
import { PageSection, PageContent } from '@/lib/types/core';
import { IndustriesSectionProps } from '@/lib/types/components';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industries = [],
  homePageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get industries section from homePageContent
  const industriesSection = homePageContent?.sections?.find((s: PageSection) => s.type === 'industries');

  // Extract section content from industriesSection
  const title = industriesSection?.title || t('home.industries.title', 'Industries We Serve');
  const subtitle = industriesSection?.subtitle || t('home.industries.subtitle', 'We deliver innovative technology solutions across diverse industries, helping businesses transform and grow.');
  const description = industriesSection?.content || t('home.industries.description', 'Our expertise spans across multiple sectors, enabling us to provide tailored solutions that address industry-specific challenges and drive digital transformation.');
  const buttonSettings = industriesSection?.settings?.primaryButton;
  const featuredIndustries = industriesSection?.settings?.featured;

  // Get all industries from props
  const allIndustries = industries || [];

  // Filter for valid IndustryProps
  const filterIndustryProps = (arr: any[]): IndustryProps[] =>
    Array.isArray(arr) ? arr.filter((i): i is IndustryProps => i && typeof i === 'object' && 'name' in i && 'description' in i) : [];

  // Get featured industries from section settings or use all industries
  const displayIndustries: IndustryProps[] =
    Array.isArray(featuredIndustries) && featuredIndustries.length > 0
      ? filterIndustryProps(featuredIndustries)
      : filterIndustryProps(allIndustries);

  // Limit to 4 industries for home page
  const limitedIndustries = displayIndustries.slice(0, 4);

  // Icon mapping for industries
  const getIndustryIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'fa-university': <Building2 className="w-8 h-8" />,
      'fa-heartbeat': <Heart className="w-8 h-8" />,
      'fa-shopping-cart': <ShoppingCart className="w-8 h-8" />,
      'fa-industry': <Factory className="w-8 h-8" />,
      'fa-graduation-cap': <GraduationCap className="w-8 h-8" />,
      'fa-building': <Home className="w-8 h-8" />,
      'fa-truck': <Truck className="w-8 h-8" />,
      'fa-bolt': <Zap className="w-8 h-8" />
    };
    return iconMap[iconName] || <Building2 className="w-8 h-8" />;
  };

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-800/30 pointer-events-none"></div>
        <div className="container-custom max-w-8xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8 mx-auto"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-12 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!limitedIndustries.length) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-800/30 pointer-events-none"></div>
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
          >

            {title}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-md mb-4 text-blue-900 dark:text-blue-200 font-bold"
          >
            <span className="relative inline-block pb-2">
              {subtitle}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedIndustries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-600 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {getIndustryIcon(industry.icon || 'fa-university')}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {industry.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {industry.description}
                </p>
                <AppLink
                  href={`/industries/${industry.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium group-hover:underline transition-all duration-300"
                >
                  {getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </AppLink>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          {buttonSettings && typeof buttonSettings === 'object' && (
            <GradientButton
              href={buttonSettings.href}
              className="px-10 w-56"
              endIcon={<ArrowRight />}
            >
              {buttonSettings.title || t('home.industries.cta', 'View All Industries')}
            </GradientButton>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection; 