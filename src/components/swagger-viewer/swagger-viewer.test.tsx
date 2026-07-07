import { screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test-utils/render-with-providers';
import { SwaggerViewer } from './swagger-viewer';
import { mockSwagger } from './mock-swagger';
import { parseSwagger } from '@/utils/parse-swagger';

vi.mock('@/utils/parse-swagger', () => ({
  parseSwagger: vi.fn(),
}));

const messages = {
  SwaggerViewer: {
    description: 'API documentation',
    endpoints: 'Endpoints',
    noEndpoints: 'No endpoints found',
  },
};

describe('SwaggerViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderComponent() {
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SwaggerViewer />
      </NextIntlClientProvider>,
    );
  }

  it('renders swagger information and endpoints', () => {
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

    renderComponent();

    expect(screen.getByText(mockSwagger.info.title)).toBeInTheDocument();
    expect(
      screen.getByText(`v${mockSwagger.info.version}`),
    ).toBeInTheDocument();

    expect(
      screen.getByText(messages.SwaggerViewer.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.SwaggerViewer.endpoints),
    ).toBeInTheDocument();

    expect(screen.getByText('/users')).toBeInTheDocument();
    expect(screen.getByText('/auth/login')).toBeInTheDocument();

    expect(screen.getByText('Get all users')).toBeInTheDocument();
    expect(screen.getByText('Login user')).toBeInTheDocument();

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('renders "No endpoints found" when there are no endpoints', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderComponent();

    expect(
      screen.getByText(messages.SwaggerViewer.noEndpoints),
    ).toBeInTheDocument();
  });

  it('calls parseSwagger with mockSwagger', () => {
    vi.mocked(parseSwagger).mockReturnValue([]);

    renderComponent();

    expect(parseSwagger).toHaveBeenCalledTimes(1);
    expect(parseSwagger).toHaveBeenCalledWith(mockSwagger);
  });
});
