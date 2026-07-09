import { setRequestLocale } from 'next-intl/server';
import AboutView from '@/views/about/about';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  setRequestLocale(lang);

  return <AboutView />;
}
