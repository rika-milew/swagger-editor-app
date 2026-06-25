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
    breakpoints: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
    },
    tokens: {
      sizes: {
        container: {
          md: { value: '28rem' },
        },
      },
      colors: {
        white: {
          value: 'hsl(0deg 0% 100%)',
        },
        gray: {
          400: { value: 'hsl(240deg 4% 46%)' },
          800: { value: 'hsl(240deg 14% 15%)' },
          850: { value: 'hsl(240deg 7% 8%)' },
          900: { value: 'hsl(240deg 9% 4%)' },
        },
        blue: {
          500: { value: 'hsl(183deg 100% 50%)' },
        },
        red: {
          400: { value: 'hsl(0deg 80% 60%)' },
          500: { value: 'hsl(0deg 85% 50%)' },
        },
      },
      fonts: {
        body: { value: 'var(--font-inter), sans-serif' },
        heading: { value: 'var(--font-inter), sans-serif' },
        mono: { value: 'var(--font-jetbrains-mono), monospace' },
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.875rem' },
        '4xl': { value: '2.25rem' },
        '5xl': { value: '3rem' },
      },
      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        bold: { value: '700' },
      },
      letterSpacings: {
        normal: { value: '0' },
        wide: { value: '0.025em' },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function ChakraUIProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
