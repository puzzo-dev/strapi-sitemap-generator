import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { usePageContent, useTestimonials, useFAQItems } from '@/hooks/useContent';
import { usePageTracking } from '@/contexts/AnalyticsContext';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { contactPageContent as localContactPageContent } from '@/lib/data/pages';
import { testimonials } from '@/lib/data/testimonials';
import { faqContent } from '@/lib/data/faq';
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
  const [formType, setFormType] = useState<'contact' | 'demoRequest'>('contact');
  const [isDemoRequest, setIsDemoRequest] = useState(false);

  // Check URL parameters for demo request
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const demoParam = urlParams.get('demo') === 'true';
    setIsDemoRequest(demoParam);
  }, []);

  // Track page view for analytics
  usePageTracking({
    content_group1: 'contact',
    content_group2: 'main-page'
  });

  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('contact-us');

  // Fetch testimonials and FAQ items from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  const { data: apiFAQItems, isLoading: isFAQLoading } = useFAQItems();

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localContactPageContent;

  // Structured data
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero');
  const contactSection = displayPageContent?.sections?.find(s => s.type === 'contact');
  const testimonialsSection = displayPageContent?.sections?.find(s => s.type === 'testimonials');
  const faqSection = displayPageContent?.sections?.find(s => s.type === 'faq');

  // Use API data if available, otherwise fall back to section data from local content, then direct imports
  const displayTestimonials = (apiTestimonials && apiTestimonials.length > 0)
    ? apiTestimonials
    : (testimonialsSection?.settings?.featured && Array.isArray(testimonialsSection.settings.featured) && testimonialsSection.settings.featured.length > 0)
      ? testimonialsSection.settings.featured
      : testimonials;

  const displayFAQItems = (apiFAQItems && apiFAQItems.length > 0)
    ? apiFAQItems
    : (faqSection?.settings?.items && Array.isArray(faqSection.settings.items) && faqSection.settings.items.length > 0)
      ? faqSection.settings.items
      : faqContent.items.slice(0, 4);

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl="https://itechnologies.ng/contact"
      ogImage="https://itechnologies.ng/contact-og-image.jpg"
      ogType="website"
      twitterCard="summary_large_image"
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
      animationType="fade"
    >
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
        isDemoRequest={isDemoRequest}
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
    </PageLayout>
  );
};
export default Contact;
