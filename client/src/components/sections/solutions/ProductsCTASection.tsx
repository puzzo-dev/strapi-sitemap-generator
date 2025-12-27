import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp, staggerChildren, scaleUp } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

interface ProductsCTASectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsCTASection: React.FC<ProductsCTASectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  // Get CTA section from page content
  const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="content-section bg-blue-50 dark:bg-[#0a1929]"
    >
      <div className="container-custom max-w-8xl">
        <motion.div
          variants={scaleUp(0.95, 0.8)}
        >
          <Card className="border-2 border-blue-100 dark:border-blue-800/30 text-center relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Animated background elements */}
              <motion.div
                className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-200/30 dark:bg-blue-500/10"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 0.5,
                  transition: { duration: 1, delay: 0.2 }
                }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-purple-200/20 dark:bg-purple-500/10"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 0.5,
                  transition: { duration: 1, delay: 0.4 }
                }}
                viewport={{ once: true }}
              />

              {/* CTA Content */}
              <motion.div className="relative z-10">
                <motion.h2
                  variants={fadeInUp(20, 0.7)}
                  className="heading-lg text-blue-900 dark:text-blue-200 mb-6"
                >
                  {ctaSection?.title || t('products.ctaTitle') || uiLabels.products.ctaTitle}
                </motion.h2>
                <motion.p
                  variants={fadeInUp(20, 0.7, 0.1)}
                  className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                >
                  {ctaSection?.subtitle || t('products.ctaSubtitle') || uiLabels.products.ctaSubtitle}
                </motion.p>
                <motion.div
                  variants={staggerChildren(0.1, 0.2)}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <motion.div variants={fadeInUp(10, 0.5)}>
                    <GradientButton
                      href={ctaSection?.settings?.primaryButton?.href || "/contact"}
                      size="lg"
                      endIcon={<ArrowRight />}
                    >
                      {ctaSection?.settings?.primaryButton?.children || getTranslation(t, 'ui.requestDemo', uiLabels.requestDemo)}
                    </GradientButton>
                  </motion.div>
                  <motion.div variants={fadeInUp(10, 0.5, 0.1)}>
                    <GradientButton
                      href={ctaSection?.settings?.secondaryButton?.href || "/blog"}
                      variant="outline"
                      size="lg"
                    >
                      {ctaSection?.settings?.secondaryButton?.children || getTranslation(t, 'ui.readSuccessStories', uiLabels.readSuccessStories)}
                    </GradientButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsCTASection;