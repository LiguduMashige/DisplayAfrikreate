import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always default to dark mode (Feed page has toggle to change)
  const [theme, setTheme] = useState(() => {
    // One-time reset: Force dark mode for all users
    const resetFlag = localStorage.getItem('afrikreate-theme-reset-v1');
    if (!resetFlag) {
      localStorage.setItem('afrikreate-theme', 'dark');
      localStorage.setItem('afrikreate-theme-reset-v1', 'true');
      return 'dark';
    }
    
    const saved = localStorage.getItem('afrikreate-theme');
    // If user has saved preference, use it; otherwise always use dark
    return saved || 'dark';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('afrikreate-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
