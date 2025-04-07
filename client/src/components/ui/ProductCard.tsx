import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import GradientButton from './GradientButton';
import { ProductProps } from '@/lib/types';
import { fadeInUp } from '@/lib/animations';

interface ProductCardProps {
  product: ProductProps;
  isReversed?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isReversed = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      {/* Image column */}
      <div className={`md:col-span-5 ${isReversed ? 'md:order-last' : ''}`}>
        {product.image ? (
          <motion.div 
            className="rounded-xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-800/30"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="rounded-xl bg-blue-50 dark:bg-blue-900/20 h-64 flex items-center justify-center border border-blue-100 dark:border-blue-800/30"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <span className="text-blue-500 dark:text-blue-300 text-xl font-medium">
              {product.title}
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Content column */}
      <div className="md:col-span-7">
        <motion.h3 
          className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {product.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {product.description}
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Key Features
            </h4>
            <ul className="space-y-2">
              {product.keyFeatures.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  <motion.span 
                    className="flex-shrink-0 mr-2 mt-1"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                  </motion.span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Benefits
            </h4>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  <motion.span 
                    className="flex-shrink-0 mr-2 mt-1"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Check className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </motion.span>
                  <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Link href={`/products/${product.id}`}>
            <motion.a 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="inline-block relative">
                Learn More
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 origin-left" 
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.span
                className="ml-1 inline-flex"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCard;