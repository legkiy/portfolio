'use client';

import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>light</button>/
      <button onClick={() => setTheme('dark')}>dark</button>/
      <button onClick={() => setTheme('system')}>system</button>
    </div>
  );
};
