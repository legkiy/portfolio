import { cn } from '@/shared/lib/utils';
import { SpinerIcon } from '@/shared/icons';
function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <SpinerIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
