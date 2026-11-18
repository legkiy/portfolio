import { ThemeSwitcher } from '@/features/theme-switcher';
import { LocaleSelector } from '@/features/locale-selector';

export const Header = () => {
  return (
    <header className="">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-end px-4 py-3">
        <LocaleSelector />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
