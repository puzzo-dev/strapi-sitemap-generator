import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { useGlobalLayout } from '@/hooks/useContent';
import AppLink from '@/components/ui/AppLink';
import { useTheme } from '@/components/ui/theme-provider';
import { FooterProps, GlobalLayoutData, CMSFooterMenu, CMSSocialLink, CMSLink, TransformedFooterLink, TransformedSocialLink, TransformedFooterColumn } from '@/lib/types/';

// Import icons
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC<FooterProps> = () => {
  // Fetch global layout from CMS
  const { data: globalLayout } = useGlobalLayout();
  const { actualTheme } = useTheme();

  if (!globalLayout) {
    throw new Error('CMS unavailable - global layout not found');
  }

  const footer = globalLayout.footer;
  const contactInfo = footer.companyContactInfo;
  const strapiBase = import.meta.env.VITE_STRAPI_API_URL || '';
  const resolveUrl = (url?: string) => {
    if (!url) return undefined;
    return url.startsWith('http') ? url : `${strapiBase}${url}`;
  };

  const footerLogo = footer.footerLogo;
  const lightLogo = resolveUrl(footerLogo?.logoImageLight?.url);
  const darkLogo = resolveUrl(footerLogo?.logoImageDark?.url);
  const footerLogoSrc = actualTheme === 'dark' ? (lightLogo || darkLogo) : (darkLogo || lightLogo);
  const footerLogoAlt = footerLogo?.logoText || 'I-Varse';

  // Transform CMS footer menu structure to component format
  const footerColumns: TransformedFooterColumn[] = footer.FooterMenu.map((menuSection: CMSFooterMenu) => ({
    id: menuSection.id,
    title: menuSection.footerMenuTitle,
    links: menuSection.footerMenuLink.map((link: CMSLink): TransformedFooterLink => {
      const href = link.linkType === 'internal' && link.page
        ? `/${link.page.slug}`
        : link.externalUrl || '/';

      return {
        title: link.label,
        href: href
      };
    })
  }));

  // Transform social links
  const socialLinks: TransformedSocialLink[] = contactInfo.socialLinks.map((social: CMSSocialLink) => ({
    id: social.id,
    platform: social.platform,
    href: social.linkUrl.externalUrl
  }));

  // Transform legal links - legalFooter is an object with legalLink array inside
  const legalLinks: TransformedFooterLink[] = footer.legalFooter?.legalLink?.map((legal: CMSLink): TransformedFooterLink => {
    const href = legal.linkType === 'internal' && legal.page
      ? `/${legal.page.slug}`
      : legal.externalUrl || '/';

    return {
      title: legal.label,
      href: href
    };
  }) || [];

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
      <div className="container-custom max-w-8xl mx-auto">
        {/* Footer top section with columns */}
        <div className="mb-16 pb-16 border-b border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 lg:gap-x-8 gap-y-12">
            {/* Company Info & Address - Takes 6 cols on medium screens */}
            <div className="md:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-8">
              {/* Logo and Description */}
              <div className="space-y-4">
                <Link href="/">
                  <div className="inline-block">
                    {footerLogoSrc ? (
                      <img
                        src={footerLogoSrc}
                        alt={footerLogoAlt}
                        className="h-10 w-auto md:h-12 lg:h-14"
                        loading="lazy"
                      />
                    ) : (
                      <IVarseLogo
                        size={40}
                        className="h-10 w-auto md:h-12 lg:h-14"
                        variant={actualTheme === 'dark' ? 'light' : 'dark'}
                      />
                    )}
                  </div>
                </Link>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md">
                  {footer.companyDescFooter}
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
                  Contact Us
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {contactInfo.address.formatted}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {contactInfo.phone}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {contactInfo.email}
                    </span>
                  </li>
                </ul>

                {/* Social Links */}
                <div className="flex space-x-3 md:space-x-4 mt-4">
                  {socialLinks.map((link) => (
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
                  ))}
                </div>
              </div>
            </div>

            {/* Links section - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {footerColumns.length > 0 && (
                <div key={footerColumns[0].id}>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {footerColumns[0].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerColumns[0].links.map((link, index: number) => (
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

            {/* Service Links - Takes 3 cols on medium screens */}
            <div className="md:col-span-3 lg:col-span-3">
              {footerColumns.length > 1 && (
                <div key={footerColumns[1].id}>
                  <h4 className="text-sm md:text-base font-bold mb-3 sm:mb-4 md:mb-5 text-gray-900 dark:text-white uppercase tracking-wider">
                    {footerColumns[1].title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerColumns[1].links.map((link, index: number) => (
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
            &copy; {new Date().getFullYear()} I-Varse Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6">
            {legalLinks.map((link, index: number) => (
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