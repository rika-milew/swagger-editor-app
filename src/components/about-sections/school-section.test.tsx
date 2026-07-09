import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';

import SchoolSection from '../../components/about-sections/school-section';

const translations = {
  schoolTitle: 'RS School React Course Graduation Project',
  schoolDescr:
    'This application was created as the final team project during the RS School <course>React course</course>.',
};

const t = (key: keyof typeof translations) => translations[key];

t.rich = (
  key: keyof typeof translations,
  values: {
    course: (chunks: string) => React.ReactNode;
  },
) => {
  if (key === 'schoolDescr') {
    return (
      <>
        This application was created as the final team project during the{' '}
        {values.course('RS School React course')}.
      </>
    );
  }

  return translations[key];
};

vi.mock('next-intl/server', () => ({
  getTranslations: () => Promise.resolve(t),
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

    expect(
      screen.getByText(
        /This application was created as the final team project during the/,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('RS School React course')).toBeInTheDocument();
  });

  it('renders RS School course link', async () => {
    const Component = await SchoolSection();

    renderWithProviders(Component);

    expect(
      screen.getByRole('link', { name: 'RS School React course' }),
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders RS School logo', async () => {
    const Component = await SchoolSection();

    renderWithProviders(Component);

    expect(screen.getByRole('img', { name: 'RS School' })).toBeInTheDocument();
  });
});
