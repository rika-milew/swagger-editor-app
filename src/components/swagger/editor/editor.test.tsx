import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Editor } from './editor';
import type { EditorFormat } from '@/types/editor.types';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (val: string) => void;
    }) => (
      <textarea
        data-testid="mock-codemirror"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});

describe('Editor', () => {
  it('should render CodeMirror and call handlers on change', () => {
    const mockOnChange = vi.fn();
    const mockOnFormatChange = vi.fn();
    const initialFormat: EditorFormat = 'yaml';

    render(
      <Editor
        code="initial content"
        format={initialFormat}
        onChange={mockOnChange}
        onFormatChange={mockOnFormatChange}
      />,
    );

    const textarea = screen.getByTestId('mock-codemirror');
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: '{"new": "json"}' } });

    expect(mockOnChange).toHaveBeenCalledWith('{"new": "json"}');
  });
});
