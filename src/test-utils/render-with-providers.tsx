import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import { render } from '@testing-library/react';

export function renderWithProviders(ui: ReactNode) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}
