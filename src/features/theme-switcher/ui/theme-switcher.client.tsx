'use client';

import { SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/ui';

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleOnChangeTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      aria-label="Переключить цветовую тему"
      onClick={handleOnChangeTheme}
      size="icon-sm"
      variant="outline"
    >
      <SunMoonIcon aria-hidden="true" />
    </Button>
  );
};
