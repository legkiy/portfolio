import type { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
}
