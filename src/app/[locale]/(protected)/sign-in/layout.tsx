import { redirect } from '@/i18n/navigation';
import ROUTER_CONFIG from '@/shared/models/router';
import { cookies } from 'next/headers';
import { LayoutProps } from '@/shared/models/types';
import { verifyToken } from '@/shared/lib/auth';
import { clearSession } from '../actions';

const SignInLayout = async ({ params, children }: LayoutProps) => {
  const cks = await cookies();
  const token = cks.get('session')?.value;
  const { locale } = await params;

  if (token) {
    try {
      await verifyToken(token);
      redirect({ href: ROUTER_CONFIG.admin.root, locale });
    } catch (error) {
      console.log(error);
      clearSession();
    }
  }

  return <>{children}</>;
};
export default SignInLayout;
