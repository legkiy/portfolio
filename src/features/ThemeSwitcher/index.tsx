'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { Button } from '@/shared/ui';

const THEMES_MAP = {
  dark: <Moon />,
  light: <Sun />,
};

const ThemeSwitcher = () => {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
    <Button onClick={handaleChangeTheme}>{THEMES_MAP[currentTheme]}</Button>
  );
};
export default ThemeSwitcher;
