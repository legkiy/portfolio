import { routing } from '@/i18n/routing';

export type LayoutProps<PARAMS = unknown> = {
  children: React.ReactNode;
  params: Promise<{ locale: (typeof routing.locales)[number] } & PARAMS>;
};
