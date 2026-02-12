'use server';

import { cookies } from 'next/headers';

export async function clearSession() {
  const cks = await cookies();
  cks.delete('session');
}
