import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';
import { usePageContent } from '@/hooks/useContent';
import { cookiesContent } from '@/lib/data/';

const Cookies: React.FC = () => {
  // Fetch cookies content from Strapi
  const { data: pageContent } = usePageContent('cookie-policy');

  // Use Strapi content if available, otherwise fall back to local data
  const title = pageContent?.title || cookiesContent.title;
  const description = pageContent?.description || cookiesContent.description;
  const content = pageContent?.sections?.[0]?.content || cookiesContent.content;

  return (
    <PolicyPageLayout
      title={title}
      slug="cookies"
      description={description}
      content={content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : null}
    />
  );
};
export default Cookies;