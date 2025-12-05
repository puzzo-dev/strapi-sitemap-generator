import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import AppLink from '@/components/ui/AppLink';
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { CaseStudyProps } from '@/lib/types/content';
import { PageSection, PageContent } from '@/lib/types/core';
import { CaseStudiesSectionProps } from '@/lib/types/components';

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies = [],
  homePageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get case studies section from homePageContent
  const caseStudiesSection = homePageContent?.sections?.find((s: PageSection) => s.type === 'case-studies');

  // Extract section content from caseStudiesSection
  const title = caseStudiesSection?.title || t('home.caseStudies.title', 'Featured Case Studies');
  const subtitle = caseStudiesSection?.subtitle || t('home.caseStudies.subtitle', 'Real Results From Real Projects');
  const description = caseStudiesSection?.content || t('home.caseStudies.description', 'Discover how we\'ve helped businesses transform their operations and achieve remarkable results through innovative technology solutions.');
  const buttonSettings = caseStudiesSection?.settings?.primaryButton;
  const featuredCaseStudies = caseStudiesSection?.settings?.featured;

  // Get all case studies from props
  const allCaseStudies = caseStudies || [];

  // Filter for valid CaseStudyProps
  const filterCaseStudyProps = (arr: any[]): CaseStudyProps[] =>
    Array.isArray(arr) ? arr.filter((c): c is CaseStudyProps => c && typeof c === 'object' && 'title' in c && 'description' in c) : [];

  // Get featured case studies from section settings or use all case studies
  const displayCaseStudies: CaseStudyProps[] =
    Array.isArray(featuredCaseStudies) && featuredCaseStudies.length > 0
      ? filterCaseStudyProps(featuredCaseStudies)
      : filterCaseStudyProps(allCaseStudies);

  // Safely extract case studies from the section
  const caseStudiesData = caseStudiesSection?.settings?.featured || [];
  const limitedCaseStudies = Array.isArray(caseStudiesData)
    ? caseStudiesData
      .filter((c): c is CaseStudyProps => c && typeof c === 'object' && 'title' in c && 'description' in c)
      .slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-800/30 pointer-events-none"></div>
        <div className="container-custom max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8 mx-auto"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-12 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!limitedCaseStudies.length) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-800/30 pointer-events-none"></div>
      <div className="container-custom max-w-7xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limitedCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      {caseStudy.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {caseStudy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {caseStudy.description}
                  </p>

                  {/* Client and Industry */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {caseStudy.client}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {caseStudy.industry}
                    </span>
                  </div>

                  {/* Key Results */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {caseStudy.results.slice(0, 2).map((result, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {caseStudy.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseStudy.technologies.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          +{caseStudy.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Link */}
                  <AppLink
                    href={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium group-hover:underline transition-all duration-300"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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
              className="px-5 w-72"
              endIcon={<ArrowRight />}
            >
              {buttonSettings.title || t('home.caseStudies.cta', 'View All Case Studies')}
            </GradientButton>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection; 