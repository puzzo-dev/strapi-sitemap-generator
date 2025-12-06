import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ThemeSelector from '@/components/ui/ThemeSelector';
import { useNavigation } from '@/hooks/useContent';
import { NavbarProps, NavItem } from '@/lib/types';
import { navItems as defaultNavItems } from '@/lib/data/';
import { useTheme } from '@/components/ui/theme-provider';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import { filterVisibleNavItems, getUrlPath } from '@/lib/utils';

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

  // Fetch navigation links from Strapi with fallback
  const { data: strapiNavItems, error: navError } = useNavigation();

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
                  <IVarseLogo
                    size={50}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto"
                    variant={actualTheme === 'dark' ? 'light' : 'dark'}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
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
                            flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-semibold transition-colors duration-200 rounded-md cursor-pointer
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
                );
              })}

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

              {/* Theme Selector */}
              <div className="ml-2">
                <ThemeSelector />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-3 md:hidden">
              <div className="mr-1 sm:mr-2">
                <LanguageSelector compact={true} />
              </div>
              <div className="mr-1">
                <ThemeSelector compact={true} />
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
