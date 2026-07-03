import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Editor } from './editor';
import type { EditorFormat } from '@/types/editor.types';

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

    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();

    fireEvent.change(textbox, { target: { value: '{"new": "json"}' } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
