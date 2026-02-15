'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '../Input';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
type Props = InputProps & {
  label: React.ReactNode;
  name: string;
};

const FormInput = ({ name, label, ...props }: Props) => {
  const t = useTranslations();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <label>
          <div className="mb-2">{label}</div>
          <Input
            {...props}
            {...field}
            aria-invalid={!!fieldState.error?.message}
          />
          {fieldState.error?.message && (
            <p className={cn('text-error text-sm mt-1')}>
              {t(fieldState.error?.message, { count: 4 })}
            </p>
          )}
        </label>
      )}
    />
  );
};
export default FormInput;
