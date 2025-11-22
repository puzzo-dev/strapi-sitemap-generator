import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren, scaleUp } from '@/lib/animations';
import { ShieldCheck, Cpu, PieChart } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

interface ProductsBenefitsSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsBenefitsSection: React.FC<ProductsBenefitsSectionProps> = ({ 
  pageContent, 
  isLoading = false 
}) => {
  const { t } = useTranslation();
  
  // Get features section from page content
  const featuresSection = pageContent?.sections?.find(s => s.type === 'features');

  return (
    <motion.section 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="content-section bg-white dark:bg-[#132f4c]"
    >
      <div className="container-custom">
        <motion.div variants={fadeInUp()} className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {featuresSection?.badge || getTranslation(t, 'ui.whyChooseUs', uiLabels.whyChooseUs)}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">{featuresSection?.title || t('products.benefitsTitle') || uiLabels.products.benefitsTitle}</h2>
          <p className="section-subtitle">
            {featuresSection?.subtitle || t('products.benefitsSubtitle') || uiLabels.products.benefitsSubtitle}
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerChildren(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={scaleUp(0.95, 0.6, 0)}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          >
            <Card className="p-8">
              <CardContent>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                >
                  <ShieldCheck className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enterprise Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our products incorporate advanced security features to protect your business data and maintain compliance with industry standards.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={scaleUp(0.95, 0.6, 0.1)}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          >
            <Card className="p-8">
              <CardContent>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
                >
                  <Cpu className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Cutting-Edge Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leveraging the latest advancements in cloud computing, AI, and machine learning to deliver superior performance and results.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={scaleUp(0.95, 0.6, 0.2)}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          >
            <Card className="p-8">
              <CardContent>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20"
                >
                  <PieChart className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Scalable Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our products grow with your business, providing the flexibility to adapt to your evolving needs without compromising performance.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsBenefitsSection;