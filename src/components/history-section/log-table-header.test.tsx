import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogTableHeader } from './log-table-header';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      'columns.time': 'Time',
      'columns.method': 'Method',
      'columns.endpoint': 'Endpoint',
      'columns.status': 'Status',
      'columns.duration': 'Duration',
      'columns.req': 'Req',
      'columns.res': 'Res',
    };
    return messages[key] || key;
  }),
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Table: {
      Header: MockComponent,
      Row: MockComponent,
      ColumnHeader: MockComponent,
    },
  };
});

describe('LogTableHeader Component', () => {
  it('should render all table headers correctly with translations', async () => {
    const ResolvedComponent = await LogTableHeader();
    render(ResolvedComponent);

    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('Endpoint')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Req')).toBeInTheDocument();
    expect(screen.getByText('Res')).toBeInTheDocument();
  });
});
