import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import GradientButton from './GradientButton';
import { ProductProps } from '@/lib/types';

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
          <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-800/30">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 h-64 flex items-center justify-center border border-blue-100 dark:border-blue-800/30">
            <span className="text-blue-500 dark:text-blue-300 text-xl font-medium">
              {product.title}
            </span>
          </div>
        )}
      </div>
      
      {/* Content column */}
      <div className="md:col-span-7">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {product.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {product.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Key Features
            </h4>
            <ul className="space-y-2">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mr-2 mt-1">
                    <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Benefits
            </h4>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mr-2 mt-1">
                    <Check className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          {/* Use the direct href prop on GradientButton instead of wrapping with Link */}
          <GradientButton href={`/products/${product.id}`} endIcon={<ArrowRight />}>
            Learn More
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;