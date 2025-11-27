import { validators, validationMessages } from '../../src/utils/validation';

describe('Validation Utilities', () => {
  describe('validators.email', () => {
    it('validates correct email addresses', () => {
      expect(validators.email('test@example.com')).toBe(true);
      expect(validators.email('user.name@example.co.uk')).toBe(true);
      expect(validators.email('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validators.email('')).toBe(false);
      expect(validators.email('invalid')).toBe(false);
      expect(validators.email('invalid@')).toBe(false);
      expect(validators.email('@example.com')).toBe(false);
      expect(validators.email('invalid@.com')).toBe(false);
    });

    it('trims whitespace before validation', () => {
      expect(validators.email('  test@example.com  ')).toBe(true);
    });
  });

  describe('validators.otp', () => {
    it('validates 6-digit OTP codes', () => {
      expect(validators.otp('123456')).toBe(true);
      expect(validators.otp('000000')).toBe(true);
      expect(validators.otp('999999')).toBe(true);
    });

    it('rejects invalid OTP codes', () => {
      expect(validators.otp('')).toBe(false);
      expect(validators.otp('12345')).toBe(false); // too short
      expect(validators.otp('1234567')).toBe(false); // too long
      expect(validators.otp('12345a')).toBe(false); // contains letters
      expect(validators.otp('abc123')).toBe(false); // contains letters
    });

    it('trims whitespace before validation', () => {
      expect(validators.otp('  123456  ')).toBe(true);
    });
  });

  describe('validators.required', () => {
    it('validates non-empty strings', () => {
      expect(validators.required('hello')).toBe(true);
      expect(validators.required('a')).toBe(true);
    });

    it('rejects empty or whitespace-only strings', () => {
      expect(validators.required('')).toBe(false);
      expect(validators.required('   ')).toBe(false);
      expect(validators.required('\t\n')).toBe(false);
    });
  });

  describe('validationMessages', () => {
    it('provides all required error messages', () => {
      expect(validationMessages.email).toBeDefined();
      expect(validationMessages.emailRequired).toBeDefined();
      expect(validationMessages.otp).toBeDefined();
      expect(validationMessages.otpRequired).toBeDefined();
      expect(validationMessages.required).toBeDefined();
    });
  });
});
