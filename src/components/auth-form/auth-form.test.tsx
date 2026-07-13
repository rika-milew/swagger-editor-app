import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthForm } from './auth-form';

const mockTranslations = (key: string) => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

const renderWithChakra = (ui: ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
};

const MIN_PASSWORD_LENGTH = 8;

const testSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, 'validationErrors.passwordTooShort'),
});

const defaultFields = [
  {
    name: 'email' as const,
    label: 'Email',
    type: 'email' as const,
    placeholder: 'Enter email',
  },
  {
    name: 'password' as const,
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Enter password',
  },
];

const defaultProps = {
  title: 'Sign in to your account',
  submitLabel: 'Sign In',
  fields: defaultFields,
  switchFormLink: <div>Content</div>,
  resolver: zodResolver(testSchema),
  onSubmitAction: vi.fn().mockResolvedValue({}),
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
    const handleSubmit = vi.fn().mockResolvedValue({});

    renderWithChakra(
      <AuthForm {...defaultProps} onSubmitAction={handleSubmit} />,
    );

    await user.type(
      screen.getByPlaceholderText('Enter email'),
      'test@example.com',
    );
    await user.type(
      screen.getByPlaceholderText('Enter password'),
      'password123',
    );
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('should display field errors', async () => {
    const user = userEvent.setup();

    renderWithChakra(<AuthForm {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Enter email');
      const passwordInput = screen.getByPlaceholderText('Enter password');

      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');

      expect(
        screen.getByText('validationErrors.passwordTooShort'),
      ).toBeInTheDocument();
    });
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
    const emptySchema = z.object({});
    const emptyResolver = zodResolver(emptySchema);

    renderWithChakra(
      <AuthForm
        title="No Fields"
        submitLabel="Submit"
        fields={[]}
        switchFormLink={null}
        resolver={emptyResolver}
        onSubmitAction={vi.fn().mockResolvedValue({})}
      />,
    );

    expect(screen.getByText('No Fields')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should submit form with correct data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue({});

    renderWithChakra(
      <AuthForm {...defaultProps} onSubmitAction={handleSubmit} />,
    );

    await user.type(
      screen.getByPlaceholderText('Enter email'),
      'test@example.com',
    );
    await user.type(
      screen.getByPlaceholderText('Enter password'),
      'password123!',
    );
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123!',
      });
    });
  });

  it('should not display server error when onSubmitAction succeeds', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue({});

    renderWithChakra(
      <AuthForm {...defaultProps} onSubmitAction={handleSubmit} />,
    );

    await user.type(
      screen.getByPlaceholderText('Enter email'),
      'test@example.com',
    );
    await user.type(
      screen.getByPlaceholderText('Enter password'),
      'password123!',
    );
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });
});
