import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useNavigation, useSiteConfig } from '@/hooks/useContent';
import { NavbarProps, NavItem } from '@/lib/types';
import { navItems as defaultNavItems } from '@/lib/data/';
import { useTheme } from '@/components/ui/theme-provider';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import { filterVisibleNavItems, getUrlPath } from '@/lib/utils';

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle = () => { } }) => {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  // Fetch navigation links from Strapi with fallback
  const { data: strapiNavItems, isLoading: isNavLoading, error: navError } = useNavigation();

  // Use Strapi data if available, otherwise fallback to default data
  const navLinks = (() => {
    let rawNavItems: NavItem[] = [];

    if (strapiNavItems && !navError && strapiNavItems.length > 0) {
      rawNavItems = strapiNavItems;
    } else {
      rawNavItems = defaultNavItems;
    }

    const visibleNavItems = filterVisibleNavItems(rawNavItems);

    return visibleNavItems.map((item: NavItem) => ({
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

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <nav
        className={`w-full transition-all duration-300 ${scrolled
          ? 'bg-white/95 dark:bg-[#0a1929]/95 shadow-lg backdrop-blur-md'
          : 'bg-white/80 dark:bg-[#0a1929]/80 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <IVarseLogo
                    size={50}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto"
                    variant={theme === 'dark' ? 'light' : 'dark'}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
              {navLinks.filter(item => !item.isButton).map((item) => (
                <div key={item.id} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    // Dropdown Menu Item
                    <div className="relative">
                      <Link href={item.path}>
                        <button className={`
                          flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-semibold transition-colors duration-200 rounded-md
                          ${isActive(item.path)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }
                        `}>
                          {item.name}
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                      </Link>
                      
                      {/* Dropdown Panel */}
                      <div className="absolute top-full left-0 z-[200] mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 backdrop-blur-lg">
                          {item.children.map((child) => (
                            <Link key={child.id} href={child.path}>
                              <div className={`
                                block px-4 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer
                                ${isActive(child.path)
                                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                  : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }
                              `}>
                                {child.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular Menu Item
                    <Link href={item.path}>
                      <div className={`
                        px-3 py-2 text-sm lg:text-base font-semibold transition-colors duration-200 rounded-md cursor-pointer
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
              ))}

              {/* Contact Button */}
              <div className="ml-4">
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

              {/* Language Selector */}
              <div className="ml-3">
                <LanguageSelector />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-3 md:hidden">
              <div className="mr-1 sm:mr-2">
                <LanguageSelector compact={true} />
              </div>
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