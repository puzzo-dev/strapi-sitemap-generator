import React from 'react';
import { motion } from 'framer-motion';
import { IndustryProps } from '@/lib/types/content';
import AppLink from '@/components/ui/AppLink';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { fadeInUp, staggerChildren, scaleUp } from '@/lib/animations';

interface IndustriesGridSectionProps {
  industries: IndustryProps[];
  title?: string;
  subtitle?: string;
  settings?: any;
  isLoading?: boolean;
}

const IndustriesGridSection: React.FC<IndustriesGridSectionProps> = ({
  industries = [],
  title,
  subtitle,
  settings,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-16 md:py-24 bg-white dark:bg-[#132f4c]"
    >
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Title */}
          <motion.h2
            variants={fadeInUp()}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
          >
            {title || 'Industries We Serve'}
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeInUp(0.2)}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Industries Grid - 4 cards per line and fully clickable */}
        <motion.div
          variants={staggerChildren(0.1)}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
        >
          {industries.length > 0 ? (
            industries.map((ind) => (
              <motion.div
                key={ind.id}
                variants={scaleUp()}
                className="group relative"
              >
                <AppLink
                  href={`/industries/${ind.slug}`}
                  className="block h-full"
                >
                  <Card className="h-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                    {/* Industry Image */}
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={ind.image}
                        alt={ind.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Industry Info */}
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                          {ind.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 text-xs">
                          {ind.icon && <span className={`mr-1 fa ${ind.icon}`}></span>}
                          {ind.slug.replace(/-/g, ' ')}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2">
                          {ind.description}
                        </p>
                      </div>
                    </CardContent>

                    {/* View Details Button */}
                    <CardFooter className="p-4 pt-0">
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium text-xs transition-colors duration-200">
                        View Details
                      </div>
                    </CardFooter>
                  </Card>
                </AppLink>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No industries data available. Please check back later.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default IndustriesGridSection; 