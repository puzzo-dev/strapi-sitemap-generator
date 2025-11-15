import { useMemo } from 'react';
import { useLanguage } from '@/components/context/LanguageContext';
import { useSiteConfig } from '@/hooks/useContent';
import { defaultSiteConfig } from '@/lib/data/';

/**
 * Hook for generating SEO-friendly title and descriptions
 * with auto-truncation and language-specific optimizations
 */
export function useSeoHelpers() {
  const { currentLanguage } = useLanguage();
  const { data: siteConfig } = useSiteConfig();
  const currentSiteConfig = siteConfig || defaultSiteConfig;

  return useMemo(() => {
    /**
     * Generates SEO-friendly title
     * @param title - The page title
     * @param maxLength - Maximum title length (default: 60)
     * @returns Optimized title string
     */
    const generateSeoTitle = (title: string, maxLength = 60): string => {
      if (!title) return "";

      // Clean the title of any HTML tags
      const cleanTitle = title.replace(/<\/?[^>]+(>|$)/g, "");

      // If title is already short enough, return it
      if (cleanTitle.length <= maxLength) return cleanTitle;

      // Truncate and add ellipsis
      return cleanTitle.substring(0, maxLength - 3) + "...";
    };

    /**
     * Generates SEO-friendly description
     * @param content - The content to generate description from
     * @param maxLength - Maximum description length (default: 155)
     * @returns Optimized description string
     */
    const generateSeoDescription = (content: string, maxLength = 155): string => {
      if (!content) return "";

      // Clean the content of any HTML tags and extra spaces
      const cleanContent = content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\s+/g, " ")
        .trim();

      // If content is already short enough, return it
      if (cleanContent.length <= maxLength) return cleanContent;

      // Find a good breakpoint (end of sentence or phrase)
      let breakpoint = cleanContent.substring(0, maxLength - 3).lastIndexOf(". ");

      // If no good sentence breakpoint, try to break at a comma
      if (breakpoint === -1 || breakpoint < maxLength / 2) {
        breakpoint = cleanContent.substring(0, maxLength - 3).lastIndexOf(", ");
      }

      // If still no good breakpoint, just truncate at the max length
      if (breakpoint === -1 || breakpoint < maxLength / 2) {
        breakpoint = maxLength - 3;
      }

      return cleanContent.substring(0, breakpoint) + "...";
    };

    /**
     * Generates keywords based on content
     * @param content - The content to extract keywords from
     * @param additionalKeywords - Any additional keywords to include
     * @param maxKeywords - Maximum number of keywords (default: 10)
     * @returns Array of keywords
     */
    const generateKeywords = (
      content: string,
      additionalKeywords: string[] = [],
      maxKeywords = 10
    ): string[] => {
      if (!content) return additionalKeywords;

      // Clean the content
      const cleanContent = content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/[^\w\s]/gi, " ")
        .toLowerCase();

      // Common words to exclude
      const stopWords = [
        "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
        "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
        "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't",
        "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
        "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
        "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
        "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
        "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's",
        "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
        "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought",
        "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
        "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
        "than", "that", "that's", "the", "their", "theirs", "them", "themselves",
        "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
        "they've", "this", "those", "through", "to", "too", "under", "until", "up",
        "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
        "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
        "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
        "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
        "yourself", "yourselves"
      ];

      // Split into words and filter out common words
      const words = cleanContent
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.includes(word));

      // Count word frequency
      const wordCounts: Record<string, number> = {};
      words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });

      // Sort by frequency
      const sortedWords = Object.keys(wordCounts).sort(
        (a, b) => wordCounts[b] - wordCounts[a]
      );

      // Take top keywords and combine with additional keywords
      const extractedKeywords = sortedWords.slice(0, maxKeywords - additionalKeywords.length);

      // Create a unique list by using an object as a map
      const uniqueKeywordsMap: Record<string, boolean> = {};
      [...additionalKeywords, ...extractedKeywords].forEach(keyword => {
        uniqueKeywordsMap[keyword] = true;
      });
      const combinedKeywords = Object.keys(uniqueKeywordsMap);

      // Return combined list limited to max keywords
      return combinedKeywords.slice(0, maxKeywords);
    };

    /**
     * Generates alternate language links
     * @param baseUrl - The base URL path
     * @param supportedLanguages - Array of supported language codes
     * @returns Array of alternate language objects
     */
    const generateAlternateLanguages = (
      baseUrl: string,
      supportedLanguages: string[] = ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw']
    ) => {
      const baseUrlWithoutLang = baseUrl.replace(/^\/[a-z]{2}\//, '/');

      return supportedLanguages.map(lang => ({
        lang,
        url: lang === 'en'
          ? baseUrlWithoutLang
          : `/${lang}${baseUrlWithoutLang}`
      }));
    };

    const getCanonicalUrl = (path: string) => {
      return `${currentSiteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
    };

    const getOgImage = (imagePath?: string, defaultImage?: string) => {
      if (imagePath) {
        return imagePath.startsWith('http') ? imagePath : `${currentSiteConfig.siteUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
      }
      return defaultImage ? `${currentSiteConfig.siteUrl}${defaultImage.startsWith('/') ? defaultImage : `/${defaultImage}`}` : `${currentSiteConfig.siteUrl}/og-image.jpg`;
    };

    return {
      generateSeoTitle,
      generateSeoDescription,
      generateKeywords,
      generateAlternateLanguages,
      getCanonicalUrl,
      getOgImage,
      siteConfig: currentSiteConfig,
      currentLanguage
    };
  }, [currentLanguage, siteConfig]);
}

export default useSeoHelpers;