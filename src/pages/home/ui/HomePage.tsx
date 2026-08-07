import { getTranslations } from 'next-intl/server';

export async function HomePage() {
  const t = await getTranslations();

  return <div className="mx-auto max-w-max-page">{t('hello')}</div>;
}
