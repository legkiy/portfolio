import { type ReactNode, useId } from 'react';

import { cn } from '@/shared/lib/utils';

import { Input, type InputProps } from '../input';

export type TextFieldProps = Omit<InputProps, 'id'> & {
  endAdornment?: ReactNode;
  label: ReactNode;
  hintText?: ReactNode;
  id?: string;
};

export const TextField = ({
  'aria-describedby': ariaDescribedBy,
  className,
  endAdornment,
  error = false,
  hintText,
  id: idProp,
  label,
  ...inputProps
}: TextFieldProps) => {
  const generatedId = useId();
  const hintId = useId();
  const id = idProp ?? generatedId;
  const describedBy =
    [ariaDescribedBy, hintText ? hintId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-[13px] text-text" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Input
          {...inputProps}
          aria-describedby={describedBy}
          className={cn(className, endAdornment && 'pr-11')}
          error={error}
          id={id}
        />
        {endAdornment ? (
          <div className="absolute inset-y-0 right-1 flex items-center">
            {endAdornment}
          </div>
        ) : null}
      </div>
      {hintText ? (
        <p
          className={cn('text-[12px] text-muted', error && 'text-danger')}
          id={hintId}
          role={error ? 'alert' : undefined}
        >
          {hintText}
        </p>
      ) : null}
    </div>
  );
};
