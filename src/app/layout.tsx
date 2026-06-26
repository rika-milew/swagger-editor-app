import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/index.css';
import { Provider } from '@/components/ui/provider';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

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
        <Provider>
          <Flex direction="column" minH="100vh">
            <Header />

            <Box flex="1">{children}</Box>

            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
