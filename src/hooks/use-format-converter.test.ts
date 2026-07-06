import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFormatConverter } from './use-format-converter';

describe('useFormatConverter', () => {
  it('should initialize with correct code and format', () => {
    const { result } = renderHook(() =>
      useFormatConverter('key: value', 'yaml'),
    );

    expect(result.current.code).toBe('key: value');
    expect(result.current.format).toBe('yaml');
  });

  it('should change code when setCode is called', () => {
    const { result } = renderHook(() => useFormatConverter(''));

    act(() => {
      result.current.setCode('new code');
    });

    expect(result.current.code).toBe('new code');
  });

  it('should convert YAML string to formatted JSON string', () => {
    const yamlCode = 'server:\n  host: 127.0.0.1';
    const expectedJson = '{\n  "server": {\n    "host": "127.0.0.1"\n  }\n}';

    const { result } = renderHook(() => useFormatConverter(yamlCode, 'yaml'));

    act(() => {
      result.current.handleFormatChange('json');
    });

    expect(result.current.code).toBe(expectedJson);
    expect(result.current.format).toBe('json');
  });

  it('should convert JSON string to YAML string', () => {
    const jsonCode = '{"server": {"host": "127.0.0.1"}}';
    const expectedYaml = 'server:\n  host: 127.0.0.1\n';

    const { result } = renderHook(() => useFormatConverter(jsonCode, 'json'));

    act(() => {
      result.current.handleFormatChange('yaml');
    });

    expect(result.current.code).toBe(expectedYaml);
    expect(result.current.format).toBe('yaml');
  });

  it('should not change code if format is the same', () => {
    const { result } = renderHook(() =>
      useFormatConverter('key: value', 'yaml'),
    );

    act(() => {
      result.current.handleFormatChange('yaml');
    });

    expect(result.current.code).toBe('key: value');
  });

  it('should keep old code if transformation fails due to syntax error', () => {
    const { result } = renderHook(() =>
      useFormatConverter('not a valid json', 'json'),
    );

    act(() => {
      result.current.handleFormatChange('yaml');
    });

    expect(result.current.code).toBe('not a valid json');
    expect(result.current.format).toBe('yaml');
  });
});
