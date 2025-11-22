import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Code, Globe, Smartphone, Search, PenTool, Cloud, Database, BarChart, Cpu } from 'lucide-react';
import { ServiceProps } from '@/lib/types';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';
import { getTranslation } from '@/lib/utils/translationHelpers';

interface ServiceCardProps {
  service: ServiceProps;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const { t } = useTranslation();
  const { id, title, description, icon, slug, learnMoreText, readMoreText } = service;

  // Map FontAwesome icon names to Lucide React icons
  const getIcon = () => {
    switch (icon) {
      case 'fa-server':
        return <Server className="h-5 w-5" />;
      case 'fa-code':
        return <Code className="h-5 w-5" />;
      case 'fa-globe':
        return <Globe className="h-5 w-5" />;
      case 'fa-mobile-alt':
        return <Smartphone className="h-5 w-5" />;
      case 'fa-search':
        return <Search className="h-5 w-5" />;
      case 'fa-pen-fancy':
        return <PenTool className="h-5 w-5" />;
      case 'fa-cloud':
      case 'fa-cloud-shield':
        return <Cloud className="h-5 w-5" />;
      case 'fa-database':
        return <Database className="h-5 w-5" />;
      case 'fa-chart-bar':
        return <BarChart className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800
      bg-white dark:bg-gray-900 shadow-sm hover:shadow-md dark:hover:shadow-gray-800/30
      transition-all duration-300 group min-h-[200px] h-auto
    `}>
      {/* Animated border effect on hover with rounded corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100">
        {/* Top border animation */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#0a192f] via-blue-400 to-[#0a192f] w-0 group-hover:w-full transition-all duration-700 rounded-full"></div>

        {/* Right border animation - delayed */}
        <div className="absolute top-0 right-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#0a192f] via-blue-400 to-[#0a192f] h-0 group-hover:h-full transition-all duration-700 delay-100 rounded-full"></div>

        {/* Bottom border animation - more delayed */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-400 via-[#0a192f] to-blue-400 w-0 group-hover:w-full transition-all duration-700 delay-200 rounded-full"></div>

        {/* Left border animation - most delayed */}
        <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-blue-400 via-[#0a192f] to-blue-400 h-0 group-hover:h-full group-hover:rounded-full transition-all duration-700 delay-300 rounded-full"></div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent dark:from-[#0a192f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="p-5 flex flex-col relative z-10">
        {/* Icon and title row */}
        <div className="flex flex-col items-start mb-3">
          <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 transform group-hover:scale-110 transition-transform duration-300 text-blue-500 dark:text-blue-400">
            {getIcon()}
          </div>
          <h3 className="font-bold text-blue-900 dark:text-blue-200 text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-auto text-base">
          {description}
        </p>

        {/* Link with enhanced hover effect */}
        <div className="mt-3 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
          {slug ? (
            <Link
              href={`/services/${slug}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group/link"
            >
              {learnMoreText || readMoreText || getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}
              <ArrowRight className="ml-1 transform group-hover/link:translate-x-1.5 transition-transform h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm">
              {learnMoreText || readMoreText || getTranslation(t, 'ui.learnMore', uiLabels.learnMore)}
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      {/* Featured indicator
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium">
            Featured
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ServiceCard;
