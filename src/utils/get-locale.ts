export function getLocaleFromPath(pathname: string): string {
  const locale = pathname.split('/')[1];
  return ['en', 'ru'].includes(locale) ? locale : 'en';
}
