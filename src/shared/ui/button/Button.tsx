import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center rounded-sm border font-sans font-semibold leading-none cursor-pointer data-loading:cursor-progress',
    'transition-[background-color,border-color,color,box-shadow] duration-[var(--token-motion-fast)] ease-[var(--token-ease-out-quint)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-surface-base disabled:opacity-60',
  ),
  {
    variants: {
      variant: {
        primary:
          'border-accent bg-accent text-surface-base hover:border-accent-hover hover:bg-accent-hover active:border-accent-pressed active:bg-accent-pressed',
        secondary:
          'border-line bg-surface text-text hover:border-focus hover:bg-surface-2 active:border-border-strong active:bg-surface-raised',
        destructive:
          'border-danger bg-danger text-surface-base hover:border-danger-hover hover:bg-danger-hover active:border-danger-pressed active:bg-danger-pressed',
      },
      size: {
        md: 'h-[42px] gap-[7px] px-[15px] text-[13px]',
        sm: 'h-8 gap-1.5 px-3 text-[12px]',
        icon: 'size-[42px] p-0',
        'icon-sm': 'size-8 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

export const Button = ({
  children,
  className,
  disabled,
  endIcon,
  fullWidth,
  loading = false,
  size = 'md',
  startIcon,
  type = 'button',
  variant = 'primary',
  ref,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      data-loading={loading || undefined}
      disabled={isDisabled}
      ref={ref}
      type={type}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        startIcon
      )}
      {children}
      {!loading && endIcon}
    </button>
  );
};
