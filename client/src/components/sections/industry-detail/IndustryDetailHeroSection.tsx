import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, ShoppingCart, Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren, floatingShapeAnimation } from '@/lib/animations';

interface IndustryDetailHeroSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailHeroSection: React.FC<IndustryDetailHeroSectionProps> = ({ industry, isLoading }) => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });

  return (
    <motion.section
      ref={heroRef}
      initial="initial"
      animate={heroInView ? 'animate' : 'initial'}
      variants={staggerChildren()}
      className="relative overflow-hidden py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section min-h-[60vh] flex items-center"
      style={{
        backgroundImage: industry?.image ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${industry.image})` : 'linear-gradient(to-b, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
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
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white mb-4 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
                {industry?.name || 'Industry'}
              </div>
              <h1 className="heading-xl mb-6 animate-fade-in-up text-white" style={{ animationDelay: '0.2s' }}>
                {industry?.name && (
                  <>
                    {industry.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="gradient-text">{industry.name.split(' ').slice(-1).join(' ')}</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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