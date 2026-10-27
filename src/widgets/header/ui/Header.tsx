import { ThemeSwitcher } from '@/features/theme-switcher';

export const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold">Portfolio</span>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
