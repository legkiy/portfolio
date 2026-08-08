import { SignOutButton } from '@/features/sign-out';

export const DashboardPage = () => {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center gap-4 px-4">
      <p className="text-[13px] text-muted">Защищённый раздел</p>
      <h1 className="text-3xl font-semibold text-text">Панель управления</h1>
      <p className="text-[15px] text-muted">
        Здесь появятся управление проектами, черновиками и данными портфолио.
      </p>
      <SignOutButton />
    </main>
  );
};
