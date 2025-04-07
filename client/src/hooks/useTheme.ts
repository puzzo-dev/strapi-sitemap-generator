import { useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Check if a theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('i-varse-theme');
    return (savedTheme as ThemeMode) || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save theme preference to localStorage
    localStorage.setItem('i-varse-theme', theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
