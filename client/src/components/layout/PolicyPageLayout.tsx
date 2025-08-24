import React from 'react';
import { Helmet } from 'react-helmet';
import { usePageContent } from '@/hooks/useStrapiContent';
import DynamicContent from '../ui/DynamicContent';
import { LoadingSkeletons } from '../ui/LoadingSkeleton';
import { PolicyPageLayoutProps } from '@/lib/types';



/**
 * Generic layout for policy and information pages
 * Fetches content from Strapi with fallback to static content
 */
const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({
  title,
  slug,
  description,
  content
}) => {
  // Fetch page content from Strapi
  const { data: pageContent, isLoading } = usePageContent(slug);
  
  // Extract content details from sections if available
  const contentDetails = pageContent?.sections ? 
    (Array.isArray(pageContent.sections) && pageContent.sections.length > 0 
      ? pageContent.sections[0] 
      : null) 
    : null;
  
  return (
    <>
      <Helmet>
        <title>{pageContent?.title || title} | I-Varse Technologies</title>
        <meta name="description" content={pageContent?.description || description || `${title} for I-Varse Technologies website`} />
      </Helmet>
      
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 md:-right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" style={{right: 'clamp(-160px, -10vw, -40px)'}} />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6 animate-fade-in-up text-center">
              {pageContent?.title || title}
            </h1>
            
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            ) : (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                {contentDetails?.subtitle || pageContent?.description || description || `Information about our ${title.toLowerCase()}.`}
              </p>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-blue dark:prose-invert">
            {isLoading ? (
              <LoadingSkeletons.Text lines={15} />
            ) : contentDetails?.content ? (
              <DynamicContent content={contentDetails.content} />
            ) : (
              content
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyPageLayout;