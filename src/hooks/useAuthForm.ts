import { useState, useCallback, useRef } from 'react';
import { validators, validationMessages } from '../utils/validation';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');

  const emailRef = useRef('');
  const otpRef = useRef('');

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    emailRef.current = text;
    setEmailError('');
  }, []);

  const handleOtpChange = useCallback((text: string) => {
    setOtp(text);
    otpRef.current = text;
    setOtpError('');
  }, []);

  const validateEmail = useCallback(() => {
    const trimmedEmail = emailRef.current.trim();

    if (!validators.required(trimmedEmail)) {
      setEmailError(validationMessages.emailRequired);
      return false;
    }

    if (!validators.email(trimmedEmail)) {
      setEmailError(validationMessages.email);
      return false;
    }

    setEmailError('');
    return true;
  }, []);

  const validateOtp = useCallback(() => {
    const trimmedOtp = otpRef.current.trim();

    if (!validators.required(trimmedOtp)) {
      setOtpError(validationMessages.otpRequired);
      return false;
    }

    if (!validators.otp(trimmedOtp)) {
      setOtpError(validationMessages.otp);
      return false;
    }

    setOtpError('');
    return true;
  }, []);

  const resetOtp = useCallback(() => {
    setOtp('');
    otpRef.current = '';
    setOtpError('');
  }, []);

  return {
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
  };
};
