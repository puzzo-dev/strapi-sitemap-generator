import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useNavigation, useSiteConfig } from '@/hooks/useStrapiContent';
import { NavbarProps, NavItem, UrlProps } from '@/lib/types';
import { navItems as defaultNavItems } from '@/lib/data/';
import { useTheme } from '@/components/ui/theme-provider';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle = () => { } }) => {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  // Fetch navigation links from Strapi with fallback
  const { data: strapiNavItems, isLoading: isNavLoading, error: navError } = useNavigation();

  // Fetch site configuration from Strapi with fallback
  // const { data: siteConfig, isLoading: isConfigLoading, error: configError } = useSiteConfig();

  // Use Strapi data if available, otherwise fallback to default data
  const navLinks = (() => {
    // First try to use Strapi data
    if (strapiNavItems && !navError && strapiNavItems.length > 0) {
      return strapiNavItems.map((item: NavItem) => ({
        id: item.id,
        name: item.translationKey ? t(`nav.${item.translationKey}`, item.label) : item.label,
        path: getUrlPath(item.url),
        isButton: item.isButton,
        children: item.children ? item.children.map((child: NavItem) => ({
          id: child.id,
          name: child.translationKey ? t(`nav.${child.translationKey}`, child.label) : child.label,
          path: getUrlPath(child.url)
        })) : undefined
      }));
    }

    // Otherwise use imported default data
    return defaultNavItems.map(item => ({
      id: item.id,
      name: item.translationKey ? t(`nav.${item.translationKey}`, item.label) : item.label,
      path: getUrlPath(item.url),
      isButton: item.isButton,
      children: item.children ? item.children.map((child: NavItem) => ({
        id: child.id,
        name: child.translationKey ? t(`nav.${child.translationKey}`, child.label) : child.label,
        path: getUrlPath(child.url)
      })) : undefined
    }));
  })();

  // Helper function to extract path from UrlProps
  function getUrlPath(url: UrlProps | string): string {
    if (typeof url === 'string') return url;
    return url?.url || '/';
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-[#0a1929]/95 shadow-md backdrop-blur-md'
        : 'bg-white/80 dark:bg-[#0a1929]/80 backdrop-blur-md shadow-sm'
        }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <IVarseLogo
                  size={36}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto"
                  variant={theme === 'dark' ? 'light' : 'dark'}
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex flex-wrap items-center space-x-2 md:space-x-2 lg:space-x-3 xl:space-x-5 justify-end">
              {/* Display navigation links */}
              {navLinks.filter(item => !item.isButton).map((item) => (
                item.children && item.children.length > 0 ? (
                  <div key={item.id} className="relative group">
                    <Link href={item.path}>
                      <div className="cursor-pointer">
                        <span className={`
                          px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                          ${isActive(item.path)
                            ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400'
                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                          }
                        `}>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                    {/* Dropdown menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#0a1929] rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity z-40">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link href={child.path}>
                              <span className={`
                                block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors
                                ${isActive(child.path) ? 'text-blue-600 dark:text-blue-400' : ''}
                              `}>
                                {child.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link key={item.id} href={item.path}>
                    <div className="cursor-pointer">
                      <span className={`
                        px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                        ${isActive(item.path)
                          ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400'
                          : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                      `}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )
              ))}
            </div>

            {/* Contact button */}
            <div className="ml-3 md:ml-4 lg:ml-6">
              {navLinks.find(item => item.isButton) ? (
                <GradientButton
                  href={navLinks.find(item => item.isButton)?.path || "/contact"}
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  {navLinks.find(item => item.isButton)?.name || t('button.contactUs', 'Contact Us')}
                </GradientButton>
              ) : (
                <GradientButton href="/contact" size="sm" className="text-xs md:text-sm">
                  {t('button.contactUs', 'Contact Us')}
                </GradientButton>
              )}
            </div>

            {/* Desktop language selector */}
            <div className="ml-2 md:ml-3 lg:ml-4">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile controls - always visible on small screens */}
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            {/* Mobile language selector - compact version */}
            <div className="mr-1 sm:mr-2">
              <LanguageSelector compact={true} />
            </div>

            {/* Mobile menu toggle button */}
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800/50"
              onClick={onMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;