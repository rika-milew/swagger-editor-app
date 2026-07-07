import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEditorLanguage } from './use-editor';
import type { EditorFormat } from '@/types/editor.types';

describe('useEditorLanguage', () => {
  it('should handle format auto-detection', () => {
    const mockOnChange = vi.fn();
    const mockOnFormatChange = vi.fn();
    const initialFormat: EditorFormat = 'yaml';

    const { result } = renderHook(() =>
      useEditorLanguage(initialFormat, mockOnChange, mockOnFormatChange),
    );

    act(() => {
      result.current.handleDocChange('{"a": 1}');
    });

    expect(mockOnChange).toHaveBeenCalledWith('{"a": 1}');
    expect(mockOnFormatChange).toHaveBeenCalledWith('json');
  });
});
