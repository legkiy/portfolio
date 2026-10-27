import { getTranslations } from 'next-intl/server';

export async function HomePage() {
  const t = await getTranslations();

  return <div className="mx-auto w-full max-w-7xl px-4">{t('hello')}</div>;
}
