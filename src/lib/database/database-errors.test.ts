import { describe, it, expect } from 'vitest';
import { getDatabaseErrorKey } from './database-errors';

describe('getDatabaseErrorKey', () => {
  it('should return mapped error key when code exists in map', () => {
    const error = { code: 'invalid_credentials', message: 'Wrong password' };
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.invalidCredentials');
  });

  it('should return mapped error key for user_not_found', () => {
    const error = { code: 'user_not_found' };
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.invalidCredentials');
  });

  it('should return mapped error key for user_already_exists', () => {
    const error = { code: 'user_already_exists' };
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.emailTaken');
  });

  it('should return message if code is not in map', () => {
    const error = { code: 'unknown_code', message: 'Custom error message' };
    expect(getDatabaseErrorKey(error)).toBe('Custom error message');
  });

  it('should return message if code is undefined', () => {
    const error = { message: 'Something went wrong' };
    expect(getDatabaseErrorKey(error)).toBe('Something went wrong');
  });

  it('should return default error when no code and no message', () => {
    const error = {};
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.default');
  });

  it('should return default error when message is undefined', () => {
    const error = { code: 'unknown_code' };
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.default');
  });

  it('should prioritize code over message when code exists in map', () => {
    const error = {
      code: 'weak_password',
      message: 'Password is too weak',
    };
    expect(getDatabaseErrorKey(error)).toBe('serverErrors.weakPassword');
  });
});
