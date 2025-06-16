import React, { useMemo } from 'react';
import { usePageContent } from '@/hooks/useStrapiContent';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';
import { termsContent } from '@/lib/data';

const Terms: React.FC = () => {
  // Fetch terms content from Strapi if available
  const { data: pageContent, isLoading } = usePageContent('terms');

  // Get page title, description and content from Strapi or fallback
  const pageTitle = pageContent?.title || termsContent.title;
  const pageDescription = pageContent?.description || termsContent.description;
  const metaTitle = pageContent?.metaTitle || `${termsContent.title} | I-Varse Technologies`;
  const metaDescription = pageContent?.metaDescription || termsContent.description;

  // Extract content from the first section or use fallback content
  const content = useMemo(() => {
    // If we have valid page content with sections, use the content from the first section
    if (
      pageContent?.sections &&
      Array.isArray(pageContent.sections) &&
      pageContent.sections.length > 0 &&
      pageContent.sections[0]?.content
    ) {
      return pageContent.sections[0].content;
    }
    
    // Otherwise use the default content from data.ts
    return termsContent.content;
  }, [pageContent]);

  return (
    <PolicyPageLayout
      title={pageTitle}
      slug="terms"
      description={pageDescription}
      content={content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
      // metaTitle={metaTitle}
      // metaDescription={metaDescription}
      // loading={isLoading}
    />
  );

};
export default Terms;