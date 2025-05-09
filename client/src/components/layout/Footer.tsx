import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { useFooterColumns, useSocialLinks, useSiteConfig, useFooter } from '@/hooks/useStrapiContent';
import AppLink from '@/components/ui/AppLink';
import { FooterProps } from '@/lib/types';
import { footerData } from '@/lib/data';

// Import icons
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC<FooterProps> = () => {
  // Fetch footer data using the new hook
  const { data: footer, isLoading: isFooterLoading } = useFooter();
  // Keep existing hooks for backward compatibility during transition
  const { data: footerColumns, isLoading: isFooterColumnsLoading } = useFooterColumns();
  const { data: socialLinks, isLoading: isSocialLinksLoading } = useSocialLinks();
  const { data: siteConfig } = useSiteConfig();

  // Replace the individual fallbacks with a more structured approach
  const displayData: FooterProps = {
    companyDescription: footer?.companyDescription || siteConfig?.siteDescription || 'Leading digital innovation company...',
    contactAddress: footer?.contactAddress || siteConfig?.contactAddress || '5 Adams Street, Off Nnamdi Rd, Surulere, Lagos, Nigeria',
    contactPhone: footer?.contactPhone || siteConfig?.contactPhone || '+234 123 456 7890',
    contactEmail: footer?.contactEmail || siteConfig?.contactEmail || 'contact@i-varse.com',
    socialLinks: footer?.socialLinks || socialLinks || [],
    columns: footer?.columns || footerColumns || [],
    legalLinks: footer?.legalLinks || [
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Cookie Policy', url: '/cookies' },
      { label: 'Accessibility', url: '/accessibility' },
      { label: 'Sitemap', url: '/sitemap' }
    ],
    companyName: footer?.companyName || 'I-VARSE Technologies'
  };
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
                  {displayData.companyDescription}
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
                      {displayData.contactAddress}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {displayData.contactPhone}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {displayData.contactEmail}
                    </span>
                  </li>
                </ul>

                {/* Social Links */}
                <div className="flex space-x-3 md:space-x-4 mt-4">
                  {isSocialLinksLoading && !displayData.socialLinks.length ? (
                    <div className="flex space-x-3 md:space-x-4">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                  ) : displayData.socialLinks.length > 0 ? (
                    displayData.socialLinks.map((link) => (
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
                    // Fallback social links
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
                  )}                </div>
              </div>
            </div>

            {/* Links section - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterColumnsLoading && !displayData.columns.length ? (
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
              ) : displayData.columns.length > 0 ? (
                // First column
                <div key={displayData.columns[0].id}>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {displayData.columns[0].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {displayData.columns[0].links.map((link, index) => (
                      <li key={index}>
                        <AppLink
                          href={link.url}
                          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {link.label}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                // Fallback first column
                <div>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">Company</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <AppLink
                        href="/about"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        About Us
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Services
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/products"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Products
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/blog"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Insights
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/careers"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Careers
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/contact"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Contact
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/about#team"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Our Team
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/faq"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        FAQ
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/blog"
                        className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        Insights Pages
                      </AppLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Service Links - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterColumnsLoading && !displayData.columns.length ? (
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
              ) : displayData.columns.length > 1 ? (
                // Second column
                <div key={displayData.columns[1].id}>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {displayData.columns[1].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {displayData.columns[1].links.map((link, index) => (
                      <li key={index}>
                        <AppLink
                          href={link.url}
                          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {link.label}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                // Fallback services list
                <div>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">Services</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <AppLink
                        href="/services/web-development"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Web Development
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/mobile-development"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Mobile App Development
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/cloud-infrastructure"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Cloud Infrastructure
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/consulting"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        IT Consulting
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/digital-marketing"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        Digital Marketing
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/ui-ux-design"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        UI/UX Design
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/ai-solutions"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        AI Solutions
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services/erp-integration"
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        ERP Integration
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        href="/services"
                        className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        View All Services
                      </AppLink>
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
            &copy; {new Date().getFullYear()} {displayData.companyName}. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6">
            {displayData.legalLinks.map((link, index) => (
              <AppLink
                key={index}
                href={link.url}
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;