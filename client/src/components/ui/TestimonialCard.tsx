import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialProps } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, content, rating, image } = testimonial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      <Card className="relative overflow-hidden card-hover h-full flex flex-col border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700">
        {/* Tech-inspired decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <motion.svg 
            className="absolute top-2 right-2 w-16 h-16 text-blue-200/10 dark:text-blue-700/10"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 10 L90 10 L90 90 L10 90 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
            <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="0.5" />
          </motion.svg>
          
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-5" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 Q200 100 400 200" stroke="currentColor" strokeWidth="1" />
            <path d="M0 180 Q200 80 400 180" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0 160 Q200 60 400 160" stroke="currentColor" strokeWidth="0.25" />
          </svg>
        </div>
        
        <CardContent className="p-6 flex-grow flex flex-col relative z-10">
          <div className="mb-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StarRating rating={rating} />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow italic">
              "{content}"
            </p>
          </motion.div>
          
          <motion.div 
            className="flex items-center mt-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-100 dark:border-blue-800 shadow-sm animate-glow">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">{name}</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">Client</span>
            </div>
          </motion.div>
          
          {/* Quote mark */}
          <div className="absolute top-4 right-6 text-6xl font-serif text-blue-100 dark:text-blue-900/30">"</div>
        </CardContent>
        
        {/* Tech corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
