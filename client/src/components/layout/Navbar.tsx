import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useNavigation, useSiteConfig } from '@/hooks/useStrapiContent';

interface NavbarProps {
  onMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle = () => {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

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

  // Fetch navigation links from Strapi
  const { data: navItems, isLoading: isNavLoading } = useNavigation();
  
  // Fetch site configuration from Strapi
  const { data: siteConfig } = useSiteConfig();
  
  // Default nav links as fallback with translations
  const defaultNavLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About Us'), path: '/about' },
    { name: t('nav.services', 'Services'), path: '/services' },
    { name: t('nav.products', 'Solutions'), path: '/products' },
    { name: t('nav.blog', 'TechVision Insights'), path: '/blog' },
    { name: t('nav.careers', 'Careers'), path: '/careers' },
    { name: t('nav.contact', 'Contact'), path: '/contact', isButton: true }
  ];
  
  // Convert Strapi nav items to our component format if available
  const navLinks = navItems ? 
    navItems.map(item => ({
      name: item.label,
      path: item.url,
      isButton: item.label.toLowerCase() === 'contact' || item.label.toLowerCase().includes('contact us')
    })) : 
    defaultNavLinks;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0a1929]/95 shadow-md backdrop-blur-md' 
          : 'bg-white/80 dark:bg-[#0a1929]/80 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <IVarseLogo size={42} />
              </div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-1 md:space-x-3 lg:space-x-6">
              {navLinks.map((link) => !link.isButton ? (
                <Link key={link.name} href={link.path}>
                  <div className="cursor-pointer">
                    <span className={`
                      px-3 py-2 text-sm font-semibold transition-colors relative
                      ${isActive(link.path) 
                        ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                      }
                    `}>
                      {link.name}
                    </span>
                  </div>
                </Link>
              ) : null)}
            </div>
            
            {/* Contact button */}
            <div className="ml-6">
              <GradientButton href="/contact" size="sm">
                {t('button.contactUs', 'Contact Us')}
              </GradientButton>
            </div>
            
            {/* Desktop language selector */}
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Mobile controls - always visible on small screens */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile language selector - compact version */}
            <div className="mr-2">
              <LanguageSelector compact={true} />
            </div>
            
            {/* Mobile menu toggle button */}
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none" 
              onClick={onMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
