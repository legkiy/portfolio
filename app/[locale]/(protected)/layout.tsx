import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { getAuthSession } from '@/shared/auth/server';

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getAuthSession(await headers());

  if (!session) {
    redirect('/login');
  }

  return children;
}
