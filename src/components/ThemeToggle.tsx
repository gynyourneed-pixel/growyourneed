
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '../icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-sm">Appearance</span>
        <button
            onClick={toggleTheme}
            className="w-14 h-8 rounded-full bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark p-1 flex items-center transition-colors duration-300 border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div
                className={`w-6 h-6 rounded-full bg-gyn-accent-light dark:bg-gyn-accent-dark text-white flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
            >
                {theme === 'light' ? (
                    <SunIcon className="w-4 h-4" />
                ) : (
                    <MoonIcon className="w-4 h-4" />
                )}
            </div>
        </button>
    </div>
  );
};

export default ThemeToggle;
