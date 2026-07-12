import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogTableEmpty } from './log-table-empty';

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => {
      const translations: Record<string, string> = {
        noLogsTitle: 'No requests found',
        noLogsDesc: 'Your request history is currently empty.',
      };
      return translations[key] || key;
    }),
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Box: MockComponent,
  };
});

describe('LogTableEmpty Component', () => {
  it('should render empty state titles and descriptions correctly', async () => {
    const ResolvedComponent = await LogTableEmpty();
    render(ResolvedComponent);

    expect(screen.getByText('No requests found')).toBeInTheDocument();
    expect(
      screen.getByText('Your request history is currently empty.'),
    ).toBeInTheDocument();
  });
});
