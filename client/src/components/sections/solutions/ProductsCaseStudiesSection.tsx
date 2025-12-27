import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp } from '@/lib/animations';
import { ArrowRight, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { caseStudies as allCaseStudies } from '@/lib/data/case-studies';
import { PageContent } from '@/lib/types/core';
import { uiLabels } from '@/lib/data';

interface ProductsCaseStudiesSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsCaseStudiesSection: React.FC<ProductsCaseStudiesSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get featured case studies (first 3)
  const featuredCaseStudies = allCaseStudies.filter(cs => cs.featured).slice(0, 3);

  if (isLoading) {
    return (
      <section className="content-section bg-white dark:bg-[#0f1f2e]">
        <div className="container-custom max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section bg-white dark:bg-[#0f1f2e]">
      <div className="container-custom max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            🏆 Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('products.caseStudies.title') || 'Real Results, Real Impact'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our solutions drive measurable business outcomes for organizations across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-xl">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
                  <div className="absolute inset-0 bg-black/20" />
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-semibold text-gray-900 dark:text-white rounded-full">
                      {caseStudy.industry}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {caseStudy.description}
                  </p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{caseStudy.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-3.5 w-3.5" />
                      <span>{caseStudy.teamSize} experts</span>
                    </div>
                  </div>

                  {/* Key Results - Show top 2 */}
                  <div className="space-y-2 mb-5">
                    {caseStudy.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-200 line-clamp-1">
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all group/link"
                  >
                    Read Full Story
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <GradientButton
            href="/case-studies"
            size="default"
            endIcon={<ArrowRight className="h-4 w-4 ml-1" />}
          >
            View All Case Studies
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsCaseStudiesSection; 