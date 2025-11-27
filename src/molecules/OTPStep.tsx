import React, { RefObject } from 'react';
import { View } from 'react-native';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { LinkButton } from './LinkButton';
import { authScreenStyles } from '../styles/organisms/AuthScreen.styles';

interface OTPStepProps {
  email: string;
  otp: string;
  otpError: string;
  loading: boolean;
  otpInputRef: RefObject<any>;
  onOtpChange: (text: string) => void;
  onOtpSubmit: () => void;
  onResendOTP: () => void;
  onChangeEmail: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({
  email,
  otp,
  otpError,
  loading,
  otpInputRef,
  onOtpChange,
  onOtpSubmit,
  onResendOTP,
  onChangeEmail,
}) => (
  <>
    <Input
      ref={otpInputRef}
      label="Enter OTP Code"
      hint={`We sent a code to ${email}`}
      value={otp}
      onChangeText={onOtpChange}
      keyboardType="number-pad"
      maxLength={6}
      placeholder="Enter 6-digit code"
      editable={!loading}
      error={otpError}
      returnKeyType="done"
      onSubmitEditing={onOtpSubmit}
    />

    <Button
      title="Verify OTP"
      onPress={onOtpSubmit}
      loading={loading}
      disabled={loading}
    />

    <View style={authScreenStyles.linkContainer}>
      <LinkButton
        title="Resend code"
        onPress={onResendOTP}
        disabled={loading}
      />
      <LinkButton
        title="Change email"
        onPress={onChangeEmail}
        disabled={loading}
      />
    </View>
  </>
);
