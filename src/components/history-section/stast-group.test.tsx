import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatsGroup } from './stats-group';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      totalRequests: 'Total Requests',
      avgDuration: 'Avg Duration',
      successRate: 'Success Rate',
    };
    return messages[key] || key;
  }),
}));

vi.mock('./stats-card', () => ({
  StatsCard: ({ label, value }: { label: string; value: string }) => (
    <div>
      {label}: {value}
    </div>
  ),
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    SimpleGrid: MockComponent,
    Box: MockComponent,
    Grid: MockComponent,
  };
});

describe('StatsGroup Component', () => {
  it('should render all stats cards with translated labels', async () => {
    const ResolvedComponent = await StatsGroup();
    render(ResolvedComponent);

    expect(screen.getByText('Total Requests: 1,284')).toBeInTheDocument();
    expect(screen.getByText('Avg Duration: 187ms')).toBeInTheDocument();
    expect(screen.getByText('Success Rate: 98.4%')).toBeInTheDocument();
  });
});
