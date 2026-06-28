import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './get-error-message';

const HTTP_NOT_FOUND = 404;

describe('getErrorMessage', () => {
  it('returns message from Error instance', () => {
    expect(getErrorMessage(new Error('Test error'))).toBe('Test error');
  });

  it('returns message from plain object with string message', () => {
    expect(getErrorMessage({ message: 'Plain error' })).toBe('Plain error');
  });

  it('returns message from Supabase error object', () => {
    const error = {
      message: 'Invalid credentials',
      status: 400,
      name: 'AuthApiError',
    };
    expect(getErrorMessage(error)).toBe('Invalid credentials');
  });

  it('returns message from object with extra properties', () => {
    const error = { message: 'Error', code: 500, timestamp: new Date() };
    expect(getErrorMessage(error)).toBe('Error');
  });

  it('returns undefined for null', () => {
    expect(getErrorMessage(null)).toBeUndefined();
  });

  it('returns undefined for undefined', () => {
    expect(getErrorMessage(undefined)).toBeUndefined();
  });

  it('returns undefined for string', () => {
    expect(getErrorMessage('error string')).toBeUndefined();
  });

  it('returns undefined for number', () => {
    expect(getErrorMessage(HTTP_NOT_FOUND)).toBeUndefined();
  });

  it('returns undefined for array', () => {
    expect(getErrorMessage(['error'])).toBeUndefined();
  });

  it('returns undefined for object without message property', () => {
    expect(getErrorMessage({ code: 500 })).toBeUndefined();
  });

  it('returns undefined for object with non-string message', () => {
    expect(getErrorMessage({ message: 404 })).toBeUndefined();
  });

  it('returns undefined for object with null message', () => {
    expect(getErrorMessage({ message: null })).toBeUndefined();
  });

  it('works with custom error classes', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }
    expect(getErrorMessage(new CustomError('Custom'))).toBe('Custom');
  });

  it('returns undefined for all primitives', () => {
    expect(getErrorMessage(true)).toBeUndefined();
    expect(getErrorMessage(false)).toBeUndefined();
    expect(getErrorMessage(0)).toBeUndefined();
    expect(getErrorMessage('')).toBeUndefined();
    expect(getErrorMessage(Symbol('error'))).toBeUndefined();
  });

  it('works with fallback pattern', () => {
    const result = getErrorMessage(null) ?? 'Default error';
    expect(result).toBe('Default error');
    expect(typeof result).toBe('string');
  });

  it('narrows type correctly for conditional logic', () => {
    const error: unknown = { message: 'Test' };
    const message = getErrorMessage(error);

    if (message) {
      expect(message.toUpperCase()).toBe('TEST');
    }
  });
});
