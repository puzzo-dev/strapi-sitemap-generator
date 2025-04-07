import React from 'react';
import { Link, useLocation } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import { ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact', isButton: true }
  ];

  const isActive = (path: string) => location === path;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-md h-full bg-white dark:bg-[#0a1929] shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          boxShadow: isOpen ? '-5px 0 30px rgba(0, 0, 0, 0.15)' : 'none',
          borderLeft: '1px solid rgba(30, 73, 118, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/" onClick={onClose}>
            <div className="cursor-pointer">
              <IVarseLogo size={40} />
            </div>
          </Link>
          <button
            className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4 px-4">
          {navLinks.map((link) => !link.isButton && (
            <Link key={link.name} href={link.path}>
              <div
                className={`block cursor-pointer text-lg font-semibold py-4 px-4 my-2 rounded-lg transition-colors ${
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

          {/* Contact Button */}
          <div className="px-4 pt-8 pb-4">
            <GradientButton
              href="/contact"
              className="w-full justify-center py-4 text-base animate-pulse-light"
              onClick={onClose}
            >
              Contact Us
            </GradientButton>
          </div>
        </div>

        {/* Tech pattern background elements */}
        <div className="absolute bottom-0 left-0 w-full h-64 opacity-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-blue-400/50 dark:bg-blue-700/50 blur-2xl -mr-20 -mb-20"></div>
          
          <svg className="absolute bottom-10 left-10 w-40 h-40 text-blue-200/30 dark:text-blue-800/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 H40 M60 50 H90 M50 10 V40 M50 60 V90" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <circle cx="50" cy="90" r="2" fill="currentColor" />
            <circle cx="10" cy="50" r="2" fill="currentColor" />
            <circle cx="90" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;