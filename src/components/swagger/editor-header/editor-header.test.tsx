import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorHeader } from './editor-header';

describe('EditorHeader Component', () => {
  it('renders all main elements', () => {
    render(<EditorHeader />);

    expect(screen.getByText(/Valid OpenAPI 3.0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByLabelText('YAML')).toBeInTheDocument();
    expect(screen.getByLabelText('JSON')).toBeInTheDocument();
  });

  it('has yaml selected by default', () => {
    render(<EditorHeader />);

    const yamlRadio = screen.getByLabelText('YAML');
    const jsonRadio = screen.getByLabelText('JSON');

    expect(yamlRadio).toBeChecked();
    expect(jsonRadio).not.toBeChecked();
  });

  it('switches selection between yaml and json on click', async () => {
    const user = userEvent.setup();
    render(<EditorHeader />);

    const yamlRadio = screen.getByLabelText('YAML');
    const jsonRadio = screen.getByLabelText('JSON');

    await user.click(jsonRadio);

    expect(jsonRadio).toBeChecked();
    expect(yamlRadio).not.toBeChecked();

    await user.click(yamlRadio);

    expect(yamlRadio).toBeChecked();
    expect(jsonRadio).not.toBeChecked();
  });
});
