import { redirect } from '@/i18n/navigation';
import ROUTER_CONFIG from '@/shared/models/router';
import { LayoutProps } from '@/shared/models/types';
import { getSession } from '@/shared/lib/session';

const AdminLayout = async ({ params, children }: LayoutProps) => {
  const session = await getSession();

  const { locale } = await params;

  if (!session) {
    redirect({ href: ROUTER_CONFIG.signIn, locale });
  }

  return <>{children}</>;
};
export default AdminLayout;
