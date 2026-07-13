import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogTableEmpty } from './log-table-empty';
import type { ReactNode } from 'react';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    noLogsTitle: 'No requests found',
    noLogsDesc: 'Your request history is currently empty.',
    goToEditor: 'Go to editor',
  };
  return translations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Box: MockComponent,
  };
});

vi.mock('@/components/text-link/text-link', () => ({
  TextLink: ({ children }: { children: ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

describe('LogTableEmpty Component', () => {
  it('should render empty state titles and descriptions correctly', () => {
    render(<LogTableEmpty />);

    expect(screen.getByText('No requests found')).toBeInTheDocument();
    expect(
      screen.getByText('Your request history is currently empty.'),
    ).toBeInTheDocument();
  });
});
