import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/index.css';
import { ChakraUIProvider } from '@/providers/chakra-provider';
import { UserProvider } from '@/providers/user-provider';
import { Toaster } from '@/components/toaster/toaster';
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
  let user = null;
  try {
    user = await getSession();
  } catch (error) {
    console.error('Failed to get session:', getErrorMessage(error));
  }

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ChakraUIProvider>
          <UserProvider user={user}>{children}</UserProvider>
          <Toaster />
        </ChakraUIProvider>
      </body>
    </html>
  );
}
