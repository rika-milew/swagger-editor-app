import { headers } from 'next/headers';

export function getLocaleFromPath(pathname: string): string {
  const locale = pathname.split('/')[1];
  return ['en', 'ru'].includes(locale) ? locale : 'en';
}

export async function getLocaleFromHeaders(): Promise<string> {
  const headersList = await headers();
  const referer = headersList.get('referer') ?? '';
  const locale = /\/(en|ru)\//.exec(referer)?.[1];
  return locale ?? 'en';
}
