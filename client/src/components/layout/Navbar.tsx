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
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact', isButton: true }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-[#0a1929]/90 shadow-md backdrop-blur-md' 
          : 'bg-transparent dark:bg-[#0a1929]/30 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <IVarseLogo size={45} />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-8">
              {navLinks.map((link) => !link.isButton ? (
                <Link key={link.name} href={link.path}>
                  <div className="cursor-pointer">
                    <span className={`
                      px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors
                      ${isActive(link.path) 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-200'
                      }
                    `}>
                      {link.name}
                    </span>
                  </div>
                </Link>
              ) : null)}
            </div>
            
            {/* Contact button */}
            <div className="ml-8">
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
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden card ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <div 
                className={`block cursor-pointer rounded-md text-base font-medium p-3 transition-colors ${
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
          <div className="p-3">
            <GradientButton href="/contact" className="w-full" onClick={closeMobileMenu}>
              Contact Us
            </GradientButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
