import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MethodBadge } from './method-badge';

vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('MethodBadge Component', () => {
  it('should render correct text for GET method', () => {
    render(<MethodBadge method="GET" />);
    expect(screen.getByText('GET')).toBeInTheDocument();
  });

  it('should render correct text for POST method', () => {
    render(<MethodBadge method="POST" />);
    expect(screen.getByText('POST')).toBeInTheDocument();
  });
});
