import React, { useMemo } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageContent } from "@/hooks/useContent";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { sitemapContent } from "@/lib/data/";
import { SitemapLink, PageSection } from '@/lib/types/';
import { services } from '@/lib/data/services';
import { products } from '@/lib/data/solutions';
import { caseStudies } from '@/lib/data/case-studies';
import { blogPosts } from '@/lib/data/blog';

const Sitemap: React.FC = () => {
  // Fetch page content from Strapi if available
  const { data: pageContent, isLoading } = usePageContent("sitemap");

  // Get page title and description from Strapi or fallback
  const pageTitle = pageContent?.title || sitemapContent.title;
  const pageDescription = pageContent?.description || sitemapContent.description;
  const metaTitle = pageContent?.metaTitle || `${sitemapContent.title} | I-Varse Technologies`;
  const metaDescription = pageContent?.metaDescription || sitemapContent.description;

  // Create organized sitemap sections
  const sitemapSections = useMemo(() => {
    return [
      {
        id: 1,
        type: 'links',
        title: 'Main Pages',
        links: [
          { title: 'Home', href: '/', description: 'Navigate to homepage' },
          { title: 'About Us', href: '/about-us', description: 'Learn about our company' },
          { title: 'Team', href: '/team', description: 'Meet our team' },
          { title: 'Services', href: '/services', description: 'View our services' },
          { title: 'Solutions', href: '/solutions', description: 'Explore our solutions' },
          { title: 'Industries', href: '/industries', description: 'Industries we serve' },
          { title: 'Case Studies', href: '/case-studies', description: 'Success stories' },
          { title: 'Blog', href: '/blog', description: 'Latest news and insights' },
          { title: 'Careers', href: '/careers', description: 'Join our team' },
          { title: 'Contact', href: '/contact', description: 'Get in touch' },
          { title: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
        ]
      },
      {
        id: 2,
        type: 'links',
        title: 'Services',
        links: services.slice(0, 12).map(service => ({
          title: service.title,
          href: `/services/${service.slug}`,
          description: service.shortDescription || service.description
        }))
      },
      {
        id: 3,
        type: 'links',
        title: 'Solutions',
        links: products.slice(0, 10).map(product => ({
          title: product.title,
          href: `/solutions/${product.slug}`,
          description: product.shortDescription || product.description
        }))
      },
      {
        id: 4,
        type: 'links',
        title: 'Case Studies',
        links: caseStudies.slice(0, 10).map(caseStudy => ({
          title: caseStudy.title,
          href: `/case-studies/${caseStudy.slug}`,
          description: caseStudy.description
        }))
      },
      {
        id: 5,
        type: 'links',
        title: 'Legal Pages',
        links: [
          { title: 'Terms of Service', href: '/terms', description: 'Terms and conditions' },
          { title: 'Privacy Policy', href: '/privacy', description: 'Privacy information' },
          { title: 'Cookies Policy', href: '/cookies', description: 'Cookie usage policy' },
          { title: 'Accessibility', href: '/accessibility', description: 'Accessibility statement' },
        ]
      },
      {
        id: 6,
        type: 'links',
        title: 'News & Blog',
        links: blogPosts.slice(0, 10).map(post => ({
          title: post.title,
          href: `/blog/${post.slug}`,
          description: post.excerpt || post.description
        }))
      }
    ];
  }, []);

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
                        {section.links && section.links.map((link: any, linkIndex: number) => (
                          <div key={linkIndex} className="group">
                            <Link href={link.href}>
                              <div className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium cursor-pointer block py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                                {link.title}
                              </div>
                            </Link>
                          </div>
                        ))}
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