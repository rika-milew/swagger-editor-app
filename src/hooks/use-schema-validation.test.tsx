import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { useSchemaValidation, VALIDATION_DELAY } from './use-schema-validation';
import type { OpenAPIV3 } from 'openapi-types';
import type { ValidationError } from '@/types/schema-validation.types';

type ValidateSchemaResult = {
  errors: ValidationError[];
  schema: OpenAPIV3.Document | null;
};

const mockValidateSchema =
  vi.fn<
    (
      value: string,
      format: 'json' | 'yaml',
      t: (key: string) => string,
    ) => Promise<ValidateSchemaResult>
  >();

vi.mock('@/utils/schema-validation/validate-schema', () => ({
  validateSchema: (...args: Parameters<typeof mockValidateSchema>) =>
    mockValidateSchema(...args),
}));

const mockTranslations = (key: string): string => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

describe('useSchemaValidation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockValidateSchema.mockReset();
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
    const schema = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
    };

    mockValidateSchema.mockResolvedValue({
      errors: [],
      schema,
    });

    const { result } = renderHook(() =>
      useSchemaValidation(JSON.stringify(schema), 'json'),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(mockValidateSchema).toHaveBeenCalled();

    expect(result.current.validSchema).toEqual(schema);

    expect(result.current.errors).toEqual([]);
  });

  it('should handle validation errors', async () => {
    mockValidateSchema.mockResolvedValue({
      errors: [
        {
          path: 'root',
          message: 'Invalid schema',
        },
      ],
      schema: null,
    });

    const schema = JSON.stringify({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
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

  it('should handle unexpected validation errors', async () => {
    mockValidateSchema.mockRejectedValue(new Error('Parser error'));

    const { result } = renderHook(() =>
      useSchemaValidation('invalid schema', 'yaml'),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toBeNull();

    expect(result.current.errors).toEqual([
      {
        path: 'root',
        message: 'syntaxError',
      },
    ]);
  });

  it('should reject invalid OpenAPI structure', async () => {
    mockValidateSchema.mockResolvedValue({
      errors: [
        {
          path: 'paths',
          message: 'Missing required field: paths.',
        },
      ],
      schema: null,
    });

    const schema = JSON.stringify({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
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
