import NextImage, { ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';
type Props = ImageProps & {
  nextImageClassName?: string;
};
const Image = ({ className, nextImageClassName, ...props }: Props) => {
  return (
    <div className={twMerge('relative w-full h-full', className)}>
      <NextImage
        fill
        className={twMerge('object-cover', nextImageClassName)}
        {...props}
      />
    </div>
  );
};
export default Image;
