'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authClient } from '@/shared/auth/client';
import { Button } from '@/shared/ui';

export const SignOutButton = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        setError('Не удалось завершить сессию. Повторите попытку.');
        return;
      }

      router.replace('/login');
      router.refresh();
    } catch {
      setError('Не удалось завершить сессию. Повторите попытку.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button loading={isPending} onClick={handleSignOut} variant="secondary">
        Выйти
      </Button>
      {error ? (
        <p className="text-[13px] text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};
