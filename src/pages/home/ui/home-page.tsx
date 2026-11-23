import { getTranslations } from 'next-intl/server';
import { ContactSelector } from '@/features/contact-selector';
import { Card, CardContent, CardHeader } from '@/shared/ui';
import { PassScene } from './pass-scene/client';

export async function HomePage() {
  const t = await getTranslations();

  return (
    <main className="grid h-full grid-cols-1 gap-4 px-4 pb-4 lg:grid-cols-[minmax(0,30fr)_minmax(0,45fr)_minmax(0,25fr)] lg:px-8 lg:pb-8">
      <div className="flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>pet projects</CardHeader>
          <CardContent>pet projects</CardContent>
        </Card>
        <Card>
          <CardHeader>skils</CardHeader>
          <CardContent>skils</CardContent>
        </Card>
      </div>
      <div className="flex">
        <Card className="flex-1">
          <CardHeader>bage</CardHeader>
          <CardContent>
            <PassScene />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>{t('contacts.title')}</CardHeader>
          <CardContent>
            <ContactSelector
              label={t('contacts.title')}
              actionLabel={t('contacts.open')}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>work</CardHeader>
          <CardContent>work</CardContent>
        </Card>
      </div>
    </main>
  );
}
