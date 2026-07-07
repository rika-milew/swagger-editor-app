import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import StackSection from './stack-section';

const translations = {
  stackTitle: 'Stack',
};

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: keyof typeof translations) => translations[key]),
}));

describe('StackSection', () => {
  it('renders stack title and technologies', async () => {
    const Component = await StackSection();

    renderWithProviders(Component);

    expect(screen.getByText(translations.stackTitle)).toBeInTheDocument();

    expect(screen.getByText('TanStack Start')).toBeInTheDocument();
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind v4')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });
});
