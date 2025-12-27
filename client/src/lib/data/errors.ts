import { ErrorContent } from '@/lib/types/core';

// Error Content for 404 and other error pages
export const errorContent: ErrorContent = {
  title: "Page Not Found",
  subtitle: "The page you're looking for doesn't exist",
  description: "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.",
  primaryButtonText: "Go Home",
  primaryButtonUrl: "/",
  secondaryButtonText: "Contact Support",
  secondaryButtonUrl: "/contact",
  image: "/src/assets/images/IMG_2253.JPG",
  metaTitle: "Page Not Found - I-VARSE Technologies",
  metaDescription: "The page you're looking for doesn't exist. Please check the URL or navigate back to our homepage."
};

// Loading Content
export const loadingContent: ErrorContent = {
  title: "Loading...",
  subtitle: "Please wait while we load the content",
  description: "We're preparing the content for you. This should only take a moment.",
  primaryButtonText: "Refresh Page",
  primaryButtonUrl: "#",
  secondaryButtonText: "Go Home",
  secondaryButtonUrl: "/",
  image: "/src/assets/images/IMG_2253.JPG",
  metaTitle: "Loading - I-VARSE Technologies",
  metaDescription: "Loading content, please wait."
};

// Not Found Content for specific items
export const notFoundContent: ErrorContent = {
  title: "Item Not Found",
  subtitle: "The item you're looking for doesn't exist",
  description: "Sorry, we couldn't find the item you're looking for. It might have been removed or you entered the wrong information.",
  primaryButtonText: "Go Back",
  primaryButtonUrl: "#",
  secondaryButtonText: "Browse All",
  secondaryButtonUrl: "/",
  image: "/src/assets/images/IMG_2253.JPG",
  metaTitle: "Item Not Found - I-VARSE Technologies",
  metaDescription: "The item you're looking for doesn't exist. Please check your search criteria or browse our available items."
};

export const errorPages = {
  404: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    image: "/src/assets/images/IMG_2253.JPG",
    buttonText: "Go Home",
    buttonHref: "/"
  },
  500: {
    title: "Server Error",
    description: "Something went wrong on our end. Please try again later.",
    image: "/src/assets/images/IMG_2254.JPG",
    buttonText: "Go Home",
    buttonHref: "/"
  },
  403: {
    title: "Access Forbidden",
    description: "You don't have permission to access this resource.",
    image: "/src/assets/images/IMG_2255.JPG",
    buttonText: "Go Home",
    buttonHref: "/"
  }
}; 