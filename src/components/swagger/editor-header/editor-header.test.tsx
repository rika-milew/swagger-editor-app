import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EditorHeader } from './editor-header';
import type { EditorFormat } from '@/types/editor.types';

describe('EditorHeader Component', () => {
  const mockOnFormatChange = vi.fn();
  const defaultFormat: EditorFormat = 'yaml';

  it('renders all main elements', () => {
    render(
      <EditorHeader
        format={defaultFormat}
        onFormatChange={mockOnFormatChange}
      />,
    );

    expect(screen.getByText(/Valid OpenAPI 3.0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByLabelText('YAML')).toBeInTheDocument();
    expect(screen.getByLabelText('JSON')).toBeInTheDocument();
  });

  it('reflects the selected format based on format prop', () => {
    const { rerender } = render(
      <EditorHeader
        format={defaultFormat}
        onFormatChange={mockOnFormatChange}
      />,
    );

    const yamlRadio = screen.getByLabelText('YAML');
    const jsonRadio = screen.getByLabelText('JSON');

    expect(yamlRadio).toBeChecked();
    expect(jsonRadio).not.toBeChecked();

    const nextFormat: EditorFormat = 'json';
    rerender(
      <EditorHeader format={nextFormat} onFormatChange={mockOnFormatChange} />,
    );

    expect(jsonRadio).toBeChecked();
    expect(yamlRadio).not.toBeChecked();
  });

  it('calls onFormatChange with correct value when clicking a radio button', async () => {
    const user = userEvent.setup();
    render(
      <EditorHeader
        format={defaultFormat}
        onFormatChange={mockOnFormatChange}
      />,
    );

    const jsonRadio = screen.getByLabelText('JSON');

    await user.click(jsonRadio);

    expect(mockOnFormatChange).toHaveBeenCalledTimes(1);
    expect(mockOnFormatChange).toHaveBeenCalledWith('json');
  });
});
