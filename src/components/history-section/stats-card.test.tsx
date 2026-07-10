import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatsCard } from './stats-card';

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Box: MockComponent,
    Text: MockComponent,
  };
});

describe('StatsCard Component', () => {
  it('should render label and value correctly', () => {
    render(<StatsCard label="Total Requests" value="1,284" />);

    expect(screen.getByText('Total Requests')).toBeInTheDocument();
    expect(screen.getByText('1,284')).toBeInTheDocument();
  });
});
