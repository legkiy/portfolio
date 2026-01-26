import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ className, ...props }: Props) => {
  return <button className={twMerge('cursor-pointer', className)} {...props} />;
};
export default Button;
