import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/get-session';
import { AUTH_ROUTES, ROUTES } from '@/constants/constants';

const SESSION_TIMEOUT_MS = 3000;

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isPublicAuthRoute = AUTH_ROUTES.has(pathname);

  if (!isPublicAuthRoute) {
    return NextResponse.next();
  }

  try {
    const user = await Promise.race([
      getSession(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('getSession timeout')),
          SESSION_TIMEOUT_MS,
        ),
      ),
    ]);

    if (user) {
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/sign-in', '/sign-up'],
};
