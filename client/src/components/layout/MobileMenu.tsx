import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import IVarseLogo from '@/components/ui/IVarseLogo';
import GradientButton from '@/components/ui/GradientButton';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { ChevronRight } from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/components/context/LanguageContext';
import { MobileMenuProps } from '@/lib/types';


const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  const navLinks = [
    { id: 1, name: t('nav.home', 'Home'), path: '/', category: 'main' },
    { id: 2, name: t('nav.about', 'About Us'), path: '/about', category: 'main' },
    { id: 3, name: t('nav.services', 'Services'), path: '/services', category: 'main' },
    { id: 4, name: t('nav.products', 'Solutions'), path: '/products', category: 'main' },
    { id: 5, name: t('nav.blog', 'TechVision Insights'), path: '/blog', category: 'resources' },
    { id: 6, name: t('nav.careers', 'Careers'), path: '/careers', category: 'company' },
    { id: 7, name: t('nav.contact', 'Contact'), path: '/contact', category: 'main', isButton: true }
  ];

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
        <div className="flex justify-between items-center p-4 sm:p-5 md:p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/" onClick={onClose}>
            <div className="cursor-pointer">
              <IVarseLogo size={32} className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
          </Link>
          <button
            className="text-gray-700 dark:text-gray-200 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Menu Items - Organized into categories */}
        <div className="py-3 sm:py-4 px-3 sm:px-4 overflow-y-auto">
          {/* Main navigation */}
          <div className="mb-6">
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-3">
              {t('nav.main', 'Main Navigation')}
            </div>
            {navLinks
              .filter(link => link.category === 'main' && !link.isButton)
              .map((link) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-base sm:text-lg font-semibold py-2.5 sm:py-3 px-3 sm:px-4 my-1 sm:my-1.5 rounded-lg transition-colors ${
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
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-3">
              {t('nav.resourcesSection', 'Resources & Information')}
            </div>
            {navLinks
              .filter(link => link.category === 'resources' && !link.isButton)
              .map((link) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-base sm:text-lg font-semibold py-2.5 sm:py-3 px-3 sm:px-4 my-1 sm:my-1.5 rounded-lg transition-colors ${
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
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider mb-2 px-3">
              {t('nav.companySection', 'Company')}
            </div>
            {navLinks
              .filter(link => link.category === 'company' && !link.isButton)
              .map((link) => (
                <Link key={link.id} href={link.path}>
                  <div
                    className={`block cursor-pointer text-base sm:text-lg font-semibold py-2.5 sm:py-3 px-3 sm:px-4 my-1 sm:my-1.5 rounded-lg transition-colors ${
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

          {/* Contact Button */}
          <div className="px-3 sm:px-4 pt-4 sm:pt-6 pb-3 sm:pb-4 border-t border-gray-100 dark:border-gray-800 mt-4">
            <GradientButton
              href="/contact"
              className="w-full justify-center py-3 sm:py-4 text-sm sm:text-base animate-pulse-light"
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
    </div>
  );
};

export default MobileMenu;