import { describe, it, expect } from 'vitest';
import { signInSchema, signUpSchema } from './auth-schemas';

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'Test123!';
const MIN_PASSWORD_LENGTH = 8;

describe('signInSchema', () => {
  it('accepts valid email and password', () => {
    const result = signInSchema.safeParse({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const invalidEmails = ['', 'not-an-email', '@example.com', 'user@'];

    invalidEmails.forEach((email) => {
      const result = signInSchema.safeParse({
        email,
        password: VALID_PASSWORD,
      });
      expect(result.success).toBe(false);
    });
  });

  it('returns correct error message for invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'invalid',
      password: VALID_PASSWORD,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === 'email',
      );
      expect(emailError?.message).toBe('validationErrors.invalidEmail');
    }
  });

  it('rejects empty password', () => {
    const result = signInSchema.safeParse({
      email: VALID_EMAIL,
      password: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find(
        (issue) => issue.path[0] === 'password',
      );
      expect(passwordError?.message).toBe('validationErrors.passwordRequired');
    }
  });

  it('rejects null and undefined', () => {
    expect(signInSchema.safeParse(null).success).toBe(false);
    expect(signInSchema.safeParse(undefined).success).toBe(false);
  });

  it('rejects non-object types', () => {
    const testString = 'string';
    const testNumber = MIN_PASSWORD_LENGTH;

    [testString, testNumber, true, []].forEach((input) => {
      expect(signInSchema.safeParse(input).success).toBe(false);
    });
  });
});

describe('signUpSchema', () => {
  it('accepts valid registration data', () => {
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
      confirmPassword: VALID_PASSWORD,
    });
    expect(result.success).toBe(true);
  });

  it('rejects password shorter than minimum length', () => {
    const shortPassword = 'A1!';
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: shortPassword,
      confirmPassword: shortPassword,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find(
        (issue) => issue.path[0] === 'password',
      );
      expect(passwordError?.message).toBe('validationErrors.passwordMinLength');
    }
  });

  it('rejects password without letter', () => {
    const noLetterPassword = '12345678!';
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: noLetterPassword,
      confirmPassword: noLetterPassword,
    });

    expect(result.success).toBe(false);
  });

  it('rejects password without digit', () => {
    const noDigitPassword = 'Password!';
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: noDigitPassword,
      confirmPassword: noDigitPassword,
    });

    expect(result.success).toBe(false);
  });

  it('rejects password without special character', () => {
    const noSpecialPassword = 'Password123';
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: noSpecialPassword,
      confirmPassword: noSpecialPassword,
    });

    expect(result.success).toBe(false);
  });

  it('rejects when passwords do not match', () => {
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
      confirmPassword: 'DifferentPass1!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.issues.find(
        (issue) => issue.path[0] === 'confirmPassword',
      );
      expect(confirmError?.message).toBe('validationErrors.passwordsMatch');
    }
  });

  it('rejects empty confirmPassword', () => {
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
      confirmPassword: '',
    });

    expect(result.success).toBe(false);
  });

  it('returns multiple errors for multiple invalid fields', () => {
    const result = signUpSchema.safeParse({
      email: 'invalid',
      password: 'short',
      confirmPassword: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain('email');
      expect(paths).toContain('password');
      expect(paths).toContain('confirmPassword');
    }
  });

  it('accepts unicode letters in password', () => {
    const unicodePassword = 'Пароль123!';
    const result = signUpSchema.safeParse({
      email: VALID_EMAIL,
      password: unicodePassword,
      confirmPassword: unicodePassword,
    });
    expect(result.success).toBe(true);
  });
});
