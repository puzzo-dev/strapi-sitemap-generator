import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { useFooter, useSiteConfig } from '@/hooks/useContent';
import AppLink from '@/components/ui/AppLink';
import { FooterProps } from '@/lib/types/';
import { footerData } from '@/lib/data/';
import { filterVisibleFooterColumns } from '@/lib/utils/visibility-helpers';

// Import icons
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC<FooterProps> = () => {
  // Fetch footer data using the consolidated hook
  const { data: footer, isLoading: isFooterLoading } = useFooter();
  const { data: siteConfig } = useSiteConfig();

  // Simplify the data merging logic - prioritize footer data, then fall back to siteConfig, then to static data
  const rawColumns = footer?.columns || footerData.columns;
  const visibleColumns = filterVisibleFooterColumns(rawColumns);
  
  const displayData = {
    companyDescription: footer?.companyDescription || siteConfig?.siteDescription || footerData.companyDescription,
    contactAddress: footer?.contactAddress || siteConfig?.contactAddress || footerData.contactAddress,
    contactPhone: footer?.contactPhone || siteConfig?.contactPhone || footerData.contactPhone,
    contactEmail: footer?.contactEmail || siteConfig?.contactEmail || footerData.contactEmail,
    contactSectionTitle: footer?.contactSectionTitle || footerData.contactSectionTitle,
    socialLinks: footer?.socialLinks || footerData.socialLinks,
    columns: visibleColumns,
    legalLinks: footer?.legalLinks || footerData.legalLinks,
    companyName: footer?.companyName || siteConfig?.siteName || footerData.companyName
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
    <footer className="bg-gray-50 dark:bg-[#0a1929] pt-20 pb-8 border-t border-gray-200 dark:border-gray-800 max-w-8xl mx-auto">
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
                <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  {displayData.contactSectionTitle}
                </h4>
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
                  {isFooterLoading && !displayData.socialLinks.length ? (
                    <div className="flex space-x-3 md:space-x-4">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                  ) : (
                    displayData.socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        aria-label={link.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))
                  )}
                </div>              
              </div>
            </div>

            {/* Links section - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterLoading && !displayData.columns.length ? (
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
                          href={link.href}
                          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {link.title}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Service Links - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {isFooterLoading && !displayData.columns.length ? (
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
                // Second column from Strapi data
                <div key={displayData.columns[1].id}>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {displayData.columns[1].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {displayData.columns[1].links.map((link, index) => (
                      <li key={index}>
                        <AppLink
                          href={link.href}
                          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {link.title}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                // Fallback services list from footerData in data.ts
                <div>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {footerData.columns[1].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerData.columns[1].links.map((link, index) => (
                      <li key={index}>
                        <AppLink
                          href={link.href}
                          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {link.title}
                        </AppLink>
                      </li>
                    ))}
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
                href={link.href}
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.title}
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;