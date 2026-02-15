'use client';

import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaDTO } from './models/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '@/shared/ui/Form';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui';
import { useRouter } from '@/i18n/navigation';
import ROUTER_CONFIG from '@/shared/models/router';

const LoginForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const methods = useForm<LoginSchemaDTO>({
    resolver: zodResolver(loginSchema),
  });
  const handleSubmit = async (data: LoginSchemaDTO) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('invalidUser');
      }
      router.push({
        pathname: ROUTER_CONFIG.admin.root,
      });
    } catch (e) {
      const error = e as Error;
      methods.setError('root', {
        type: 'server',
        message: 'errors.' + error.message,
      });
    }
  };
  return (
    <Form.Container
      methods={methods}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      {methods.formState.errors.root?.message && (
        <p className="text-error">
          {t(methods.formState.errors.root?.message)}
        </p>
      )}
      <Form.Input label={t('fields.username.label')} name="username" />
      <Form.Input
        label={t('fields.password.label')}
        name="password"
        type="password"
      />
      <Button type="submit">Login</Button>
    </Form.Container>
  );
};
export default LoginForm;
