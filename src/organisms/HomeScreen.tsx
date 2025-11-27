import { useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { useAuth } from '../hooks/useAuth';
import { usePrivyState } from '../hooks/usePrivyState';
import { useWalletAddress } from '../hooks/useWalletAddress';
import { usePasskeySafe } from '../hooks/usePasskeySafe';
import { useEmbeddedWallet } from '@privy-io/expo';
import { LoadingScreen } from '../atoms/LoadingScreen';
import { InfoRow } from '../molecules/InfoRow';
import { Button } from '../atoms/Button';
import { homeScreenStyles } from '../styles/organisms/HomeScreen.styles';

export default function HomeScreen() {
  const { isReady, isAuthenticated, user } = usePrivyState();
  const { handleLogout, linkPasskey } = useAuth();
  const { isPasskeyAvailable } = usePasskeySafe();
  const embeddedWallet = useEmbeddedWallet();
  const walletAddressFromUser = useWalletAddress(user);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [walletCreationAttempted, setWalletCreationAttempted] = useState(false);
  const [isLinkingPasskey, setIsLinkingPasskey] = useState(false);

  const walletAddress = useMemo(() => {
    const walletState = embeddedWallet as { wallet?: { address?: string } };


    if (walletAddressFromUser) {
      return walletAddressFromUser;
    }

    return null;
  }, [embeddedWallet, walletAddressFromUser]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/');
    }
  }, [isReady, isAuthenticated]);

  useEffect(() => {
    if (isReady && isAuthenticated && user && !walletCreationAttempted) {
      const walletState = embeddedWallet as any;
      const walletStatus = walletState?.status;
      const hasWallet = !!walletState.wallet;
      const createMethod = walletState.create || walletState.createWallet;

      if (!hasWallet && createMethod && !isCreatingWallet) {
        setIsCreatingWallet(true);
        setWalletCreationAttempted(true);

        createMethod()
          .then((result: any) => {
            setIsCreatingWallet(false);
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : 'Failed to create embedded wallet';
            setIsCreatingWallet(false);

            if (!message.includes('already') && !message.includes('exists')) {
              Alert.alert('Wallet Error', `Failed to create embedded wallet: ${message}`);
            } else {
            }
          });
      } else if (hasWallet) {
        setWalletCreationAttempted(true);
      } else if (!createMethod) {
        setWalletCreationAttempted(true);
      }
    }
  }, [isReady, isAuthenticated, user, isCreatingWallet, walletCreationAttempted]);

  const handleCopyAddress = useCallback(async () => {
    if (walletAddress) {
      await Clipboard.setStringAsync(walletAddress);
      Alert.alert('Copied!', 'Wallet address copied to clipboard');
    }
  }, [walletAddress]);

  const handleLogoutPress = useCallback(async () => {
    await handleLogout();
  }, [handleLogout]);

  const handleLinkPasskey = useCallback(async () => {
    setIsLinkingPasskey(true);
    await linkPasskey();
    setIsLinkingPasskey(false);
  }, [linkPasskey]);

  const hasPasskeyLinked = useMemo(() => {
    const userAny = user as any;
    const linkedAccounts = userAny?.linked_accounts || userAny?.linkedAccounts;
    if (!linkedAccounts || !Array.isArray(linkedAccounts)) return false;
    return linkedAccounts.some((acc: any) => acc.type === 'passkey' || acc.type === 'passkey_account');
  }, [user]);

  const handleRetryWalletCreation = useCallback(async () => {
    const walletState = embeddedWallet as any;
    const createMethod = walletState.create || walletState.createWallet;


    if (createMethod) {
      setIsCreatingWallet(true);

      try {
        const result = await createMethod();
        Alert.alert('Success', 'Wallet created successfully!');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create wallet';
        Alert.alert(
          'Error',
        );
      } finally {
        setIsCreatingWallet(false);
      }
    } else {
      Alert.alert(
        'Wallet Creation Unavailable',
      );
    }
  }, [embeddedWallet]);

  const userEmail = useMemo(() => {
    const userAny = user as any;
    const linkedAccounts = userAny?.linked_accounts || userAny?.linkedAccounts;

    if (!linkedAccounts || !Array.isArray(linkedAccounts)) {
      return 'Not set';
    }

    const emailAccount = linkedAccounts.find((acc: any) =>
      acc.type === 'email' ||
      acc.type === 'email_account'
    );


    if (emailAccount && emailAccount.address) {
      return String(emailAccount.address);
    }

    if (userAny.email && typeof userAny.email === 'object' && userAny.email.address) {
      return String(userAny.email.address);
    }

    return 'Not set';
  }, [user]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!walletCreationAttempted && isCreatingWallet) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={homeScreenStyles.safeArea} edges={['top', 'bottom']}>
      <ScrollView style={homeScreenStyles.container} contentContainerStyle={homeScreenStyles.content}>
        <View style={homeScreenStyles.header}>
          <Text style={homeScreenStyles.title}>Welcome to NeoBank</Text>
          <TouchableOpacity style={homeScreenStyles.logoutButton} onPress={handleLogoutPress}>
            <Text style={homeScreenStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={homeScreenStyles.card}>
          <Text style={homeScreenStyles.cardTitle}>User Information</Text>
          
          <InfoRow label="User ID:" value={user.id || 'N/A'} selectable />

          <InfoRow label="Email:" value={userEmail} selectable />

          <View style={homeScreenStyles.walletSection}>
            <Text style={homeScreenStyles.infoLabel}>Wallet Address:</Text>
            {walletAddress ? (
              <View style={homeScreenStyles.walletContainer}>
                <Text style={homeScreenStyles.walletAddress} selectable>
                  {walletAddress}
                </Text>
                <TouchableOpacity
                  style={homeScreenStyles.copyButton}
                  onPress={handleCopyAddress}
                >
                  <Text style={homeScreenStyles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {isCreatingWallet && <ActivityIndicator size="small" color="#6366f1" style={{ marginRight: 8 }} />}
                  <Text style={homeScreenStyles.walletLoading}>
                    {isCreatingWallet ? 'Creating wallet...' : 'Loading wallet address...'}
                  </Text>
                </View>
                {!isCreatingWallet && (
                  <TouchableOpacity
                    style={homeScreenStyles.copyButton}
                    onPress={handleRetryWalletCreation}
                  >
                    <Text style={homeScreenStyles.copyButtonText}>Retry Wallet Creation</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>

        <View style={homeScreenStyles.card}>
          <Text style={homeScreenStyles.cardTitle}>Account Details</Text>
          <Text style={homeScreenStyles.description}>
            Your embedded EVM wallet is automatically created and managed by Privy.
            You can use this wallet to interact with blockchain applications.
          </Text>
        </View>

        <View style={homeScreenStyles.card}>
          <Text style={homeScreenStyles.cardTitle}>Passkey Setup</Text>
          <Text style={homeScreenStyles.description}>
            {hasPasskeyLinked
              ? 'Passkey is linked to your account. You can use it to sign in next time.'
              : 'Add a passkey for faster sign-in with Face ID/Touch ID.'}
          </Text>

          {!hasPasskeyLinked && isPasskeyAvailable && (
            <TouchableOpacity
              style={[
                homeScreenStyles.copyButton,
                { marginTop: 12, backgroundColor: '#6366f1' }
              ]}
              onPress={handleLinkPasskey}
              disabled={isLinkingPasskey}
            >
              <Text style={[homeScreenStyles.copyButtonText, { color: '#fff' }]}>
                {isLinkingPasskey ? 'Linking...' : 'Link Passkey'}
              </Text>
            </TouchableOpacity>
          )}

          {hasPasskeyLinked && (
            <Text style={[homeScreenStyles.description, { marginTop: 12, color: '#10b981' }]}>
              Next time, use "Sign In with Passkey" on the login screen.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


