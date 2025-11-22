import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { ProductProps, GalleryItem } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';
import { cn } from '@/lib/utils';
import { getThemeColors } from '@/lib/utils/theme-helpers';
import GradientButton from '@/components/ui/GradientButton';
import { useTranslation } from 'react-i18next';

interface ProductGallerySectionProps {
  product: ProductProps;
  isLoading?: boolean;
  pageContent?: PageContent;
}

// Default gallery items when product doesn't have gallery data
const getDefaultGalleryItems = (productTitle: string): GalleryItem[] => [
  {
    id: 1,
    image: '/api/placeholder/800/600',
    title: `${productTitle} Dashboard`,
    type: 'screenshot',
    size: 'large'
  },
  {
    id: 2,
    image: '/api/placeholder/400/300',
    title: 'Analytics View',
    type: 'screenshot',
    size: 'medium'
  },
  {
    id: 3,
    image: '/api/placeholder/400/300',
    title: 'Mobile Experience',
    type: 'interface',
    size: 'medium'
  },
  {
    id: 4,
    image: '/api/placeholder/600/400',
    title: 'Key Features',
    type: 'feature',
    size: 'large'
  },
  {
    id: 5,
    image: '/api/placeholder/400/300',
    title: 'User Interface',
    type: 'interface',
    size: 'medium'
  },
  {
    id: 6,
    image: '/api/placeholder/400/300',
    title: 'Integration Hub',
    type: 'demo',
    size: 'medium'
  }
];

// Optimized mosaic layout function to prevent lingering items
const getMosaicLayoutClass = (index: number, totalItems: number): string => {
  const patterns = [
    // Pattern for 6 items (2x3 grid)
    ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
    // Pattern for 8 items (2x4 grid)
    ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
    // Pattern for 9 items (3x3 grid)
    ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1']
  ];

  // Select pattern based on total items
  let pattern: string[];
  if (totalItems <= 6) {
    pattern = patterns[0];
  } else if (totalItems <= 8) {
    pattern = patterns[1];
  } else {
    pattern = patterns[2];
  }

  return pattern[index % pattern.length] || 'col-span-1 row-span-1';
};

const ProductGallerySection: React.FC<ProductGallerySectionProps> = ({
  product,
  isLoading = false,
  pageContent
}) => {
  // Get gallery items from product data or use default data
  const galleryItems = product?.gallery || getDefaultGalleryItems(product.title);

  if (isLoading) {
    return (
      <section className={cn(
        "py-16 md:py-20",
        getThemeColors('background', 'default')
      )}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <LoadingSkeletons.Text lines={1} className="mb-8 max-w-md mx-auto" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeletons.Base
                key={i}
                className={cn(
                  "rounded-lg h-48",
                  i === 0 || i === 3 ? "col-span-2 row-span-2" : "",
                  i === 6 ? "row-span-2" : ""
                )}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(
      "py-16 md:py-20 overflow-hidden",
      getThemeColors('background', 'default')
    )}>
      {/* Full-width container */}
      <div className="w-full">
        {/* Section Header */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Product Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore {product.title} in action with screenshots and key features
            </p>
          </motion.div>
        </div>

        {/* Mosaic Gallery Grid */}
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]"
          >
            {galleryItems.map((item: GalleryItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, z: 10 }}
                className={cn(
                  "relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300",
                  // Use optimized mosaic layout
                  getMosaicLayoutClass(index, galleryItems.length)
                )}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      {
                        "bg-blue-500/20 text-blue-300 border border-blue-500/30": item.type === 'screenshot',
                        "bg-purple-500/20 text-purple-300 border border-purple-500/30": item.type === 'feature',
                        "bg-green-500/20 text-green-300 border border-green-500/30": item.type === 'demo',
                        "bg-orange-500/20 text-orange-300 border border-orange-500/30": item.type === 'interface'
                      }
                    )}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>
                    <h3 className="text-white font-semibold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-xl transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 px-4 sm:px-6 lg:px-8"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to see more? Request a personalized demo
          </p>
          <GradientButton
            href="/contact?demo=true"
            size="lg"
            endIcon={<ArrowRight />}
            className="inline-flex items-center"
          >
            Request Demo
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGallerySection;
