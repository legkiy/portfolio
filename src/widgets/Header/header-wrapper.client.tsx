'use client';

import { AnimatedContainer } from '@/shared/ui';
import { useLayoutEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
};
const HeaderWrapper = ({ children }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;

      document.documentElement.style.setProperty(
        '--header-height',
        `${height + 1}px`,
      );
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatedContainer
        tag="header"
        ref={ref}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="sticky top-0 left-0 right-0 bg-bg-card/60 border-b border-line p-2 backdrop-blur-sm"
      >
        {children}
      </AnimatedContainer>
      {/* <div
        style={{
          height: headerSpace,
        }}
      /> */}
    </>
  );
};
export default HeaderWrapper;
