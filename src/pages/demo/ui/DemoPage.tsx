import { notFound } from 'next/navigation';

export const DemoPage = () => {
  if (process.env.NODE_ENV !== 'development') notFound();

  return <div>DemoPage</div>;
};
