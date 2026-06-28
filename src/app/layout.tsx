import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ChakraUIProvider } from '@/providers/chakra-provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/index.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Swagger Editor App',
  description: 'Online Swagger/OpenAPI editor and viewer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ChakraUIProvider>{children}</ChakraUIProvider>
      </body>
    </html>
  );
}
