export type LayoutProps<PARAMS = unknown> = {
  children: React.ReactNode;
  params: Promise<{ locale: string } & PARAMS>;
};
