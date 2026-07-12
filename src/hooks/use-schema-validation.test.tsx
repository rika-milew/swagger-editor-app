import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { useSchemaValidation } from './use-schema-validation';
import { VALIDATION_DELAY } from './use-schema-validation';

const mockValidate = vi.fn();

vi.mock('@apidevtools/swagger-parser', () => ({
  default: class {
    public validate = mockValidate;
  },
}));

const mockTranslations = (key: string): string => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

describe('useSchemaValidation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockValidate.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial state when value is empty', () => {
    const { result } = renderHook(() => useSchemaValidation('', 'json'));

    expect(result.current.errors).toEqual([]);
    expect(result.current.validSchema).toBeNull();
  });

  it('should validate valid OpenAPI schema successfully', async () => {
    mockValidate.mockResolvedValue(undefined);

    const schema = JSON.stringify({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {
        '/users': {
          get: {
            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        },
      },
    });

    const { result } = renderHook(() => useSchemaValidation(schema, 'json'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toEqual(JSON.parse(schema));

    expect(result.current.errors).toEqual([]);
  });

  it('should handle swagger validation errors', async () => {
    mockValidate.mockRejectedValue(new Error('Invalid schema'));

    const schema = JSON.stringify({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {
        '/users': {
          get: {
            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        },
      },
    });

    const { result } = renderHook(() => useSchemaValidation(schema, 'json'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toBeNull();

    expect(result.current.errors).toEqual([
      {
        path: 'root',
        message: 'Invalid schema',
      },
    ]);
  });

  it('should reject invalid OpenAPI structure', async () => {
    const schema = JSON.stringify({
      swagger: '2.0',
      info: {
        title: 'Swagger 2 API',
        version: '1.0.0',
      },
    });

    const { result } = renderHook(() => useSchemaValidation(schema, 'json'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toBeNull();

    expect(result.current.errors).toEqual([
      {
        path: 'paths',
        message: 'Missing required field: paths.',
      },
    ]);
  });
});
