import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toaster } from './toaster';

vi.mock('@chakra-ui/react', () => {
  return {
    Portal: ({ children }: React.PropsWithChildren) => <>{children}</>,

    Spinner: () => <div data-testid="spinner" />,

    Stack: ({ children }: React.PropsWithChildren) => <div>{children}</div>,

    createToaster: () => ({}),

    Toaster: ({
      children,
    }: {
      children: (toast: Record<string, unknown>) => React.ReactNode;
    }) => (
      <>
        {children({
          type: 'loading',
          title: 'Loading',
          description: 'Please wait',
          closable: true,
        })}
      </>
    ),

    Toast: {
      Root: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
      Indicator: () => <div data-testid="indicator" />,
      Title: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
      Description: ({ children }: React.PropsWithChildren) => (
        <div>{children}</div>
      ),
      ActionTrigger: ({ children }: React.PropsWithChildren) => (
        <button>{children}</button>
      ),
      CloseTrigger: () => <button aria-label="close" />,
    },
  };
});

describe('Toaster', () => {
  it('renders loading spinner', () => {
    render(<Toaster />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Toaster />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Toaster />);

    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('renders close button when toast is closable', () => {
    render(<Toaster />);

    expect(screen.getByLabelText('close')).toBeInTheDocument();
  });
});
