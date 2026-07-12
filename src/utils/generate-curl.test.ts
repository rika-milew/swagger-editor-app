import { describe, it, expect } from 'vitest';
import { generateCurl, createCurlCommand } from './generate-curl';
import type { SwaggerParameter } from '@/types/viewer.types';
import type { Endpoint } from '@/utils/parse-swagger';

function createParameter(
  overrides: Partial<SwaggerParameter> = {},
): SwaggerParameter {
  return {
    name: 'test',
    in: 'query',
    ...overrides,
  };
}

function createEndpoint(overrides: Partial<Endpoint> = {}): Endpoint {
  return {
    path: '/test',
    method: 'get',
    parameters: [],
    ...overrides,
  };
}

describe('generateCurl', () => {
  const baseInput = {
    baseUrl: 'https://api.example.com',
    path: '/users',
    method: 'get',
    parameters: [] as SwaggerParameter[],
    paramValues: {},
    bodyValue: '',
  };

  it('should generate basic GET curl command', () => {
    const curl = generateCurl(baseInput);
    expect(curl).toBe("curl -X GET \\\n  'https://api.example.com/users'");
  });

  it('should generate curl with headers', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'Authorization', in: 'header' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      parameters,
      paramValues: { Authorization: 'Bearer token123' },
    });

    const expected = [
      'curl -X GET \\',
      "  -H 'Authorization: Bearer token123' \\",
      "  'https://api.example.com/users'",
    ].join('\n');

    expect(curl).toBe(expected);
  });

  it('should generate curl with path parameter', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'id', in: 'path' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      path: '/users/{id}',
      parameters,
      paramValues: { id: '123' },
    });

    expect(curl).toBe("curl -X GET \\\n  'https://api.example.com/users/123'");
  });

  it('should generate curl with query parameters', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'search', in: 'query' }),
      createParameter({ name: 'page', in: 'query' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      parameters,
      paramValues: { search: 'test', page: '1' },
    });

    const expected = [
      'curl -X GET \\',
      "  'https://api.example.com/users?search=test&page=1'",
    ].join('\n');

    expect(curl).toBe(expected);
  });

  it('should generate POST curl with body', () => {
    const curl = generateCurl({
      ...baseInput,
      method: 'POST',
      bodyValue: '{"name":"test"}',
    });

    const expected = [
      'curl -X POST \\',
      "  -H 'Content-Type: application/json' \\",
      '  -d \'{"name":"test"}\' \\',
      "  'https://api.example.com/users'",
    ].join('\n');

    expect(curl).toBe(expected);
  });

  it('should not add Content-Type if already present in headers', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'Content-Type', in: 'header' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      method: 'POST',
      parameters,
      paramValues: { 'Content-Type': 'text/plain' },
      bodyValue: 'plain text body',
    });

    expect(curl).toContain("-H 'Content-Type: text/plain'");
    expect(curl).not.toContain('application/json');
  });

  it('should escape single quotes in values', () => {
    const curl = generateCurl({
      ...baseInput,
      method: 'POST',
      bodyValue: "it's a test",
    });

    expect(curl).toContain(String.raw`-d 'it'\''s a test'`);
  });

  it('should escape single quotes in URL', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'name', in: 'query' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      parameters,
      paramValues: { name: "test'value" },
    });

    expect(curl).toContain(
      String.raw`'https://api.example.com/users?name=test'\''value'`,
    );
  });

  it('should escape single quotes in headers', () => {
    const parameters: SwaggerParameter[] = [
      createParameter({ name: 'X-Custom', in: 'header' }),
    ];

    const curl = generateCurl({
      ...baseInput,
      parameters,
      paramValues: { 'X-Custom': "it's a value" },
    });

    expect(curl).toContain(String.raw`-H 'X-Custom: it'\''s a value'`);
  });

  it('should not add body for GET requests even if bodyValue is provided', () => {
    const curl = generateCurl({
      ...baseInput,
      bodyValue: 'should not appear',
    });

    expect(curl).not.toContain('-d');
    expect(curl).not.toContain('should not appear');
  });
});

describe('createCurlCommand', () => {
  it('should create curl command from Endpoint object', () => {
    const endpoint = createEndpoint({
      path: '/users/{id}',
      method: 'delete',
      parameters: [
        createParameter({ name: 'id', in: 'path' }),
        createParameter({ name: 'Authorization', in: 'header' }),
      ],
    });

    const curl = createCurlCommand(
      'https://api.example.com',
      endpoint,
      { id: '123', Authorization: 'Bearer token' },
      '',
    );

    const expected = [
      'curl -X DELETE \\',
      "  -H 'Authorization: Bearer token' \\",
      "  'https://api.example.com/users/123'",
    ].join('\n');

    expect(curl).toBe(expected);
  });

  it('should handle endpoint with no parameters', () => {
    const endpoint = createEndpoint({
      path: '/health',
      method: 'get',
    });

    const curl = createCurlCommand('https://api.example.com', endpoint, {}, '');

    expect(curl).toBe("curl -X GET \\\n  'https://api.example.com/health'");
  });

  it('should handle endpoint with null parameters', () => {
    const endpoint = createEndpoint({
      path: '/data',
      method: 'post',
      parameters: undefined,
    });

    const curl = createCurlCommand(
      'https://api.example.com',
      endpoint,
      {},
      '{"key":"value"}',
    );

    const expected = [
      'curl -X POST \\',
      "  -H 'Content-Type: application/json' \\",
      '  -d \'{"key":"value"}\' \\',
      "  'https://api.example.com/data'",
    ].join('\n');

    expect(curl).toBe(expected);
  });
});
