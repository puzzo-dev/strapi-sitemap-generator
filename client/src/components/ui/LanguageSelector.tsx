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
            className="relative px-2 py-1 h-8 min-w-8 rounded-full bg-gray-100/80 dark:bg-gray-800/80"
          >
            <span className="text-xs font-medium">
              {getFlag(currentLanguage)} {currentLanguage.toUpperCase()}
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('language.select', 'Select language')}
            className="relative"
          >
            <Globe className="h-5 w-5" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[8px] font-medium text-white">
              {currentLanguage.toUpperCase()}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-2 ${currentLanguage === lang ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold' : ''
              }`}
          >
            <span>{getFlag(lang)}</span>
            <span>{getLanguageName(lang)}</span>
            {currentLanguage === lang && (
              <div className="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;