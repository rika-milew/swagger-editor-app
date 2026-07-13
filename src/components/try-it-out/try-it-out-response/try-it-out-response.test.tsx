import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { TryItOutResponse } from './try-it-out-response';
import type { ResponseData } from '@/types/viewer.types';
import { HTTP_STATUS } from '@/constants/http-status';

const mockT = (key: string): string => {
  const translations: Record<string, string> = {
    response: 'Response',
    headers: 'Headers',
    body: 'Body',
  };
  return translations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

function createResponse(overrides: Partial<ResponseData> = {}): ResponseData {
  return {
    status: HTTP_STATUS.OK,
    statusText: 'OK',
    headers: {},
    body: '',
    duration: 0,
    ...overrides,
  };
}

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

describe('TryItOutResponse', () => {
  it('should render response status and duration', () => {
    const response = createResponse({
      status: HTTP_STATUS.OK,
      statusText: 'OK',
      duration: 150,
    });

    renderWithChakra(<TryItOutResponse response={response} />);

    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByText('[200 OK]')).toBeInTheDocument();
  });

  it('should render headers when present', () => {
    const response = createResponse({
      headers: { 'content-type': 'application/json' },
    });

    renderWithChakra(<TryItOutResponse response={response} />);

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText(/content-type/)).toBeInTheDocument();
    expect(screen.getByText(/application\/json/)).toBeInTheDocument();
  });

  it('should not render headers section when empty', () => {
    const response = createResponse({ headers: {} });

    renderWithChakra(<TryItOutResponse response={response} />);

    expect(screen.queryByText('Headers')).not.toBeInTheDocument();
  });

  it('should render response body', () => {
    const response = createResponse({
      body: '{"message":"success"}',
    });

    renderWithChakra(<TryItOutResponse response={response} />);

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('{"message":"success"}')).toBeInTheDocument();
  });

  it('should show success color for status below 400', () => {
    const response = createResponse({ status: HTTP_STATUS.OK });

    renderWithChakra(<TryItOutResponse response={response} />);

    const statusElement = screen.getByText('[200 OK]');
    expect(statusElement).toBeInTheDocument();
  });

  it('should show error color for status 400 and above', () => {
    const response = createResponse({
      status: HTTP_STATUS.BAD_REQUEST,
      statusText: 'Bad Request',
    });

    renderWithChakra(<TryItOutResponse response={response} />);

    const statusElement = screen.getByText('[400 Bad Request]');
    expect(statusElement).toBeInTheDocument();
  });

  it('should render network error status', () => {
    const response = createResponse({
      status: HTTP_STATUS.NETWORK_ERROR,
      statusText: 'Network Error',
      body: 'Request failed',
    });

    renderWithChakra(<TryItOutResponse response={response} />);

    expect(screen.getByText('[500 Network Error]')).toBeInTheDocument();
    expect(screen.getByText('Request failed')).toBeInTheDocument();
  });
});
