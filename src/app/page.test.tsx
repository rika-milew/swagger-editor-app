import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomeRoute from './[lang]/page';
import { renderWithProviders } from '@/test-utils/render-with-providers';

const mockTranslations = (key: string): string => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

vi.mock('@/components/swagger-viewer/swagger-viewer', () => ({
  SwaggerViewer: () => <div data-testid="swagger-viewer-mock" />,
}));

const mockT = (key: string) => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
  useLocale: () => 'en',
}));

async function renderComponent() {
  const Component = await HomeRoute({
    params: Promise.resolve({ lang: 'en' }),
  });

  renderWithProviders(Component);
}

describe('Home page layout', () => {
  it('renders editor and viewer', async () => {
    await renderComponent();

    expect(screen.getByTestId('editor-block')).toBeInTheDocument();

    expect(screen.getByTestId('viewer-block')).toBeInTheDocument();
  });
});
