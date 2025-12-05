import React from 'react';
import { Briefcase, MapPin, Clock, ChevronRight, ArrowRight, Loader } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types/core';
import { JobListing } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface OpenPositionsSectionProps {
  jobListings: JobListing[];
  isLoading: boolean;
  pageContent?: PageContent | null;
}

const OpenPositionsSection: React.FC<OpenPositionsSectionProps> = ({
  jobListings: displayJobListings,
  isLoading: isJobsLoading,
  pageContent
}) => {
  // Get open positions section from page content
  const openPositionsSection = pageContent?.sections?.find(s => s.type === 'jobs');

  // If no page content or open positions section, don't render anything
  if (!pageContent || !openPositionsSection) {
    return null;
  }

  const title = openPositionsSection.title;
  const subtitle = openPositionsSection.subtitle;
  const backgroundColor = openPositionsSection.backgroundColor;

  return (
    <section id="open-positions" className={`content-section ${backgroundColor || 'bg-white dark:bg-[#132f4c]'}`}>
      <div className="container-custom max-w-8xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {openPositionsSection.settings?.badge || "Current Openings"}
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">{title}</h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {isJobsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {displayJobListings.map(job => (
              <Card key={job.id} className="hover-lift">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Briefcase className="h-4 w-4 mr-1.5" />
                          {job.department}
                        </div>
                        <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-1.5" />
                          {job.location}
                        </div>
                        <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-1.5" />
                          {job.type}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {job.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white mb-2">Responsibilities:</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((item, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="md:ml-6 flex-shrink-0">
                      <GradientButton href={`/careers/${job.slug}`} endIcon={<ArrowRight />}>
                        {openPositionsSection.settings?.applyButton || "Apply Now"}
                      </GradientButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenPositionsSection;