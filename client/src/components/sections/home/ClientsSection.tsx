import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ClientLogo } from '@/lib/types/layout';
import { PageContent } from '@/lib/types/core';
import { ClientsSectionProps } from '@/lib/types/components';
import { Sparkles, CircuitBoard } from 'lucide-react';

// Loading placeholder for client logos
const ClientLogoSkeleton = () => (
  <div className="flex items-center justify-center h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
    <div className="w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
);

const ClientsSection: React.FC<ClientsSectionProps> = ({ homePageContent, clientLogos, isLoading }) => {
  const { t } = useTranslation();

  // Get clients section from homePageContent
  const clientsSection = homePageContent?.sections?.find(s => s.type === 'clients');

  // Extract section content
  const title = clientsSection?.title;
  const subtitle = clientsSection?.subtitle;
  const badge = clientsSection?.badge;

  // Safely extract client logos from the section
  const logosData = clientsSection?.settings?.logos || [];
  const logos = Array.isArray(logosData) 
    ? logosData.filter((logo): logo is ClientLogo => 
        logo && typeof logo === 'object' && 'name' in logo && 'image' in logo
      )
    : [];

  return (
    <section className="py-16 bg-white dark:bg-[#0a192f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
        <Sparkles className="absolute left-10 top-10 h-32 w-32 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-light" />
        <CircuitBoard className="absolute right-10 bottom-10 h-40 w-40 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/5 animate-pulse-light"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
            {badge}
          </div>
          <h2 className="heading-md text-blue-900 dark:text-blue-200 mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {isLoading ? (
            // Loading placeholders
            Array(10).fill(0).map((_, index) => (
              <ClientLogoSkeleton key={index} />
            ))
          ) : logos && logos.length > 0 ? (
            logos.map((logo: ClientLogo, index: number) => (
              <motion.div
                key={logo.id || `client-logo-${index}`}
                className="flex items-center justify-center h-16 bg-transparent p-2 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="max-h-12 max-w-full object-contain dark:grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    {logo.name}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('clientsSection.noClients')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;