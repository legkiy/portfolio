import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  cn(
    'group/button inline-flex gap-3 shrink-0 items-center justify-center rounded-xl transition-colors',
    'bg-clip-padding text-sm whitespace-nowrap cursor-pointer',
    'transition-all outline-none select-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'focus-visible:border-focus-ring focus-visible:ring-2',
    'disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive',
    'aria-invalid:ring-2 aria-invalid:ring-destructive/20',
  ),
  {
    variants: {
      variant: {
        primary:
          'bg-primary-fill text-panel-background hover:bg-primary-hover active:bg-primary-pressed bg-primary-fill text-panel-background font-bold',
        secondary:
          'bg-surface-default hover:bg-surface-hover active:bg-surface-pressed text-text',
        text: 'hover:bg-ghost-hover active:bg-surface-hover text-text',
        // ghost:
        // 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        // outline:
        // 'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        // link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-3 text-sm',
        // xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        // sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        // lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-11',
        // 'icon-xs':
        // "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        // 'icon-sm':
        // 'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        // 'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
