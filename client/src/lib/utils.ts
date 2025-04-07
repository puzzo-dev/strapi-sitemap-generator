import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine classnames with Tailwind's merge utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate URL for sharing content on Twitter
 */
export function getTwitterShareUrl(url: string, text: string, hashtags: string[] = []) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = hashtags.join(',');
  
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}${hashtags.length ? `&hashtags=${encodedHashtags}` : ''}`;
}

/**
 * Generate URL for sharing content on Facebook
 */
export function getFacebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Generate URL for sharing content on LinkedIn
 */
export function getLinkedInShareUrl(url: string, title: string, summary: string = '') {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  
  return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;
}

/**
 * Generate URL for sharing content via email
 */
export function getEmailShareUrl(subject: string, body: string, url: string) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(`${body}\n\n${url}`);
  
  return `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Generate URL for WhatsApp sharing
 */
export function getWhatsAppShareUrl(text: string, url: string) {
  const encodedText = encodeURIComponent(`${text} ${url}`);
  
  return `https://wa.me/?text=${encodedText}`;
}

/**
 * Generate URL for Telegram sharing
 */
export function getTelegramShareUrl(url: string, text: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  
  return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
}

/**
 * Generate Open Graph tags for social share previews
 */
export function generateOgTags(title: string, description: string, url: string, imageUrl?: string) {
  return [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    ...(imageUrl ? [{ property: 'og:image', content: imageUrl }] : []),
    { property: 'og:type', content: 'website' },
  ];
}

/**
 * Generate Twitter Card tags for Twitter share previews
 */
export function generateTwitterTags(title: string, description: string, url: string, imageUrl?: string) {
  return [
    { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(imageUrl ? [{ name: 'twitter:image', content: imageUrl }] : []),
    { name: 'twitter:url', content: url },
  ];
}