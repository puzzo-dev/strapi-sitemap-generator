import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GradientButton from '@/components/ui/GradientButton';
import { ProductProps } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import { ProductsSectionProps } from '@/lib/types/components';
import {
  ArrowRight,
  Sparkles,
  Cpu,
  CircuitBoard,
  Code,
  Package,
  Database,
  Server,
  Cloud,
  Layers,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getTranslation } from '@/lib/utils/translationHelpers';
import { uiLabels } from '@/lib/data';

// Loading placeholder for product cards
const ProductCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-8">
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
    </CardContent>
  </Card>
);

// Background decoration component
const BackgroundDecoration = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <Sparkles className="absolute right-10 top-20 h-64 w-64 text-blue-400 dark:text-blue-600" />
      <Cpu className="absolute left-20 top-40 h-40 w-40 text-indigo-400 dark:text-indigo-600" />
      <CircuitBoard className="absolute right-1/4 bottom-20 h-56 w-56 text-purple-400 dark:text-purple-600" />
      <Code className="absolute left-1/3 bottom-1/3 h-48 w-48 text-cyan-400 dark:text-cyan-600" />
      <Package className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600" />
      <Database className="absolute right-1/5 top-1/4 h-32 w-32 text-green-400 dark:text-green-600" />
      <Server className="absolute left-1/4 top-3/4 h-40 w-40 text-amber-400 dark:text-amber-600" />
      <Cloud className="absolute right-1/3 top-1/6 h-36 w-36 text-sky-400 dark:text-sky-600" />
      <Layers className="absolute left-2/3 bottom-1/4 h-28 w-28 text-rose-400 dark:text-rose-600" />
    </div>

    {/* Subtle grid lines */}
    <div className="absolute inset-0 opacity-8">
      <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-1/3 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"></div>
      <div className="absolute top-0 left-1/3 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent"></div>
    </div>

    {/* Subtle gradients */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-50"></div>
    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent opacity-50"></div>

    {/* Multiple grid dots */}
    <div className="absolute inset-0 opacity-[0.02] grid grid-cols-8 grid-rows-8">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-500/20 dark:bg-blue-400/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  </div>
);


const ProductsSection: React.FC<ProductsSectionProps> = ({ homePageContent, products, isLoading }) => {
  const { t } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Get products section from homePageContent
  const productsSection = homePageContent?.sections?.find((s: any) => s.type === 'products');

  // Extract section content
  const title = productsSection?.title;
  const subtitle = productsSection?.subtitle;
  const badge = productsSection?.badge;

  const settings = productsSection?.settings || {};
  const primaryButton =
    settings && typeof settings.primaryButton === 'object' &&
      'title' in settings.primaryButton && 'href' in settings.primaryButton
      ? settings.primaryButton
      : null;

  // Safely extract products from the section
  const productsData = productsSection?.settings?.featured || [];
  const productsToDisplay = useMemo(() => {
    if (!Array.isArray(productsData)) return [];

    return productsData
      .filter((product): product is ProductProps =>
        product && typeof product === 'object' && 'title' in product && 'description' in product
      )
      .slice(0, 6);
  }, [productsData]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || productsToDisplay.length === 0 || isDragging) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollPosition >= maxScroll) {
          // Reset to start
          container.scrollTo({ left: 0, behavior: 'smooth' });
          setScrollPosition(0);
        } else {
          // Scroll by card width
          const cardWidth = container.scrollWidth / productsToDisplay.length;
          const newPosition = scrollPosition + cardWidth;
          container.scrollTo({ left: newPosition, behavior: 'smooth' });
          setScrollPosition(newPosition);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, scrollPosition, productsToDisplay.length, isDragging]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / productsToDisplay.length;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - cardWidth)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + cardWidth);

      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentSlide = useMemo(() => {
    if (!scrollContainerRef.current || productsToDisplay.length === 0) return 0;
    const cardWidth = scrollContainerRef.current.scrollWidth / productsToDisplay.length;
    return Math.round(scrollPosition / cardWidth);
  }, [scrollPosition, productsToDisplay.length]);

  const showViewAllButton = productsToDisplay.length > 0 && !!primaryButton;

  return (
    <section id="products" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500"></div>
      </div>

      <div className="container-custom relative z-10 max-w-8xl">
        {/* Section Header - More compact */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
            <div className="h-px w-8 bg-blue-600 dark:bg-blue-400"></div>
            {badge}
          </div>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0047AB] dark:text-white mb-3 leading-tight">
              {title}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          {isLoading ? (
            // Loading placeholder
            <div className="flex gap-6 overflow-hidden px-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[85vw] md:w-[600px] animate-pulse">
                  <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : productsToDisplay && productsToDisplay.length > 0 ? (
            <>
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar py-2"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {productsToDisplay.map((product, index) => (
                  <motion.div
                    key={product.id || `product-${index}`}
                    className="flex-shrink-0 w-[90vw] md:w-[700px] group"
                    style={{ scrollSnapAlign: 'start' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/solutions/${product.slug}`} className="block h-full">
                      {/* Card with horizontal layout - Image left, Content right */}
                      <div className="h-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group-hover:shadow-lg flex flex-col md:flex-row">
                        {/* Image - Left side */}
                        <div className="relative w-full md:w-2/5 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Package className="h-16 w-16 text-blue-200 dark:text-blue-900 opacity-50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/30 to-transparent"></div>
                        </div>

                        {/* Content - Right side */}
                        <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                          <div className="flex-grow">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                              {product.shortDescription || product.description}
                            </p>
                          </div>

                          {/* Key Features - Bottom */}
                          {product.keyFeatures && product.keyFeatures.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {product.keyFeatures.slice(0, 3).map((feature: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
                                >
                                  {feature.length > 25 ? feature.substring(0, 25) + '...' : feature}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Hover arrow indicator */}
                          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                              <span>Learn More</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Controls & Progress Indicator - Bottom */}
              <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr] md:items-center gap-6 mt-8">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center md:justify-start gap-3 order-2 md:order-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {currentSlide + 1} / {productsToDisplay.length}
                  </span>
                  <div className="flex gap-1.5">
                    {productsToDisplay.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                          ? 'w-8 bg-blue-600 dark:bg-blue-400'
                          : 'w-1 bg-gray-300 dark:bg-gray-700'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* View All Button - Centered with controls */}
                {showViewAllButton && (
                  <div className="order-1 md:order-2 flex justify-center">
                    <GradientButton
                      size="sm"
                      className="px-4 min-w-[140px]"
                      href={typeof primaryButton?.href === 'string' ? primaryButton.href : '/'}
                    >
                      <span className="inline-flex items-center gap-2">
                        {primaryButton?.title}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </GradientButton>
                  </div>
                )}

                {/* Play/Pause & Navigation */}
                <div className="flex items-center justify-center md:justify-end gap-3 order-3">
                  <button
                    onClick={toggleAutoPlay}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleScroll('left')}
                      className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => handleScroll('right')}
                      className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile controls (single set) */}
              <div className="md:hidden mt-8 space-y-4">
                {showViewAllButton && (
                  <div className="flex justify-center">
                    <GradientButton
                      size="sm"
                      className="px-4 min-w-[140px]"
                      href={typeof primaryButton?.href === 'string' ? primaryButton.href : '/'}
                    >
                      <span className="inline-flex items-center gap-2">
                        {primaryButton?.title}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </GradientButton>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {currentSlide + 1} / {productsToDisplay.length}
                  </span>
                  <div className="flex gap-1.5">
                    {productsToDisplay.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                          ? 'w-6 bg-blue-600 dark:bg-blue-400'
                          : 'w-1 bg-gray-300 dark:bg-gray-700'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={toggleAutoPlay}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={isAutoPlaying ? "Pause" : "Play"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                  <button
                    onClick={() => handleScroll('left')}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => handleScroll('right')}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // No products fallback
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No products available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Products will be displayed here once they are available.
              </p>
            </div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </section>
  );
};

export default ProductsSection;