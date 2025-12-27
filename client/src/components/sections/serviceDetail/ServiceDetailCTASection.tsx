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
  ctaData?: any; // CTA data from Strapi block
}

const ServiceDetailCTASection: React.FC<ServiceDetailCTASectionProps> = ({
  service,
  ctaSection,
  siteConfig,
  ctaData
}) => {
  // If ctaData from block is provided, use it
  if (ctaData) {
    const title = ctaData.title;
    const content = ctaData.ctaContent;
    const buttons = ctaData.ctaButtons || [];

    return (
      <section className="relative py-20 overflow-hidden">
        {/* Gradient background with patterns - matching button gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp()}
          className="container-custom max-w-4xl relative z-10"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              {content}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {buttons.map((button: any, index: number) => {
                const isExternal = button.linkType === 'external';
                const href = isExternal ? button.externalUrl : `/${button.page?.slug || ''}`;

                return (
                  <GradientButton
                    key={index}
                    variant={index === 0 ? 'light' : 'light'}
                    size="lg"
                    href={href}
                    className={index === 0
                      ? "min-w-[200px] bg-white text-blue-600 hover:bg-white/90 border-none shadow-lg"
                      : "min-w-[200px] bg-white/10 text-white border-2 border-white/50 hover:bg-white/20 hover:border-white backdrop-blur-sm"
                    }
                  >
                    {button.label}
                  </GradientButton>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return null;
};

export default ServiceDetailCTASection;