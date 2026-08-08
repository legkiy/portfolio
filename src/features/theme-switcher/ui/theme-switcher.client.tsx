'use client';

import { ThemeHalf } from '@/shared/icons';
import { Button } from '@/shared/ui';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleOnChangeTheme = () => {
    if (resolvedTheme === 'light') {
      return setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        size={'icon-sm'}
        variant={'secondary'}
        onClick={handleOnChangeTheme}
      >
        <ThemeHalf />
      </Button>
    </div>
  );
};
