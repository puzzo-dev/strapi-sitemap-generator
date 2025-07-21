import React from 'react';
import { Helmet } from 'react-helmet';
import { MetaTagsProps } from '@/lib/types';

/**
 * Component for setting SEO meta tags
 * Uses React Helmet to manage document head
 */
const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords = [],
  ogImage,
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  structuredData,
  alternateLanguages = [],
}) => {
  // Default company name to append to titles
  const COMPANY_NAME = 'I-VARSE Technologies';

  // Fallback image if not provided
  const defaultImage = '/assets/I-VARSELogo3@3x.png';

  // Format the meta title
  const metaTitle = title ? `${title} | ${COMPANY_NAME}` : COMPANY_NAME;

  // Handle keywords array
  const keywordsArray = keywords || [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      {keywordsArray.length > 0 && <meta name="keywords" content={keywordsArray.join(', ')} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content={COMPANY_NAME} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Robots Meta */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Alternate Language Tags */}
      {alternateLanguages.map((alt) => (
        <link
          key={alt.lang}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.url}
        />
      ))}

      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default MetaTags;