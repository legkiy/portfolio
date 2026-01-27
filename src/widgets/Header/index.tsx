import ThemeSwitcher from '@/features/ThemeSwitcher';
import { NextLink } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';
import HeaderWrapper from './header-wrapper.client';
import MobileMenu from './MobileMenu.client';
import { NAV_ITEMS } from './models/navItems';

const Header = async () => {
  const t = await getTranslations();

  return (
    <HeaderWrapper>
      <div className="hidden gap-4 w-fit m-auto items-center md:flex">
        {NAV_ITEMS.map((el) => (
          <NextLink key={el.titleKey} href={el.href}>
            {t(`sections.${el.titleKey}`)}
          </NextLink>
        ))}
        <ThemeSwitcher />
      </div>
      <MobileMenu />
    </HeaderWrapper>
  );
};
export default Header;
