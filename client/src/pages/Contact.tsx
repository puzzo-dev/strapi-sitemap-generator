import React, { useState } from 'react';
import { usePageContent, useTestimonials, useFAQItems } from '@/hooks/useStrapiContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { usePageTracking } from '@/contexts/AnalyticsContext';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { contactPageContent as localContactPageContent } from '@/lib/data/pages';
import { defaultSiteConfig } from '@/lib/data/config';
import { PageContent } from '@/lib/types/core';

// Import section components
import {
  ContactHeroSection,
  ContactFormSection,
  ContactTestimonialsSection,
  ContactFAQSection
} from '@/components/sections/contact';

const Contact: React.FC = () => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();
  const [formType, setFormType] = useState<'contact' | 'booking'>('contact');
  
  // Track page view for analytics
  usePageTracking({
    content_group1: 'contact',
    content_group2: 'main-page'
  });

  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('contact');

  // Fetch testimonials and FAQ items from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  const { data: apiFAQItems, isLoading: isFAQLoading } = useFAQItems();

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localContactPageContent;

  // Generate SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const contactSection = displayPageContent?.sections?.find(s => s.type === 'contact') || { id: 0 };
  const testimonialsSection = displayPageContent?.sections?.find(s => s.type === 'testimonials') || { id: 0 };
  const faqSection = displayPageContent?.sections?.find(s => s.type === 'faq') || { id: 0 };

  // Use API data if available, otherwise fall back to section data from local content
  const displayTestimonials = apiTestimonials || (testimonialsSection?.settings?.featured as any[]) || [];
  const displayFAQItems = apiFAQItems || (faqSection?.settings?.items as any[]) || [];

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://itechnologies.ng/contact"
        ogImage="https://itechnologies.ng/contact-og-image.jpg"
        ogUrl="https://itechnologies.ng/contact"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <ContactHeroSection
        heroSection={heroSection}
        isPageLoading={isPageLoading}
      />

      {/* Contact Form Section */}
      <ContactFormSection
        formType={formType}
        setFormType={setFormType}
        siteConfig={defaultSiteConfig}
        isLoading={isPageLoading}
      />

      {/* Testimonials Section */}
      <ContactTestimonialsSection
        testimonialSection={testimonialsSection}
        testimonials={displayTestimonials}
        isLoading={isTestimonialsLoading}
      />

      {/* FAQ Section */}
      <ContactFAQSection
        faqSection={faqSection}
        faqItems={displayFAQItems}
        isLoading={isFAQLoading}
        isPageLoading={isPageLoading}
      />
    </>
  );
};
export default Contact;
