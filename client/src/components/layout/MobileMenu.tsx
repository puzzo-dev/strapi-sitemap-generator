import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { ChevronRight, X } from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/components/context/LanguageContext';
import { MobileMenuProps, NavItem } from '@/lib/types';
import { navItems as defaultNavItems } from '@/lib/data/config';
import { Button } from '@/components/ui/button';


const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems = defaultNavItems }) => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  // Transform NavItem[] to the format expected by the mobile menu
  interface MobileNavLink {
    id: number;
    name: string;
    path: string;
    category: 'main' | 'resources' | 'company';
    isButton?: boolean;
    children?: MobileNavLink[];
  }

  const transformNavItems = (items: NavItem[]): MobileNavLink[] => {
    return items.map(item => ({
      id: item.id,
      name: item.translationKey ? t(item.translationKey, item.label) : item.label,
      path: item.url.url,
      category: getCategoryForPath(item.url.url),
      isButton: item.isButton,
      children: item.children ? transformNavItems(item.children) : undefined
    }));
  };

  // Helper function to categorize navigation items
  const getCategoryForPath = (path: string): 'main' | 'resources' | 'company' => {
    if (path === '/blog') return 'resources';
    if (path === '/careers') return 'company';
    return 'main';
  };

  const navLinks = transformNavItems(navItems);

  const isActive = (path: string) => location === path;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-md h-full bg-white dark:bg-[#0a1929] shadow-2xl overflow-y-auto transition-all duration-300 ease-out transform ${
          isOpen ? 'translate-x-0 visible' : 'translate-x-full'
        }`}
        style={{ 
          boxShadow: isOpen ? '-5px 0 30px rgba(0, 0, 0, 0.15)' : 'none',
          borderLeft: '1px solid rgba(30, 73, 118, 0.15)',
          willChange: 'transform',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/" onClick={onClose}>
            <div className="cursor-pointer">
              <IVarseLogo size={24} className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 xs:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5 xs:h-6 xs:w-6" />
          </Button>
        </div>

        {/* Menu Items - Organized into categories */}
        <div className="flex-1 overflow-y-auto px-3 xs:px-4 sm:px-5 md:px-6 py-3 xs:py-4 sm:py-5 md:py-6">
          {/* Main navigation */}
          <div className="mb-6">
            <h3 className="text-xs xs:text-sm uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 xs:mb-3 px-2 xs:px-3">
              {t('nav.main', 'Main Navigation')}
            </h3>
            {navLinks
              .filter((link: MobileNavLink) => link.category === 'main' && !link.isButton)
              .map((link: MobileNavLink) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2.5 xs:px-3 sm:px-4 my-1 xs:my-1.5 rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                    }`}
                    onClick={onClose}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
          </div>
          
          {/* Resources section */}
          <div className="mb-6">
            <h3 className="text-xs xs:text-sm uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 xs:mb-3 px-2 xs:px-3">
              {t('nav.resourcesSection', 'Resources & Information')}
            </h3>
            {navLinks
              .filter((link: MobileNavLink) => link.category === 'resources' && !link.isButton)
              .map((link: MobileNavLink) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2.5 xs:px-3 sm:px-4 my-1 xs:my-1.5 rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                    }`}
                    onClick={onClose}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
          </div>
          
          {/* Company section */}
          <div className="mb-6">
            <h3 className="text-xs xs:text-sm uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 xs:mb-3 px-2 xs:px-3">
              {t('nav.companySection', 'Company')}
            </h3>
            {navLinks
              .filter((link: MobileNavLink) => link.category === 'company' && !link.isButton)
              .map((link: MobileNavLink) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2.5 xs:px-3 sm:px-4 my-1 xs:my-1.5 rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                    }`}
                    onClick={onClose}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
          </div>

        </div>

        {/* Footer with Contact Button */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-3 xs:p-4 sm:p-5 md:p-6 space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
            <GradientButton
              href="/contact"
              className="w-full text-center py-2.5 xs:py-3 px-3 xs:px-4 text-sm xs:text-base font-medium"
              onClick={onClose}
            >
              {t('button.contactUs', 'Contact Us')}
            </GradientButton>
          </div>
        </div>

        {/* Tech pattern background elements */}
        <div className="absolute bottom-0 left-0 w-full h-48 sm:h-56 md:h-64 opacity-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-blue-400/50 dark:bg-blue-700/50 blur-2xl -mr-16 -mb-16 sm:-mr-18 sm:-mb-18 md:-mr-20 md:-mb-20"></div>
          
          <svg className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-6 sm:left-8 md:left-10 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 text-blue-200/30 dark:text-blue-800/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 H40 M60 50 H90 M50 10 V40 M50 60 V90" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <circle cx="50" cy="90" r="2" fill="currentColor" />
            <circle cx="10" cy="50" r="2" fill="currentColor" />
            <circle cx="90" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    
  );
};

export default MobileMenu;