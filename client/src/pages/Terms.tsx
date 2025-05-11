import React from 'react';
import { usePageContent } from '@/hooks/useStrapiContent';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';
import { termsContent } from '@/lib/data';

const Terms: React.FC = () => {
  // Fetch terms content from Strapi
  const { data: pageContent } = usePageContent('terms');

  // Use Strapi content if available, otherwise fall back to local data
  const title = pageContent?.title || termsContent.title;
  const description = pageContent?.description || termsContent.description;
  const content = pageContent?.sections?.[0]?.content || termsContent.content;

  return (
    <PolicyPageLayout
      title={title}
      slug="terms"
      description={description}
      content={content}
    />
  );
};

export default Terms;