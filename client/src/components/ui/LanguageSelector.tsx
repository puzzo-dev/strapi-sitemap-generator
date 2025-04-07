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
  fr: 'Français',
  es: 'Español',
  sw: 'Kiswahili',
};

// Language flag code map (for flag emojis)
const languageFlags: Record<string, string> = {
  en: '🇬🇧',
  yo: '🇳🇬',
  ig: '🇳🇬',
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
      <DropdownMenuTrigger className={`focus:outline-none ${className}`}>
        <div className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {languageFlags[currentLanguage]} {languageNames[currentLanguage]}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <DropdownMenuItem
            key={lng}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => changeLanguage(lng)}
          >
            <div className="flex items-center">
              <span className="mr-2">{languageFlags[lng]}</span>
              <span>{t(`language.${lng}`, languageNames[lng])}</span>
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