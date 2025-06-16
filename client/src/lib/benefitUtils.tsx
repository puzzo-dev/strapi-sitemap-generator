import React from 'react';
import { PieChart, Heart, Laptop, Award, Coffee, Globe } from 'lucide-react';

export const getBenefitIcon = (iconName: string) => {
  switch (iconName) {
    case 'PieChart': return <PieChart className="h-6 w-6" />;
    case 'Heart': return <Heart className="h-6 w-6" />;
    case 'Laptop': return <Laptop className="h-6 w-6" />;
    case 'Award': return <Award className="h-6 w-6" />;
    case 'Coffee': return <Coffee className="h-6 w-6" />;
    case 'Globe': return <Globe className="h-6 w-6" />;
    default: return <Award className="h-6 w-6" />; // Default icon
  }
};