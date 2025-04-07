import React from 'react';
import { useTheme } from '@/components/ui/theme-provider';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full bg-white dark:bg-[#132f4c] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-blue-900/20"
        aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
