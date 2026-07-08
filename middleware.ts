import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: false,
});

export const config = {
  matcher: [String.raw`/((?!api|_next|.*\..*).*)`],
};
