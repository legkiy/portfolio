'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { authClient } from '@/shared/auth/client';
import { EyeIcon, EyeSlashIcon } from '@/shared/icons';
import { Button, TextField } from '@/shared/ui';

const loginSchema = z.object({
  login: z.string().trim().min(3, 'Логин должен содержать минимум 3 символа.'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitError(null);

    const { error } = await authClient.signIn.username({
      password: data.password,
      username: data.login,
    });

    if (error) {
      const message = 'Неверное имя пользователя или пароль.';

      setSubmitError(message);
      return;
    }

    router.replace('/dashboard');
    router.refresh();
  };

  return (
    <form
      className="flex w-full max-w-120 flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        autoCapitalize="none"
        autoComplete="username"
        error={Boolean(errors.login)}
        hintText={errors.login?.message && 'Минимум 3 символа.'}
        label="Логин"
        spellCheck={false}
        {...register('login')}
      />
      <TextField
        autoComplete="current-password"
        endAdornment={
          <button
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={isPasswordVisible}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            type="button"
          >
            {isPasswordVisible ? (
              <EyeSlashIcon aria-hidden="true" className="size-4" />
            ) : (
              <EyeIcon aria-hidden="true" className="size-4" />
            )}
          </button>
        }
        error={Boolean(errors.password)}
        hintText={errors.password?.message && 'Минимум 8 символов.'}
        label="Пароль"
        type={isPasswordVisible ? 'text' : 'password'}
        {...register('password')}
      />
      <Button fullWidth loading={isSubmitting} type="submit">
        Войти
      </Button>
      {submitError ? (
        <p className="text-[13px] text-danger" role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  );
};
