import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormatConverter } from './use-format-converter';
import { toaster } from '@/components/toaster/toaster';

vi.mock('@/components/toaster/toaster', () => ({
  toaster: {
    create: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const messages: Record<string, string> = {
      title: 'Conversion Error',
      invalidSyntax: 'Invalid syntax format',
    };
    return (key: string): string => messages[key] || key;
  },
}));

describe('useFormatConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct code and format', () => {
    const { result } = renderHook(() =>
      useFormatConverter('key: value', 'yaml'),
    );

    expect(result.current.value).toBe('key: value');
    expect(result.current.format).toBe('yaml');
  });

  it('should change code when setCode is called', () => {
    const { result } = renderHook(() => useFormatConverter(''));

    act(() => {
      result.current.setValue('new code');
    });

    expect(result.current.value).toBe('new code');
  });

  it('should convert YAML string to formatted JSON string', () => {
    const yamlCode = 'server:\n  host: 127.0.0.1';
    const expectedJson = '{\n  "server": {\n    "host": "127.0.0.1"\n  }\n}';

    const { result } = renderHook(() => useFormatConverter(yamlCode, 'yaml'));

    act(() => {
      result.current.changeFormat('json');
    });

    expect(result.current.value).toBe(expectedJson);
    expect(result.current.format).toBe('json');
  });

  it('should convert JSON string to YAML string', () => {
    const jsonCode = '{\n  "server": {\n    "host": "127.0.0.1"\n  }\n}';
    const expectedYaml = 'server:\n  host: 127.0.0.1\n';

    const { result } = renderHook(() => useFormatConverter(jsonCode, 'json'));

    act(() => {
      result.current.changeFormat('yaml');
    });

    expect(result.current.value).toBe(expectedYaml);
    expect(result.current.format).toBe('yaml');
  });

  it('should not change code if format is the same', () => {
    const { result } = renderHook(() =>
      useFormatConverter('key: value', 'yaml'),
    );

    act(() => {
      result.current.changeFormat('yaml');
    });

    expect(result.current.value).toBe('key: value');
    expect(result.current.format).toBe('yaml');
  });

  it('should change format without conversion if code is empty', () => {
    const { result } = renderHook(() => useFormatConverter('   ', 'yaml'));

    act(() => {
      result.current.changeFormat('json');
    });

    expect(result.current.value).toBe('   ');
    expect(result.current.format).toBe('json');
  });

  it('should update format without converting the code when updateFormatWithoutConversion is called', () => {
    const { result } = renderHook(() =>
      useFormatConverter('server:\n  host: 127.0.0.1', 'yaml'),
    );

    act(() => {
      result.current.changeFormat('json', false);
    });

    expect(result.current.value).toBe('server:\n  host: 127.0.0.1');
    expect(result.current.format).toBe('json');
  });

  it('should keep old code and format if transformation fails due to syntax error', () => {
    const { result } = renderHook(() =>
      useFormatConverter('{ invalid json', 'json'),
    );

    act(() => {
      result.current.changeFormat('yaml');
    });

    expect(result.current.value).toBe('{ invalid json');
    expect(result.current.format).toBe('json');
    expect(toaster.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Conversion Error',
        type: 'error',
      }),
    );
  });
});
