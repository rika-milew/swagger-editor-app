import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';
import { ChakraUIProvider } from '@/providers/chakra-provider';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(
      <ChakraUIProvider>
        <Home />
      </ChakraUIProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /swagger editor app/i }),
    ).toBeInTheDocument();
  });
});
