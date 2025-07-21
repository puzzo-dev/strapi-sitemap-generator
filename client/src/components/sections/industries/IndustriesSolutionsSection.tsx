import React from 'react';
import { motion } from 'framer-motion';
import { PageSection } from '@/lib/types/core';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

interface IndustriesSolutionsSectionProps extends PageSection {
  isLoading?: boolean;
}

const IndustriesSolutionsSection: React.FC<IndustriesSolutionsSectionProps> = ({
  title,
  subtitle,
  content,
  isLoading = false
}) => {
  const { t } = useTranslation();

  const solutions = [
    {
      title: 'Digital Transformation',
      description: 'Complete digital overhaul of business processes',
      icon: '🚀',
      features: ['Process Automation', 'Cloud Migration', 'Data Analytics']
    },
    {
      title: 'Custom Software Development',
      description: 'Tailored solutions for specific industry needs',
      icon: '💻',
      features: ['Web Applications', 'Mobile Apps', 'Enterprise Software']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions for data-driven decisions',
      icon: '🤖',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision']
    }
  ];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-16 md:py-24 bg-blue-50 dark:bg-blue-900/10"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp()}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
          >
            {title || 'Industry Solutions'}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={fadeInUp(0.2)}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
            >
              {subtitle}
            </motion.p>
          )}
          {content && (
            <motion.p
              variants={fadeInUp(0.4)}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {content}
            </motion.p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {solutions.map((solution, index) => (
            <Card key={index} className="p-6 shadow-lg">
              <CardContent>
                <div className="text-4xl mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-100">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustriesSolutionsSection; 