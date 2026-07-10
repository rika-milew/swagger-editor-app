import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HistoryView } from '@/views/history/history';

vi.mock('@/components/history-section/hero-section', () => ({
  HeroSection: () => <div>Mocked Hero Section</div>,
}));

vi.mock('@/components/history-section/stats-group', () => ({
  StatsGroup: () => <div>Mocked Stats Group</div>,
}));

vi.mock('@/components/history-section/logs-table', () => ({
  LogsTable: () => <div>Mocked Logs Table</div>,
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Box: MockComponent,
    Stack: MockComponent,
  };
});

describe('HistoryView Component', () => {
  it('should render all layout sections correctly', () => {
    render(<HistoryView />);

    expect(screen.getByText('Mocked Hero Section')).toBeInTheDocument();
    expect(screen.getByText('Mocked Stats Group')).toBeInTheDocument();
    expect(screen.getByText('Mocked Logs Table')).toBeInTheDocument();
  });
});
