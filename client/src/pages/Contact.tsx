import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { testimonials, contactPageContent as localContactPageContent } from '@/lib/data';
import { TestimonialProps } from '@/lib/types';
import { usePageContent, useTestimonials } from '@/hooks/useStrapiContent';

// Import section components
import {
  ContactHeroSection,
  ContactTestimonialsSection,
  ContactFAQSection
} from '@/components/sections/contact';

const Contact: React.FC = () => {
  const [formType, setFormType] = useState<'contact' | 'booking'>('contact');

  // Fetch data from Strapi
  const { data: strapiPageContent, isLoading: isPageLoading } = usePageContent('contact');
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();

  // Use Strapi data if available, otherwise fall back to local data
  const contactPageContent = useMemo(() => {
    return strapiPageContent || localContactPageContent;
  }, [strapiPageContent]);

  // Get sections from the page content
  const heroSection = useMemo(() => {
    if (contactPageContent?.sections) {
      return contactPageContent.sections.find(s => s.type === 'hero');
    }
    return null;
  }, [contactPageContent]);

  const testimonialSection = useMemo(() => {
    if (contactPageContent?.sections) {
      return contactPageContent.sections.find(s => s.type === 'testimonials');
    }
    return null;
  }, [contactPageContent]);

  const faqSection = useMemo(() => {
    if (contactPageContent?.sections) {
      return contactPageContent.sections.find(s =>
        s.type === 'faq' || (s.type === 'custom' && s.title?.includes('FAQ'))
      );
    }
    return null;
  }, [contactPageContent]);

  // Determine which testimonials to display
  const displayTestimonials = useMemo(() => {
    if (testimonialSection?.items?.length) {
      return testimonialSection.items;
    }
    return apiTestimonials || testimonials;
  }, [testimonialSection, apiTestimonials]);

  return (
    <main>
      <Helmet>
        <title>{contactPageContent?.metaTitle || 'Contact Us'}</title>
        <meta name="description" content={contactPageContent?.metaDescription} />
      </Helmet>

      {/* Hero Section */}
      <ContactHeroSection
        heroSection={heroSection}
        isPageLoading={isPageLoading}
        formType={formType}
        setFormType={setFormType}
      />

      {/* Testimonials Section */}
      <ContactTestimonialsSection
        testimonialSection={testimonialSection}
        displayTestimonials={displayTestimonials}
        isTestimonialsLoading={isTestimonialsLoading}
      />

      {/* FAQ Section */}
      <ContactFAQSection
        faqSection={faqSection}
        isPageLoading={isPageLoading}
      />
    </main>
  );
};

export default Contact;
