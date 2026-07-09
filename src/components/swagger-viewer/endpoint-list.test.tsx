import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';

import { EndpointList } from './endpoint-list';

describe('EndpointList', () => {
  it('opens endpoint details panel with parameters', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          {
            path: '/users/{id}',
            method: 'get',
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

            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        ]}
        translations={{
          parameters: 'Parameters',
          requestBody: 'Request body',
          responses: 'Responses',
          noParameters: 'No parameters available',
          noRequestBody: 'No request body',
        }}
      />,
    );

    await user.click(screen.getByText('/users/{id}'));

    expect(screen.getByText('Parameters')).toBeInTheDocument();

    expect(screen.getByText('Request body')).toBeInTheDocument();

    expect(screen.getByText('Responses')).toBeInTheDocument();

    expect(screen.getByText('path')).toBeInTheDocument();

    expect(screen.getByText('id')).toBeInTheDocument();

    expect(screen.getByText('header')).toBeInTheDocument();

    expect(screen.getByText('token')).toBeInTheDocument();
  });

  it('closes endpoint details panel after second click', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          {
            path: '/users/{id}',
            method: 'get',
            summary: 'Get user by id',

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
          },
        ]}
        translations={{
          parameters: 'Parameters',
          requestBody: 'Request body',
          responses: 'Responses',
          noParameters: 'No parameters available',
          noRequestBody: 'No request body',
        }}
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
          {
            path: '/users',
            method: 'get',
            summary: 'Get users',

            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        ]}
        translations={{
          parameters: 'Parameters',
          requestBody: 'Request body',
          responses: 'Responses',
          noParameters: 'No parameters available',
          noRequestBody: 'No request body',
        }}
      />,
    );

    await user.click(screen.getByText('/users'));

    expect(screen.getByText('No parameters available')).toBeInTheDocument();
  });

  it('shows message when endpoint has no request body', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <EndpointList
        endpoints={[
          {
            path: '/users',
            method: 'get',
            summary: 'Get users',
            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        ]}
        translations={{
          parameters: 'Parameters',
          requestBody: 'Request body',
          responses: 'Responses',
          noParameters: 'No parameters available',
          noRequestBody: 'No request body',
        }}
      />,
    );

    await user.click(screen.getByText('/users'));

    expect(screen.getByText('Request body')).toBeInTheDocument();
    expect(screen.getByText('No request body')).toBeInTheDocument();
  });
});
