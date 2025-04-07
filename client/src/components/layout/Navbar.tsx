import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact', isButton: true }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0a1929]/95 shadow-md backdrop-blur-md' 
          : 'bg-white/80 dark:bg-[#0a1929]/80 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <IVarseLogo size={42} />
              </div>
            </Link>
          </div>
          
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
                Contact Us
              </GradientButton>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - off-screen slide-in with overlay backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      >
        {/* Mobile menu container */}
        <div 
          className={`mobile-menu fixed top-0 right-0 w-4/5 h-full bg-white dark:bg-[#0a1929] shadow-xl overflow-y-auto transform transition-transform duration-400 ease-in-out z-[101] ${
            mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile menu header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <Link href="/" onClick={closeMobileMenu}>
              <div className="cursor-pointer">
                <IVarseLogo size={40} />
              </div>
            </Link>
            <button
              className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Mobile menu items with improved spacing */}
          <div className="mobile-menu-items py-4 px-4">
            {navLinks.map((link) => !link.isButton && (
              <Link key={link.name} href={link.path}>
                <div 
                  className={`mobile-menu-item block cursor-pointer text-lg font-semibold py-4 px-4 my-2 rounded-lg transition-colors ${
                    isActive(link.path) 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </div>
              </Link>
            ))}
            
            {/* Contact button with improved spacing and styling */}
            <div className="px-4 pt-8 pb-4">
              <GradientButton 
                href="/contact" 
                className="w-full justify-center py-4 text-base animate-pulse-light"
                onClick={closeMobileMenu}
              >
                Contact Us
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
