import { useCallback } from 'react';
import { Alert } from 'react-native';
import { usePrivy, useLoginWithEmail } from '@privy-io/expo';
import { useSignupWithPasskey, useLoginWithPasskey, useLinkWithPasskey } from '@privy-io/expo/passkey';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { AuthError } from '../types';

export const useAuth = () => {
  const { logout } = usePrivy();
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { signupWithPasskey } = useSignupWithPasskey({
    onSuccess: () => {
      Alert.alert('Success', 'Passkey created successfully!');
    },
  });

  const { loginWithPasskey } = useLoginWithPasskey();

  const { linkWithPasskey } = useLinkWithPasskey({
    onSuccess: () => {
      Alert.alert('Success', 'Passkey linked! You can now use it to sign in.');
    },
  });

  const handleError = useCallback((error: unknown, defaultMessage: string) => {
    const message = (error as AuthError)?.message || defaultMessage;
    Alert.alert('Error', message);
  }, []);

  const signInWithEmail = useCallback(async (email: string) => {
    try {
      await sendCode({ email: email.trim() });
      return true;
    } catch (error) {
      handleError(error, 'Failed to send OTP');
      return false;
    }
  }, [sendCode, handleError]);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    try {
      await loginWithCode({ email: email.trim(), code: otp.trim() });
      router.replace('/home');
      return true;
    } catch (error) {
      handleError(error, 'Invalid OTP code');
      return false;
    }
  }, [loginWithCode, handleError]);

  const signUpWithPasskey = useCallback(async () => {
    try {
      const relyingParty = Constants.expoConfig?.extra?.passkeyAssociatedDomain || 'https://testilya.win';
      await signupWithPasskey({ relyingParty });
      router.replace('/home');
      return true;
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = authError?.message || 'Failed to create passkey';

      if (errorMessage.includes('user cancelled') || errorMessage.includes('canceled')) {
        errorMessage = 'Passkey creation was cancelled';
      } else if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        errorMessage = 'A passkey already exists. Please try signing in instead.';
      }

      handleError(error, errorMessage);
      return false;
    }
  }, [signupWithPasskey, handleError]);

  const signInWithPasskey = useCallback(async () => {
    try {
      const relyingParty = Constants.expoConfig?.extra?.passkeyAssociatedDomain || 'https://testilya.win';
      await loginWithPasskey({ relyingParty });
      router.replace('/home');
      return true;
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = authError?.message || 'Failed to sign in with passkey';

      if (errorMessage.includes('user cancelled') || errorMessage.includes('canceled')) {
        errorMessage = 'Passkey sign in was cancelled';
      } else if (errorMessage.includes('not found') || errorMessage.includes('No credentials')) {
        errorMessage = 'No passkey found. Please sign up first.';
      }

      handleError(error, errorMessage);
      return false;
    }
  }, [loginWithPasskey, handleError]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.replace('/');
      return true;
    } catch (error) {
      handleError(error, 'Failed to logout');
      return false;
    }
  }, [logout, handleError]);

  const linkPasskey = useCallback(async () => {
    try {
      const relyingParty = Constants.expoConfig?.extra?.passkeyAssociatedDomain || 'https://testilya.win';
      await linkWithPasskey({ relyingParty });
      return true;
    } catch (error) {
      const errorMessage = (error as Error)?.message || 'Failed to link passkey';
      Alert.alert('Error', errorMessage);
      return false;
    }
  }, [linkWithPasskey]);

  return {
    signInWithEmail,
    verifyOTP,
    signUpWithPasskey,
    signInWithPasskey,
    linkPasskey,
    handleLogout,
  };
};
