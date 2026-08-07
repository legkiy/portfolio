'use client';

import { Button } from '@/shared/ui';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme, themes, theme } = useTheme();

  return (
    <div className="flex gap-1">
      {themes.map((el) => (
        <Button
          suppressHydrationWarning
          key={el}
          onClick={() => setTheme(el)}
          disabled={!!(theme === el)}
        >
          {el}
        </Button>
      ))}
    </div>
  );
};
