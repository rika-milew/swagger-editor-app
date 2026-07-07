import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import HeroSection from './hero-section';

const translations = {
  heroTitle: 'About',
  heroHeading: 'A modern workbench for OpenAPI specifications.',
  heroDescr:
    'NexusOpen is the RS School graduation project — a Swagger/OpenAPI editor.',
};

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: keyof typeof translations) => translations[key]),
}));

describe('HeroSection', () => {
  it('renders hero content', async () => {
    const Component = await HeroSection();

    renderWithProviders(Component);

    expect(screen.getByText('About')).toBeInTheDocument();

    expect(
      screen.getByText('A modern workbench for OpenAPI specifications.'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'NexusOpen is the RS School graduation project — a Swagger/OpenAPI editor.',
      ),
    ).toBeInTheDocument();
  });
});
