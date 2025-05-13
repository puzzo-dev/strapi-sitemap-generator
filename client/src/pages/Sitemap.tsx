import React, { useMemo } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { usePageContent } from "@/hooks/useStrapiContent";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { SitemapLink, PageSection } from "@/lib/types";
import { sitemapContent } from "@/lib/data";

const Sitemap: React.FC = () => {
  // Fetch page content from Strapi if available
  const { data: pageContent, isLoading } = usePageContent("sitemap");

  // Get page title and description from Strapi or fallback
  const pageTitle = pageContent?.title || sitemapContent.title;
  const pageDescription = pageContent?.description || sitemapContent.description;
  const metaTitle = pageContent?.metaTitle || `${sitemapContent.title} | I-Varse Technologies`;
  const metaDescription = pageContent?.metaDescription || sitemapContent.description;

  // Create sitemap sections from page content or fallback to default
  const sitemapSections = useMemo(() => {
    // If we have valid page content with sections, use it
    if (
      pageContent?.sections &&
      Array.isArray(pageContent.sections) &&
      pageContent.sections.length > 0
    ) {
      return pageContent.sections
        .filter(section => section.type === 'links')
        .map((section: PageSection) => ({
          id: section.id,
          type: section.type,
          title: section.title || "Section",
          // Access links from settings.links instead of items
          links: (section.settings?.links || []).map((link: SitemapLink) => ({
            title: link.title || "Link",
            path: link?.url || "#", // Extract the url from the UrlProps object
            description: link.description,
            openInNewTab: link?.openInNewTab,
            isExternal: link?.isExternal
          })),
        }));
    }

    // Otherwise use the default data from data.ts
    return sitemapContent.sections
      .filter(section => section.type === 'links')
      .map((section) => ({
        id: section.id,
        type: section.type,
        title: section.title || "Section",
        // Access links from settings.links in the fallback data
        links: (section.settings?.links || []).map((link: SitemapLink) => ({
          title: link.title || "Link",
          path: link.url || "#", // Use path directly from fallback data
          description: link.description,
          openInNewTab: link.openInNewTab,
          isExternal: link.isExternal
        })),
      }));
  }, [pageContent]);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6 animate-fade-in-up text-center">
              {pageTitle}
            </h1>

            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            ) : (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                {pageDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <LoadingSkeleton variant="text" lines={8} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sitemapSections.map((section, index) => (
                  <div
                    key={section.id || index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.links && section.links.map(
                        (link: SitemapLink, linkIndex: number) => (
                          <li key={linkIndex}>
                            {link.isExternal || link.openInNewTab ? (
                              <a
                                href={link.url}
                                target={link.openInNewTab ? "_blank" : undefined}
                                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                              >
                                {link.title}
                              </a>
                            ) : (
                              <Link href={link.url}>
                                <div className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
                                  {link.title}
                                </div>
                              </Link>
                            )}
                            {link.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {link.description}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sitemap;