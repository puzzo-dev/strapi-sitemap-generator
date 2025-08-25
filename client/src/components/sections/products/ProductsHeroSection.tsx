import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp, staggerChildren, scaleUp } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';

interface ProductsHeroSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsHeroSection: React.FC<ProductsHeroSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  // Get hero section from page content
  const heroSection = pageContent?.sections?.find(s => s.type === 'hero');

  return (
    <motion.section
      initial="initial"
      animate="animate"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          variants={scaleUp(0.8, 1.5, 0.2)}
          className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40"
        />
        <motion.div
          variants={scaleUp(0.8, 1.8, 0.5)}
          className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30"
        />

        {/* Tech pattern elements */}
        <motion.div
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{
            rotate: 12,
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.3 }
          }}
          className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.05, 0.95, 1],
            opacity: [0, 1, 0.8, 1],
            transition: { duration: 1.2, delay: 0.5 }
          }}
          className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"
        />

        {/* Snowfall particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => {
            // Precalculate random values to avoid React errors
            const randomLeft = (i * 6.67) % 100; // Distribute evenly across width
            const randomScale = 0.5 + ((i % 5) * 0.1); // 0.5 to 0.9
            const randomDuration = 8 + ((i % 5) * 1); // 8 to 12 seconds
            const randomDelay = (i % 5) * 1; // 0 to 4 seconds

            return (
              <motion.div
                key={`snowfall-particle-${i}`}
                className="absolute h-1 w-1 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
                initial={{
                  y: -20,
                  opacity: 0,
                  scale: randomScale
                }}
                animate={{
                  y: '120%',
                  opacity: [0, 0.8, 0.5, 0],
                  transition: {
                    duration: randomDuration,
                    delay: randomDelay,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{
                  left: `${randomLeft}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerChildren(0.1)}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp(20, 0.6)}
            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
          >
            {heroSection?.badge}
          </motion.div>

          <motion.h1
            variants={fadeInUp(20, 0.7)}
            className="heading-xl mb-6"
          >
            {heroSection?.title ? (
              (() => {
                const words = heroSection.title.split(' ');
                const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : heroSection.title;

                return (
                  <>
                    <span className="text-blue-800 dark:text-blue-200">{regularWords}</span>{' '}
                    <span className="gradient-text">
                      {highlightedWords}
                    </span>
                  </>
                );
              })()
            ) : (
              <>
                <span className="gradient-text">Powerful Products</span> <span className="text-blue-800 dark:text-blue-200">for</span><br />
                <span className="text-blue-800 dark:text-blue-200">Your Business Success</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeInUp(20, 0.7, 0.3)}
            className="text-xl text-blue-700 dark:text-blue-200 mb-8"
          >
            {heroSection?.subtitle || "Unlock your business potential with our suite of powerful, innovative software solutions designed to streamline operations and drive growth."}
          </motion.p>

          <motion.div
            variants={fadeInUp(20, 0.7, 0.5)}
            className="flex flex-wrap justify-center gap-4"
          >
            <GradientButton
              href={heroSection?.settings?.primaryButton?.href || "#products"}
              size="lg"
              endIcon={<ArrowRight />}
            >
              {heroSection?.settings?.primaryButton?.children || "Explore Products"}
            </GradientButton>
            <GradientButton
              href={heroSection?.settings?.secondaryButton?.href || "/contact"}
              variant="outline"
              size="lg"
            >
              {heroSection?.settings?.secondaryButton?.children || "Request Demo"}
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsHeroSection;