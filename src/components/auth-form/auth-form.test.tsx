import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { AuthForm } from './auth-form';

const renderWithChakra = (ui: ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
};

const defaultFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'Enter email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Enter password',
  },
];

const defaultProps = {
  title: 'Sign in to your account',
  submitLabel: 'Sign In',
  fields: defaultFields,
  bottomContent: <div>Content</div>,
};

describe('AuthForm', () => {
  it('should render title', () => {
    renderWithChakra(<AuthForm {...defaultProps} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should render all fields', () => {
    renderWithChakra(<AuthForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should render submit button', () => {
    renderWithChakra(<AuthForm {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Sign In' });
    expect(button).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    renderWithChakra(<AuthForm {...defaultProps} subtitle="Welcome back" />);

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('should not render subtitle when not provided', () => {
    renderWithChakra(<AuthForm {...defaultProps} />);

    expect(screen.queryByText('Welcome back!')).not.toBeInTheDocument();
  });

  it('should call onSubmit when button is clicked', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    renderWithChakra(<AuthForm {...defaultProps} onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should display field errors', () => {
    const fieldsWithErrors = [
      {
        name: 'email',
        label: 'Email',
        type: 'email' as const,
        placeholder: 'Enter email',
        error: 'Invalid email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password' as const,
        placeholder: 'Enter password',
        error: 'Password is too short',
      },
    ];

    renderWithChakra(<AuthForm {...defaultProps} fields={fieldsWithErrors} />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
  });

  it('should render helper content', () => {
    renderWithChakra(
      <AuthForm {...defaultProps} helperContent={<div>Helper Content</div>} />,
    );

    expect(screen.getByText('Helper Content')).toBeInTheDocument();
  });

  it('should render bottom content', () => {
    renderWithChakra(<AuthForm {...defaultProps} />);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should allow user to fill in fields', async () => {
    const user = userEvent.setup();

    renderWithChakra(<AuthForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password1234');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password1234');
  });

  it('should render with empty fields', () => {
    renderWithChakra(
      <AuthForm
        title="No Fields"
        submitLabel="Submit"
        fields={[]}
        bottomContent={null}
      />,
    );

    expect(screen.getByText('No Fields')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
