import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';
import { routing } from '../../i18n/routing';

type LocaleLayoutProperties = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProperties, 'params'>): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProperties) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);

  return (
    <NextIntlClientProvider>
      <Flex direction="column" minH="100vh">
        <Header />

        <Box flex="1">{children}</Box>

        <Footer />
      </Flex>
    </NextIntlClientProvider>
  );
}
