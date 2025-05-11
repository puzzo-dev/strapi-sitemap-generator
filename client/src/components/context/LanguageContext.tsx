import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/lib/utils';
import { setCurrentLanguage } from '@/lib/strapi';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const defaultContext: LanguageContextType = {
  currentLanguage: 'en',
  setLanguage: () => {},
  supportedLanguages: SUPPORTED_LANGUAGES,
};

// Create context with a consistent name
const LanguageContext = createContext<LanguageContextType>(defaultContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// Use function declarations for components, as recommended for Fast Refresh
function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved && SUPPORTED_LANGUAGES.includes(saved as any) 
      ? saved 
      : 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const setLanguage = (lang: string) => {
    if (currentLanguage === lang) return; // No change if same language
    
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Also update in Strapi service
    setCurrentLanguage(lang);
    
    // Note: The i18n language change will be handled by the i18n listener
    // and the queries will be invalidated through reactive query keys
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        supportedLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access the context
function useLanguage() {
  return useContext(LanguageContext);
}

// Export the provider and hook
export { LanguageProvider, useLanguage, LanguageContext };