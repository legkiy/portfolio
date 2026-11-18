import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

const Input = ({ className, type, error, ...props }: InputProps) => {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={error}
      className={cn(
        'text-base h-11 w-full bg-surface-default outline-line outline-1 rounded-xl px-3.5 py-3',
        'hover:bg-surface-hover focus:bg-surface-hover focus:outline-focus-ring',
        'aria-invalid:outline-field-error',
        'transition-colors',
        className,
      )}
      {...props}
    />
  );
};

export { Input };
