import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NotFound } from '@/views/not-found';

export default async function NotFoundPage() {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'en';
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFound />
    </NextIntlClientProvider>
  );
}
