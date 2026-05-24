// components/ThemeProvider.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  success: string;
};

const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#4CAF50',
  border: '#E0E0E0',
  success: '#4CAF50',
};

const darkTheme: ThemeColors = {
  background: '#0F0F0F',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  primary: '#4CAF50',
  border: '#333333',
  success: '#4CAF50',
};

type ThemeContextType = {
  themeColors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  // Listen to system theme changes
  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const themeColors = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  return (
    <ThemeContext.Provider value={{ themeColors, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};