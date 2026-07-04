import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from '@/constants/routes';
import { updateSession } from '@/lib/auth/update-session';
import { copyCookies } from '@/utils/copy-cookies';
import { getLocaleFromPath } from '@/utils/get-locale';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!/^\/(en|ru)(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  let supabaseResponse = NextResponse.next({ request });
  let user = null;

  try {
    const result = await updateSession(request);
    supabaseResponse = result.supabaseResponse;
    user = result.user;
  } catch (error) {
    console.error('Middleware error:', error);
  }

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  const isPublicAuthRoute = AUTH_ROUTES.has(pathWithoutLocale);
  const isPrivateRoute = PRIVATE_ROUTES.has(pathWithoutLocale);

  if (isPublicAuthRoute && user) {
    const locale = getLocaleFromPath(pathname);
    const response = NextResponse.redirect(
      new URL(`/${locale}${ROUTES.HOME}`, request.url),
    );
    copyCookies(supabaseResponse, response);
    return response;
  }

  if (isPrivateRoute && !user) {
    const locale = getLocaleFromPath(pathname);
    const response = NextResponse.redirect(
      new URL(`/${locale}${ROUTES.HOME}`, request.url),
    );
    copyCookies(supabaseResponse, response);
    return response;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/history',
    '/(en|ru)/sign-in',
    '/(en|ru)/sign-up',
    '/(en|ru)/history',
  ],
};
