import { ThemeSwitcher } from '@/features/theme-switcher';
import { getTranslations } from 'next-intl/server';

export async function HomePage() {
  const t = await getTranslations();

  return (
    <div>
      <ThemeSwitcher />
      {t('hello')}
    </div>
  );
}
