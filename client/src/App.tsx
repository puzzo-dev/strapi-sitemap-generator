import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { LanguageProvider } from "@/components/context/LanguageContext";
import { Helmet } from "react-helmet";
import MetaTags from "@/components/seo/MetaTags";
import { generateWebsiteSchema } from "@/components/seo/StructuredData";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import TeamMember from "@/pages/TeamMember";
import Careers from "@/pages/Careers";
import JobDetail from "@/pages/JobDetail";
import NotFound from "@/pages/not-found";

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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Use the scroll to top hook to ensure pages start at the top
  useScrollToTop();

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
            description="I-Varse Limited provides cutting-edge technology solutions for businesses and individuals, focusing on innovation, quality, and client satisfaction."
            keywords={["technology", "innovation", "digital transformation", "software development", "IT solutions", "I-Varse"]}
            structuredData={websiteSchema}
            ogType="website"
            canonicalUrl={`https://www.ivarse.com${location}`}
            ogUrl={`https://www.ivarse.com${location}`}
          />

          <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a1929] text-gray-800 dark:text-white">
            <Navbar onMenuToggle={toggleMobileMenu} />
            <main className="flex-grow pt-20">
              <AnimatePresence mode="wait">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/services" component={Services} />
                  <Route path="/services/:id" component={ServiceDetail} />
                  <Route path="/products" component={Products} />
                  <Route path="/products/:id" component={ProductDetail} />
                  <Route path="/about" component={About} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/blog/:slug" component={BlogPost} />
                  <Route path="/team/:id" component={TeamMember} />
                  <Route path="/careers" component={Careers} />
                  <Route path="/careers/:id" component={JobDetail} />
                  <Route path="/contact" component={Contact} />
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
            <Footer />
            
            {/* Floating buttons container - positioned at root level */}
            <FloatingButtons />
            
            {/* Mobile Menu - positioned at root level */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
