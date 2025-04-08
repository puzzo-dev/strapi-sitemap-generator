import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { usePageContent } from '@/hooks/useStrapiContent';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Define the structure for sitemap sections and links
interface SitemapLink {
  title: string;
  path: string;
  description?: string;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

// Type for a section in the PageContent from database
interface PageSection {
  title: string;
  items: Array<{
    title: string;
    path: string;
    description?: string;
  }>;
}

const Sitemap: React.FC = () => {
  // Fetch page content from Strapi if available
  const { data: pageContent, isLoading } = usePageContent('sitemap');
  
  // Define default sitemap structure
  const defaultSitemapSections: SitemapSection[] = [
    {
      title: "Main Pages",
      links: [
        { title: "Home", path: "/", description: "Main landing page with overview of our services" },
        { title: "About", path: "/about", description: "Learn about I-Varse Technologies, our mission and team" },
        { title: "Services", path: "/services", description: "Explore our range of technology services" },
        { title: "Products", path: "/products", description: "View our product offerings and solutions" },
        { title: "Contact", path: "/contact", description: "Get in touch with our team" },
        { title: "Blog", path: "/blog", description: "Read our latest articles and insights" }
      ]
    },
    {
      title: "Services",
      links: [
        { title: "Web Development", path: "/services/web-development", description: "Custom website and web application development" },
        { title: "Mobile App Development", path: "/services/mobile-development", description: "Native and cross-platform mobile applications" },
        { title: "Cloud Solutions", path: "/services/cloud-solutions", description: "Cloud infrastructure and management services" },
        { title: "API Programming & Integration", path: "/services/api-integration", description: "Connect your systems with third-party services" },
        { title: "Digital Marketing", path: "/services/digital-marketing", description: "SEO, content marketing, and growth strategies" },
        { title: "UI/UX Design", path: "/services/ui-ux-design", description: "User-centered design for digital products" }
      ]
    },
    {
      title: "Legal & Policies",
      links: [
        { title: "Terms of Service", path: "/terms", description: "Terms and conditions for using our services" },
        { title: "Privacy Policy", path: "/privacy", description: "How we collect and protect your data" },
        { title: "Cookie Policy", path: "/cookies", description: "Information about cookies used on our site" },
        { title: "Accessibility", path: "/accessibility", description: "Our commitment to web accessibility" }
      ]
    },
    {
      title: "Support & Resources",
      links: [
        { title: "FAQ", path: "/faq", description: "Frequently asked questions about our services" },
        { title: "Careers", path: "/careers", description: "Job opportunities at I-Varse Technologies" },
        { title: "Documentation", path: "/docs", description: "Technical documentation for our services" },
        { title: "Support", path: "/support", description: "Get help with our products and services" }
      ]
    }
  ];
  
  // Convert page sections to our sitemap format if available
  const pageSections = Array.isArray(pageContent?.sections) 
    ? pageContent.sections.map((section: PageSection) => ({
        title: section.title,
        links: section.items.map(item => ({
          title: item.title,
          path: item.path,
          description: item.description
        }))
      }))
    : [];
  
  // Use Strapi content if available, otherwise use default
  const sitemapSections = pageSections.length > 0 ? pageSections : defaultSitemapSections;
  
  // Extract description from first section of page content
  const pageDescription = pageContent?.description || "A complete guide to all the pages and resources available on our website.";
  
  return (
    <>
      <Helmet>
        <title>Sitemap | I-Varse Technologies</title>
        <meta name="description" content={pageDescription} />
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
              {pageContent?.title || "Sitemap"}
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
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <LoadingSkeleton variant="text" lines={8} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sitemapSections.map((section, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.links.map((link: SitemapLink, linkIndex: number) => (
                        <li key={linkIndex}>
                          <Link href={link.path}>
                            <a className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                              {link.title}
                            </a>
                          </Link>
                          {link.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {link.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Need Help Finding Something?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you can't find what you're looking for, please don't hesitate to contact our support team.
              </p>
              <Link href="/contact">
                <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sitemap;