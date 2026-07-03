import type { NextResponse } from 'next/server';

export function copyCookies(
  fromResponse: NextResponse,
  toResponse: NextResponse,
): void {
  fromResponse.cookies.getAll().forEach((cookie) => {
    toResponse.cookies.set(cookie.name, cookie.value, cookie);
  });
}
