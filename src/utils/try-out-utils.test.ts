import { describe, it, expect } from 'vitest';
import { getParameters, buildUrl, buildHeaders } from './try-it-out-utils';
import type { SwaggerParameter } from '@/types/viewer.types';

function createParameter(
  overrides: Partial<SwaggerParameter> = {},
): SwaggerParameter {
  return {
    name: 'test',
    in: 'query',
    ...overrides,
  };
}

describe('getParameters', () => {
  const parameters: SwaggerParameter[] = [
    createParameter({ name: 'id', in: 'path' }),
    createParameter({ name: 'limit', in: 'query' }),
    createParameter({ name: 'auth', in: 'header' }),
  ];

  it('should filter parameters by location path', () => {
    const result = getParameters(parameters, 'path');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('id');
  });

  it('should filter parameters by location query', () => {
    const result = getParameters(parameters, 'query');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('limit');
  });

  it('should return empty array if no parameters match', () => {
    const result = getParameters(parameters, 'cookie');
    expect(result).toHaveLength(0);
  });

  it('should return empty array for empty parameters input', () => {
    const result = getParameters([], 'path');
    expect(result).toEqual([]);
  });
});

describe('buildUrl', () => {
  const parameters: SwaggerParameter[] = [
    createParameter({ name: 'id', in: 'path' }),
    createParameter({ name: 'search', in: 'query' }),
    createParameter({ name: 'page', in: 'query' }),
  ];

  it('should build URL with path parameter replaced', () => {
    const url = buildUrl('https://api.example.com', '/users/{id}', parameters, {
      id: '123',
    });
    expect(url).toBe('https://api.example.com/users/123');
  });

  it('should build URL with query parameters', () => {
    const url = buildUrl('https://api.example.com', '/users', parameters, {
      search: 'test',
      page: '1',
    });
    expect(url).toBe('https://api.example.com/users?search=test&page=1');
  });

  it('should build URL with both path and query parameters', () => {
    const url = buildUrl('https://api.example.com', '/users/{id}', parameters, {
      id: '123',
      search: 'test',
    });
    expect(url).toBe('https://api.example.com/users/123?search=test');
  });

  it('should encode special characters in URL', () => {
    const url = buildUrl('https://api.example.com', '/users/{id}', parameters, {
      id: 'hello world',
    });
    expect(url).toBe('https://api.example.com/users/hello%20world');
  });

  it('should not add query string if no query parameters provided', () => {
    const url = buildUrl('https://api.example.com', '/users', parameters, {});
    expect(url).toBe('https://api.example.com/users');
  });

  it('should handle missing path parameter correctly', () => {
    const url = buildUrl(
      'https://api.example.com',
      '/users/{id}',
      parameters,
      {},
    );
    expect(url).toBe('https://api.example.com/users/{id}');
  });
});

describe('buildHeaders', () => {
  const parameters: SwaggerParameter[] = [
    createParameter({ name: 'Authorization', in: 'header' }),
    createParameter({ name: 'Content-Type', in: 'header' }),
    createParameter({ name: 'sessionId', in: 'cookie' }),
    createParameter({ name: 'token', in: 'cookie' }),
  ];

  it('should build headers with header parameters', () => {
    const headers = buildHeaders(parameters, {
      Authorization: 'Bearer token123',
      'Content-Type': 'application/json',
    });
    expect(headers).toEqual({
      Authorization: 'Bearer token123',
      'Content-Type': 'application/json',
    });
  });

  it('should build Cookie header from cookie parameters', () => {
    const headers = buildHeaders(parameters, {
      sessionId: 'abc123',
      token: 'xyz789',
    });
    expect(headers.Cookie).toBe('sessionId=abc123; token=xyz789');
  });

  it('should handle both header and cookie parameters', () => {
    const headers = buildHeaders(parameters, {
      Authorization: 'Bearer token123',
      sessionId: 'abc123',
    });
    expect(headers).toEqual({
      Authorization: 'Bearer token123',
      Cookie: 'sessionId=abc123',
    });
  });

  it('should encode special characters in cookies', () => {
    const headers = buildHeaders(parameters, {
      sessionId: 'test session=123',
    });
    expect(headers.Cookie).toBe('sessionId=test%20session%3D123');
  });

  it('should return empty object if no matching parameters', () => {
    const headers = buildHeaders(parameters, {});
    expect(headers).toEqual({});
  });

  it('should not include parameters without values', () => {
    const headers = buildHeaders(parameters, {
      Authorization: 'Bearer token123',
    });
    expect(headers.Authorization).toBe('Bearer token123');
    expect(headers['Content-Type']).toBeUndefined();
    expect(headers.Cookie).toBeUndefined();
  });
});
