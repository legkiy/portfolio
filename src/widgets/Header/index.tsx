import ThemeSwitcher from '@/features/ThemeSwitcher';
import { NextLink } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';
import AnimatedWraper from './AnimatedWraper';

const navItems = [
  { titleKey: 'main', href: '#home' },
  { titleKey: 'about', href: '#about' },
  { titleKey: 'skils', href: '#skills' },
  { titleKey: 'projects', href: '#projects' },
  { titleKey: 'contacts', href: '#contact' },
];

const Header = async () => {
  const t = await getTranslations();

  return (
    <AnimatedWraper>
      <div className="flex gap-4 w-fit m-auto items-center">
        {navItems.map((el) => (
          <NextLink key={el.titleKey} href={el.href}>
            {t(`sections.${el.titleKey}`)}
          </NextLink>
        ))}
        <ThemeSwitcher />
      </div>
    </AnimatedWraper>
  );
};
export default Header;
