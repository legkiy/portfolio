import type { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { AppThemeProvider } from './theme-provider.client';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppThemeProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppThemeProvider>
  );
}
