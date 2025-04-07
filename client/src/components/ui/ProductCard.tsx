import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { Check, Star, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductProps } from '@/lib/types';

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, image, keyFeatures, benefits } = product;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 group hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300">
        {/* Tech-inspired background pattern */}
        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-5 dark:opacity-10 transform rotate-12">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
            <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <CardContent className="p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">{title}</CardTitle>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="md:h-60 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-8 overflow-hidden flex items-center justify-center shadow-md relative"
          >
            {image ? (
              <img 
                src={image} 
                alt={`${title} screenshot`} 
                className="w-full h-full object-contain object-center p-2"
              />
            ) : (
              <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
                <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-sm">Product Screenshot</p>
              </div>
            )}
            
            {/* Tech corner elements */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-400 dark:border-blue-500"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-400 dark:border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-400 dark:border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-400 dark:border-blue-500"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <h4 className="text-lg font-medium mb-4 text-blue-700 dark:text-blue-400 border-b border-blue-200 dark:border-blue-800 pb-2">KEY FEATURES</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {keyFeatures.map((feature, index) => (
                  <motion.li key={index} variants={listItem} className="flex items-start">
                    <span className="flex-shrink-0 mr-2 mt-1">
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                        transition={{ duration: 0.6 }}
                        className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                      >
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </motion.div>
                    </span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delayChildren: 0.3 }}
            >
              <h4 className="text-lg font-medium mb-4 text-blue-700 dark:text-blue-400 border-b border-blue-200 dark:border-blue-800 pb-2">BENEFITS</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} variants={listItem} className="flex items-start">
                    <span className="flex-shrink-0 mr-2 mt-1">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
                      >
                        <Star className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                      </motion.div>
                    </span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GradientButton 
              href="/contact" 
              endIcon={<ArrowRight className="h-4 w-4 ml-1" />}
              className="animate-pulse-light"
            >
              Learn More
            </GradientButton>
          </motion.div>
        </CardContent>
        
        {/* Animated tech border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent">
            <div className="absolute top-0 right-0 h-0.5 w-0 bg-gradient-to-l from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-1000"></div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-1000 delay-200"></div>
            <div className="absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-blue-400 to-indigo-500 group-hover:h-full transition-all duration-1000 delay-100"></div>
            <div className="absolute right-0 bottom-0 w-0.5 h-0 bg-gradient-to-t from-blue-400 to-indigo-500 group-hover:h-full transition-all duration-1000 delay-300"></div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
