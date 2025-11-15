import React, { useMemo } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageContent } from "@/hooks/useContent";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { sitemapContent } from "@/lib/data/";
import { SitemapLink, PageSection } from '@/lib/types/';

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
          // Access links from settings.links
          links: (section.settings?.links || []).map((link: any) => ({
            title: link.title || "Link",
            // Handle different URL structures and ensure proper href
            href: typeof link.url === 'string' ? link.url :
              link.url?.url ? link.url.url :
                link.path ? (typeof link.path === 'string' ? link.path : link.path.url) :
                  "#",
            description: link.description,
            openInNewTab: link.openInNewTab,
            isExternal: link.isExternal
          })),
        }));
    }

    // Otherwise use the default data from sitemap.ts
    return sitemapContent.sections
      .filter(section => section.type === 'links')
      .map((section) => ({
        id: section.id,
        type: section.type,
        title: section.title || "Section",
        // Access links from settings.links in the fallback data
        links: (section.settings?.links || []).map((link: any) => ({
          title: link.title || "Link",
          // Handle different URL structures from fallback data and ensure proper href
          href: typeof link.path === 'string' ? link.path :
            link.path?.url ? link.path.url :
              link.url ? (typeof link.url === 'string' ? link.url : link.url.url) :
                "#",
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
        {/* Add structured data for Google Search Console */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": "https://itechnologies.ng/sitemap",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": sitemapSections.flatMap((section, sectionIndex) =>
                section.links.map((link: any, linkIndex: number) => ({
                  "@type": "ListItem",
                  "position": sectionIndex * 100 + linkIndex + 1,
                  "item": {
                    "@type": "WebPage",
                    "name": link.title,
                    "url": `https://itechnologies.ng${link.href}`,
                    "description": link.description
                  }
                }))
              )
            }
          })}
        </script>
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
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
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
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <LoadingSkeleton.Text lines={6} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {sitemapSections.map((section, index) => (
                  <Card key={section.id || index} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
                        {section.title}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.links && section.links.map(
                          (link: SitemapLink, linkIndex: number) => (
                            <div key={linkIndex} className="group">
                              {link.isExternal || link.openInNewTab ? (
                                <a
                                  href={link.href}
                                  target={link.openInNewTab ? "_blank" : undefined}
                                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium block py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                                >
                                  {link.title}
                                </a>
                              ) : (
                                <Link href={link.href}>
                                  <div className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium cursor-pointer block py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                                    {link.title}
                                  </div>
                                </Link>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
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