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
    badge: "💻 Software Product",
    requestDemo: "Request Demo",
    liveDemo: "Live Demo"
  };

  const content = heroContent || defaultContent;

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-blue-50/20 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:py-24 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b border-blue-100 dark:border-blue-900/40">
      {/* Background Image */}
      {product.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay matching brand colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2FB8FF]/90 to-[#0047AB]/90"></div>
        </div>
      )}

      {/* Fallback gradient background if no image */}
      {!product.image && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]">
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/products">
            <a className="inline-flex items-center text-white font-medium mb-4 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>{content.backButton}</span>
            </a>
          </Link>

          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white mb-4 backdrop-blur-sm">
            {content.badge}
          </div>

          <h1 className="heading-lg text-white mb-6">{product.title}</h1>

          <p className="text-xl text-white/90 max-w-4xl mb-8">
            {product.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />} variant="light">
              {content.requestDemo}
            </GradientButton>
            {product.demoUrl && (
              <GradientButton href={product.demoUrl} variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
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