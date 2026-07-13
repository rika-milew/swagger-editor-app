import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from '@/constants/routes';
import { updateSession } from '@/lib/auth/update-session';
import { copyCookies } from '@/utils/copy-cookies';
import { getLocaleFromPath } from '@/utils/get-locale';
import { intlMiddleware } from '../middleware';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/en/_next') ||
    pathname.startsWith('/ru/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locale = getLocaleFromPath(pathname);
  const intlResponse = intlMiddleware(request);

  const location = intlResponse.headers.get('location');

  if (location) {
    intlResponse.headers.set('x-next-intl-locale', locale);
    return intlResponse;
  }

  let supabaseResponse = NextResponse.next({ request });
  let user = null;

  try {
    const result = await updateSession(request);
    supabaseResponse = result.supabaseResponse;
    user = result.user;
  } catch (error) {
    void error;
  }

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  const isPublicAuthRoute = AUTH_ROUTES.has(pathWithoutLocale);
  const isPrivateRoute = PRIVATE_ROUTES.has(pathWithoutLocale);

  if (isPublicAuthRoute && user) {
    const locale = getLocaleFromPath(pathname);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${ROUTES.HOME}`;
    url.search = '';
    const response = NextResponse.redirect(url);
    response.headers.set('x-next-intl-locale', locale);
    copyCookies(supabaseResponse, response);
    return response;
  }

  if (isPrivateRoute && !user) {
    supabaseResponse.headers.set('x-next-intl-locale', locale);
    return supabaseResponse;
  }

  supabaseResponse.headers.set('x-next-intl-locale', locale);
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
