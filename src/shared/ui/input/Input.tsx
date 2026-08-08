import { cn } from '@/shared/lib/utils';

export type InputProps = React.ComponentProps<'input'> & { error?: boolean };

export const Input = ({
  'aria-invalid': ariaInvalid,
  className,
  ref,
  error,
  ...props
}: InputProps) => (
  <input
    aria-invalid={error ? true : ariaInvalid}
    className={cn(
      'flex h-10.5 w-full rounded-sm border border-line bg-surface px-2.75 font-sans text-[13px] text-text outline-none',
      'transition-[background-color,border-color,box-shadow] duration-(--token-motion-fast) ease-(--token-ease-out-quint)',
      'placeholder:text-muted focus-visible:border-focus focus-visible:ring-1 focus-visible:ring-focus',
      'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-surface-2 disabled:text-muted disabled:opacity-100',
      error &&
        'border-danger bg-error-soft focus-visible:border-danger focus-visible:ring-danger',
      className,
    )}
    ref={ref}
    {...props}
  />
);
