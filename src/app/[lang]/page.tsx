import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/views/home/home-page';

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  setRequestLocale(lang);
  return <HomePage />;
}
