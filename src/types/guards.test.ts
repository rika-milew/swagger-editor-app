import { describe, it, expect } from 'vitest';
import { isRequestMethod, isInternalUrl, isProxyRequest } from './guards';
import { VALID_HTTP_METHODS } from '@/constants/http-status';

describe('isRequestMethod', () => {
  it.each([...VALID_HTTP_METHODS])(
    'returns true for valid HTTP method %s',
    (method) => {
      expect(isRequestMethod(method)).toBe(true);
    },
  );

  it('returns false for invalid methods', () => {
    expect(isRequestMethod('INVALID')).toBe(false);
    expect(isRequestMethod('')).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isRequestMethod(100)).toBe(false);
    expect(isRequestMethod(null)).toBe(false);
    expect(isRequestMethod(undefined)).toBe(false);
    expect(isRequestMethod({})).toBe(false);
    expect(isRequestMethod([])).toBe(false);
    expect(isRequestMethod(true)).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(isRequestMethod('get')).toBe(false);
    expect(isRequestMethod('post')).toBe(false);
  });
});

describe('isInternalUrl', () => {
  it('returns true for localhost', () => {
    expect(isInternalUrl('http://localhost:3000/api/test')).toBe(true);
    expect(isInternalUrl('https://localhost/test')).toBe(true);
  });

  it('returns true for 127.0.0.1', () => {
    expect(isInternalUrl('http://127.0.0.1:3000/api')).toBe(true);
    expect(isInternalUrl('https://127.0.0.1/test')).toBe(true);
  });

  it('returns true for 0.0.0.0', () => {
    expect(isInternalUrl('http://0.0.0.0:3000/api')).toBe(true);
  });

  it('returns true for localhost with different ports', () => {
    expect(isInternalUrl('http://localhost:3000/api')).toBe(true);
    expect(isInternalUrl('http://localhost:8080/test')).toBe(true);
    expect(isInternalUrl('https://localhost:443/path')).toBe(true);
  });

  it('returns false for external URLs', () => {
    expect(isInternalUrl('https://example.com/api')).toBe(false);
    expect(isInternalUrl('http://api.github.com/users')).toBe(false);
  });

  it('returns true for invalid URLs', () => {
    expect(isInternalUrl('not-a-url')).toBe(true);
    expect(isInternalUrl('')).toBe(true);
    expect(isInternalUrl('http://')).toBe(true);
  });
});

describe('isProxyRequest', () => {
  it('returns true for valid proxy request', () => {
    expect(isProxyRequest({ url: 'https://example.com' })).toBe(true);
    expect(
      isProxyRequest({
        url: 'https://api.example.com/data',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'value' }),
      }),
    ).toBe(true);
  });

  it('returns false when url is missing', () => {
    expect(isProxyRequest({})).toBe(false);
    expect(isProxyRequest({ method: 'GET' })).toBe(false);
  });

  it('returns false when url is empty string', () => {
    expect(isProxyRequest({ url: '' })).toBe(false);
  });

  it('returns false when url is not a string', () => {
    expect(isProxyRequest({ url: 100 })).toBe(false);
    expect(isProxyRequest({ url: null })).toBe(false);
    expect(isProxyRequest({ url: undefined })).toBe(false);
    expect(isProxyRequest({ url: [] })).toBe(false);
    expect(isProxyRequest({ url: {} })).toBe(false);
  });

  it('returns false for non-object values', () => {
    expect(isProxyRequest(null)).toBe(false);
    expect(isProxyRequest(undefined)).toBe(false);
    expect(isProxyRequest('string')).toBe(false);
    expect(isProxyRequest(100)).toBe(false);
    expect(isProxyRequest(true)).toBe(false);
    expect(isProxyRequest([])).toBe(false);
  });
});
