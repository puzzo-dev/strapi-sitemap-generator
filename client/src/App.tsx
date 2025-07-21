import React, { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { LanguageProvider } from "@/components/context/LanguageContext";
import MetaTags from "@/components/seo/MetaTags";
import { generateWebsiteSchema } from "@/components/seo/StructuredData";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useNavigation } from "@/hooks/useStrapiContent";
import { footerData } from "@/lib/data/footer";
import { navItems } from "@/lib/data/config";
// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import TeamMember from "@/pages/TeamMember";
import Careers from "@/pages/Careers";
import JobDetail from "@/pages/JobDetail";
import FAQ from "@/pages/FAQ";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import Industries from "@/pages/Industries";
import NotFound from "@/pages/not-found";
import IndustryDetail from "@/pages/IndustryDetail";

// Policy Pages
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import Accessibility from "@/pages/Accessibility";
import Sitemap from "@/pages/Sitemap";

// Layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import FloatingButtons from "@/components/layout/FloatingButtons";

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

          <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a1929] text-gray-800 dark:text-white">
            <Navbar onMenuToggle={toggleMobileMenu} logo={""} navItems={displayNavItems} />
            <main className="flex-grow pt-10">
              <AnimatePresence mode="wait">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/services" component={Services} />
                  <Route path="/services/:slug" component={ServiceDetail} />
                  <Route path="/products" component={Products} />
                  <Route path="/products/:slug" component={ProductDetail} />
                  <Route path="/about" component={About} />
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
            </main>
            <Footer {...footerData} />

            {/* Floating buttons container - positioned at root level */}
            <FloatingButtons />

            {/* Mobile Menu - positioned at root level */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} navItems={displayNavItems} />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
