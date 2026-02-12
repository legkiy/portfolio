import { redirect } from '@/i18n/navigation';
import ROUTER_CONFIG from '@/shared/models/router';
import { cookies } from 'next/headers';
import { LayoutProps } from '@/shared/models/types';
import { verifyToken } from '@/shared/lib/auth';
import { clearSession } from '../actions';

const AdminLayout = async ({ params, children }: LayoutProps) => {
  const cks = await cookies();
  const token = cks.get('session')?.value;
  const { locale } = await params;

  if (!token) {
    redirect({ href: ROUTER_CONFIG.signIn, locale });
    return;
  }
  try {
    await verifyToken(token);
  } catch (error) {
    console.log(error);
    clearSession();
    redirect({ href: ROUTER_CONFIG.signIn, locale });
  }

  return <>{children}</>;
};
export default AdminLayout;
