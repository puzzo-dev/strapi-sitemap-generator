import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp } from '@/lib/animations';
import {
  CircuitBoard,
  Database,
  Code,
  Zap,
  ShieldCheck,
  Cpu,
  PieChart,
  Target,
  Award,
  ArrowRight
} from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

interface ProductsTechnologiesSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsTechnologiesSection: React.FC<ProductsTechnologiesSectionProps> = ({ 
  pageContent, 
  isLoading = false 
}) => {
  const { t } = useTranslation();
  
  // Get custom section from page content
  const customSection = pageContent?.sections?.find(s => s.type === 'custom');

  return (
    <motion.div
      variants={fadeInUp(30, 0.7, 0.3)}
      className="content-section pb-20 pt-1 bg-gray-50 dark:bg-[#0a1929]"
    >
      <div className="container-custom">
        <motion.div
          variants={fadeInUp(20, 0.6)}
          className="container-custom text-center mb-5"
        >
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            🔧 Technologies
          </div>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-2">{customSection?.title || t('products.technologiesTitle') || uiLabels.products.technologiesTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {customSection?.subtitle || t('products.technologiesSubtitle') || uiLabels.products.technologiesSubtitle}
          </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay: 0.2 }
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left column - Enterprise Hub Technologies */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <Card className="p-8 relative overflow-hidden group">
              <CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">Enterprise Hub Technologies</h3>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Cloud-Native Architecture</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Built on Kubernetes for maximum scalability and resilience
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Microservices Architecture</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Independent services for improved reliability and faster innovation
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Real-Time Processing</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Event-driven architecture for instant data processing and updates
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Advanced Security</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          End-to-end encryption and OAuth2 authentication protocols
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Cpu className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">AI Integration</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Machine learning models for predictive analytics and automation
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <GradientButton href="/products/1" size="sm">
                      {getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}
                    </GradientButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right column - Analytics Suite Technologies */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <Card className="p-8 relative overflow-hidden group">
              <CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 opacity-50 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-300">Analytics Suite Technologies</h3>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <PieChart className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Data Visualization Engine</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Interactive dashboards with customizable widgets and charts
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Database className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">BigData Processing</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Distributed processing for handling large datasets efficiently
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Target className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Predictive Analytics</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Statistical algorithms to forecast trends and future performance
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Code className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">API Ecosystem</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          RESTful and GraphQL APIs for seamless integration with other tools
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Award className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Data Governance</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Built-in compliance tools for GDPR, HIPAA, and other regulations
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <GradientButton href="/products/2" size="sm">
                      {t('ui.learnMore') || 'Learn More'}
                    </GradientButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp(20, 0.6, 0.7)}
          className="mt-8 text-center"
        >
          <GradientButton href="/contact" size="lg" className="mx-auto" endIcon={<ArrowRight className="h-4 w-4 ml-1" />}>
            Request Custom Solution
          </GradientButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductsTechnologiesSection;