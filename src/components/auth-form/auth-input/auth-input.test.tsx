import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { AuthInput } from './auth-input';

const renderWithChakra = (ui: ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
};

describe('AuthInput', () => {
  const defaultProps = {
    label: 'Email',
    type: 'email' as const,
    placeholder: 'Enter your email',
  };

  it('should render with label and input', () => {
    renderWithChakra(<AuthInput {...defaultProps} />);

    const label = screen.getByText('Email');
    const input = screen.getByPlaceholderText('Enter your email');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('should render different input types', () => {
    const { rerender } = renderWithChakra(
      <AuthInput {...defaultProps} type="password" />,
    );

    let input = screen.getByPlaceholderText('Enter your email');
    expect(input).toHaveAttribute('type', 'password');

    rerender(
      <ChakraProvider value={defaultSystem}>
        <AuthInput {...defaultProps} type="text" />
      </ChakraProvider>,
    );

    input = screen.getByPlaceholderText('Enter your email');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should not show error when error prop is not provided', () => {
    renderWithChakra(<AuthInput {...defaultProps} />);

    const errorElement = screen.queryByRole('alert');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    renderWithChakra(
      <AuthInput {...defaultProps} error="Invalid email address" />,
    );

    const errorMessage = screen.getByText('Invalid email address');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should mark field as invalid when error exists', () => {
    renderWithChakra(
      <AuthInput {...defaultProps} error="Invalid email address" />,
    );

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should allow user to type in input', async () => {
    const user = userEvent.setup();
    renderWithChakra(<AuthInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Enter your email');

    await user.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });
});
