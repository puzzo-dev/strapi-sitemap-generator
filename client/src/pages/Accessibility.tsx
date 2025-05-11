import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';
import { usePageContent } from '@/hooks/useStrapiContent';
import { accessibilityContent } from '@/lib/data';

const Accessibility: React.FC = () => {
  // Fetch accessibility content from Strapi
  const { data: pageContent } = usePageContent('accessibility');

  // Use Strapi content if available, otherwise fall back to local data
  const title = pageContent?.title || accessibilityContent.title;
  const description = pageContent?.description || accessibilityContent.description;
  const content = pageContent?.sections?.[0]?.content || accessibilityContent.content;

  return (
    <PolicyPageLayout
      title={title}
      slug="accessibility"
      description={description}
      content={content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
    />
  );
};

export default Accessibility;