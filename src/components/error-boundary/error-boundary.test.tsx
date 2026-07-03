import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ErrorBoundary from './error-boundary';
import { renderWithProviders } from '@/test-utils/render-with-providers';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const mockMessages = {
  title: 'Error',
  description: 'Something went wrong',
  tryAgain: 'Try again',
  goHome: 'Go home',
};

const ThrowError = () => {
  throw new Error('Boom');
};

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    const { getByText } = renderWithProviders(
      <ErrorBoundary messages={mockMessages}>
        <div>Hello</div>
      </ErrorBoundary>,
    );

    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('shows fallback UI when error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // Suppress error logging for this test
    });

    renderWithProviders(
      <ErrorBoundary messages={mockMessages}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {
      // Suppress error logging for this test
    });

    renderWithProviders(
      <ErrorBoundary messages={mockMessages}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('retries by reloading page', async () => {
    const user = userEvent.setup();

    vi.spyOn(console, 'error').mockImplementation(() => {
      // Suppress error logging for this test
    });

    const reload = vi.fn();

    vi.stubGlobal('location', {
      reload,
      href: '',
    });

    renderWithProviders(
      <ErrorBoundary messages={mockMessages}>
        <ThrowError />
      </ErrorBoundary>,
    );

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(reload).toHaveBeenCalled();
  });

  it('navigates to home page', async () => {
    const user = userEvent.setup();

    vi.spyOn(console, 'error').mockImplementation(() => {
      // Suppress error logging for this test
    });

    vi.stubGlobal('location', {
      href: '',
    });

    renderWithProviders(
      <ErrorBoundary messages={mockMessages}>
        <ThrowError />
      </ErrorBoundary>,
    );

    await user.click(screen.getByRole('button', { name: /go home/i }));

    expect(globalThis.location.href).toBe('/');
  });
});
