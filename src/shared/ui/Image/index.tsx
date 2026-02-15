import { cn } from '@/shared/lib/utils';
import NextImage, { ImageProps } from 'next/image';

type Props = ImageProps & {
  nextImageClassName?: string;
};
const Image = ({ className, nextImageClassName, ...props }: Props) => {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <NextImage
        fill
        className={cn('object-cover', nextImageClassName)}
        {...props}
      />
    </div>
  );
};
export default Image;
