import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Button, TextField } from '@/shared/ui';


function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.75"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.75"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-9 0 1 13h10l1-13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function DemoSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-3 border-b border-line pb-4">
      <h2 className="text-2xl text-accent">{title}</h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export const DemoPage = () => {
  if (process.env.NODE_ENV !== 'development') notFound();

  return (
    <main className="max-w-max-page mx-auto w-full">
      <DemoSection title="VARIANTS">
        <Button endIcon={<ArrowRightIcon />}>Primary</Button>
        <Button endIcon={<ArrowRightIcon />} variant="secondary">
          Secondary
        </Button>
        <Button startIcon={<TrashIcon />} variant="destructive">
          Destructive
        </Button>
      </DemoSection>

      <DemoSection title="SIZES">
        <Button>Default</Button>
        <Button size="sm">Compact</Button>
        <Button aria-label="Перейти к проекту" size="icon">
          <ArrowRightIcon />
        </Button>
      </DemoSection>

      <DemoSection title="STATES">
        <Button loading>Saving</Button>
        <Button disabled variant="secondary">
          Disabled
        </Button>
        <Button disabled variant="destructive">
          Disabled destructive
        </Button>
      </DemoSection>

      <DemoSection title="TEXT FIELD / STATES">
        <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          <TextField
            defaultValue="hello@example.com"
            hintText="Стандартное состояние, нажмите Tab для проверки focus."
            label="Email"
            name="email-default"
            type="email"
          />

          <TextField
            defaultValue="hello@example"
            error
            hintText="Укажите корректный email."
            label="Email"
            name="email-error"
            type="email"
          />

          <TextField
            defaultValue="hello@example.com"
            disabled
            hintText="Отключённое состояние."
            label="Email"
            name="email-disabled"
            type="email"
          />
        </div>
      </DemoSection>

      <DemoSection title="LAYOUT">
        <div className="w-full max-w-md">
          <Button fullWidth>Full width</Button>
        </div>
      </DemoSection>
    </main>
  );
};
