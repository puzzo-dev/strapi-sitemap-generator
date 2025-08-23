import React from 'react';
import { CaseStudyProps } from '@/lib/types/content';
import AppLink from '@/components/ui/AppLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CaseStudiesGridSectionProps {
  caseStudies: CaseStudyProps[];
  pageContent: any;
  isLoading?: boolean;
}

const CaseStudiesGridSection: React.FC<CaseStudiesGridSectionProps> = ({
  caseStudies = [],
  pageContent,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-blue-900/20 rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="p-6 md:p-8">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-3 w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-6 w-3/4"></div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-blue-800/30">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!caseStudies.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No case studies found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              No case studies match the selected filter. Try selecting a different industry or view all case studies.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="px-8 py-3 text-lg font-semibold"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0a192f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-12 md:mb-16 text-center">
            {pageContent?.sections?.find((s: any) => s.type === 'case-studies')?.title || 'Featured Case Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {caseStudies.map(cs => (
              <Card key={cs.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white dark:bg-blue-900/20 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={cs.image} 
                    alt={cs.title} 
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 md:p-8">
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium px-3 py-1 rounded-full">
                      {cs.industry}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors line-clamp-2">
                    {cs.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {cs.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-blue-800/30">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="mr-4">📅 {cs.duration}</span>
                      <span>👥 {cs.teamSize}</span>
                    </div>
                    <AppLink 
                      href={`/case-studies/${cs.slug}`} 
                      className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold transition-colors group/link"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </AppLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGridSection; 