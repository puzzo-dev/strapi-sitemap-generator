import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, ShoppingCart, Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { IndustryProps } from '@/lib/types/content';
import { IndustryDetailHeroSectionProps } from '@/lib/types/components';
import { fadeInUp, staggerChildren, floatingShapeAnimation } from '@/lib/animations';

const IndustryDetailHeroSection: React.FC<IndustryDetailHeroSectionProps> = ({ industry, isLoading }) => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Primary background with industry image overlay */}
        {industry?.image && (
          <div
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `url(${industry.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Logo theme gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2FB8FF]/20 via-transparent to-[#0047AB]/20 dark:from-[#2FB8FF]/10 dark:to-[#0047AB]/10" />

        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#2FB8FF]/30 to-[#0047AB]/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-[#0047AB]/20 to-[#2FB8FF]/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl animate-pulse"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2FB8FF 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div variants={floatingShapeAnimation(0, 1)} className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20" />
        <motion.div variants={floatingShapeAnimation(0.5, 1.2)} className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20" />
        <Building2 className="absolute top-20 left-20 h-40 w-40 text-white/10 dark:text-white/5 transform -translate-x-1/4 -translate-y-1/4 animate-float" />
        <Factory className="absolute bottom-20 right-20 h-32 w-32 text-white/10 dark:text-white/5 transform rotate-12 animate-pulse-slower" />
        <ShoppingCart className="absolute top-32 right-32 h-24 w-24 text-white/10 dark:text-white/5 animate-pulse-light" />
        <Heart className="absolute bottom-32 left-32 h-28 w-28 text-white/10 dark:text-white/5 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <motion.div variants={fadeInUp()} className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {isLoading ? (
            <>
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white mb-4 animate-pulse w-36 h-8"></div>
              <div className="h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-6 w-3/4 mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 backdrop-blur-sm rounded mb-2 w-full mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 backdrop-blur-sm rounded mb-2 w-5/6 mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 backdrop-blur-sm rounded mb-8 w-4/6 mx-auto animate-pulse"></div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center rounded-full border border-blue-200 dark:border-white/20 bg-blue-50 dark:bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-blue-700 dark:text-white mb-4 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-white mr-2 animate-pulse"></span>
                {industry?.name || 'Industry'}
              </div>
              <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {industry?.name && (
                  (() => {
                    const words = industry.name.split(' ');
                    if (words.length >= 2) {
                      const firstPart = words.slice(0, 2).join(' ');
                      const secondPart = words.slice(2).join(' ');
                      return (
                        <>
                          <span className="gradient-text">{firstPart}</span>{' '}
                          <span className="text-blue-800 dark:text-blue-200">{secondPart}</span>
                        </>
                      );
                    }
                    return <span className="gradient-text">{industry.name}</span>;
                  })()
                )}
              </h1>
              <p className="text-xl text-blue-700 dark:text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {industry?.description}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default IndustryDetailHeroSection; 