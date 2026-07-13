'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export function ChakraUIProvider({ children }: ProviderProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
