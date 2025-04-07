import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';
import { TestimonialProps } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, content, rating, image } = testimonial;

  return (
    <Card className="bg-secondary rounded-xl p-6 border border-gray-800 h-full flex flex-col">
      <CardContent className="p-0 flex-grow flex flex-col">
        <div className="mb-4">
          <StarRating rating={rating} />
        </div>
        <p className="text-gray-300 mb-6 flex-grow">
          "{content}"
        </p>
        <div className="flex items-center mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-light/20 flex items-center justify-center">
                <i className="fas fa-user text-primary-light"></i>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-primary-light">{name}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
