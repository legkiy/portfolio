import { Link as IntlLink } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';

const NextLink = (props: React.ComponentProps<typeof IntlLink>) => {
  return (
    <IntlLink
      {...props}
      className={cn(
        'hover:-translate-y-0.5 hover:text-accent transition-transform duration-100 ease-in-out',
        props.className,
      )}
    />
  );
};
export default NextLink;
