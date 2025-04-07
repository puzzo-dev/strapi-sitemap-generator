import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { ProductProps } from '@/lib/types';

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, image, keyFeatures, benefits } = product;

  return (
    <Card className="bg-secondary-light rounded-xl overflow-hidden border border-gray-800 hover:border-primary-light transition-colors">
      <CardContent className="p-8">
        <CardTitle className="text-2xl font-semibold mb-4">{title}</CardTitle>
        
        <div className="aspect-video bg-secondary-dark rounded-lg mb-8 overflow-hidden flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={`${title} screenshot`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <i className="fas fa-ticket-alt text-4xl mb-2"></i>
              <p className="text-sm">Product Screenshot</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4 text-primary-light">KEY FEATURES</h4>
            <ul className="space-y-2 text-gray-300">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-primary-light">BENEFITS</h4>
            <ul className="space-y-2 text-gray-300">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <GradientButton href="/contact">
            Learn More
          </GradientButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
