import { screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, it, expect } from 'vitest';
import Home from './[lang]/page';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('Home page layout', () => {
  it('renders with the editor and a viewer', () => {
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={{}}>
        <Home />
      </NextIntlClientProvider>,
    );

    const editor = screen.getByTestId('editor-block');
    expect(editor).toBeInTheDocument();

    const viewer = screen.getByTestId('viewer-block');
    expect(viewer).toBeInTheDocument();
  });
});
