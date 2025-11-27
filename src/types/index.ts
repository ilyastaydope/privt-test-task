export type AuthError = {
  message?: string;
};

export type LinkedAccount = {
  type?: string;
  address?: string;
  walletClientType?: string;
  walletClient?: {
    address?: string;
  };
};

export type User = {
  id?: string;
  email?: {
    address?: string;
  };
  linkedAccounts?: LinkedAccount[];
  wallet?: {
    address?: string;
  };
};


