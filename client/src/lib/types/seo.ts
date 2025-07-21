// SEO and Metadata Types
export interface MetaTagsProps {
  title?: string;
  description: string;
  translationKey?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
}

export interface HardcodedSEOContent {
  home: {
    title: string;
    description: string;
  };
  blog: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
  };
  products: {
    title: string;
    description: string;
  };
  team: {
    title: string;
    description: string;
  };
  teamMember: {
    loadingTitle: string;
    loadingDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  faq: {
    fallbackTitle: string;
    fallbackDescription: string;
  };
} 