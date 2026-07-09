import { describe, expect, it } from 'vitest';

import { isHttpMethod, parseSwagger } from './parse-swagger';
import type { SwaggerSchema } from '@/components/swagger-viewer/types';

const info = {
  title: 'Test API',
  version: '1.0.0',
};

describe('isHttpMethod', () => {
  it('returns true for valid HTTP methods', () => {
    expect(isHttpMethod('get')).toBe(true);
    expect(isHttpMethod('post')).toBe(true);
    expect(isHttpMethod('put')).toBe(true);
    expect(isHttpMethod('patch')).toBe(true);
    expect(isHttpMethod('delete')).toBe(true);
  });

  it('returns false for invalid method', () => {
    expect(isHttpMethod('invalid')).toBe(false);
    expect(isHttpMethod('options')).toBe(false);
    expect(isHttpMethod('head')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(isHttpMethod('GET')).toBe(false);
    expect(isHttpMethod('Post')).toBe(false);
  });
});

describe('parseSwagger', () => {
  it('parses endpoints from schema', () => {
    const schema: SwaggerSchema = {
      info,
      paths: {
        '/users': {
          get: {
            summary: 'Get users',
          },
          post: {
            summary: 'Create user',
          },
        },
      },
    };

    expect(parseSwagger(schema)).toEqual([
      {
        path: '/users',
        method: 'get',
        summary: 'Get users',
      },
      {
        path: '/users',
        method: 'post',
        summary: 'Create user',
      },
    ]);
  });

  it('ignores unknown methods', () => {
    const schema = {
      info,
      paths: {
        '/users': {
          get: {
            summary: 'Get users',
          },
          customMethod: {
            summary: 'Should be ignored',
          },
        },
      },
    } as unknown as SwaggerSchema;

    expect(parseSwagger(schema)).toEqual([
      {
        path: '/users',
        method: 'get',
        summary: 'Get users',
      },
    ]);
  });

  it('ignores undefined operations', () => {
    const schema = {
      info,
      paths: {
        '/users': {
          get: undefined,
          post: {
            summary: 'Create user',
          },
        },
      },
    } as SwaggerSchema;

    expect(parseSwagger(schema)).toEqual([
      {
        path: '/users',
        method: 'post',
        summary: 'Create user',
      },
    ]);
  });

  it('returns empty array for empty schema', () => {
    const schema: SwaggerSchema = {
      info,
      paths: {},
    };

    expect(parseSwagger(schema)).toEqual([]);
  });

  it('supports operations without summary', () => {
    const schema = {
      info,
      paths: {
        '/users': {
          get: {},
        },
      },
    } as SwaggerSchema;

    expect(parseSwagger(schema)).toEqual([
      {
        path: '/users',
        method: 'get',
        summary: undefined,
      },
    ]);
  });

  it('parses multiple paths', () => {
    const schema: SwaggerSchema = {
      info,
      paths: {
        '/users': {
          get: {
            summary: 'Get users',
          },
        },
        '/login': {
          post: {
            summary: 'Login',
          },
        },
      },
    };

    expect(parseSwagger(schema)).toEqual([
      {
        path: '/users',
        method: 'get',
        summary: 'Get users',
      },
      {
        path: '/login',
        method: 'post',
        summary: 'Login',
      },
    ]);
  });
});
