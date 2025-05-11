import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';
import { usePageContent } from '@/hooks/useStrapiContent';
import { privacyContent } from '@/lib/data';

const Privacy: React.FC = () => {
  // Fetch privacy content from Strapi
  const { data: pageContent } = usePageContent('privacy');

  // Use Strapi content if available, otherwise fall back to local data
  const title = pageContent?.title || privacyContent.title;
  const description = pageContent?.description || privacyContent.description;
  const content = pageContent?.sections?.[0]?.content || privacyContent.content;

  return (
    <PolicyPageLayout
      title={title}
      slug="privacy"
      description={description}
      content={content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
    />
  );
};

export default Privacy;