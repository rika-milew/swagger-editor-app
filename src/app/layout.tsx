import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/index.css';
import { ChakraUIProvider } from '@/providers/chakra-provider';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import { UserProvider } from '@/providers/user-provider';
import { getSession } from '@/lib/auth/get-session';
import { getErrorMessage } from '@/utils/get-error-message';

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
  const user = await getSession().catch((error: unknown) => {
    console.error('Failed to get session:', getErrorMessage(error));
    return null;
  });

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ChakraUIProvider>
          <UserProvider user={user}>
            <Flex direction="column" minH="100vh">
              <Header />
              <Box flex="1">{children}</Box>
              <Footer />
            </Flex>
          </UserProvider>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
