import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ProductCard from '@/components/ui/ProductCard';
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
  Layers
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
);


const ProductsSection: React.FC<ProductsSectionProps> = ({ homePageContent, products, isLoading }) => {
  const { t } = useTranslation();

  // Get products section from homePageContent
  const productsSection = homePageContent?.sections?.find((s: any) => s.type === 'products');

  // Extract section content
  const title = productsSection?.title;
  const subtitle = productsSection?.subtitle;
  const badge = productsSection?.badge;

  const settings = productsSection?.settings || {};

  // Safely extract products from the section
  const productsData = productsSection?.settings?.featured || [];
  const productsToDisplay = useMemo(() => {
    if (!Array.isArray(productsData)) return [];

    return productsData
      .filter((product): product is ProductProps =>
        product && typeof product === 'object' && 'title' in product && 'description' in product
      )
      .slice(0, 4);
  }, [productsData]);

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-blue-950/20 dark:via-blue-950/30 dark:to-blue-950/40 relative overflow-hidden">
      <BackgroundDecoration />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
            {badge}
          </div>
          <h2 className="heading-md text-blue-900 dark:text-blue-200 mb-6">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Products Display */}
        <div className="space-y-16">
          {isLoading ? (
            // Loading placeholders
            Array(2).fill(0).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : productsToDisplay && productsToDisplay.length > 0 ? (
            productsToDisplay.map((product, index) => (
              <motion.div
                key={product.id || `product-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={index % 2 === 0
                  ? ''
                  : 'bg-gradient-to-br from-white to-blue-50 dark:from-[#132f4c] dark:to-[#0f2744] py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 shadow-lg'
                }
              >
                <ProductCard
                  item={product as ProductProps}
                  isReversed={index % 2 !== 0}
                />
              </motion.div>
            ))
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

        {/* View All Button */}
        {productsToDisplay && productsToDisplay.length > 0 && settings?.primaryButton && typeof settings.primaryButton === 'object' && 'title' in settings.primaryButton && 'href' in settings.primaryButton && (
          <div className="text-center mt-12">
            <GradientButton
              href={typeof settings.primaryButton.href === 'string' ? settings.primaryButton.href : undefined}
              className="px-5 w-56 mx-auto"
              endIcon={<ArrowRight />}
            >
              {settings.primaryButton.title}
            </GradientButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;