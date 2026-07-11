import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';
import { SwaggerViewer } from './swagger-viewer';
import { parseSwagger } from '@/utils/parse-swagger';
import { useSchemaStore } from '@/store/schema-store';

vi.mock('@/utils/parse-swagger', () => ({
  parseSwagger: vi.fn(),
}));

const translations: Record<string, string> = {
  description: 'API documentation',
  endpoints: 'Endpoints',
  noEndpoints: 'No endpoints found',
  invalidSchema: 'Invalid OpenAPI schema',
  parameters: 'Parameters',
  requestBody: 'Request body',
  responses: 'Responses',
  required: 'Required',
  noParameters: 'No parameters',
  noRequestBody: 'No request body',
  noResponses: 'No responses',
  tryItOut: 'Try it out',
  execute: 'Execute',
  generateCurl: 'Generate cURL',
};

const mockTranslations = (key: keyof typeof translations) => translations[key];

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

const validSchema = {
  openapi: '3.0.0',
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: 'API documentation',
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
    },
  },
};

describe('SwaggerViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useSchemaStore.setState({
      code: JSON.stringify(validSchema),
      format: 'json',
    });
  });

  it('renders swagger endpoints', () => {
    vi.mocked(parseSwagger).mockReturnValue([
      {
        path: '/users',
        method: 'get',
        summary: 'Get all users',
        parameters: [],
        responses: {},
      },
    ]);

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText('/users')).toBeInTheDocument();

    expect(screen.getByText('Get all users')).toBeInTheDocument();
  });

  it('renders "No endpoints found" when schema has no endpoints', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText('No endpoints found')).toBeInTheDocument();
  });

  it('renders invalid schema message', () => {
    useSchemaStore.setState({
      code: 'invalid schema',
      format: 'yaml',
    });

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText('Invalid OpenAPI schema')).toBeInTheDocument();
  });

  it('passes parsed schema to parseSwagger', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderWithProviders(<SwaggerViewer />);

    expect(parseSwagger).toHaveBeenCalledTimes(1);

    expect(parseSwagger).toHaveBeenCalledWith(
      expect.objectContaining({
        openapi: '3.0.0',
        info: {
          title: 'Test API',
          version: '1.0.0',
          description: 'API documentation',
        },
      }),
    );
  });
});
