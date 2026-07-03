import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from '@/constants/routes';
import { updateSession } from '@/lib/auth/update-session';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request });
  let user = null;

  try {
    const result = await updateSession(request);
    supabaseResponse = result.supabaseResponse;
    user = result.user;
  } catch (error) {
    console.error('Middleware error:', error);
  }

  const { pathname } = request.nextUrl;

  const isPublicAuthRoute = AUTH_ROUTES.has(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.has(pathname);

  if (isPublicAuthRoute && user) {
    const response = NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    return response;
  }

  if (isPrivateRoute && !user) {
    const response = NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    return response;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/history'],
};
