import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types';

interface ProductDetailHeroSectionProps {
  product: any;
  isLoading: boolean;
  pageContent?: PageContent;
}

const ProductDetailHeroSection: React.FC<ProductDetailHeroSectionProps> = ({
  product,
  isLoading,
  pageContent
}) => {
  // Get hero section content from pageContent
  const heroSection = pageContent?.sections?.find(s => s.type === 'hero');
  const heroContent = heroSection?.settings?.productContent?.hero;

  // Default content if not available in pageContent
  const defaultContent = {
    backButton: "Back to Products",
    badge: "Software Product",
    requestDemo: "Request Demo",
    liveDemo: "Live Demo"
  };

  const content = heroContent || defaultContent;

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-[#0a192f] dark:to-[#132f4c] py-20 md:py-28 border-b border-blue-100/50 dark:border-blue-900/30">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/30 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20 animate-pulse-slower" />
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200/50 dark:border-blue-800/30 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200/50 dark:border-blue-800/30 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10 max-w-8xl">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="animate-pulse space-y-8 w-full max-w-4xl">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto"></div>
              <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded-full w-32 mx-auto"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl mx-auto"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-40"></div>
                <div className="h-12 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-[#0a192f] dark:to-[#132f4c] py-20 md:py-28 border-b border-blue-100/50 dark:border-blue-900/30">
      {/* Background Image with improved overlay */}
      {product.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          {/* Enhanced Theme-aware Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/90 to-blue-100/95 dark:from-gray-900/98 dark:via-[#0a192f]/95 dark:to-[#132f4c]/98"></div>
        </div>
      )}

      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/30 animate-pulse-slow" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20 animate-pulse-slower" />
        <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-indigo-200/20 blur-2xl dark:bg-indigo-900/20 animate-pulse" />
        <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200/50 dark:border-blue-800/30 rounded-lg rotate-12 shadow-lg"></div>
        <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200/50 dark:border-blue-800/30 rounded-full shadow-lg"></div>
        <div className="hidden lg:block absolute top-20 right-20 w-16 h-16 border border-purple-200/50 dark:border-purple-800/30 rounded-lg -rotate-12 shadow-lg"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-12 max-w-4xl mx-auto">
          {/* Back to Products Link */}
          <Link href="/solutions">
            <span className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-6 transition-all duration-300 hover:scale-105 group cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>{content.backButton}</span>
            </span>
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6 backdrop-blur-sm shadow-lg">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            {content.badge}
          </div>

          {/* Product Title */}
          <h1 className="heading-xl mb-8 leading-tight">
            {(() => {
              const title = product.title;
              const colonIndex = title.indexOf(':');

              if (colonIndex !== -1) {
                const firstWord = title.substring(0, colonIndex);
                const restOfTitle = title.substring(colonIndex);
                return (
                  <>
                    <span className="gradient-text">{firstWord}</span>
                    <span className="text-blue-800 dark:text-blue-200">{restOfTitle}</span>
                  </>
                );
              }

              return <span className="gradient-text">{product.title}</span>;
            })()}
          </h1>

          {/* Product Short Description */}
          {(product.shortDescription || product.description) && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed font-medium">
              {product.shortDescription || product.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton
              href="/contact?demo=true"
              size="lg"
              endIcon={<ArrowRight className="h-5 w-5" />}
              variant="default"
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              {content.requestDemo}
            </GradientButton>
            {product.demoUrl && (
              <GradientButton
                href={product.demoUrl}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                {content.liveDemo}
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailHeroSection;