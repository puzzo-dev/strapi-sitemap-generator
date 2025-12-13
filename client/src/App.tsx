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
import { useNavigation } from "@/hooks/useContent";
import { footerData } from "@/lib/data/footer";
import { navItems } from "@/lib/data/config";

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

  // Fetch navigation items from Strapi with fallback to local data
  const { data: navigationItems, isLoading: isNavigationLoading } = useNavigation();

  // Use Strapi data if available, otherwise fall back to local data
  const displayNavItems = navigationItems || navItems;

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
              <Navbar onMenuToggle={toggleMobileMenu} logo={""} navItems={displayNavItems} />
              <main className="flex-grow pt-10 overflow-hidden w-full">
                <Suspense fallback={<LoadingFallback message="Loading page..." />}>
                  <AnimatePresence mode="wait">
                    <Switch>
                      <Route path="/" component={Home} />
                      <Route path="/services" component={Services} />
                      <Route path="/services/:slug" component={ServiceDetail} />
                      <Route path="/solutions" component={Solutions} />
                      <Route path="/solutions/:slug" component={SolutionDetail} />
                      <Route path="/about-us" component={About} />
                      <Route path="/team" component={Team} />
                      <Route path="/blog" component={Blog} />
                      <Route path="/blog/:slug" component={BlogPost} />
                      <Route path="/team/:slug" component={TeamMember} />
                      <Route path="/careers" component={Careers} />
                      <Route path="/careers/:slug" component={JobDetail} />
                      <Route path="/contact" component={Contact} />
                      <Route path="/faq" component={FAQ} />
                      <Route path="/case-studies" component={CaseStudies} />
                      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
                      <Route path="/industries" component={Industries} />
                      <Route path="/industries/:slug" component={IndustryDetail} />
                      {/* Policy pages */}
                      <Route path="/terms" component={Terms} />
                      <Route path="/privacy" component={Privacy} />
                      <Route path="/cookies" component={Cookies} />
                      <Route path="/accessibility" component={Accessibility} />
                      <Route path="/sitemap" component={Sitemap} />
                      <Route component={NotFound} />
                    </Switch>
                  </AnimatePresence>
                </Suspense>
              </main>
              <Footer {...footerData} />

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
