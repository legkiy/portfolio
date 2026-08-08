import { ThemeSwitcher } from '@/features/theme-switcher';

export const Header = () => {
  return (
    <header className="p-2 tablet:py-4 ">
      <div className="max-w-max-page mx-auto flex justify-between">
        Header
        <ThemeSwitcher />
      </div>
    </header>
  );
};
