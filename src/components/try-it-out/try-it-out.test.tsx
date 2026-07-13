import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import { mockTranslations } from '@/test-utils/mock-swagger-viewer-translations';
import { createMockEndpoint } from '@/test-utils/mock-swagger-viewer-endpoint';

import { TryItOut } from '../try-it-out/try-it-out';

describe('TryItOut', () => {
  const endpoint = createMockEndpoint();

  it('renders try it out button initially', () => {
    renderWithProviders(
      <TryItOut endpoint={endpoint} translations={mockTranslations} />,
    );

    expect(
      screen.getByRole('button', { name: /try it out/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /execute/i }),
    ).not.toBeInTheDocument();
  });

  it('shows action buttons after clicking try it out', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TryItOut endpoint={endpoint} translations={mockTranslations} />,
    );

    await user.click(screen.getByRole('button', { name: /try it out/i }));

    expect(
      screen.getByRole('button', { name: /execute/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /generate curl/i }),
    ).toBeInTheDocument();
  });

  it('hides try it out button after activation', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TryItOut endpoint={endpoint} translations={mockTranslations} />,
    );

    await user.click(screen.getByRole('button', { name: /try it out/i }));

    expect(
      screen.queryByRole('button', { name: /try it out/i }),
    ).not.toBeInTheDocument();
  });
});
