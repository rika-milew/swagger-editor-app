import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from '@/constants/routes';
import { HTTP_STATUS } from '@/constants/http-status';
import { updateSession } from '@/lib/auth/update-session';
import { copyCookies } from '@/utils/copy-cookies';

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
    copyCookies(supabaseResponse, response);
    return response;
  }

  if (isPrivateRoute && !user) {
    const response = new NextResponse(null, {
      status: HTTP_STATUS.UNAUTHORIZED,
      headers: {
        Location: new URL(ROUTES.HOME, request.url).toString(),
      },
    });

    copyCookies(supabaseResponse, response);
    return response;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/history'],
};
