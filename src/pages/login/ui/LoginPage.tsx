import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  return (
    <main className="mx-auto tablet:mx-0 flex min-h-dvh w-full items-center px-4 tablet:grid tablet:grid-cols-2 tablet:gap-12">
      <div></div>
      <section className="flex w-full flex-col gap-6">
        <h1 className="text-3xl font-semibold text-text">Вход</h1>
        <LoginForm />
      </section>
    </main>
  );
};
