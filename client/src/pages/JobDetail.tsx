import React, { useState, useMemo } from 'react';
import { useParams } from 'wouter';
import { usePageContent } from '@/hooks/useContent';
// import { useERPNextJobListing } from '@/hooks/useERPNextContent';
import { jobListings } from '@/lib/data';
import { generateJobPostingSchema } from '@/components/seo/StructuredData';
import PageLayout from '@/components/layout/PageLayout';
import { jobDetailPageContent as localJobDetailPageContent } from '@/lib/data/pages';
import { PageContent } from '@/lib/types/core';
import { JobListing } from '@/lib/types/content';
import type { ApplicationFormValues } from '@/lib/types';

// Import section components
import {
  JobDetailHeroSection,
  JobDetailMainContent,
  JobDetailErrorSection,
  JobDetailLoadingSection,
  JobRelatedSection,
  JobStatsSection
} from '@/components/sections/job';

const JobDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [submitted, setSubmitted] = useState(false);

  // Fetch page content from Strapi or use fallback
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('job-detail');
  const displayPageContent = pageContent || localJobDetailPageContent;

  // Get job from fallback data (temporarily until ERPNext is configured)
  const job = useMemo(() => {
    return jobListings.find((job) => job.slug === slug);
  }, [slug]);
  const isLoading = false;
  const error = null;

  // Get job content from page content settings
  const jobContent = useMemo(() => {
    const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero');
    return heroSection?.settings?.jobContent;
  }, [displayPageContent]);

  // Handle form submission
  const handleSubmit = (data: ApplicationFormValues) => {
    // In a real app, send this data to your backend
    setSubmitted(true);

    // Scroll to top to show the success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate structured data for SEO
  const jobSchema = useMemo(() => {
    if (!job) return undefined;

    return generateJobPostingSchema({
      title: job.title,
      description: job.description,
      datePosted: new Date().toISOString().split('T')[0],
      validThrough: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      employmentType: job.type === 'Full-time' ? 'FULL_TIME' :
        job.type === 'Part-time' ? 'PART_TIME' :
          job.type === 'Contract' ? 'CONTRACTOR' : 'OTHER',
      hiringOrganization: jobContent?.hero?.hiringOrganization || 'I-Varse Technologies',
      jobLocation: job.location,
    });
  }, [job, jobContent]);

  // Render loading state
  if (isLoading) {
    return <JobDetailLoadingSection />;
  }

  // Render error state or job not found
  if (error || !job) {
    return <JobDetailErrorSection error={error} pageContent={displayPageContent} />;
  }

  return (
    <PageLayout
      title={job ? `${job.title} | Career Opportunities` : 'Job Not Found'}
      description={job ? `Apply for the ${job.title} position at I-Varse Technologies. ${job.description.substring(0, 120)}...` : 'The requested job position could not be found.'}
      canonicalUrl={`https://itechnologies.ng/careers/${slug}`}
      ogImage={jobContent?.hero?.ogImage || 'https://itechnologies.ng/og-career.jpg'}
      pageContent={job as any}
      isLoading={isLoading}
      structuredData={jobSchema}
    >
      <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        {/* Hero Section */}
        <JobDetailHeroSection
          job={job}
          submitted={submitted}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Main Content Section */}
        <JobDetailMainContent
          job={job}
          submitted={submitted}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />

        {/* Company Stats Section */}
        <JobStatsSection
          job={job}
          pageContent={displayPageContent}
          isLoading={isLoading}
        />

        {/* Related Jobs Section - Use basic jobListings for related jobs */}
        <JobRelatedSection
          currentJobSlug={slug}
          relatedJobs={jobListings}
          isLoading={isLoading}
          pageContent={displayPageContent}
        />
      </main>
    </PageLayout>
  );
};

export default JobDetail;