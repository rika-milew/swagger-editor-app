import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';

import { TryItOut } from './try-it-out';

const translations = {
  parameters: 'Parameters',
  requestBody: 'Request body',
  responses: 'Responses',
  required: 'Required',
  noParameters: 'No parameters available',
  noRequestBody: 'No request body',
  noResponses: 'No responses available',
  tryItOut: 'Try it out',
  execute: 'Execute',
  generateCurl: 'Generate cURL',
};

describe('TryItOut', () => {
  it('renders try it out button initially', () => {
    renderWithProviders(<TryItOut translations={translations} />);

    expect(
      screen.getByRole('button', { name: /try it out/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /execute/i }),
    ).not.toBeInTheDocument();
  });

  it('shows action buttons after clicking try it out', async () => {
    const user = userEvent.setup();

    renderWithProviders(<TryItOut translations={translations} />);

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

    renderWithProviders(<TryItOut translations={translations} />);

    await user.click(screen.getByRole('button', { name: /try it out/i }));

    expect(
      screen.queryByRole('button', { name: /try it out/i }),
    ).not.toBeInTheDocument();
  });
});
