import React from 'react';
import JobDetailContentSection from './JobDetailContentSection';
import JobApplicationSidebar from './JobApplicationSidebar';
import { PageContent } from '@/lib/types/core';

interface JobDetailMainContentProps {
  job: any;
  submitted: boolean;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  pageContent?: PageContent;
}

const JobDetailMainContent: React.FC<JobDetailMainContentProps> = ({
  job,
  submitted,
  onSubmit,
  isLoading,
  pageContent,
}) => {
  return (
    <div className="container mx-auto px-2 py-12 max-w-7xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <JobDetailContentSection job={job} isLoading={isLoading} pageContent={pageContent} />

          {/* Application sidebar */}
          <JobApplicationSidebar
            job={job}
            submitted={submitted}
            onSubmit={onSubmit}
            isLoading={isLoading}
            pageContent={pageContent}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailMainContent;