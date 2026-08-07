import type { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export function AppProviders({ children }: PropsWithChildren) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
