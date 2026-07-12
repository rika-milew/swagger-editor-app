import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import { mockTranslations } from '@/test-utils/mock-swagger-viewer-translations';
import { createMockEndpoint } from '@/test-utils/mock-swagger-viewer-endpoint';

import { EndpointList } from './endpoint-list';

describe('EndpointList', () => {
  it('opens endpoint details panel with parameters', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          createMockEndpoint({
            path: '/users/{id}',
            summary: 'Get user by id',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'token',
                in: 'header',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: false,
            },
          }),
        ]}
        translations={mockTranslations}
      />,
    );

    await user.click(screen.getByText('/users/{id}'));

    expect(screen.getByText('Parameters')).toBeInTheDocument();
    expect(screen.getByText('Request body')).toBeInTheDocument();
    expect(screen.getByText('Responses')).toBeInTheDocument();

    expect(screen.getAllByText('Required')).toHaveLength(2);

    expect(screen.getByText('path')).toBeInTheDocument();
    expect(screen.getByText('id')).toBeInTheDocument();

    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('token')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try it out/i }),
    ).toBeInTheDocument();
  });

  it('closes endpoint details panel after second click', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          createMockEndpoint({
            path: '/users/{id}',
            parameters: [
              {
                name: 'id',
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {},
          }),
        ]}
        translations={mockTranslations}
      />,
    );

    const endpoint = screen.getByText('/users/{id}');

    await user.click(endpoint);

    expect(screen.getByText('Parameters')).toBeInTheDocument();

    await user.click(endpoint);

    expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
  });

  it('shows message when endpoint does not have parameters field', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          createMockEndpoint({
            path: '/users',
            parameters: undefined,
          }),
        ]}
        translations={mockTranslations}
      />,
    );

    await user.click(screen.getByText('/users'));

    expect(screen.getByText(mockTranslations.noParameters)).toBeInTheDocument();
  });

  it('shows message when endpoint has no request body', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          createMockEndpoint({
            path: '/users',
            requestBody: undefined,
          }),
        ]}
        translations={mockTranslations}
      />,
    );

    await user.click(screen.getByText('/users'));

    expect(screen.getByText(mockTranslations.requestBody)).toBeInTheDocument();

    expect(
      screen.getByText(mockTranslations.noRequestBody),
    ).toBeInTheDocument();
  });
});
