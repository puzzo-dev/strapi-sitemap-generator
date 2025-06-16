import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialProps } from '@/lib/types';


const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="card p-6 hover-lift h-full flex flex-col">
      {/* Stars */}
      <div className="flex mb-4">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
          />
        ))}
      </div>
      
      {/* Testimonial content */}
      <p className="text-gray-600 dark:text-blue-200 mb-6 italic flex-grow">
        "{testimonial.content}"
      </p>
      
      {/* Client info */}
      <div className="flex items-center mt-auto">
        {testimonial.image ? (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-blue-100 dark:border-blue-800/30">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 text-blue-700 dark:text-blue-300 font-bold">
            {testimonial.name.substring(0, 1)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;