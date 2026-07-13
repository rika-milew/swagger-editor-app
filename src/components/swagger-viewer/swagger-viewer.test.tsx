import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import { createMockSchema } from '@/test-utils/mock-schema';
import { mockTranslations } from '@/test-utils/mock-swagger-viewer-translations';
import { createMockEndpoint } from '@/test-utils/mock-swagger-viewer-endpoint';
import { SwaggerViewer } from './swagger-viewer';
import { parseSwagger } from '@/utils/parse-swagger';
import { useSchemaStore } from '@/store/schema-store';

vi.mock('@/utils/parse-swagger', () => ({
  parseSwagger: vi.fn(),
}));

const getTranslation = (key: keyof typeof mockTranslations) =>
  mockTranslations[key];

vi.mock('next-intl', () => ({
  useTranslations: () => getTranslation,
}));

const validSchema = createMockSchema();

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
      createMockEndpoint({
        path: '/users',
        summary: 'Get all users',
      }),
    ]);

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText('/users')).toBeInTheDocument();

    expect(screen.getByText('Get all users')).toBeInTheDocument();
  });

  it('renders "No endpoints found" when schema has no endpoints', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText(mockTranslations.noEndpoints)).toBeInTheDocument();
  });

  it('renders invalid schema message', () => {
    useSchemaStore.setState({
      code: 'invalid schema',
      format: 'yaml',
    });

    renderWithProviders(<SwaggerViewer />);

    expect(screen.getByText(mockTranslations.loadSchema)).toBeInTheDocument();
  });

  it('passes parsed schema to parseSwagger', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderWithProviders(<SwaggerViewer />);

    expect(parseSwagger).toHaveBeenCalledTimes(1);

    expect(parseSwagger).toHaveBeenCalledWith(
      expect.objectContaining({
        info: {
          title: 'Test API',
          version: '1.0.0',
        },
      }),
    );
  });
});
