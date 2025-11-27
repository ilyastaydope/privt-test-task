export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  otp: (code: string): boolean => {
    return /^\d{6}$/.test(code.trim());
  },

  required: (value: string): boolean => {
    return value.trim().length > 0;
  },
};

export const validationMessages = {
  email: 'Please enter a valid email address',
  emailRequired: 'Please enter your email address',
  otp: 'Please enter a 6-digit code',
  otpRequired: 'Please enter the verification code',
  required: 'This field is required',
};
