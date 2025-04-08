import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { useFooterColumns, useSocialLinks, useSiteConfig } from '@/hooks/useStrapiContent';

// Import icons
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  // Fetch footer columns from Strapi
  const { data: footerColumns, isLoading: isFooterColumnsLoading } = useFooterColumns();
  
  // Fetch social links from Strapi
  const { data: socialLinks, isLoading: isSocialLinksLoading } = useSocialLinks();
  
  // Fetch site configuration from Strapi
  const { data: siteConfig } = useSiteConfig();
  
  // Helper function to render the appropriate social icon based on platform name
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4 md:h-5 md:w-5" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 md:h-5 md:w-5" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 md:h-5 md:w-5" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 md:h-5 md:w-5" />;
      default:
        return <div className="h-4 w-4 md:h-5 md:w-5 bg-current rounded-full"></div>;
    }
  };
  
  return (
    <footer className="bg-gray-50 dark:bg-[#0a1929] pt-20 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        {/* Footer top section with columns */}
        <div className="mb-16 pb-16 border-b border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
            {/* Company Info & Address - Takes 6 cols on medium screens */}
            <div className="md:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {/* Logo and Description */}
              <div className="space-y-4">
                <Link href="/">
                  <div className="inline-block">
                    <IVarseLogo size={36} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto" />
                  </div>
                </Link>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md">
                  {siteConfig?.siteDescription || 'Leading digital innovation company providing premium web development and IT consulting services for businesses looking to transform their digital presence.'}
                </p>
                
                {/* Newsletter subscription - Desktop only */}
                <div className="pt-4 mt-4 space-y-3 border-t border-gray-100 dark:border-gray-700 hidden md:block">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Subscribe to our newsletter</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Stay updated with our latest news and offers
                  </p>
                  <NewsletterForm className="max-w-md" />
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-4">
                <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Us</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {siteConfig?.contactAddress || '5 Adams Street, Off Nnamdi Rd, Surulere, Lagos, Nigeria'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {siteConfig?.contactPhone || '+234 123 456 7890'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {siteConfig?.contactEmail || 'contact@i-varse.com'}
                    </span>
                  </li>
                </ul>
                
                {/* Social Links */}
                <div className="flex space-x-3 md:space-x-4 mt-4">
                  {isSocialLinksLoading ? (
                    <div className="flex space-x-3 md:space-x-4">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                  ) : socialLinks && socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a 
                        key={link.id} 
                        href={link.url} 
                        aria-label={link.platform}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))
                  ) : (
                    <>
                      <a href="#" aria-label="Twitter" className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                      <a href="#" aria-label="Facebook" className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                      <a href="#" aria-label="Instagram" className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                      <a href="#" aria-label="LinkedIn" className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Links section - Takes 4 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterColumnsLoading ? (
                // Loading skeletons for footer columns
                <>
                  <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-5 animate-pulse"></div>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i}>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : footerColumns && footerColumns.length > 0 ? (
                // Dynamic footer columns from Strapi - Show first column
                footerColumns.slice(0, 1).map((column) => (
                  <div key={column.id}>
                    <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                      {column.title}
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {column.links.map((link, index) => (
                        <li key={index}>
                          <Link href={link.url}>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                              {link.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                // Fallback first column
                <div>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">Company</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <Link href="/about">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          About Us
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Services
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Products
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Insights
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Careers
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Contact
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/team">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Our Team
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          FAQ
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/testimonials">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Testimonials
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Portfolio
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case-studies">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Case Studies
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/partners">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Partners
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          News & Press
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/events">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Events & Webinars
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/support">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Support
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/insights">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Insights Pages
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Service Links - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterColumnsLoading ? (
                // Loading skeletons
                <>
                  <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-5 animate-pulse"></div>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i}>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : footerColumns && footerColumns.length > 1 ? (
                // Dynamic footer columns from Strapi - Show second column if available
                footerColumns.slice(1, 2).map((column) => (
                  <div key={column.id}>
                    <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                      {column.title}
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {column.links.map((link, index) => (
                        <li key={index}>
                          <Link href={link.url}>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                              {link.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                // Fallback services list
                <div>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">Services</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <Link href="/services/web-development">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Web Development
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/mobile-development">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Mobile App Development
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/cloud-infrastructure">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Cloud Infrastructure
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/consulting">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          IT Consulting
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/digital-marketing">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          Digital Marketing
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/ui-ux-design">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          UI/UX Design
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/ai-solutions">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          AI Solutions
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/erp-integration">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          ERP Integration
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          View All Services
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Newsletter subscription - Mobile only (after services section) */}
            <div className="md:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                Stay updated with our latest tech insights and offers
              </p>
              <NewsletterForm className="mb-4" />
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} I-VARSE Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6">
            <a href="/terms" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="/privacy" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/cookies" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cookie Policy
            </a>
            <a href="/accessibility" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Accessibility
            </a>
            <a href="/sitemap" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
