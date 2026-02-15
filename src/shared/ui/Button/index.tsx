import { cn } from '@/shared/lib/utils';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = {} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ className, ...props }: Props) => {
  return <button className={cn('cursor-pointer', className)} {...props} />;
};
export default Button;
