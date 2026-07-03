import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/get-session';
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from '@/constants/constants';

const SESSION_TIMEOUT_MS = 5000;

async function getSessionWithTimeout(): Promise<unknown> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error('getSession timeout')),
      SESSION_TIMEOUT_MS,
    );
  });

  return Promise.race([getSession(), timeoutPromise]).finally(() => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  });
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isPublicAuthRoute = AUTH_ROUTES.has(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.has(pathname);

  if (isPublicAuthRoute) {
    try {
      const user = await getSessionWithTimeout();
      if (user) {
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.error('Auth route error:', error);
      return NextResponse.next();
    }
  }

  if (isPrivateRoute) {
    try {
      const user = await getSessionWithTimeout();
      if (!user) {
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.error('Private route error:', error);
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/history'],
};
