import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import SchoolSection from './school-section';

const translations = {
  schoolTitle: 'RS School React Course Graduation Project',
  schoolDescr:
    'This application was created as the final team project during the RS School React course.',
};

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: keyof typeof translations) => translations[key]),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <div role="img" aria-label={alt} />,
}));

describe('SchoolSection', () => {
  it('renders RS School information', async () => {
    const Component = await SchoolSection();

    renderWithProviders(Component);

    expect(screen.getByText('RS School')).toBeInTheDocument();

    expect(screen.getByText(translations.schoolTitle)).toBeInTheDocument();

    expect(screen.getByText(translations.schoolDescr)).toBeInTheDocument();
  });

  it('renders RS School logo', async () => {
    const Component = await SchoolSection();

    renderWithProviders(Component);

    expect(screen.getByRole('img', { name: 'RS School' })).toBeInTheDocument();
  });
});
