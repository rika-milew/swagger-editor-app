import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useSchemaValidation } from './use-schema-validation';

const VALIDATION_DELAY = 400;

const mockValidate = vi.fn();

vi.mock('@apidevtools/swagger-parser', () => {
  return {
    default: class {
      public validate = mockValidate;
    },
  };
});

const mockTranslate = (key: string): string => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslate,
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

  it('should validate valid json schema successfully', async () => {
    const expectedSchema = { swagger: '2.0' };
    mockValidate.mockResolvedValue(expectedSchema);

    const { result } = renderHook(() =>
      useSchemaValidation('{"swagger": "2.0"}', 'json'),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toEqual(expectedSchema);
    expect(result.current.errors).toEqual([]);
  });

  it('should handle validation errors', async () => {
    mockValidate.mockRejectedValue(new Error('Invalid schema'));

    const { result } = renderHook(() =>
      useSchemaValidation('{"swagger": "2.0"}', 'json'),
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(VALIDATION_DELAY);
    });

    expect(result.current.validSchema).toBeNull();
    expect(result.current.errors).toEqual([
      { path: 'root', message: 'Invalid schema' },
    ]);
  });
});
