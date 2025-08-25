import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';
import { ProductProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ProductsListSectionProps {
  pageContent?: PageContent | null;
  products?: ProductProps[];
  isLoading?: boolean;
}

const ProductsListSection: React.FC<ProductsListSectionProps> = ({
  pageContent,
  products,
  isLoading = false
}) => {
  // Get products section from page content
  const productsSection = pageContent?.sections?.find(s => s.type === 'products');

  // Use products prop if provided, otherwise extract from page content
  let displayProducts: ProductProps[] = [];

  if (products && products.length > 0) {
    // Use products prop directly (like Home page)
    displayProducts = products;
  } else if (productsSection?.settings?.featured) {
    // Fallback to extracting from page content
    const featured = productsSection.settings.featured;

    if (Array.isArray(featured) && featured.length > 0) {
      displayProducts = featured as ProductProps[];
    } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
      displayProducts = [featured as ProductProps];
    }
  }

  // Ensure we only show 4 products maximum
  if (displayProducts.length > 4) {
    displayProducts = displayProducts.slice(0, 4);
  }

  return (
    <motion.section
      id="products"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="content-section bg-gray-50 dark:bg-[#0a1929]"
    >
      <div className="container-custom">
        <motion.div
          variants={fadeInUp(20, 0.6)}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {productsSection?.badge || "Our Products"}
          </div>
          <div className="text-center mb-16">
            <h2 className="section-title text-blue-900 dark:text-blue-200">
              {productsSection?.title || "Our Digital Solutions"}
            </h2>
            <p className="section-subtitle">
              {productsSection?.subtitle || "Comprehensive products for modern businesses"}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerChildren(0.3)}
          className="space-y-16"
        >
          {isLoading ? (
            // Loading skeleton for products
            Array(2).fill(0).map((_, index) => (
              <Card key={index} className="animate-pulse">
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
            ))
          ) : displayProducts.length === 0 ? (
            // Show message when no products
            <div className="text-center py-16">
              <div className="h-16 w-16 text-gray-400 mx-auto mb-4 text-5xl">📦</div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Products will be displayed here when available.
              </p>
            </div>
          ) : (
            // Show products
            displayProducts.map((product, idx) => {
              // More lenient check - just ensure it's a valid object with required fields
              const isValidProduct = product &&
                typeof product === 'object' &&
                product.title &&
                product.description;

              if (!isValidProduct) {
                return null;
              }

              return (
                <motion.div
                  key={product.id || idx}
                  variants={fadeInUp(30, 0.7, idx * 0.1)}
                  className={idx % 2 === 0 ? '' : 'bg-white dark:bg-[#132f4c] py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16'}
                >
                  <ProductCard item={product} isReversed={idx % 2 !== 0} />
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsListSection;