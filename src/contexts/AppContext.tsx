'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/lib/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isDark: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [isDark, setIsDark] = useState(false);

  // Cargar preferencias guardadas
  useEffect(() => {
    const savedLang = localStorage.getItem('cancelaya_lang') as Language;
    const savedTheme = localStorage.getItem('cancelaya_theme');

    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }

    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cancelaya_lang', lang);
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('cancelaya_theme', newIsDark ? 'dark' : 'light');

    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.es[key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, t, isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
