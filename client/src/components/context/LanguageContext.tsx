import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage } from '@/lib/strapi';
import { LanguageContextType, LanguageProviderProps } from '@/lib/types';
import { useLanguageConfig, useUITranslations } from '@/hooks/useLanguageConfig';

const defaultContext: LanguageContextType = {
  currentLanguage: 'en',
  setLanguage: () => {},
  supportedLanguages: ['en'], // Will be updated from Strapi
};

// Create context with a consistent name
const LanguageContext = createContext<LanguageContextType>(defaultContext);



// Use function declarations for components, as recommended for Fast Refresh
function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  
  // Fetch language configuration from Strapi
  const { data: languageConfig, isLoading: isConfigLoading } = useLanguageConfig();
  
  const [currentLanguage, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    // Will validate against Strapi supported languages after config loads
    return saved || 'en';
  });

  // Validate and update language when config loads
  useEffect(() => {
    if (languageConfig && !isConfigLoading) {
      const supportedLanguages = languageConfig.supportedLanguages;
      const saved = localStorage.getItem('preferredLanguage');
      
      // Validate saved language against Strapi supported languages
      if (saved && supportedLanguages.includes(saved)) {
        if (currentLanguage !== saved) {
          setCurrentLang(saved);
        }
      } else if (languageConfig.defaultLanguage && currentLanguage !== languageConfig.defaultLanguage) {
        // Use Strapi default language if current language not supported
        setCurrentLang(languageConfig.defaultLanguage);
        localStorage.setItem('preferredLanguage', languageConfig.defaultLanguage);
      }
    }
  }, [languageConfig, isConfigLoading, currentLanguage]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const setLanguage = (lang: string) => {
    if (currentLanguage === lang) return; // No change if same language
    
    // Validate against Strapi supported languages
    const supportedLanguages = languageConfig?.supportedLanguages || ['en'];
    if (!supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported. Supported: ${supportedLanguages.join(', ')}`);
      return;
    }
    
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
        supportedLanguages: languageConfig?.supportedLanguages || ['en']
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