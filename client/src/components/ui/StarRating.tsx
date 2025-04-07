import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(maxRating)].map((_, i) => (
        <i 
          key={i} 
          className={`fas ${i < rating ? 'fa-star' : 'fa-star-o'}`}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
