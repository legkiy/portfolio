'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { routing } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/lib/i18n';
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';

const LocaleSelector = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <select
      aria-label={locale === 'ru' ? 'Язык' : 'Language'}
      aria-busy={isPending}
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
    >
      {routing.locales.map((value) => (
        <option key={value} value={value} lang={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default LocaleSelector;
