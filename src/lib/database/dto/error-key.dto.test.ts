import { describe, it, expect } from 'vitest';
import { toErrorKeyDTO } from './error-key.dto';

describe('toErrorKeyDTO', () => {
  it('should return mapped error key when code exists in map', () => {
    const error = { code: 'invalid_credentials', message: 'Wrong password' };
    expect(toErrorKeyDTO(error)).toBe('serverErrors.invalidCredentials');
  });

  it('should return mapped error key for user_not_found', () => {
    const error = { code: 'user_not_found' };
    expect(toErrorKeyDTO(error)).toBe('serverErrors.invalidCredentials');
  });

  it('should return mapped error key for user_already_exists', () => {
    const error = { code: 'user_already_exists' };
    expect(toErrorKeyDTO(error)).toBe('serverErrors.emailTaken');
  });

  it('should return message if code is not in map', () => {
    const error = { code: 'unknown_code', message: 'Custom error message' };
    expect(toErrorKeyDTO(error)).toBe('Custom error message');
  });

  it('should return message if code is undefined', () => {
    const error = { message: 'Something went wrong' };
    expect(toErrorKeyDTO(error)).toBe('Something went wrong');
  });

  it('should return default error when no code and no message', () => {
    const error = {};
    expect(toErrorKeyDTO(error)).toBe('serverErrors.default');
  });

  it('should return default error when message is undefined', () => {
    const error = { code: 'unknown_code' };
    expect(toErrorKeyDTO(error)).toBe('serverErrors.default');
  });

  it('should prioritize code over message when code exists in map', () => {
    const error = {
      code: 'weak_password',
      message: 'Password is too weak',
    };
    expect(toErrorKeyDTO(error)).toBe('serverErrors.weakPassword');
  });
});
