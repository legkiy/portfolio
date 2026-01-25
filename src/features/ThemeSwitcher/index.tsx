'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const THEMES_MAP = {
  dark: <Moon />,
  light: <Sun />,
};

const ThemeSwitcher = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const currentTheme =
    (theme === 'system' ? systemTheme : (theme as 'dark' | 'light')) || 'light';

  const handaleChangeTheme = () => {
    switch (currentTheme) {
      case 'dark':
        setTheme('light');
        return;
      case 'light':
        setTheme('dark');
        return;
    }
  };

  return (
    <button onClick={handaleChangeTheme}>{THEMES_MAP[currentTheme]}</button>
  );
};
export default ThemeSwitcher;
