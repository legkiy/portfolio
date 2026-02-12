'use server';
import { cookies } from 'next/headers';
import { verifyToken } from './auth';
import { UserRole } from '@/entities/User/model/types';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);

    return {
      uuid: payload.uuid as string,
      role: payload.role as UserRole,
    };
  } catch {
    clearSession();
    return null;
  }
}

export async function clearSession() {
  const cks = await cookies();
  cks.delete('session');
}

export async function requireRoles(...roles: UserRole[]) {
  const session = await getSession();

  if (!session) throw new Error('Unauthorized');

  if (!roles.includes(session.role)) throw new Error('Forbidden');

  return session;
}
