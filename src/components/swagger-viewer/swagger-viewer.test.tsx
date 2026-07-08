import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';
import { SwaggerViewer } from './swagger-viewer';
import { mockSwagger } from './mock-swagger';
import { parseSwagger } from '@/utils/parse-swagger';

vi.mock('@/utils/parse-swagger', () => ({
  parseSwagger: vi.fn(),
}));

const translations = {
  description: 'API documentation',
  endpoints: 'Endpoints',
  noEndpoints: 'No endpoints found',
};

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: keyof typeof translations) => translations[key]),
}));

async function renderComponent() {
  const Component = await SwaggerViewer();

  renderWithProviders(Component);
}

describe('SwaggerViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders swagger information and endpoints', async () => {
    vi.mocked(parseSwagger).mockReturnValue([
      {
        path: '/users',
        method: 'get',
        summary: 'Get all users',
      },
      {
        path: '/auth/login',
        method: 'post',
        summary: 'Login user',
      },
    ]);

    await renderComponent();

    expect(screen.getByText(mockSwagger.info.title)).toBeInTheDocument();
    expect(
      screen.getByText(`v${mockSwagger.info.version}`),
    ).toBeInTheDocument();

    expect(screen.getByText(translations.description)).toBeInTheDocument();

    expect(screen.getByText(translations.endpoints)).toBeInTheDocument();

    expect(screen.getByText('/users')).toBeInTheDocument();
    expect(screen.getByText('/auth/login')).toBeInTheDocument();

    expect(screen.getByText('Get all users')).toBeInTheDocument();
    expect(screen.getByText('Login user')).toBeInTheDocument();

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('renders "No endpoints found" when there are no endpoints', async () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    await renderComponent();

    expect(screen.getByText(translations.noEndpoints)).toBeInTheDocument();
  });

  it('calls parseSwagger with mockSwagger', async () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    await renderComponent();

    expect(parseSwagger).toHaveBeenCalledTimes(1);
    expect(parseSwagger).toHaveBeenCalledWith(mockSwagger);
  });
});
