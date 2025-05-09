import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code2, PenTool, Server, Database, Share2, Layers, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceProps } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceProps;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, description, icon } = service;
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'fa-code':
        return <Code2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'fa-pen':
        return <PenTool className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'fa-server':
        return <Server className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'fa-database':
        return <Database className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'fa-share':
        return <Share2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'fa-chart':
        return <BarChart3 className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      default:
        return <Layers className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <div onClick={() => window.location.href = `/services/${service.id}`}>
      <motion.div
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="cursor-pointer"
      >
        <Card className="card-hover relative overflow-hidden h-full border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 group">
          {/* Tech-inspired background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 dark:opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="20" r="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
              <circle cx="80" cy="20" r="8" stroke="currentColor" strokeWidth="0.5" />
              <path d="M30 70 L80 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
              <path d="M10 50 H30 M50 90 V70" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          
          <CardHeader className="pb-2 relative z-10">
            <motion.div 
              className="w-14 h-14 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 shadow-md"
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.6 } }}
            >
              {getIconComponent(icon)}
            </motion.div>
            <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{title}</CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {description}
            </p>
          </CardContent>
          
          <CardFooter className="relative z-10">
            <div className="button-spec group">
              <span>Learn More</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </CardFooter>
          
          {/* Glowing border on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ServiceCard;
