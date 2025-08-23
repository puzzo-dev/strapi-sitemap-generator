import React from 'react';
import { useLanguage } from '@/components/context/LanguageContext';
import { LanguageSelectorProps } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  // Function to get flag emoji based on language code
  const getFlag = (lang: string) => {
    switch (lang) {
      case 'en': return "🇬🇧";
      case 'yo': return "🇳🇬";
      case 'ig': return "🇳🇬";
      case 'ha': return '🇳🇬';
      case 'fr': return '🇫🇷';
      case 'es': return '🇪🇸';
      case 'sw': return '🇰🇪';
      default: return '🌐';
    }
  };

  // Function to get full language name
  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'en': return 'English';
      case 'yo': return 'Yorùbá';
      case 'ig': return 'Igbo';
      case 'ha': return 'Hausa';
      case 'fr': return 'Français';
      case 'es': return 'Español';
      case 'sw': return 'Kiswahili';
      default: return lang;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button
            variant="ghost"
            size="sm"
            aria-label={t('language.select', 'Select language')}
            className="relative px-1.5 xs:px-2 py-0.5 xs:py-1 h-6 xs:h-7 sm:h-8 min-w-6 xs:min-w-7 sm:min-w-8 rounded-full bg-gray-100/80 dark:bg-gray-800/80 transition-all duration-200 hover:scale-105"
          >
            <span className="text-xs xs:text-sm font-medium">
              {getFlag(currentLanguage)} {currentLanguage.toUpperCase()}
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('language.select', 'Select language')}
            className="relative transition-all duration-200 hover:scale-105"
          >
            <Globe className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            <span className="absolute -bottom-0.5 xs:-bottom-1 -right-0.5 xs:-right-1 flex h-3 w-3 xs:h-4 xs:w-4 items-center justify-center rounded-full bg-blue-500 text-[6px] xs:text-[8px] font-medium text-white">
              {currentLanguage.toUpperCase()}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 xs:w-44 sm:w-48">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm ${currentLanguage === lang ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold' : ''
              }`}
          >
            <span className="text-sm xs:text-base">{getFlag(lang)}</span>
            <span className="text-xs xs:text-sm">{getLanguageName(lang)}</span>
            {currentLanguage === lang && (
              <div className="ml-auto h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-500"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;