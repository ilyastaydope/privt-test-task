import Constants from 'expo-constants';

export const getPrivyConfig = () => {
  const appId =
    Constants.expoConfig?.extra?.privyAppId ||
    process.env.EXPO_PUBLIC_PRIVY_APP_ID ||
    '';

  const clientId =
    Constants.expoConfig?.extra?.privyClientId ||
    process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID ||
    '';

  return { appId, clientId };
};
