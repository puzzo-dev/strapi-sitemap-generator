import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ThemeSelector from '@/components/ui/ThemeSelector';
import { useGlobalLayout } from '@/hooks/useContent';
import { NavbarProps, GlobalLayoutData, CMSMenuItem } from '@/lib/types';
import { useTheme } from '@/components/ui/theme-provider';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle = () => { } }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [location] = useLocation();
  const { t } = useTranslation();
  const { actualTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Cleanup timeout on unmount
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const isActive = (path: string) => location === path;

  // Fetch global layout from CMS
  const { data: globalLayout } = useGlobalLayout();

  if (!globalLayout) {
    throw new Error('CMS unavailable - global layout not found');
  }

  // Transform CMS menu structure to component format
  interface TransformedNavLink {
    id: number;
    name: string;
    path: string;
    isButton: boolean;
    children?: Array<{ id: number; name: string; path: string }>;
  }

  const navLinks: TransformedNavLink[] = globalLayout.header.menu_items.map((menuItem: CMSMenuItem) => {
    const mainLink = menuItem.menuLink[0];
    const path = mainLink.linkType === 'internal' && mainLink.page
      ? `/${mainLink.page.slug}`
      : mainLink.externalUrl || '/';

    return {
      id: menuItem.id,
      name: mainLink.label,
      path: path,
      isButton: mainLink.label.toLowerCase().includes('contact'),
      children: menuItem.menu_items?.map((childItem: CMSMenuItem) => {
        const childLink = childItem.menuLink[0];
        const childPath = childLink.linkType === 'internal' && childLink.page
          ? `/${childLink.page.slug}`
          : childLink.externalUrl || '/';

        return {
          id: childItem.id,
          name: childLink.label,
          path: childPath
        };
      }) || []
    };
  });

  const handleMouseEnter = (itemId: number, hasChildren: boolean) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (hasChildren) {
      setActiveDropdown(itemId);
    }
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // Set a delay before closing the dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 1000); // 1 second delay
  };

  const handleDropdownItemClick = () => {
    // Clear timeout and immediately close dropdown when item is clicked
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" ref={navRef}>
      <nav
        className={`transition-all duration-300 ${scrolled
          ? 'bg-white/95 dark:bg-[#0a1929]/95 shadow-lg backdrop-blur-md'
          : 'bg-white/80 dark:bg-[#0a1929]/80 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  {(() => {
                    const siteLogo = globalLayout.header?.siteLogo;
                    const strapiBase = import.meta.env.VITE_STRAPI_API_URL;
                    const resolveUrl = (url?: string) => {
                      if (!url) return undefined;
                      return url.startsWith('http') ? url : `${strapiBase}${url}`;
                    };

                    const lightLogo = resolveUrl(siteLogo?.logoImageLight?.url);
                    const darkLogo = resolveUrl(siteLogo?.logoImageDark?.url);

                    // Use CMS logos when available, otherwise fallback to static logo component
                    if (lightLogo || darkLogo) {
                      const isDark = actualTheme === 'dark';
                      const logoSrc = isDark ? (lightLogo || darkLogo) : (darkLogo || lightLogo);
                      const altText = siteLogo?.logoText || 'I-VARSE';

                      return (
                        <img
                          src={logoSrc}
                          alt={altText}
                          className="h-10 w-auto sm:h-11 md:h-12"
                          loading="lazy"
                        />
                      );
                    }

                    return (
                      <IVarseLogo
                        size={50}
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto"
                        variant={actualTheme === 'dark' ? 'light' : 'dark'}
                      />
                    );
                  })()}
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-0.5 lg:space-x-1 xl:space-x-2">
              {navLinks.filter(item => !item.isButton).map((item) => {
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.id, !!hasChildren)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hasChildren ? (
                      // Dropdown Menu Item
                      <>
                        <Link href={item.path}>
                          <div className={`
                            flex items-center gap-1 px-2 py-2 text-xs md:text-sm lg:text-base font-semibold transition-colors duration-200 rounded-md cursor-pointer whitespace-nowrap
                            ${isActive(item.path)
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                            }
                          `}>
                            {item.name}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''
                                }`}
                            />
                          </div>
                        </Link>

                        {/* Dropdown Panel */}
                        {activeDropdown === item.id && (
                          <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-[9999]">
                            {item.children?.map((child) => (
                              <Link key={child.id} href={child.path}>
                                <div
                                  className={`
                                    block px-4 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer
                                    ${isActive(child.path)
                                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    }
                                  `}
                                  onClick={handleDropdownItemClick}
                                >
                                  {child.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // Regular Menu Item
                      <Link href={item.path}>
                        <div className={`
                          px-2 py-2 text-xs md:text-sm lg:text-base font-semibold transition-colors duration-200 rounded-md cursor-pointer whitespace-nowrap
                          ${isActive(item.path)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }
                        `}>
                          {item.name}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Contact Button */}
              <div className="ml-2 lg:ml-3 xl:ml-4">
                {navLinks.find(item => item.isButton) ? (
                  <GradientButton
                    href={navLinks.find(item => item.isButton)?.path || "/contact-us"}
                    size="sm"
                    className="text-xs lg:text-sm whitespace-nowrap"
                  >
                    {navLinks.find(item => item.isButton)?.name || t('button.contactUs', 'Contact Us')}
                  </GradientButton>
                ) : (
                  <GradientButton href="/contact-us" size="sm" className="text-xs lg:text-sm whitespace-nowrap">
                    {t('button.contactUs', 'Contact Us')}
                  </GradientButton>
                )}
              </div>

              {/* Language Selector */}
              <div className="ml-1.5 lg:ml-2 xl:ml-3">
                <LanguageSelector />
              </div>

              {/* Theme Selector */}
              <div className="ml-1 lg:ml-1.5 xl:ml-2">
                <ThemeSelector />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-3 md:hidden ml-auto">
              <LanguageSelector compact={true} />
              <ThemeSelector compact={true} />
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
    </header>
  );
};

export default Navbar;
