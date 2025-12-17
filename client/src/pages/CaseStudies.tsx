import React, { useMemo, useState } from 'react';
import { usePageContent } from '@/hooks/useContent';
import { caseStudiesPageContent as localCaseStudiesPageContent } from '@/lib/data/pages';
import { caseStudies } from '@/lib/data/case-studies';
import { testimonials } from '@/lib/data/testimonials';
import { CaseStudiesContentSection } from '@/components/sections/case-studies';
import { TestimonialProps } from '@/lib/types/content';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { defaultSiteConfig } from '@/lib/data/config';
import {
  CaseStudiesHeroSection,
  CaseStudiesGridSection,
  CaseStudiesFilterSection,
  CaseStudiesTestimonialsSection,
  CaseStudiesCTASection
} from '@/components/sections/case-studies';

import { CaseStudyProps } from '@/lib/types/case-studies';

const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch page content from Strapi with fallback to local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('case-studies');

  // Use Strapi data if available, otherwise fallback (caseStudies already embedded in localCaseStudiesPageContent)
  const displayPageContent = pageContent || localCaseStudiesPageContent;

  // Get case studies from page content
  const allCaseStudies = useMemo((): CaseStudyProps[] => {
    const caseStudiesSection = displayPageContent.sections?.find(s => s.type === 'case-studies');
    const featuredCaseStudies = caseStudiesSection?.settings?.featured;
    if (featuredCaseStudies && Array.isArray(featuredCaseStudies) && featuredCaseStudies.length > 0) {
      return featuredCaseStudies as CaseStudyProps[];
    }
    // Fallback to direct import if extraction fails
    return caseStudies;
  }, [displayPageContent]);

  // Get filter options from page content
  const filterOptions = useMemo(() => {
    const contentSection = displayPageContent.sections?.find(s => s.type === 'custom' && s.title?.includes('About'));
    const industryExpertise = contentSection?.settings?.industryExpertise || [];

    // Create filter options from industry expertise
    const filters = industryExpertise.map((industry: string) => {
      const key = industry.toLowerCase().replace(/[^a-z]/g, '');
      return {
        key,
        label: industry
      };
    });

    return filters;
  }, [displayPageContent]);

  // Filter case studies based on active filter
  const displayCaseStudies = useMemo((): CaseStudyProps[] => {
    if (activeFilter === 'all') {
      return allCaseStudies;
    }

    const selectedFilter = filterOptions.find((f: any) => f.key === activeFilter);

    if (!selectedFilter) {
      return allCaseStudies;
    }

    const filtered = allCaseStudies.filter(cs => {
      const industry = cs.industry.toLowerCase();
      const filterLabel = selectedFilter.label.toLowerCase();

      // Simple exact match
      if (industry === filterLabel) {
        return true;
      }

      // If no exact match, try partial matching
      const words = filterLabel.split(' ');
      const hasMatch = words.some((word: string) =>
        word.length > 2 && industry.includes(word)
      );

      return hasMatch;
    });

    return filtered;
  }, [allCaseStudies, activeFilter, filterOptions]);

  // Handle filter changes
  const handleFilterChange = (filters: { industry: string }) => {
    console.log('Parent received filter change:', filters);
    setActiveFilter(filters.industry);
  };

  // Get testimonials from page content
  const testimonialsSection = displayPageContent.sections?.find(s => s.type === 'testimonials');
  const displayTestimonials = useMemo((): TestimonialProps[] => {
    if (testimonialsSection?.settings?.featured) {
      const featured = testimonialsSection.settings.featured;
      if (Array.isArray(featured) && featured.length > 0) {
        return featured as TestimonialProps[];
      } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
        return [featured as TestimonialProps];
      }
    }
    // Fallback to direct import if extraction fails
    return testimonials;
  }, [testimonialsSection]);

  const structuredData = generateOrganizationSchema();

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl={`${defaultSiteConfig.siteUrl}/case-studies`}
      ogImage={`${defaultSiteConfig.siteUrl}/og-case-studies.jpg`}
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <CaseStudiesHeroSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Content Section */}
      <CaseStudiesContentSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Filter Section */}
      <CaseStudiesFilterSection
        pageContent={displayPageContent}
        caseStudies={allCaseStudies}
        isLoading={isPageLoading}
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      {/* Case Studies Grid Section */}
      <CaseStudiesGridSection
        caseStudies={displayCaseStudies}
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Testimonials Section */}
      <CaseStudiesTestimonialsSection
        testimonials={displayTestimonials}
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* CTA Section */}
      <CaseStudiesCTASection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />
    </PageLayout>
  );
};

export default CaseStudies; 