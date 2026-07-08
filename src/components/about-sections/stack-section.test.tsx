import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import StackSection from '../../components/about-sections/stack-section';

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

    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Chakra UI')).toBeInTheDocument();
    expect(screen.getByText('CodeMirror')).toBeInTheDocument();
    expect(screen.getByText('Supabase')).toBeInTheDocument();
    expect(screen.getByText('Zustand')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });
});
