import { describe, it, expect } from 'vitest';
import { NextResponse } from 'next/server';
import { copyCookies } from './copy-cookies';

describe('copyCookies', () => {
  it('should copy all cookies from source to target response', () => {
    const fromResponse = NextResponse.next();
    fromResponse.cookies.set('token', 'abc123');
    fromResponse.cookies.set('refresh', 'def456');
    fromResponse.cookies.set('session', 'session-value');

    const toResponse = NextResponse.next();

    copyCookies(fromResponse, toResponse);

    expect(toResponse.cookies.get('token')?.value).toBe('abc123');
    expect(toResponse.cookies.get('refresh')?.value).toBe('def456');
    expect(toResponse.cookies.get('session')?.value).toBe('session-value');
  });

  it('should handle empty source cookies', () => {
    const fromResponse = NextResponse.next();
    const toResponse = NextResponse.next();

    expect(() => {
      copyCookies(fromResponse, toResponse);
    }).not.toThrow();
  });

  it('should not mutate source response cookies', () => {
    const fromResponse = NextResponse.next();
    fromResponse.cookies.set('token', 'original');

    const toResponse = NextResponse.next();

    copyCookies(fromResponse, toResponse);

    expect(fromResponse.cookies.get('token')?.value).toBe('original');
  });

  it('should overwrite existing cookies in target with same names', () => {
    const fromResponse = NextResponse.next();
    fromResponse.cookies.set('token', 'new-token');

    const toResponse = NextResponse.next();
    toResponse.cookies.set('token', 'old-token');

    copyCookies(fromResponse, toResponse);

    expect(toResponse.cookies.get('token')?.value).toBe('new-token');
  });

  it('should copy cookies with special characters', () => {
    const fromResponse = NextResponse.next();
    fromResponse.cookies.set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    const toResponse = NextResponse.next();

    copyCookies(fromResponse, toResponse);

    expect(toResponse.cookies.get('jwt')?.value).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    );
  });

  it('should handle all cookies without performance issues', () => {
    const fromResponse = NextResponse.next();
    const cookieCount = 50;

    for (let index = 0; index < cookieCount; index++) {
      fromResponse.cookies.set(
        `cookie-${String(index)}`,
        `value-${String(index)}`,
      );
    }

    const toResponse = NextResponse.next();

    const start = performance.now();
    copyCookies(fromResponse, toResponse);
    const end = performance.now();

    expect(toResponse.cookies.get('cookie-0')?.value).toBe('value-0');
    expect(toResponse.cookies.get('cookie-49')?.value).toBe('value-49');

    expect(end - start).toBeLessThan(100);
  });

  it('should not copy cookies if source has none', () => {
    const fromResponse = NextResponse.next();
    const toResponse = NextResponse.next();
    toResponse.cookies.set('existing', 'keep-me');

    copyCookies(fromResponse, toResponse);

    expect(toResponse.cookies.get('existing')?.value).toBe('keep-me');
  });

  it('should copy cookies with options (path, domain, etc.)', () => {
    const fromResponse = NextResponse.next();
    fromResponse.cookies.set('secure-token', 'secret', {
      path: '/api',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    const toResponse = NextResponse.next();

    copyCookies(fromResponse, toResponse);

    const copiedCookie = toResponse.cookies.get('secure-token');
    expect(copiedCookie?.value).toBe('secret');
  });
});
