import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { services, testimonials, clientLogos } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';
import { 
  usePageContent, 
  useServices, 
  useTestimonials, 
  useDynamicHeroContent 
} from '@/hooks/useStrapiContent';

// Import company logo for service slider
import IVarseLogo from '@assets/I-VARSELogo3@3x.png';

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
  Code,
  LayoutGrid,
  Sparkles,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Zap,
  Database,
  Smartphone,
  Globe,
  Shield
} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');
  
  // Fetch dynamic hero content
  const { heroContents, isLoading: isHeroLoading } = useDynamicHeroContent();
  
  // Fetch services from Strapi
  const { data: apiServices, isLoading: isServicesLoading } = useServices();
  
  // Fetch testimonials from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();

  // Create service slides with fallback to local data if API fails
  const serviceSlides = isServicesLoading 
    ? services.slice(0, 5) 
    : (apiServices?.length ? apiServices : services).slice(0, 5);
  
  // Service slide icons (for services that don't have icons from API)
  const serviceIcons = [
    <Database className="h-12 w-12 text-blue-500" />,
    <Globe className="h-12 w-12 text-indigo-500" />,
    <Smartphone className="h-12 w-12 text-cyan-500" />,
    <Shield className="h-12 w-12 text-purple-500" />,
    <Zap className="h-12 w-12 text-blue-500" />
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] pt-12 pb-20 md:pt-16 md:pb-24 lg:py-24 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        {/* Tech-inspired background elements - Enhanced with more icons */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30 animate-pulse-slow" />
          
          {/* Enhanced tech pattern with more icons */}
          <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
            <CircuitBoard className="absolute right-0 top-0 h-64 w-64 text-blue-800 opacity-30 transform rotate-12 animate-float" style={{ animationDelay: '1s' }} />
            <Cpu className="absolute left-10 bottom-10 h-48 w-48 text-indigo-700 opacity-30 transform -rotate-12 animate-float" style={{ animationDelay: '2s' }} />
            <Code className="absolute right-1/4 bottom-1/4 h-56 w-56 text-cyan-700 opacity-20 transform rotate-45 animate-float" style={{ animationDelay: '0s' }} />
            <LayoutGrid className="absolute left-1/4 top-1/3 h-40 w-40 text-blue-600 opacity-25 transform -rotate-6 animate-float" style={{ animationDelay: '1.5s' }} />
            <Sparkles className="absolute left-10 top-10 h-32 w-32 text-purple-600 opacity-20 animate-pulse-light" />
          </div>

          {/* Animated tech scan line */}
          <div className="tech-scan-line"></div>
          
          {/* Animated network connections */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-10 dark:opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="20" r="2" className="text-blue-500 fill-current animate-pulse-light" />
            <circle cx="80" cy="30" r="2" className="text-cyan-500 fill-current animate-pulse-light" style={{ animationDelay: '0.5s' }} />
            <circle cx="50" cy="70" r="2" className="text-indigo-500 fill-current animate-pulse-light" style={{ animationDelay: '1s' }} />
            <circle cx="30" cy="80" r="2" className="text-purple-500 fill-current animate-pulse-light" style={{ animationDelay: '1.5s' }} />
            <circle cx="70" cy="60" r="2" className="text-blue-500 fill-current animate-pulse-light" style={{ animationDelay: '2s' }} />
            
            <line x1="20" y1="20" x2="80" y2="30" className="text-blue-500 stroke-current opacity-50" strokeWidth="0.2" />
            <line x1="80" y1="30" x2="50" y2="70" className="text-cyan-500 stroke-current opacity-50" strokeWidth="0.2" />
            <line x1="50" y1="70" x2="30" y2="80" className="text-indigo-500 stroke-current opacity-50" strokeWidth="0.2" />
            <line x1="30" y1="80" x2="70" y2="60" className="text-purple-500 stroke-current opacity-50" strokeWidth="0.2" />
            <line x1="70" y1="60" x2="20" y2="20" className="text-blue-500 stroke-current opacity-50" strokeWidth="0.2" />
          </svg>
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Mobile Header (Shows above the slider on mobile) */}
            <div className="block lg:hidden w-full mb-4">
              {isPageLoading ? (
                <div className="space-y-3">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                    Digital Innovation
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 text-blue-600 dark:text-blue-400 relative z-10 transition-opacity duration-700">
                    {isHeroLoading 
                      ? 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'
                      : heroContents[currentHeroIndex]?.title || 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'
                    }
                  </h1>
                </>
              )}
            </div>
            
            {/* Left column - Content (Shows second on mobile, first on desktop) */}
            <div className="order-2 lg:order-1">
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
                      <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                        Digital Innovation
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-2 text-blue-600 dark:text-blue-400 relative z-10 transition-opacity duration-700">
                        {isHeroLoading 
                          ? 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'
                          : heroContents[currentHeroIndex]?.title || 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'
                        }
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
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 lg:pr-10 hidden md:block transition-opacity duration-700">
                    {isHeroLoading 
                      ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                      : heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                    }
                  </p>
                )}
                
                {/* Desktop-only buttons */}
                <div className="pt-4 flex-col sm:flex-row gap-4 hidden md:flex">
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"} 
                    size="lg" 
                    endIcon={<ChevronRight />} 
                    className="sm:w-auto py-3 animate-snowfall" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                  </GradientButton>
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"} 
                    variant="outline" 
                    size="lg" 
                    className="sm:w-auto py-3" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                  </GradientButton>
                </div>
              </div>
            </div>
            
            {/* Right column - Service Slider (Shows first on both mobile and desktop) */}
            <div className="order-1 lg:order-2">
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
                          
                          {/* Current service overlay content - flush with top right corner */}
                          <div className="absolute top-0 right-0 z-20 p-2 bg-black/30 backdrop-blur-sm rounded-bl-md inline-flex items-center">
                            {serviceSlides.map((service, index) => (
                              <div 
                                key={service.id || index}
                                className={`transition-opacity duration-500 flex items-center ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                              >
                                <div className="flex items-center">
                                  <span className="text-xs">{serviceIcons[index % serviceIcons.length]}</span>
                                  <h3 className="text-xs font-medium ml-1.5 text-white">
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
            <div className="w-full block md:hidden lg:hidden order-3 mt-12 space-y-8 mobile-space-y staggered-fade-in">
              {isPageLoading ? (
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 transition-opacity duration-700">
                  {isHeroLoading 
                    ? 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                    : heroContents[currentHeroIndex]?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
                  }
                </p>
              )}
              
              <div className="pt-4 flex flex-col gap-4 w-full">
                <GradientButton 
                  href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"} 
                  size="default" 
                  endIcon={<ChevronRight />} 
                  className="w-full py-4 justify-center animate-snowfall" 
                  fullWidth
                >
                  {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                </GradientButton>
                <GradientButton 
                  href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"} 
                  variant="outline" 
                  size="default" 
                  className="w-full py-4 justify-center" 
                  fullWidth
                >
                  {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="card p-8 md:p-10 lg:p-12 relative overflow-hidden group animate-fade-in shadow-lg">
            {/* Tech pattern background - Enhanced */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden">
              <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
              <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
              <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
              <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
              <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
            </div>
            
            {/* Scan line */}
            <div className="tech-scan-line"></div>
            
            {/* Animated network connections */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-5 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="10" cy="10" r="1" className="text-blue-500 fill-current animate-pulse-light" />
              <circle cx="90" cy="20" r="1" className="text-cyan-500 fill-current animate-pulse-light" style={{ animationDelay: '0.5s' }} />
              <circle cx="50" cy="50" r="1" className="text-indigo-500 fill-current animate-pulse-light" style={{ animationDelay: '1s' }} />
              <circle cx="20" cy="80" r="1" className="text-purple-500 fill-current animate-pulse-light" style={{ animationDelay: '1.5s' }} />
              <circle cx="80" cy="70" r="1" className="text-blue-500 fill-current animate-pulse-light" style={{ animationDelay: '2s' }} />
              
              <line x1="10" y1="10" x2="90" y2="20" className="text-blue-500 stroke-current" strokeWidth="0.1" />
              <line x1="90" y1="20" x2="50" y2="50" className="text-cyan-500 stroke-current" strokeWidth="0.1" />
              <line x1="50" y1="50" x2="20" y2="80" className="text-indigo-500 stroke-current" strokeWidth="0.1" />
              <line x1="20" y1="80" x2="80" y2="70" className="text-purple-500 stroke-current" strokeWidth="0.1" />
              <line x1="80" y1="70" x2="10" y2="10" className="text-blue-500 stroke-current" strokeWidth="0.1" />
            </svg>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 relative z-10">
              <div className="md:w-1/2 space-y-6 animate-fade-in">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                  Core Competencies
                </div>
                <h2 className="heading-md mb-6 text-blue-600 dark:text-blue-400">SPECIALIZATIONS IN<br />SERVICE OPERATIONS</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.
                </p>
                <a href="/services" className="button-spec group text-lg">
                  <span>View All Services</span>
                  <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.1s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-100 dark:shadow-blue-900/10">
                      <span className="font-bold text-lg">01</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Web Development</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Custom websites and web applications with modern technologies</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-100 dark:shadow-indigo-900/10">
                      <span className="font-bold text-lg">02</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Mobile Apps</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Cross-platform mobile applications for Android and iOS</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.3s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center mb-4 shadow-md shadow-cyan-100 dark:shadow-cyan-900/10">
                      <span className="font-bold text-lg">03</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Cloud Solutions</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Scalable and secure cloud infrastructure deployment</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.4s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center mb-4 shadow-md shadow-purple-100 dark:shadow-purple-900/10">
                      <span className="font-bold text-lg">04</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">AI Solutions</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Custom AI integrations for business automation</p>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="absolute left-0 right-0 h-px bg-blue-500/20 dark:bg-blue-400/10" style={{ top: `${(i+1) * 16}%` }}></div>
                <div className="absolute top-0 bottom-0 w-px bg-blue-500/20 dark:bg-blue-400/10" style={{ left: `${(i+1) * 16}%` }}></div>
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
                    Founded in 2018, I-VARSE Limited has been at the forefront of digital innovation in Nigeria, providing cutting-edge technology solutions to businesses across various sectors.
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
      
      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-blue-50/50 dark:bg-blue-950/30 relative overflow-hidden">
        {/* Background tech pattern - Enhanced */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          <Sparkles className="absolute right-10 top-20 h-64 w-64 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-slower" />
          <Cpu className="absolute left-20 top-40 h-40 w-40 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
          <CircuitBoard className="absolute right-1/4 bottom-20 h-56 w-56 text-purple-400 dark:text-purple-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />
          <Code className="absolute left-1/3 bottom-1/3 h-48 w-48 text-cyan-400 dark:text-cyan-600 opacity-25 transform -rotate-6 animate-pulse-slower" />
          <LayoutGrid className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
          
          {/* Grid lines */}
          <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          
          {/* Animated tech scan line */}
          <div className="tech-scan-line" style={{ animationDelay: '2s' }}></div>
          
          {/* Multiple grid dots */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {[...Array(15)].map((_, i) => (
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
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Our Services
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">SERVICE OFFERINGS</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our comprehensive range of digital solutions designed to help businesses thrive in the digital age. Each service is tailored to meet your specific needs and goals.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading placeholders
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-64 flex flex-col">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-2"></div>
                  <div className="mt-auto h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              (apiServices || services).slice(0, 6).map((service, index) => (
                <div key={service.id || index} style={{ animationDelay: `${0.1 * index}s` }}>
                  <ServiceCard service={service} />
                </div>
              ))
            )}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <GradientButton href="/services" className="px-10">
              View All Services
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
    </>
  );
};

export default Home;