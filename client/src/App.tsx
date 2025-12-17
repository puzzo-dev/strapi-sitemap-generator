import React, { useState, lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { LanguageProvider } from "@/components/context/LanguageContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import MetaTags from "@/components/seo/MetaTags";
import { generateWebsiteSchema } from "@/components/seo/StructuredData";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGlobalLayout } from "@/hooks/useContent";

// Layout components (loaded eagerly for initial render)
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LoadingFallback from "@/components/ui/LoadingFallback";

// Lazy-loaded Pages (Phase 4: Route Code Splitting)
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const SolutionDetail = lazy(() => import("@/pages/SolutionDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Team = lazy(() => import("@/pages/Team"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const TeamMember = lazy(() => import("@/pages/TeamMember"));
const Careers = lazy(() => import("@/pages/Careers"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const Industries = lazy(() => import("@/pages/Industries"));
const IndustryDetail = lazy(() => import("@/pages/IndustryDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Policy Pages
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Accessibility = lazy(() => import("@/pages/Accessibility"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Use the scroll to top hook to ensure pages start at the top
  useScrollToTop();

  // Fetch global layout from CMS
  const { data: globalLayout, isLoading: isLayoutLoading } = useGlobalLayout();

  // Show loading state while fetching global layout
  if (isLayoutLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark" storageKey="i-varse-theme">
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0a1929]">
              <LoadingFallback message="Loading..." />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    );
  }

  // If CMS unavailable after loading, show error
  if (!globalLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark" storageKey="i-varse-theme">
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0a1929] text-gray-800 dark:text-white">
              <div className="text-center max-w-md p-8">
                <h1 className="text-2xl font-bold mb-4">CMS Unavailable</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Unable to load site configuration. Please ensure the CMS backend is running.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    );
  }

  // Map page slugs to components
  const pageComponentMap: Record<string, React.ComponentType<any>> = {
    'home': Home,
    'services': Services,
    'solutions': Solutions,
    'about-us': About,
    'team': Team,
    'blog': Blog,
    'careers': Careers,
    'contact-us': Contact,
    'faq': FAQ,
    'case-studies': CaseStudies,
    'industries': Industries,
    'terms-of-service': Terms,
    'privacy-policy': Privacy,
    'cookie-policy': Cookies,
    'accessibility': Accessibility,
    'sitemap': Sitemap,
  };

  // Generate routes from menu structure and footer links
  const generateRoutes = () => {
    const routes: Array<{ path: string; component: React.ComponentType<any> }> = [];

    // Process header menu items
    globalLayout.header.menu_items.forEach((menuItem: any) => {
      const mainLink = menuItem.menuLink[0];
      if (mainLink.linkType === 'internal' && mainLink.page) {
        const slug = mainLink.page.slug;
        const component = pageComponentMap[slug];
        if (component) {
          routes.push({
            path: slug === 'home' ? '/' : `/${slug}`,
            component
          });
        }
      }

      // Process child menu items
      menuItem.menu_items?.forEach((childItem: any) => {
        const childLink = childItem.menuLink[0];
        if (childLink.linkType === 'internal' && childLink.page) {
          const slug = childLink.page.slug;
          const component = pageComponentMap[slug];
          if (component) {
            routes.push({ path: `/${slug}`, component });
          }
        }
      });
    });

    // Process footer legal links
    globalLayout.footer.legalFooter?.legalLink?.forEach((link: any) => {
      if (link.linkType === 'internal' && link.page) {
        const slug = link.page.slug;
        const component = pageComponentMap[slug];
        if (component && !routes.find(r => r.path === `/${slug}`)) {
          routes.push({ path: `/${slug}`, component });
        }
      }
    });

    return routes;
  };

  const dynamicRoutes = generateRoutes();

  // Transform menu items for MobileMenu
  const displayNavItems = globalLayout.header.menu_items.map((menuItem: any) => {
    const mainLink = menuItem.menuLink[0];
    const path = mainLink.linkType === 'internal' && mainLink.page
      ? mainLink.page.slug === 'home' ? '/' : `/${mainLink.page.slug}`
      : mainLink.externalUrl || '/';

    return {
      id: menuItem.id,
      label: mainLink.label,
      url: path,
      translationKey: null,
      children: menuItem.menu_items?.map((childItem: any) => {
        const childLink = childItem.menuLink[0];
        const childPath = childLink.linkType === 'internal' && childLink.page
          ? `/${childLink.page.slug}`
          : childLink.externalUrl || '/';

        return {
          id: childItem.id,
          label: childLink.label,
          url: childPath,
          translationKey: null
        };
      }) || []
    };
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Generate website schema for global SEO
  const websiteSchema = generateWebsiteSchema();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AnalyticsProvider>
          <ThemeProvider defaultTheme="dark" storageKey="i-varse-theme">
            {/* Base SEO MetaTags that will be overridden by page-specific ones */}
            <MetaTags
              title="Innovative Technology Solutions"
              description="I-VARSE Technologies provides cutting-edge technology solutions for businesses and individuals, focusing on innovation, quality, and client satisfaction."
              keywords={["technology", "innovation", "digital transformation", "software development", "IT solutions", "I-Varse"]}
              structuredData={websiteSchema}
              ogType="website"
              canonicalUrl={`https://www.itechnologies.ng${location}`}
              ogUrl={`https://www.itechnologies.ng${location}`}
            />

            <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a1929] text-gray-800 dark:text-white overflow-hidden w-full">
              <Navbar onMenuToggle={toggleMobileMenu} />
              <main className="flex-grow pt-10 overflow-hidden w-full">
                <Suspense fallback={<LoadingFallback message="Loading page..." />}>
                  <AnimatePresence mode="wait">
                    <Switch>
                      {/* Collection detail routes (dynamic slugs) - Must come before static routes */}
                      <Route path="/services/:slug" component={ServiceDetail} />
                      <Route path="/solutions/:slug" component={SolutionDetail} />
                      <Route path="/blog/:slug" component={BlogPost} />
                      <Route path="/team/:slug" component={TeamMember} />
                      <Route path="/careers/:slug" component={JobDetail} />
                      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
                      <Route path="/industries/:slug" component={IndustryDetail} />

                      {/* Static routes with fallback (always available) */}
                      <Route path="/" component={Home} />
                      <Route path="/home" component={Home} />
                      <Route path="/services" component={Services} />
                      <Route path="/solutions" component={Solutions} />
                      <Route path="/about-us" component={About} />
                      <Route path="/team" component={Team} />
                      <Route path="/blog" component={Blog} />
                      <Route path="/careers" component={Careers} />
                      <Route path="/contact-us" component={Contact} />
                      <Route path="/faq" component={FAQ} />
                      <Route path="/case-studies" component={CaseStudies} />
                      <Route path="/industries" component={Industries} />
                      <Route path="/terms-of-service" component={Terms} />
                      <Route path="/privacy-policy" component={Privacy} />
                      <Route path="/cookie-policy" component={Cookies} />
                      <Route path="/accessibility" component={Accessibility} />
                      <Route path="/sitemap" component={Sitemap} />

                      {/* Dynamic routes from CMS (can override static routes) */}
                      {dynamicRoutes.map((route) => (
                        <Route key={route.path} path={route.path} component={route.component} />
                      ))}

                      {/* 404 fallback */}
                      <Route component={NotFound} />
                    </Switch>
                  </AnimatePresence>
                </Suspense>
              </main>
              <Footer />

              {/* Floating buttons container - positioned at root level */}
              <FloatingButtons />

              {/* Mobile Menu - positioned at root level */}
              <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} navItems={displayNavItems} />
            </div>
          </ThemeProvider>
        </AnalyticsProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
