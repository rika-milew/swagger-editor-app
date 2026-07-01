import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/index.css';
import { ChakraUIProvider } from '@/providers/chakra-provider';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import { UserHydrator } from '@/components/user-hydrator/user-hydrator';
import { getSession } from '@/lib/auth/get-session';

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

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getSession();

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ChakraUIProvider>
          <UserHydrator user={user} />
          <Flex direction="column" minH="100vh">
            <Header />

            <Box flex="1">{children}</Box>

            <Footer />
          </Flex>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
