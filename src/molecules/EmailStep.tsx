import React, { RefObject } from 'react';
import { View, Text } from 'react-native';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Divider } from './Divider';
import { PasskeyHint } from './PasskeyHint';

interface EmailStepProps {
  email: string;
  emailError: string;
  loading: boolean;
  isPasskeyAvailable: boolean;
  passkeySigninFailed: boolean;
  emailInputRef: RefObject<any>;
  onEmailChange: (text: string) => void;
  onEmailSubmit: () => void;
  onPasskeySignUp: () => void;
  onPasskeySignIn: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  emailError,
  loading,
  isPasskeyAvailable,
  passkeySigninFailed,
  emailInputRef,
  onEmailChange,
  onEmailSubmit,
  onPasskeySignUp,
  onPasskeySignIn,
}) => (
  <>
    <Input
      ref={emailInputRef}
      label="Email Address"
      value={email}
      onChangeText={onEmailChange}
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      placeholder="Enter your email"
      editable={!loading}
      error={emailError}
      returnKeyType="next"
      onSubmitEditing={onEmailSubmit}
    />

    <Button
      title="Continue with Email"
      onPress={onEmailSubmit}
      loading={loading}
      disabled={loading}
    />

    <Divider />

    <Button
      title="Sign Up with Passkey"
      onPress={onPasskeySignUp}
      loading={loading}
      disabled={loading || !isPasskeyAvailable}
      variant="secondary"
    />

    <Button
      title="Sign In with Passkey"
      onPress={onPasskeySignIn}
      loading={loading}
      disabled={loading || !isPasskeyAvailable}
      variant="secondary"
    />

    {!isPasskeyAvailable && <PasskeyHint />}

    {passkeySigninFailed && (
      <View style={{ marginTop: 12, padding: 12, backgroundColor: '#FEF3C7', borderRadius: 8 }}>
        <Text style={{ fontSize: 14, color: '#92400E', marginBottom: 8, fontWeight: '600' }}>
          Passkey sign in failed
        </Text>
        <Text style={{ fontSize: 12, color: '#92400E', marginBottom: 8 }}>
          This is a known issue with Privy SDK passkey signin. Try email authentication instead.
        </Text>
        <Text style={{ fontSize: 11, color: '#78350F' }}>
          Note: Passkey sign UP works correctly. This test uses email auth for demonstration.
        </Text>
      </View>
    )}
  </>
);
