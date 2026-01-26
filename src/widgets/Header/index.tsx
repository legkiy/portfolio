import ThemeSwitcher from '@/features/ThemeSwitcher';
import { NextLink } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';
import HeaderWrapper from './header-wrapper.client';
import ROUTER_CONFIG from '@/shared/models/router';

const navItems = [
  { titleKey: 'main', href: '#home' },
  { titleKey: 'about', href: ROUTER_CONFIG.homeSections.about },
  { titleKey: 'skills', href: ROUTER_CONFIG.homeSections.skills },
  { titleKey: 'projects', href: ROUTER_CONFIG.homeSections.projects },
  { titleKey: 'contacts', href: ROUTER_CONFIG.homeSections.contact },
];

const Header = async () => {
  const t = await getTranslations();

  return (
    <HeaderWrapper>
      <div className="flex gap-4 w-fit m-auto items-center">
        {navItems.map((el) => (
          <NextLink key={el.titleKey} href={el.href}>
            {t(`sections.${el.titleKey}`)}
          </NextLink>
        ))}
        <ThemeSwitcher />
      </div>
    </HeaderWrapper>
  );
};
export default Header;
