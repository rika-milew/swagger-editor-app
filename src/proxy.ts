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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('getSession timeout')),
        SESSION_TIMEOUT_MS,
      );
    });

    const user = await Promise.race([getSession(), timeoutPromise]).finally(
      () => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }
      },
    );

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
