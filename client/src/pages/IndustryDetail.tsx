import React, { useMemo } from 'react';
import { useRoute } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { usePageContent, useSiteConfig } from '@/hooks/useContent';
import MetaTags from '@/components/seo/MetaTags';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';
import { industriesPageContent as localIndustriesPageContent } from '@/lib/data/pages';
import { defaultSiteConfig } from '@/lib/data/';
import { IndustryProps } from '@/lib/types/content';
import { industries as directIndustries } from '@/lib/data/industries';
import AppLink from '@/components/ui/AppLink';
import { ArrowLeft, CheckCircle, Users, Clock, Target } from 'lucide-react';

// Import section components
import IndustryDetailHeroSection from '@/components/sections/industry-detail/IndustryDetailHeroSection';
import IndustryDetailContentSection from '@/components/sections/industry-detail/IndustryDetailContentSection';
import IndustryDetailChallengesSection from '@/components/sections/industry-detail/IndustryDetailChallengesSection';
import IndustryDetailSolutionsSection from '@/components/sections/industry-detail/IndustryDetailSolutionsSection';
import IndustryDetailCaseStudiesSection from '@/components/sections/industry-detail/IndustryDetailCaseStudiesSection';
import IndustryDetailTechnologiesSection from '@/components/sections/industry-detail/IndustryDetailTechnologiesSection';
import IndustryDetailCTASection from '@/components/sections/industry-detail/IndustryDetailCTASection';

const IndustryDetail: React.FC = () => {
  const { t } = useTranslation();
  useLanguage();
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();
  const { data: siteConfig } = useSiteConfig();
  const [, params] = useRoute('/industries/:slug');

  // Fetch page content from Strapi with fallback to local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('industries');

  // Use Strapi data if available, otherwise fall back to local data
  const displayPageContent = pageContent || localIndustriesPageContent;
  const displaySiteConfig = siteConfig || defaultSiteConfig;

  // Get the industry data
  const industry = useMemo((): IndustryProps | null => {
    if (!params?.slug) return null;
    // Always get industries from the industries section's settings.featured
    const industriesSection = displayPageContent.sections?.find(s => s.type === 'industries');
    const featuredIndustries = industriesSection?.settings?.featured;
    if (featuredIndustries && Array.isArray(featuredIndustries)) {
      return (featuredIndustries as IndustryProps[]).find(ind => ind.slug === params.slug) || null;
    }
    return null;
  }, [params?.slug, displayPageContent]);

  // Only show loading if we're loading AND don't have fallback content
  const shouldShowLoading = isPageLoading && !displayPageContent;

  // If industry not found, show 404
  if (!shouldShowLoading && !industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Industry Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The industry you're looking for doesn't exist.
          </p>
          <AppLink
            href="/industries"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </AppLink>
        </div>
      </div>
    );
  }

  // Generate structured data
  const structuredData = {
    ...generateWebsiteSchema(),
    ...generateOrganizationSchema(),
    "@context": "https://schema.org",
    "@type": "Service",
    "name": industry?.name || "Industry Solutions",
    "description": industry?.description || "Digital transformation solutions for various industries",
    "provider": {
      "@type": "Organization",
      "name": "I-Varse Technologies",
      "url": displaySiteConfig.siteUrl
    },
    "serviceType": "Industry Solutions",
    "areaServed": "Nigeria"
  };

  // SEO metadata
  const pageTitle = generateSeoTitle(industry?.name || 'Industry Solutions');
  const pageDescription = generateSeoDescription(industry?.description || 'Digital transformation solutions for various industries');

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`${displaySiteConfig.siteUrl}/industries/${params?.slug}`}
        ogImage={`${displaySiteConfig.siteUrl}/src/assets/images/IMG_2257.JPG`}
        ogUrl={`${displaySiteConfig.siteUrl}/industries/${params?.slug}`}
        ogType="website"
        twitterCard="summary_large_image"
        keywords={[
          'industry solutions',
          industry?.name?.toLowerCase() || 'digital transformation',
          'business technology',
          'sector-specific solutions',
          'I-Varse Technologies',
          'enterprise solutions',
          'technology consulting'
        ]}
        alternateLanguages={[
          { lang: 'en', url: `${displaySiteConfig.siteUrl}/industries/${params?.slug}` },
          { lang: 'yo', url: `${displaySiteConfig.siteUrl}/yo/industries/${params?.slug}` },
          { lang: 'ig', url: `${displaySiteConfig.siteUrl}/ig/industries/${params?.slug}` },
          { lang: 'ha', url: `${displaySiteConfig.siteUrl}/ha/industries/${params?.slug}` },
          { lang: 'fr', url: `${displaySiteConfig.siteUrl}/fr/industries/${params?.slug}` },
          { lang: 'es', url: `${displaySiteConfig.siteUrl}/es/industries/${params?.slug}` },
          { lang: 'sw', url: `${displaySiteConfig.siteUrl}/sw/industries/${params?.slug}` }
        ]}
        structuredData={structuredData}
      />

      <main>
        {/* Hero Section */}
        <IndustryDetailHeroSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Content Section */}
        <IndustryDetailContentSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Challenges Section */}
        <IndustryDetailChallengesSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Solutions Section */}
        <IndustryDetailSolutionsSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Case Studies Section */}
        <IndustryDetailCaseStudiesSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* Technologies Section */}
        <IndustryDetailTechnologiesSection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />

        {/* CTA Section */}
        <IndustryDetailCTASection
          industry={industry}
          pageContent={displayPageContent}
          isLoading={shouldShowLoading}
        />
      </main>
    </>
  );
};

export default IndustryDetail; 