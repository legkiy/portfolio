'use client';
import { Button, Field, FieldGroup, FieldLabel, Input } from '@/shared/ui';
import { Controller, useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormType } from '../model/login';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form noValidate onSubmit={handleSubmit}>
      <FieldGroup>
        <Controller
          name="email"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                Email
                <Input {...field} error={fieldState.invalid} />
              </FieldLabel>
            </Field>
          )}
        />

        <Field>
          <FieldLabel>
            Password
            <Input />
          </FieldLabel>
        </Field>
      </FieldGroup>
      <Button type="submit">Login</Button>
    </form>
  );
};
