import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Editor } from './editor';

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
  it('should render with initial default code and update text on change', () => {
    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    expect(textarea).toBeInTheDocument();

    const defaultCode = '# Write code here!';

    expect(textarea).toHaveValue(defaultCode);

    const newCode = 'server:\n  port: 9000';
    fireEvent.change(textarea, { target: { value: newCode } });

    expect(textarea).toHaveValue(newCode);
  });
});
