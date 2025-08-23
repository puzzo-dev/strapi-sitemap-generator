import React from 'react';
import { useTheme } from '@/components/ui/theme-provider';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white dark:bg-[#132f4c] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-blue-900/20 hover:scale-110 active:scale-95"
      aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-500" />
      ) : (
        <Moon className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
