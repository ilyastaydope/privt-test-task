import { useMemo } from 'react';
import { User } from '../types';

export const useWalletAddress = (user: User | null | undefined): string | null => {
  return useMemo(() => {
    const linkedAccounts = (user as any)?.linked_accounts || (user as any)?.linkedAccounts;

    if (!linkedAccounts || !Array.isArray(linkedAccounts)) {
      return null;
    }

    const walletAccount = linkedAccounts.find(
      (account: any) =>
        account.type === 'wallet' ||
        account.type === 'smart_wallet' ||
        account.type === 'embedded_wallet' ||
        account.wallet_client_type === 'privy' ||
        account.walletClientType === 'privy'
    );

    const address = (
      walletAccount?.address ||
      walletAccount?.wallet_client?.address ||
      walletAccount?.walletClient?.address ||
      (user as any)?.wallet?.address ||
      null
    );

    return address;
  }, [user]);
};
