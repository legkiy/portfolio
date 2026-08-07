import { getTranslations } from 'next-intl/server';

export async function HomePage() {
  const t = await getTranslations();

  return <div>{t('hello')}</div>;
}
