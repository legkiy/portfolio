import { cn } from '@/shared/lib/utils';
import * as React from 'react';

export type InputProps = React.ComponentProps<'input'> & {};
function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50',
        'aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error',
        'dark:aria-invalid:border-error/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-10 rounded-lg',
        'border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium',
        'focus-visible:ring-3 aria-invalid:ring-3 file:text-foreground placeholder:text-muted-foreground',
        'w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
