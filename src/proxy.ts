import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/get-session';
import { AUTH_ROUTES } from '@/constants/constants';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isPublicAuthRoute = AUTH_ROUTES.has(pathname);

  if (!isPublicAuthRoute) {
    return NextResponse.next();
  }

  try {
    const user = await getSession();

    if (user) {
      return NextResponse.redirect(new URL('/', request.url));
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
