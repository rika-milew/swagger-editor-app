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

vi.mock('@/lib/auth/get-session', () => ({
  getSession: vi
    .fn()
    .mockResolvedValue({ id: 'user1', email: 'test@test.com' }),
}));

vi.mock('@/app/actions/history', () => ({
  getHistory: vi.fn().mockResolvedValue({
    data: [
      {
        id: '1',
        request_timestamp: '2026-07-11T12:42:08Z',
        request_method: 'GET',
        endpoint_url: '/api/test',
        response_status_code: 200,
        request_duration: 100,
        request_size: 1024,
        response_size: 2048,
        error_details: null,
        created_at: '2026-07-11T12:42:08Z',
        user_id: 'user1',
      },
      {
        id: '2',
        request_timestamp: '2026-07-11T11:55:48Z',
        request_method: 'POST',
        endpoint_url: '/api/test2',
        response_status_code: 201,
        request_duration: 200,
        request_size: 2048,
        response_size: 4096,
        error_details: null,
        created_at: '2026-07-11T11:55:48Z',
        user_id: 'user1',
      },
    ],
    error: null,
  }),
}));

vi.mock('@/utils/history-helpers', () => ({
  formatLogs: vi.fn().mockReturnValue([
    {
      id: '1',
      time: '2026-07-11 12:42:08',
      method: 'GET',
      endpoint: '/api/test',
      status: 200,
      duration: '100ms',
      req: '1 KB',
      res: '2 KB',
    },
    {
      id: '2',
      time: '2026-07-11 11:55:48',
      method: 'POST',
      endpoint: '/api/test2',
      status: 201,
      duration: '200ms',
      req: '2 KB',
      res: '4 KB',
    },
  ]),
}));

vi.mock('@/components/history-section/log-table-empty/log-table-empty', () => ({
  LogTableEmpty: () => <div data-testid="mock-empty" />,
}));

vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Table: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <table>{children}</table>
    ),
    Body: ({ children }: { children: React.ReactNode }) => (
      <tbody>{children}</tbody>
    ),
  },
}));

describe('LogsTable Component', () => {
  it('should render table structure and maps all mock logs', async () => {
    const element = await LogsTable();

    render(element);

    const header = screen.getByTestId('mock-header');
    expect(header).toBeInTheDocument();

    const rows = screen.getAllByTestId('mock-row');

    const ROW_NUMBER = 2;
    expect(rows).toHaveLength(ROW_NUMBER);

    expect(screen.getByText('2026-07-11 12:42:08')).toBeInTheDocument();
    expect(screen.getByText('2026-07-11 11:55:48')).toBeInTheDocument();
  });
});
