import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './hero-section';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      historyTitle: 'Request History',
      historyDesc: 'View all your recent API requests and their statuses here.',
    };
    return messages[key] || key;
  }),
}));

vi.mock('@chakra-ui/react', () => {
  const MockComponent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Stack: MockComponent,
    Text: MockComponent,
  };
});

describe('HeroSection Component', () => {
  it('should render title and description with translations correctly', async () => {
    const ResolvedComponent = await HeroSection();
    render(ResolvedComponent);

    expect(screen.getByText('Request History')).toBeInTheDocument();
    expect(
      screen.getByText(
        'View all your recent API requests and their statuses here.',
      ),
    ).toBeInTheDocument();
  });
});
