import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageButtonProps {
  code: string;
  flag: string;
  name: string;
  onClose?: () => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ code, flag, name, onClose }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const isActive = currentLang === code;
  
  return (
    <button
      className={`flex items-center justify-start p-3 rounded-md text-sm transition-colors ${
        isActive 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
          : 'bg-white dark:bg-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/20'
      }`}
      onClick={() => {
        i18n.changeLanguage(code);
        localStorage.setItem('preferredLanguage', code);
        if (onClose) onClose();
      }}
    >
      <span className="mr-2 text-base">{flag}</span>
      <span>{name}</span>
      {isActive && (
        <span className="ml-auto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33301 8.00002L6.66634 11.3334L12.6663 5.33335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </button>
  );
};

export default LanguageButton;