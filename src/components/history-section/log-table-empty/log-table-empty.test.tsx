import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogTableEmpty } from './log-table-empty';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    noLogsTitle: 'No requests found',
    noLogsDesc: 'Your request history is currently empty.',
  };
  return translations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
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
  it('should render empty state titles and descriptions correctly', () => {
    render(<LogTableEmpty />);

    expect(screen.getByText('No requests found')).toBeInTheDocument();
    expect(
      screen.getByText('Your request history is currently empty.'),
    ).toBeInTheDocument();
  });
});
