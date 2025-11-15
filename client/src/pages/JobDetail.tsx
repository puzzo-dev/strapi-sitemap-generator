import React, { useState, useMemo } from 'react';
import { useParams } from 'wouter';
import { usePageContent } from '@/hooks/useContent';
// import { useERPNextJobListing } from '@/hooks/useERPNextContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { jobListings } from '@/lib/data';
import { generateJobPostingSchema } from '@/components/seo/StructuredData';
import MetaTags from '@/components/seo/MetaTags';
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
  const { generateSeoTitle, generateSeoDescription, getCanonicalUrl, getOgImage, siteConfig } = useSeoHelpers();
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
      hiringOrganization: jobContent?.hero?.hiringOrganization || siteConfig.siteName,
      jobLocation: job.location,
    });
  }, [job, jobContent, siteConfig.siteName]);

  // SEO metadata
  const pageTitle = useMemo(() => {
    if (!job) return jobContent?.hero?.notFoundTitle || `Job Not Found | ${siteConfig.siteName}`;
    return generateSeoTitle(`${job.title} | Career Opportunities`);
  }, [job, generateSeoTitle, jobContent, siteConfig.siteName]);

  const pageDescription = useMemo(() => {
    if (!job) return jobContent?.hero?.notFoundDescription || 'The requested job position could not be found.';
    return generateSeoDescription(`Apply for the ${job.title} position at ${jobContent?.hero?.hiringOrganization || siteConfig.siteName}. ${job.description.substring(0, 120)}...`);
  }, [job, generateSeoDescription, jobContent, siteConfig.siteName]);

  // Render loading state
  if (isLoading) {
    return <JobDetailLoadingSection />;
  }

  // Render error state or job not found
  if (error || !job) {
    return <JobDetailErrorSection error={error} pageContent={displayPageContent} />;
  }

  return (
    <>
      {/* SEO metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[...(jobContent?.hero?.keywords || []), job?.title, job?.department].filter(Boolean)}
        structuredData={jobSchema}
        ogType="website"
        canonicalUrl={getCanonicalUrl(`/careers/${slug}`)}
        ogUrl={getCanonicalUrl(`/careers/${slug}`)}
        ogImage={getOgImage(jobContent?.hero?.ogImage, '/og-career.jpg')}
      />

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
    </>
  );
};

export default JobDetail;