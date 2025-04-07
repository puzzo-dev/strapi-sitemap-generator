import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    { name: 'Contact', path: '/contact', isButton: true }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-secondary-dark/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <IVarseLogo />
                <div className="ml-2 text-xl font-bold">I-VARSE</div>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => link.isButton ? (
              <GradientButton key={link.name} href={link.path}>
                {link.name}
              </GradientButton>
            ) : (
              <Link key={link.name} href={link.path}>
                <a className={`text-accent-light hover:text-primary-light transition-colors ${isActive(link.path) ? 'text-primary-light' : ''}`}>
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              className="text-gray-400 hover:text-white focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-secondary-dark border-b border-gray-800 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => link.isButton ? (
            <div key={link.name} className="px-3 py-2">
              <GradientButton href={link.path} className="w-full" onClick={closeMobileMenu}>
                {link.name}
              </GradientButton>
            </div>
          ) : (
            <Link key={link.name} href={link.path}>
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium text-accent-light hover:bg-secondary-light ${isActive(link.path) ? 'text-primary-light' : ''}`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
