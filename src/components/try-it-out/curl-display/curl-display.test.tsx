import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CurlDisplay } from './curl-display';

const mockTranslations: Record<string, string> = {
  curlTitle: 'cURL Command',
  copied: 'Copied!',
  copyCurl: 'Copy cURL',
};

const mockT = (key: string): string => {
  return mockTranslations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

describe('CurlDisplay', () => {
  const mockWriteText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    });
  });

  it('should render curl command and copy button', () => {
    const curlCommand = "curl -X GET 'https://api.example.com/users'";

    renderWithChakra(<CurlDisplay curlCommand={curlCommand} />);

    expect(screen.getByText('cURL Command')).toBeInTheDocument();
    expect(screen.getByText(curlCommand)).toBeInTheDocument();
    expect(screen.getByText('Copy cURL')).toBeInTheDocument();
  });

  it('should copy to clipboard on button click', () => {
    const curlCommand = "curl -X GET 'https://api.example.com'";

    renderWithChakra(<CurlDisplay curlCommand={curlCommand} />);

    const button = screen.getByText('Copy cURL');
    fireEvent.click(button);

    expect(mockWriteText).toHaveBeenCalledWith(curlCommand);
  });

  it('should show copied state after clicking', async () => {
    const curlCommand = "curl -X GET 'https://api.example.com'";

    renderWithChakra(<CurlDisplay curlCommand={curlCommand} />);

    const button = screen.getByRole('button', { name: /Copy cURL/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Copied!/ }),
      ).toBeInTheDocument();
    });
  });
});
