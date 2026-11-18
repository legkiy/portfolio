'use client';

import { Fragment, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { routing } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/lib/i18n';
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { Button } from '@/shared/ui';

const LocaleSelector = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function onSelectChange(value: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      );
    });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((value, idx) => (
        <Fragment key={value}>
          <Button
            lang={value}
            disabled={isPending}
            onClick={() => onSelectChange(value)}
            variant={locale === value ? 'primary' : 'text'}
            size={'icon-xs'}
          >
            {value.toUpperCase()}
          </Button>
          {idx === 0 && '/'}
        </Fragment>
      ))}
    </div>
  );
};

export default LocaleSelector;
