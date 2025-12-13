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

  // SVG flag components for cross-browser compatibility
  const FlagIcon = ({ lang }: { lang: string }) => {
    const baseLang = lang.split('-')[0].toLowerCase();

    const flags: Record<string, JSX.Element> = {
      'en': (
        <svg width="20" height="15" viewBox="0 0 60 30" className="inline-block">
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      ),
      'ng': (
        <svg width="20" height="15" viewBox="0 0 900 600" className="inline-block">
          <rect width="900" height="600" fill="#008751" />
          <rect width="300" height="600" x="300" fill="#fff" />
        </svg>
      ),
      'fr': (
        <svg width="20" height="15" viewBox="0 0 900 600" className="inline-block">
          <rect width="900" height="600" fill="#ED2939" />
          <rect width="600" height="600" fill="#fff" />
          <rect width="300" height="600" fill="#002395" />
        </svg>
      ),
      'es': (
        <svg width="20" height="15" viewBox="0 0 750 500" className="inline-block">
          <rect width="750" height="500" fill="#c60b1e" />
          <rect width="750" height="250" y="125" fill="#ffc400" />
        </svg>
      ),
      'ke': (
        <svg width="20" height="15" viewBox="0 0 900 600" className="inline-block">
          <rect width="900" height="600" fill="#FFF" />
          <rect width="900" height="140" fill="#000" />
          <rect width="900" height="140" y="460" fill="#000" />
          <rect width="900" height="120" y="140" fill="#BC0000" />
          <rect width="900" height="120" y="340" fill="#BC0000" />
          <path d="M 377.59,300.55 L 522.41,300.55 L 522.41,299.45 L 377.59,299.45 L 377.59,300.55 z" fill="#FFF" />
        </svg>
      )
    };

    const countryCode = baseLang === 'yo' || baseLang === 'ig' || baseLang === 'ha' ? 'ng' : baseLang === 'sw' ? 'ke' : baseLang;
    return flags[countryCode] || flags['en'];
  };

  // Function to get full language name
  const getLanguageName = (lang: string) => {
    // Extract base language code (e.g., 'ig' from 'ig-NG')
    const baseLang = lang.split('-')[0].toLowerCase();

    switch (baseLang) {
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button
            variant="ghost"
            size="sm"
            aria-label={t('language.select', 'Select language')}
            className="relative px-2 py-1 h-8 min-w-8 rounded-full bg-gray-100/80 dark:bg-gray-800/80"
          >
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <FlagIcon lang={currentLanguage} />
              <span>{currentLanguage.split('-')[0].toUpperCase()}</span>
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
              {currentLanguage.split('-')[0].toUpperCase()}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 language-dropdown-content"
        sideOffset={8}
      >
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 ${currentLanguage === lang ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold' : ''
              }`}
          >
            <FlagIcon lang={lang} />
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