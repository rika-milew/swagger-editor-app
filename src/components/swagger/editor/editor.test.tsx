import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Editor } from './editor';

const mockTranslations = (key: string): string => key;

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

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

describe('Editor', () => {
  it('should render with initial default code and update text on change', () => {
    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    expect(textarea).toBeInTheDocument();

    expect(textarea).toHaveValue('');

    const newCode = 'server:\n  port: 9000';
    fireEvent.change(textarea, { target: { value: newCode } });

    expect(textarea).toHaveValue(newCode);
  });
});
