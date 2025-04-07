import React from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/schema';
import { Check, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Language name map
const languageNames: Record<string, string> = {
  en: 'English',
  yo: 'Yorùbá',
  ig: 'Igbo',
  ha: 'Hausa',
  fr: 'Français',
  es: 'Español',
  sw: 'Kiswahili',
};

// Language flag code map (for flag emojis)
const languageFlags: Record<string, string> = {
  en: '🇬🇧',
  yo: '🇳🇬',
  ig: '🇳🇬',
  ha: '🇳🇬',
  fr: '🇫🇷',
  es: '🇪🇸',
  sw: '🇰🇪',
};

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0]; // Handle cases like 'en-US'

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Optionally save language preference
    localStorage.setItem('preferredLanguage', lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`focus:outline-none w-full ${className}`}>
        <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium">
              {languageFlags[currentLanguage]} {languageNames[currentLanguage]}
            </span>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 dark:text-gray-400">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px]" align="center">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <DropdownMenuItem
            key={lng}
            className="flex items-center justify-between cursor-pointer py-2"
            onClick={() => changeLanguage(lng)}
          >
            <div className="flex items-center">
              <span className="mr-2 text-base">{languageFlags[lng]}</span>
              <span className="text-sm md:text-base">{t(`language.${lng}`, languageNames[lng])}</span>
            </div>
            {currentLanguage === lng && (
              <Check className="h-4 w-4 ml-2 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;