'use client';

import { motion, MotionProps } from 'motion/react';
import { ElementType, JSX } from 'react';

type Props<T extends ElementType = 'div'> = {
  tag?: T;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'> &
  MotionProps;

export default function AnimatedContainer<
  T extends keyof JSX.IntrinsicElements = 'div',
>({ tag, children, ref, ...rest }: Props<T>) {
  const MotionTag = motion(tag ?? 'div') as React.ComponentType;

  return (
    <MotionTag {...rest} ref={ref}>
      {children}
    </MotionTag>
  );
}
