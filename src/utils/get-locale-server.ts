import { headers } from 'next/headers';

export async function getLocaleFromHeaders(): Promise<string> {
  const headersList = await headers();
  const referer = headersList.get('referer') ?? '';
  const locale = /\/(en|ru)\//.exec(referer)?.[1];
  return locale ?? 'en';
}
