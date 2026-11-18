'use client';

import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      scriptProps={{
        // Run the bootstrap during SSR. Client remounts use the provider's
        // effects instead; React does not execute scripts inserted on the client.
        type:
          typeof window === 'undefined'
            ? 'text/javascript'
            : 'application/x-next-themes',
      }}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
