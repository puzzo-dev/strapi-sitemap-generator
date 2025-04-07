import React from 'react';
import { useTheme } from '@/components/ui/theme-provider';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-white`}></i>
      </button>
    </div>
  );
};

export default ThemeToggle;
