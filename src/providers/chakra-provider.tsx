'use client';

import type { ReactNode } from 'react';

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        white: {
          value: 'hsl(0deg 0% 100%)',
        },
        gray: {
          900: { value: 'hsl(240deg 9% 4%)' },
        },
      },
      fonts: {
        body: { value: 'var(--font-inter), sans-serif' },
        heading: { value: 'var(--font-inter), sans-serif' },
        mono: { value: 'var(--font-jetbrains-mono), monospace' },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function ChakraUIProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
