import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';
import { PageSection } from '@/lib/types/core';
import { fadeInUp } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailCTASectionProps {
  service: ServiceProps;
  ctaSection?: PageSection;
  siteConfig?: any;
}

const ServiceDetailCTASection: React.FC<ServiceDetailCTASectionProps> = ({ 
  service, 
  ctaSection,
  siteConfig 
}) => {
  // Extract data from ctaSection with fallbacks
  const title = ctaSection?.title || `Ready to Get Started with ${service.title}?`;
  const subtitle = ctaSection?.subtitle || `Contact us today to discuss how our ${service.title.toLowerCase()} services can help you achieve your business goals.`;
  const primaryButton = ctaSection?.settings?.primaryButton;
  const secondaryButton = ctaSection?.settings?.secondaryButton;
  const backgroundColor = ctaSection?.backgroundColor || "bg-white dark:bg-[#132f4c]";

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className={`content-section ${backgroundColor}`}
    >
      <div className="container-custom max-w-7xl">
        <motion.div
          variants={fadeInUp()}
        >
          <Card className="gradient-bg shadow-lg text-center">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {title}
              </h2>
              <p className="text-white/90 max-w-3xl mx-auto mb-8">
                {subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {primaryButton && (
                  <GradientButton 
                    href={primaryButton.href || "/contact"} 
                    variant={primaryButton.variant as any || "light"}
                    className="border border-white/20"
                  >
                    {primaryButton.children || primaryButton.title || "Request a Consultation"}
                  </GradientButton>
                )}
                {secondaryButton && (
                  <GradientButton 
                    href={secondaryButton.href || "/contact"} 
                    variant={secondaryButton.variant as any || "light"}
                    className="border border-white/20"
                  >
                    {secondaryButton.children || secondaryButton.title || "Request Custom Quote"}
                  </GradientButton>
                )}
                {/* Fallback buttons if no buttons are provided in ctaSection */}
                {!primaryButton && !secondaryButton && (
                  <>
                    <GradientButton href="/contact" variant="light" className="border border-white/20">
                      Request a Consultation
                </GradientButton>
                    <GradientButton href="/contact" variant="light" className="border border-white/20">
                      Request Custom Quote
                </GradientButton>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceDetailCTASection;