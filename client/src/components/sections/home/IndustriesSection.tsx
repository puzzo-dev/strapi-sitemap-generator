import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import AppLink from '@/components/ui/AppLink';
import { ArrowRight, Building2, Heart, ShoppingCart, Factory, GraduationCap, Home, Truck, Zap, CircuitBoard, Globe2, Sparkles } from 'lucide-react';
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
  const title = industriesSection?.title || t('home.industries.title', 'Industry Expertise');
  const subtitle = industriesSection?.subtitle || t('home.industries.subtitle', 'Solutions across sectors');
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
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/15 to-white dark:from-[#0a192f] dark:via-blue-950/15 dark:to-[#0a192f] pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500"></div>
        </div>
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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-[#0a192f] dark:via-blue-950/20 dark:to-[#0a192f]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/22"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/16"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <CircuitBoard className="absolute left-8 top-12 h-24 w-24 text-blue-400 dark:text-blue-600" />
          <Globe2 className="absolute right-12 top-8 h-20 w-20 text-blue-400 dark:text-blue-600" />
          <Sparkles className="absolute right-1/3 bottom-8 h-16 w-16 text-blue-400 dark:text-blue-600" />
        </div>
      </div>
      <div className="container-custom max-w-[1400px] px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-14 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {limitedIndustries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 28, clipPath: 'inset(0 0 24% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
              className="group relative"
            >
              <div className="relative overflow-hidden h-full rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/78 dark:bg-white/5 backdrop-blur shadow-lg hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:shadow-xl transition-all duration-300">
                <div className="relative p-6 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-300">
                        {getIndustryIcon(industry.icon || 'fa-university')}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-blue-500 font-semibold">Industry</p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{industry.name}</h3>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-200/80 leading-relaxed line-clamp-3">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-700 dark:text-blue-200">
                    {['Compliance-ready', 'Scalable', 'Data-led'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-50/80 dark:bg-white/5 border border-blue-100/60 dark:border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <AppLink
                    href={`/industries/${industry.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-300 font-semibold text-sm hover:underline mt-auto"
                  >
                    {getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </AppLink>
                </div>
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