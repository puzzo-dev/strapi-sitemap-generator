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
    { id: 1, name: t('nav.home', 'Home'), path: '/' },
    { id: 2, name: t('nav.about', 'About Us'), path: '/about' },
    { id: 3, name: t('nav.services', 'Services'), path: '/services' },
    { id: 4, name: t('nav.products', 'Solutions'), path: '/products' },
    { id: 5, name: t('nav.solutions', 'Digital Solutions'), path: '/solutions' },
    { id: 6, name: t('nav.blog', 'TechVision Insights'), path: '/blog' },
    { id: 7, name: t('nav.resources', 'Resources'), path: '/resources' },
    { id: 8, name: t('nav.team', 'Our Team'), path: '/team' },
    { id: 9, name: t('nav.careers', 'Careers'), path: '/careers' },
    { id: 10, name: t('nav.portfolio', 'Portfolio'), path: '/portfolio' },
    { id: 11, name: t('nav.testimonials', 'Testimonials'), path: '/testimonials' },
    { id: 12, name: t('nav.support', 'Support'), path: '/support' },
    { id: 13, name: t('nav.faqs', 'FAQs'), path: '/faqs' },
    { id: 14, name: t('nav.contact', 'Contact'), path: '/contact', isButton: true }
  ];
  
  // Convert Strapi nav items to our component format if available
  const navLinks = navItems ? 
    navItems.map((item, index) => ({
      id: index + 1,
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
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <IVarseLogo size={36} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-auto lg:h-auto" />
              </div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex flex-wrap items-center space-x-1 md:space-x-1 lg:space-x-2 xl:space-x-4 justify-end">
              {/* Always display these core navigation links */}
              <Link href="/">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.home', 'Home')}
                  </span>
                </div>
              </Link>
              
              <Link href="/about">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/about') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.about', 'About Us')}
                  </span>
                </div>
              </Link>
              
              <Link href="/services">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/services') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.services', 'Services')}
                  </span>
                </div>
              </Link>
              
              <Link href="/products">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/products') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.products', 'Solutions')}
                  </span>
                </div>
              </Link>
              
              <Link href="/blog">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/blog') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.blog', 'Insights')}
                  </span>
                </div>
              </Link>
              
              <Link href="/careers">
                <div className="cursor-pointer">
                  <span className={`
                    px-1 md:px-2 py-1 md:py-1 text-xs sm:text-sm lg:text-base font-semibold transition-colors relative
                    ${isActive('/careers') 
                      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}>
                    {t('nav.careers', 'Careers')}
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Contact button */}
            <div className="ml-3 md:ml-4 lg:ml-6">
              <GradientButton href="/contact" size="sm" className="text-xs md:text-sm">
                {t('button.contactUs', 'Contact Us')}
              </GradientButton>
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
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none" 
              onClick={onMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
