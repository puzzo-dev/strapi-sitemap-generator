import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ProductCard from '@/components/ui/ProductCard';
import { services, testimonials, clientLogos, products } from '@/lib/data';
import { ServiceProps, TestimonialProps, ClientLogo, ProductProps } from '@/lib/types';
import { useBlogPosts } from '@/hooks/useStrapiContent';
import BlogCard from '@/components/ui/BlogCard'; // You'll need to create this component if it doesn't exist
import ModernHero from '@/components/sections/home/ModernHero';
// Import company logo for service slider
import IVarseLogo from '@assets/I-VARSELogo3@3x.png';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';
import { useLanguage } from '@/components/context/LanguageContext';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';


import {
  fadeInUp,
  staggerChildren,
  scaleUp,
  slideIn,
  gridItemAnimation,
  snowfallParticleAnimation,
  floatingShapeAnimation,
  clipPathReveal,
  textCharAnimation,
  glossyCardAnimation,
  shimmerEffect
} from '@/lib/animations';
import {
  usePageContent,
  useServices,
  useProducts,
  useTestimonials,
  useDynamicHeroContent,
  useClientLogos,
} from '@/hooks/useStrapiContent';

// Import icons
import {
  PlayCircle,
  ArrowRight,
  ChevronRight,
  Info as InfoIcon,
  CircleOff,
  CircleDot,
  Cpu,
  CircuitBoard,
  Cloud,
  Layers,
  Code,
  LayoutGrid,
  Sparkles,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Server,
  Zap,
  Database,
  Smartphone,
  Globe,
  Shield,
  Package
} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [showModernHero, setShowModernHero] = useState(false);

  // SEO optimization helpers
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');

  // Fetch dynamic hero content
  const { heroContents, isLoading: isHeroLoading } = useDynamicHeroContent();

  // Fetch services from Strapi
  const { data: apiServices, isLoading: isServicesLoading } = useServices();

  const { data: apiProducts, isLoading: isProductsLoading } = useProducts();

  // Fetch testimonials from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();

  // Fetch client logos from Strapi
  const { data: apiClientLogos, isLoading: isClientLogosLoading } = useClientLogos();

  // Fetch recent blog posts from Strapi (limit to 3)
  const { data: recentBlogPosts, isLoading: isBlogPostsLoading } = useBlogPosts({
    limit: 3,
    // featured: true
  });


  // Create service slides with fallback to local data if API fails
  const serviceSlides = isServicesLoading
    ? services.slice(0, 5)
    : (apiServices?.length ? apiServices : services).slice(0, 5);

  // Service slide indicators (simple dots with different colors)
  const serviceIcons = [
    <div className="w-2 h-2 rounded-full bg-blue-500"></div>,
    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>,
    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>,
    <div className="w-2 h-2 rounded-full bg-purple-500"></div>,
    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
  ];

  // Dummy service images for the slides
  const serviceImages = [
    // High-quality immersive tech image for Digital Solutions
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    // Modern app development with code projection
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    // Futuristic data center for Cloud Solutions 
    "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    // AI and machine learning visualization
    "https://images.unsplash.com/photo-1677442135131-4668bd807267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    // Cybersecurity concept with digital lock
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === serviceSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? serviceSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-rotate slides
  useEffect(() => {
    if (!autoplayEnabled) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, autoplayEnabled]);

  // Auto-rotate hero content for more dynamic feel
  useEffect(() => {
    // If we only have one hero content or loading, don't rotate
    if (heroContents.length <= 1) return;

    // Rotate hero content every 7 seconds (slightly slower than service slides)
    const timer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroContents.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [heroContents]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplayEnabled(false);
  const handleMouseLeave = () => setAutoplayEnabled(true);

  // Prepare SEO metadata
  const pageTitle = isHeroLoading
    ? 'I-VARSE Technologies - Innovative Digital Solutions'
    : generateSeoTitle(heroContents[currentHeroIndex]?.title || 'I-VARSE Technologies - Innovative Digital Solutions');

  const pageDescription = isHeroLoading
    ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
    : generateSeoDescription(heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.');

  // Generate structured data
  const structuredData = {
    ...generateWebsiteSchema(),
    ...generateOrganizationSchema()
  };

  return (

    <>
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setShowModernHero(!showModernHero)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2"
        >
          <span>{showModernHero ? 'Show Original Hero' : 'Show Modern Hero'}</span>
          <Zap className="h-4 w-4" />
        </button>
      </div>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://itechnologies.ng"
        ogImage="https://itechnologies.ng/og-image.jpg"
        ogUrl="https://itechnologies.ng"
        ogType="website"
        twitterCard="summary_large_image"
        alternateLanguages={[
          { lang: 'en', url: 'https://itechnologies.ng' },
          { lang: 'yo', url: 'https://itechnologies.ng/yo' },
          { lang: 'ig', url: 'https://itechnologies.ng/ig' },
          { lang: 'ha', url: 'https://itechnologies.ng/ha' },
          { lang: 'fr', url: 'https://itechnologies.ng/fr' },
          { lang: 'es', url: 'https://itechnologies.ng/es' },
          { lang: 'sw', url: 'https://itechnologies.ng/sw' }
        ]}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      {showModernHero ? (
        <ModernHero
          title={isHeroLoading
            ? 'Innovative Digital Solutions'
            : heroContents[currentHeroIndex]?.title || 'Innovative Digital Solutions'
          }
          subtitle={isHeroLoading
            ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
            : heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
          }
          primaryButtonText={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
          primaryButtonUrl={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"}
          secondaryButtonText={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
          secondaryButtonUrl={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"}
          isLoading={isPageLoading || isHeroLoading}
          serviceSlides={serviceSlides}
          serviceImages={serviceImages}
          serviceIcons={serviceIcons}
          currentSlide={currentSlide}
          companyLogo={IVarseLogo}
        />
      ) : (
        <motion.section
          initial="initial"
          animate="animate"
          className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-12 md:pt-18 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
        >
          {/* Tech-inspired background elements - Enhanced with more icons */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <motion.div
              variants={scaleUp(0.8, 1.5, 0.2)}
              className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 pointer-events-none"
            />
            <motion.div
              variants={scaleUp(0.8, 1.8, 0.5)}
              className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 pointer-events-none"
            />
            <motion.div
              variants={scaleUp(0.8, 2, 0.8)}
              className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30 pointer-events-none"
            />

            {/* Enhanced tech pattern with more icons */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 0.3,
                  y: 0,
                  rotate: 12,
                  transition: {
                    duration: 0.8,
                    delay: 0.3
                  }
                }}
                className="absolute right-0 top-0"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0, 10, 0],
                    rotate: [12, 15, 10, 13, 12],
                    transition: {
                      repeat: Infinity,
                      duration: 10,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <CircuitBoard className="h-64 w-64 text-blue-800" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 0.3,
                  y: 0,
                  rotate: -12,
                  transition: {
                    duration: 0.8,
                    delay: 0.5
                  }
                }}
                className="absolute left-10 bottom-10"
              >
                <motion.div
                  animate={{
                    y: [0, 10, 0, -15, 0],
                    rotate: [-12, -9, -14, -10, -12],
                    transition: {
                      repeat: Infinity,
                      duration: 12,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Cpu className="h-48 w-48 text-indigo-700" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 0.2,
                  y: 0,
                  rotate: 45,
                  transition: {
                    duration: 0.8,
                    delay: 0.7
                  }
                }}
                className="absolute right-1/4 bottom-1/4"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 5, -5, 0],
                    rotate: [45, 48, 43, 46, 45],
                    transition: {
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Code className="h-56 w-56 text-cyan-700" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 0.25,
                  y: 0,
                  rotate: -6,
                  transition: {
                    duration: 0.8,
                    delay: 0.9
                  }
                }}
                className="absolute left-1/4 top-1/3"
              >
                <motion.div
                  animate={{
                    y: [0, 5, -5, 10, 0],
                    rotate: [-6, -4, -8, -3, -6],
                    transition: {
                      repeat: Infinity,
                      duration: 9,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <LayoutGrid className="h-40 w-40 text-blue-600" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.2,
                  scale: 1,
                  transition: {
                    duration: 1,
                    delay: 1.1
                  }
                }}
                className="absolute left-10 top-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 0.98, 1.02, 1],
                    opacity: [0.2, 0.3, 0.2, 0.25, 0.2],
                    transition: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Sparkles className="h-32 w-32 text-purple-600" />
                </motion.div>
              </motion.div>
            </div>

            {/* Animated tech scan line */}
            <motion.div
              initial={{ opacity: 0, top: '100%' }}
              animate={{
                opacity: [0, 0.6, 0.1],
                top: ['100%', '0%', '0%'],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5
                }
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
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

            {/* Animated network connections */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-10 dark:opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.circle
                cx="20" cy="20" r="2"
                className="text-blue-500 fill-current"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: 1,
                  r: [0, 2, 1.5, 2],
                  transition: {
                    duration: 3,
                    delay: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    times: [0, 0.3, 0.8, 1]
                  }
                }}
              />
              <motion.circle
                cx="80" cy="30" r="2"
                className="text-cyan-500 fill-current"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: 1,
                  r: [0, 2, 1.5, 2],
                  transition: {
                    duration: 3,
                    delay: 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    times: [0, 0.3, 0.8, 1]
                  }
                }}
              />
              <motion.circle
                cx="50" cy="70" r="2"
                className="text-indigo-500 fill-current"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: 1,
                  r: [0, 2, 1.5, 2],
                  transition: {
                    duration: 3,
                    delay: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    times: [0, 0.3, 0.8, 1]
                  }
                }}
              />
              <motion.circle
                cx="30" cy="80" r="2"
                className="text-purple-500 fill-current"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: 1,
                  r: [0, 2, 1.5, 2],
                  transition: {
                    duration: 3,
                    delay: 1.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    times: [0, 0.3, 0.8, 1]
                  }
                }}
              />
              <motion.circle
                cx="70" cy="60" r="2"
                className="text-blue-500 fill-current"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: 1,
                  r: [0, 2, 1.5, 2],
                  transition: {
                    duration: 3,
                    delay: 2.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    times: [0, 0.3, 0.8, 1]
                  }
                }}
              />

              <motion.line
                x1="20" y1="20" x2="80" y2="30"
                className="text-blue-500 stroke-current"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{
                  opacity: 0.5,
                  strokeWidth: 0.2,
                  pathLength: [0, 1],
                  transition: {
                    duration: 2,
                    delay: 0.5,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.line
                x1="80" y1="30" x2="50" y2="70"
                className="text-cyan-500 stroke-current"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{
                  opacity: 0.5,
                  strokeWidth: 0.2,
                  pathLength: [0, 1],
                  transition: {
                    duration: 2,
                    delay: 1,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.line
                x1="50" y1="70" x2="30" y2="80"
                className="text-indigo-500 stroke-current"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{
                  opacity: 0.5,
                  strokeWidth: 0.2,
                  pathLength: [0, 1],
                  transition: {
                    duration: 2,
                    delay: 1.5,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.line
                x1="30" y1="80" x2="70" y2="60"
                className="text-purple-500 stroke-current"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{
                  opacity: 0.5,
                  strokeWidth: 0.2,
                  pathLength: [0, 1],
                  transition: {
                    duration: 2,
                    delay: 2,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.line
                x1="70" y1="60" x2="20" y2="20"
                className="text-blue-500 stroke-current"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{
                  opacity: 0.5,
                  strokeWidth: 0.2,
                  pathLength: [0, 1],
                  transition: {
                    duration: 2,
                    delay: 2.5,
                    ease: "easeInOut"
                  }
                }}
              />
            </svg>
          </div>

          <div className="container-custom relative z-20 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative">
              {/* Mobile Header (Shows above the slider on mobile) */}
              <div className="block lg:hidden w-full mb-4">
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                      <Cpu className="h-4 w-4 mr-2" />
                      Digital Innovation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <span className="gradient-text">Innovative Digital</span> Solutions<br />for Modern Businesses
                    </h1>
                  </>
                )}
              </div>

              {/* Left column - Content (Shows second on mobile, first on desktop) */}
              <div className="order-2 lg:order-1 z-10 relative">
                <div className="space-y-6 md:space-y-8">
                  {/* Desktop-only heading - hidden on mobile */}
                  <div className="hidden lg:block">
                    {isPageLoading ? (
                      <div className="space-y-3">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                      </div>
                    ) : (
                      <>
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                          <Cpu className="h-4 w-4 mr-2" />
                          Digital Innovation
                        </div>
                        <h1 className="heading-xl text-5xl md:text-6xl font-black mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                          <span className="gradient-text">Innovative Digital</span> Solutions<br />for Modern Businesses
                        </h1>
                      </>
                    )}
                  </div>

                  {/* Always visible subtitle */}
                  {isPageLoading ? (
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    </div>
                  ) : (
                    <p className="text-xl text-gray-600 dark:text-gray-300 lg:pr-10 hidden md:block mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      {isHeroLoading
                        ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                        : heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                      }
                    </p>
                  )}

                  {/* Desktop-only buttons */}
                  <div className="pt-4 md:flex-row gap-4 hidden md:flex">
                    <GradientButton
                      href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"}
                      size="lg"
                      endIcon={<ChevronRight />}
                      className="w-auto py-3 animate-snowfall z-10"
                    >
                      {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                    </GradientButton>
                    <GradientButton
                      href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"}
                      variant="outline"
                      size="lg"
                      className="w-auto py-3 z-10"
                    >
                      {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                    </GradientButton>
                  </div>
                </div>
              </div>

              {/* Right column - Service Slider (Shows first on both mobile and desktop) */}
              <div className="order-1 md:order-2">
                <div
                  className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/10 fade-in-slide"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Service slider container */}
                  <div className="relative h-full w-full border border-blue-200 dark:border-blue-800 rounded-xl bg-white/80 dark:bg-gray-900/80 p-3">
                    {/* Main content area with tech corners and animated backdrop */}
                    <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 rounded-lg overflow-hidden">
                      {/* Tech corners */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>

                      {/* Animated background tech elements */}
                      <div className="absolute inset-0 pointer-events-none z-0">
                        <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300/30 dark:text-blue-700/30 animate-float" />
                        <Cpu className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300/30 dark:text-indigo-700/30 animate-float" style={{ animationDelay: '1s' }} />

                        {/* Animated dots & lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <circle cx="20" cy="20" r="1" className="text-blue-400 fill-current animate-pulse-light" />
                          <circle cx="80" cy="30" r="1" className="text-cyan-400 fill-current animate-pulse-light" style={{ animationDelay: '0.5s' }} />
                          <circle cx="50" cy="70" r="1" className="text-indigo-400 fill-current animate-pulse-light" style={{ animationDelay: '1s' }} />
                          <circle cx="30" cy="80" r="1" className="text-purple-400 fill-current animate-pulse-light" style={{ animationDelay: '1.5s' }} />
                          <circle cx="70" cy="60" r="1" className="text-blue-400 fill-current animate-pulse-light" style={{ animationDelay: '2s' }} />

                          <line x1="20" y1="20" x2="80" y2="30" className="text-blue-400 stroke-current" strokeWidth="0.2" />
                          <line x1="80" y1="30" x2="50" y2="70" className="text-cyan-400 stroke-current" strokeWidth="0.2" />
                          <line x1="50" y1="70" x2="30" y2="80" className="text-indigo-400 stroke-current" strokeWidth="0.2" />
                          <line x1="30" y1="80" x2="70" y2="60" className="text-purple-400 stroke-current" strokeWidth="0.2" />
                          <line x1="70" y1="60" x2="20" y2="20" className="text-blue-400 stroke-current" strokeWidth="0.2" />
                        </svg>
                      </div>

                      {/* Service Slides Container - Original Design */}
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {isServicesLoading ? (
                          // Loading state
                          <div className="flex items-center justify-center h-full">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            {/* Main image with gradient overlay */}
                            <div className="absolute inset-0 z-10">
                              {serviceSlides.map((service, index) => (
                                <div
                                  key={service.id || index}
                                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                  <img
                                    src={service.image || serviceImages[index % serviceImages.length]}
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-40 dark:opacity-30"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/20 dark:from-blue-900/50 dark:to-indigo-900/40"></div>
                                </div>
                              ))}
                            </div>

                            {/* Company logo */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 dark:opacity-20">
                              <img
                                src={IVarseLogo}
                                alt="I-VARSE Technologies"
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Current service overlay content - super tiny in top right */}
                            <div className="absolute top-0 right-0 z-20 py-0.5 px-1 bg-black/30 backdrop-blur-sm rounded-bl-md inline-flex items-center">
                              {serviceSlides.map((service, index) => (
                                <div
                                  key={service.id || index}
                                  className={`transition-opacity duration-500 flex items-center ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                                >
                                  <div className="flex items-center">
                                    <span className="flex items-center justify-center mr-1.5">{serviceIcons[index % serviceIcons.length]}</span>
                                    <h3 className="text-[11px] font-medium text-white whitespace-nowrap">
                                      {service.title}
                                    </h3>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Animated tech elements */}
                            <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300 dark:text-blue-700 opacity-30 animate-float" />
                            <Cpu className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300 dark:text-indigo-700 opacity-30 animate-float" style={{ animationDelay: '1s' }} />

                            {/* Animated dots & lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <circle cx="20" cy="20" r="1" className="text-blue-400 fill-current animate-pulse-light" />
                              <circle cx="80" cy="30" r="1" className="text-cyan-400 fill-current animate-pulse-light" style={{ animationDelay: '0.5s' }} />
                              <circle cx="50" cy="70" r="1" className="text-indigo-400 fill-current animate-pulse-light" style={{ animationDelay: '1s' }} />
                              <circle cx="30" cy="80" r="1" className="text-purple-400 fill-current animate-pulse-light" style={{ animationDelay: '1.5s' }} />
                              <circle cx="70" cy="60" r="1" className="text-blue-400 fill-current animate-pulse-light" style={{ animationDelay: '2s' }} />

                              <line x1="20" y1="20" x2="80" y2="30" className="text-blue-400 stroke-current" strokeWidth="0.2" />
                              <line x1="80" y1="30" x2="50" y2="70" className="text-cyan-400 stroke-current" strokeWidth="0.2" />
                              <line x1="50" y1="70" x2="30" y2="80" className="text-indigo-400 stroke-current" strokeWidth="0.2" />
                              <line x1="30" y1="80" x2="70" y2="60" className="text-purple-400 stroke-current" strokeWidth="0.2" />
                              <line x1="70" y1="60" x2="20" y2="20" className="text-blue-400 stroke-current" strokeWidth="0.2" />
                            </svg>
                          </div>
                        )}

                        {/* Navigation controls removed as requested */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-only content - Shows third on mobile, after the slideshow */}
              <div className="w-full block md:hidden lg:hidden order-3 mt-16 mb-12 space-y-8 mobile-space-y staggered-fade-in">
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : (
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {isHeroLoading
                      ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                      : heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                    }
                  </p>
                )}

                <div className="pt-6 flex flex-col gap-5 w-full">
                  <GradientButton
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"}
                    size="lg"
                    endIcon={<ChevronRight />}
                    className="w-full py-5 justify-center animate-snowfall text-lg"
                    fullWidth
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                  </GradientButton>
                  <GradientButton
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"}
                    variant="outline"
                    size="lg"
                    className="w-full py-5 justify-center text-lg"
                    fullWidth
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Specializations Section - Premium Redesign */}
      <section className="py-16 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/30 pointer-events-none"></div>

        <div className="container-custom">
          {/* Section Header with staggered animation */}
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Core Competencies
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-md mb-4 text-blue-600 dark:text-blue-400 font-bold"
            >
              <span className="relative inline-block pb-2">
                SPECIALIZATIONS IN SERVICE OPERATIONS
                <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.
            </motion.p>

          </div>

          {/* Main content with hexagonal layout */}
          <div className="relative">
            {/* Tech pattern background - Enhanced but subtle */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden pointer-events-none">
              <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
              <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
              <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
              <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
              <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
            </div>

            {/* Innovative layout with featured service in center */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 md:max-h-[700px]">
              {/* Left column - 2 services */}
              <div className="space-y-8">
                {/* Web Development */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const { data: services, isLoading, error } = useServices()
                    if (isLoading) return <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    if (error) return <div>Error loading services</div>

                    const webDev = services?.find(s => s.title.includes("WEB") || s.title.includes("Web")) || {
                      id: 1,
                      title: "Web Development",
                      description: "Custom websites and web applications",
                      icon: "fa-code"
                    }

                    return <ServiceCard service={webDev} />
                  })()}
                </motion.div>

                {/* Mobile Apps */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {(() => {
                    const { data: services, isLoading, error } = useServices()
                    if (isLoading) return <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    if (error) return <div>Error loading services</div>

                    const mobileApp = services?.find(s => s.title.includes("MOBILE") || s.title.includes("Mobile")) || {
                      id: 2,
                      title: "Mobile Apps",
                      description: "Cross-platform mobile applications for Android and iOS",
                      icon: "fa-pen"
                    }

                    return <ServiceCard service={mobileApp} />
                  })()}
                </motion.div>
              </div>

              {/* Center column - Featured service with larger card */}
              <div className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="transform md:scale-105 md:-my-2"
                >
                  {(() => {
                    const { data: services, isLoading, error } = useServices()
                    if (isLoading) return <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    if (error) return <div>Error loading services</div>

                    const erp = services?.find(s => s.title.includes("ERP") || s.title.includes("Enterprise")) || {
                      id: 5,
                      title: "ERP Solutions",
                      description: "Implementation and management of enterprise resource planning systems",
                      icon: "fa-database"
                    }

                    return <ServiceCard service={erp} />
                  })()}
                </motion.div>
              </div>

              {/* Right column - 2 services */}
              <div className="space-y-8">
                {/* Cloud Solutions */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const { data: services, isLoading, error } = useServices()
                    if (isLoading) return <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    if (error) return <div>Error loading services</div>

                    const cloud = services?.find(s => s.title.includes("CLOUD") || s.title.includes("Cloud")) || {
                      id: 3,
                      title: "Cloud Solutions",
                      description: "Scalable and secure cloud infrastructure deployment",
                      icon: "fa-server"
                    }

                    return <ServiceCard service={cloud} />
                  })()}
                </motion.div>

                {/* AI Solutions */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {(() => {
                    const { data: services, isLoading, error } = useServices()
                    if (isLoading) return <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    if (error) return <div>Error loading services</div>

                    const ai = services?.find(s => s.title.includes("AI") || s.title.includes("Artificial")) || {
                      id: 4,
                      title: "AI Solutions",
                      description: "Custom AI integrations",
                      icon: "fa-chart"
                    }

                    return <ServiceCard service={ai} />
                  })()}
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6"
            >
              <GradientButton href="/services" className="px-10 w-56 mx-auto" endIcon={<ArrowRight />} >
                Get Started
              </GradientButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video and About Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background tech pattern for about section */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          {/* Tech elements */}
          <Code className="absolute left-10 top-20 h-40 w-40 text-blue-400 dark:text-blue-600 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
          <LayoutGrid className="absolute right-20 top-10 h-32 w-32 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower" />
          <Cpu className="absolute right-1/3 bottom-20 h-36 w-36 text-indigo-400 dark:text-indigo-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />

          {/* Tech scan line */}
          <div className="tech-scan-line" style={{ animationDelay: '3s' }}></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="contents">
                <div className="absolute left-0 right-0 h-px bg-blue-500/20 dark:bg-blue-400/10" style={{ top: `${(i + 1) * 16}%` }}></div>
                <div className="absolute top-0 bottom-0 w-px bg-blue-500/20 dark:bg-blue-400/10" style={{ left: `${(i + 1) * 16}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Section Title */}
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse-slow"></span>
                    Who We Are
                  </div>
                  <h2 className="heading-md text-blue-600 dark:text-blue-400 mt-2">About I-VARSE</h2>
                </div>

                {/* About Content */}
                <div className="text-gray-600 dark:text-gray-300 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <p>
                    Founded in 2018, I-VARSE Technologies has been at the forefront of digital innovation in Nigeria, providing cutting-edge technology solutions to businesses across various sectors.
                  </p>
                  <p>
                    Our mission is to empower businesses with transformative digital solutions that drive growth, efficiency, and competitive advantage in an increasingly technology-driven world.
                  </p>

                  {/* Key Facts */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">5+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years of Experience</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">20+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative rounded-xl overflow-hidden aspect-video card border-2 border-blue-200 dark:border-blue-800/70 group">
                {/* Tech-inspired decorative elements - Enhanced */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <CircuitBoard className="absolute top-0 left-0 w-40 h-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4 animate-float" style={{ animationDelay: '0.5s' }} />
                  <Cpu className="absolute bottom-8 right-8 w-24 h-24 text-indigo-200/20 dark:text-indigo-700/20 transform rotate-12 animate-pulse-slower" />
                  <Code className="absolute top-8 right-8 w-16 h-16 text-cyan-200/20 dark:text-cyan-700/20 animate-pulse-light" />
                  <LayoutGrid className="absolute bottom-12 left-12 w-20 h-20 text-purple-200/15 dark:text-purple-700/15 animate-float" style={{ animationDelay: '1.5s' }} />

                  {/* Gradient orb */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200/20 to-transparent dark:from-blue-800/10 blur-xl animate-pulse-slow"></div>

                  {/* Circuit lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
                    <circle cx="20" cy="20" r="3" fill="currentColor" className="animate-pulse-light" />
                    <circle cx="80" cy="20" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '1s' }} />
                    <circle cx="80" cy="80" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '2s' }} />
                    <circle cx="20" cy="80" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '3s' }} />
                  </svg>
                </div>

                {/* Main video container */}
                <div className="absolute inset-3 rounded-lg overflow-hidden shadow-xl z-10 bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-900/30"></div>
                    <img
                      src="https://images.unsplash.com/photo-1642059863319-1481ad72fc2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Video: About I-VARSE"
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <button className="z-20 w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 hover:scale-110 animate-pulse-light">
                      <PlayCircle className="h-12 w-12 text-blue-600" />
                    </button>

                    {/* Video title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <div className="font-medium">Our Company Story</div>
                      <div className="text-sm text-gray-300">Learn about our mission and values</div>
                    </div>
                  </div>
                </div>

                {/* Tech corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-tl z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-tr z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-bl z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-br z-10"></div>

                {/* Dynamic highlights */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                  <div className="absolute top-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute bottom-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute left-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute right-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-1 text-blue-500" />
                  Click to watch our company introduction video
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-blue-950/20 dark:via-blue-950/30 dark:to-blue-950/40 relative overflow-hidden">
        {/* Background tech pattern - Enhanced */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
          <Sparkles className="absolute right-10 top-20 h-64 w-64 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-slower" />
          <Cpu className="absolute left-20 top-40 h-40 w-40 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
          <CircuitBoard className="absolute right-1/4 bottom-20 h-56 w-56 text-purple-400 dark:text-purple-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />
          <Code className="absolute left-1/3 bottom-1/3 h-48 w-48 text-cyan-400 dark:text-cyan-600 opacity-25 transform -rotate-6 animate-pulse-slower" />
          <Package className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
          <Database className="absolute right-1/5 top-1/4 h-32 w-32 text-green-400 dark:text-green-600 opacity-20 animate-float" style={{ animationDelay: '1.2s' }} />
          <Server className="absolute left-1/4 top-3/4 h-40 w-40 text-amber-400 dark:text-amber-600 opacity-20 animate-pulse-slower" style={{ animationDelay: '0.8s' }} />
          <Cloud className="absolute right-1/3 top-1/6 h-36 w-36 text-sky-400 dark:text-sky-600 opacity-25 animate-float" style={{ animationDelay: '1.7s' }} />
          <Layers className="absolute left-2/3 bottom-1/4 h-28 w-28 text-rose-400 dark:text-rose-600 opacity-20 transform rotate-6 animate-pulse-slower" style={{ animationDelay: '2.3s' }} />

          {/* Grid lines */}
          <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-1/3 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          <div className="absolute top-0 left-1/3 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>

          {/* Animated tech scan line */}
          <div className="tech-scan-line" style={{ animationDelay: '2s' }}></div>
          <div className="tech-scan-line-vertical" style={{ animationDelay: '3s' }}></div>

          {/* 3D effect elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-30"></div>

          {/* Multiple grid dots */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/30 dark:bg-blue-400/20 animate-pulse-light"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
              <Package className="h-4 w-4 mr-2" />
              Our Products
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">FEATURED PRODUCTS</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our range of innovative products designed to solve real business challenges and drive exceptional results for your organization.
            </p>
          </div>

          {/* Products Display */}
          <div className="space-y-16">
            {isProductsLoading ? (
              // Loading placeholders
              Array(2).fill(0).map((_, index) => (
                <div key={index} className="card animate-pulse p-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                      <div className="space-y-2">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-5 h-5 bg-gray-100 dark:bg-gray-600 rounded-full mt-1 mr-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                      <div className="space-y-2">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-5 h-5 bg-gray-100 dark:bg-gray-600 rounded-full mt-1 mr-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                  </div>
                </div>
              ))
            ) : (
              (apiProducts || products).slice(0, 2).map((product: ProductProps, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={index % 2 === 0 ? '' : 'bg-gradient-to-br from-white to-blue-50 dark:from-[#132f4c] dark:to-[#0f2744] py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 shadow-lg'}
                >
                  <ProductCard product={product} isReversed={index % 2 !== 0} />
                </motion.div>
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <GradientButton href="/products" className="px-10 w-56 mx-auto" endIcon={<ArrowRight />}>
              View All Products
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background tech pattern for testimonials */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          {/* Tech elements */}
          <Sparkles className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-light" />
          <CircuitBoard className="absolute right-10 bottom-10 h-48 w-48 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />

          {/* Decorative curved line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              className="text-blue-500 stroke-current"
              fill="none"
              strokeWidth="0.1"
            />
            <path
              d="M0,70 Q25,50 50,70 T100,70"
              className="text-indigo-500 stroke-current"
              fill="none"
              strokeWidth="0.1"
            />
          </svg>

          {/* Subtle dots */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-500/20 dark:bg-blue-400/10 animate-pulse-light"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Testimonials
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">WHAT OUR CLIENTS SAY</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Don't just take our word for it. See what our satisfied clients have to say about our services and solutions.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-64 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-2"></div>
                  <div className="mt-auto h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              (apiTestimonials || testimonials).slice(0, 3).map((testimonial, index) => (
                <div key={testimonial.id || index} style={{ animationDelay: `${0.1 * index}s` }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background tech pattern - similar to other sections */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          {/* Add tech background elements similar to other sections */}
          <Code className="absolute left-10 top-20 h-40 w-40 text-blue-400 dark:text-blue-600 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
          <LayoutGrid className="absolute right-20 top-10 h-32 w-32 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower" />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Latest Insights
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">INSIGHTS & EXPERTISE</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with the latest trends, insights, and news from our technology experts.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isBlogPostsLoading ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-96 flex flex-col">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="mt-auto h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              // Render blog posts with fallback to empty array if null
              (recentBlogPosts || []).map((post, index) => (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  {/* You'll need to create a BlogCard component */}
                  <BlogCard post={post} />
                </motion.div>
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <GradientButton href="/blog" className="px-10 w-56 mx-auto" endIcon={<ArrowRight />}>
              View All Articles
            </GradientButton>
          </div>
        </div>
      </section>


      {/* Clients Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Trusted By Industry Leaders
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We work with leading companies around the world to transform their businesses through innovative digital solutions.
            </p>
          </div>

          {/* Client Logos */}
          <div className="mt-10">
            {isClientLogosLoading ? (
              <div className="flex overflow-x-hidden overflow-y-hidden pb-4 gap-8 justify-center items-center flex-wrap">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0 mb-4"></div>
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-hidden overflow-y-hidden pb-4 gap-8 justify-center items-center flex-wrap">
                {(apiClientLogos || clientLogos).map((client, index) => (
                  <a
                    key={index}
                    href={client.url || "#"}
                    className="transition-opacity duration-300 hover:opacity-80 flex items-center justify-center flex-shrink-0 mb-4"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      src={client.image}
                      alt={client.name}

                      className="h-8 md:h-10 object-contain w-20 md:w-24 filter dark:invert dark:brightness-150 dark:contrast-75"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;