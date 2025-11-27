import { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../hooks';
import { usePrivyState } from '../hooks';
import { usePasskeySafe } from '../hooks';
import { useAuthForm } from '../hooks/useAuthForm';
import { LoadingScreen } from '../atoms';
import { EmailStep } from '../molecules/EmailStep';
import { OTPStep } from '../molecules/OTPStep';
import { authScreenStyles } from '../styles/organisms/AuthScreen.styles';

export default function AuthScreen() {
  const { isReady, isAuthenticated } = usePrivyState();
  const { isPasskeyAvailable } = usePasskeySafe();
  const { signInWithEmail, verifyOTP, signUpWithPasskey, signInWithPasskey } = useAuth();
  const {
    email,
    otp,
    emailError,
    otpError,
    emailRef,
    otpRef,
    handleEmailChange,
    handleOtpChange,
    validateEmail,
    validateOtp,
    resetOtp,
  } = useAuthForm();

  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [passkeySigninFailed, setPasskeySigninFailed] = useState(false);

  const emailInputRef = useRef<any>(null);
  const otpInputRef = useRef<any>(null);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace('/home');
    }
  }, [isReady, isAuthenticated]);

  const handleEmailSubmit = useCallback(async () => {
    if (!validateEmail()) {
      emailInputRef.current?.focus();
      return;
    }

    setLoading(true);
    emailInputRef.current?.blur();

    const success = await signInWithEmail(emailRef.current.trim());
    if (success) {
      setStep('otp');
      resetOtp();
      setTimeout(() => otpInputRef.current?.focus(), 100);
    } else {
      emailInputRef.current?.focus();
    }
    setLoading(false);
  }, [validateEmail, signInWithEmail, emailRef, resetOtp]);

  const handleOTPSubmit = useCallback(async () => {
    if (!validateOtp()) {
      otpInputRef.current?.focus();
      return;
    }

    setLoading(true);
    otpInputRef.current?.blur();

    await verifyOTP(emailRef.current.trim(), otpRef.current.trim());
    setLoading(false);
  }, [validateOtp, verifyOTP, emailRef, otpRef]);

  const handlePasskeySignUp = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    emailInputRef.current?.blur();

    const success = await signUpWithPasskey();
    if (!success) setLoading(false);
  }, [signUpWithPasskey, loading]);

  const handlePasskeySignIn = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setPasskeySigninFailed(false);
    emailInputRef.current?.blur();

    const success = await signInWithPasskey();
    if (!success) {
      setLoading(false);
      setPasskeySigninFailed(true);
    }
  }, [signInWithPasskey, loading]);

  const handleResendOTP = useCallback(async () => {
    resetOtp();
    setLoading(true);
    const success = await signInWithEmail(emailRef.current.trim());
    if (success) {
      Alert.alert('Success', 'OTP code resent to your email');
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }
    setLoading(false);
  }, [signInWithEmail, emailRef, resetOtp]);

  const handleChangeEmail = useCallback(() => {
    setStep('email');
    resetOtp();
    emailInputRef.current?.focus();
  }, [resetOtp]);

  if (!isReady) return <LoadingScreen />;
  if (isAuthenticated) return null;

  return (
    <View style={authScreenStyles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={authScreenStyles.scrollContent}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={authScreenStyles.content}>
            <Text style={authScreenStyles.title}>NeoBank</Text>
            <Text style={authScreenStyles.subtitle}>Welcome to your digital bank</Text>

            {step === 'email' ? (
              <EmailStep
                email={email}
                emailError={emailError}
                loading={loading}
                isPasskeyAvailable={isPasskeyAvailable}
                passkeySigninFailed={passkeySigninFailed}
                emailInputRef={emailInputRef}
                onEmailChange={handleEmailChange}
                onEmailSubmit={handleEmailSubmit}
                onPasskeySignUp={handlePasskeySignUp}
                onPasskeySignIn={handlePasskeySignIn}
              />
            ) : (
              <OTPStep
                email={email}
                otp={otp}
                otpError={otpError}
                loading={loading}
                otpInputRef={otpInputRef}
                onOtpChange={handleOtpChange}
                onOtpSubmit={handleOTPSubmit}
                onResendOTP={handleResendOTP}
                onChangeEmail={handleChangeEmail}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
