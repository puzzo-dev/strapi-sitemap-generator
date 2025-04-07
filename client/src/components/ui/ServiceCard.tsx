import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { ServiceProps } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceProps;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <Card className="bg-secondary rounded-xl border border-gray-800 hover:border-primary-light transition-colors group h-full">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center mb-6 group-hover:bg-primary-light/30 transition-colors">
          <i className={`fas ${icon} text-primary-light`}></i>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-6">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/contact">
          <a className="text-primary-light hover:underline group-hover:text-primary flex items-center text-sm">
            Learn More <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
