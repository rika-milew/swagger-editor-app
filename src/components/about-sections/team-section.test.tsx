import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import TeamSection from '../../components/about-sections/team-section';

const translations = {
  teamTitle: 'Team',
};

const NUMBER_OF_CARDS = 4;

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: keyof typeof translations) => translations[key]),
}));

describe('TeamSection', () => {
  it('renders team title and members', async () => {
    const Component = await TeamSection();

    renderWithProviders(Component);

    expect(screen.getByText(translations.teamTitle)).toBeInTheDocument();

    expect(screen.getByText('Anna Zhuravleva')).toBeInTheDocument();
    expect(screen.getByText('Erika Milevskaya')).toBeInTheDocument();
    expect(screen.getByText('Michael Tavyrin')).toBeInTheDocument();
    expect(screen.getByText('Nina Yeulash')).toBeInTheDocument();

    expect(screen.getByText('Mentor')).toBeInTheDocument();

    expect(screen.getByText('Team Lead/Frontend Engineer')).toBeInTheDocument();

    expect(screen.getAllByText('Frontend Engineer')).toHaveLength(2);
  });

  it('renders github links for every member', async () => {
    const Component = await TeamSection();

    renderWithProviders(Component);

    const links = screen.getAllByText('GitHub');

    expect(links).toHaveLength(NUMBER_OF_CARDS);
  });
});
