import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogsTable } from './logs-table';

vi.mock('../log-table-header/log-table-header', () => ({
  LogTableHeader: () => <thead data-testid="mock-header" />,
}));

vi.mock('../table-row/table-row', () => ({
  LogTableRow: ({ log }: { log: { time: string } }) => (
    <tr data-testid="mock-row">
      <td>{log.time}</td>
    </tr>
  ),
}));

vi.mock('@/components/history-section/log-table-empty/log-table-empty', () => ({
  LogTableEmpty: () => <div data-testid="mock-empty" />,
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Box: MockComponent,
    Table: {
      Root: MockComponent,
      Body: MockComponent,
    },
  };
});

describe('LogsTable Component', () => {
  it('should render table structure and maps all mock logs', () => {
    render(<LogsTable />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();

    const rows = screen.getAllByTestId('mock-row');

    const SIX = 6;
    expect(rows).toHaveLength(SIX);

    expect(screen.getByText('2026-07-11 12:42:08')).toBeInTheDocument();
    expect(screen.getByText('2026-07-11 11:55:48')).toBeInTheDocument();
  });
});
