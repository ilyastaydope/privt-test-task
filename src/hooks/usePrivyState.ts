import { useMemo } from 'react';
import { usePrivy } from '@privy-io/expo';

export const usePrivyState = () => {
  const privy = usePrivy();

  return useMemo(
    () => ({
      user: privy?.user ?? null,
      isReady: privy?.isReady ?? false,
      isAuthenticated: !!privy?.user,
      error: privy?.error ?? null,
      logout: privy?.logout ?? (() => Promise.resolve()),
      getAccessToken: privy?.getAccessToken ?? (() => Promise.resolve(null)),
    }),
    [privy]
  );
};
