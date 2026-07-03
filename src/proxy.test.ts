import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status';

const mockUpdateSession = vi.fn();
vi.mock('@/lib/auth/update-session', () => ({
  updateSession: mockUpdateSession,
}));

const { proxy } = await import('@/proxy');

function createRequest(pathname: string): NextRequest {
  return new NextRequest(new URL(`http://localhost:3000${pathname}`));
}

function createMockSupabaseResponse(
  request: NextRequest,
  cookies: {
    name: string;
    value: string;
    options?: Record<string, unknown>;
  }[] = [],
): NextResponse {
  const response = NextResponse.next({ request });

  cookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  });

  return response;
}

describe('Proxy Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateSession.mockReset();
  });

  it('redirects authorized user from /sign-in to /', async () => {
    const request = createRequest('/sign-in');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: { sub: 'user-1234' },
    });

    const response = await proxy(createRequest('/sign-in'));

    expect(response.status).toBe(HTTP_STATUS.REDIRECT);
    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('redirects authorized user from /sign-up to /', async () => {
    const request = createRequest('/sign-up');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: { sub: 'user-1234' },
    });

    const response = await proxy(createRequest('/sign-up'));

    expect(response.status).toBe(HTTP_STATUS.REDIRECT);
    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('allows unauthorized user to access /sign-in', async () => {
    const request = createRequest('/sign-in');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: null,
    });

    const response = await proxy(createRequest('/sign-in'));

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.headers.get('location')).toBeNull();
  });

  it('allows unauthorized user to access /sign-up', async () => {
    const request = createRequest('/sign-up');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: null,
    });

    const response = await proxy(createRequest('/sign-up'));

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.headers.get('location')).toBeNull();
  });

  it('passes through non-auth routes', async () => {
    const request = createRequest('/about');
    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: null,
    });

    const response = await proxy(createRequest('/about'));

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_STATUS.OK);
  });

  it('passes through when updateSession throws error', async () => {
    mockUpdateSession.mockRejectedValue(new Error('Database error'));

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_STATUS.OK);
  });

  it('allows authorized user to access private route', async () => {
    const request = createRequest('/history');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: { sub: 'user-1234' },
    });

    const response = await proxy(createRequest('/history'));

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects unauthorized user from history to home page', async () => {
    const request = createRequest('/history');

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request),
      user: null,
    });

    const response = await proxy(createRequest('/history'));

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(response.headers.get('location')).toBe('/');
  });

  it('redirects to home page when updateSession throws error on private route', async () => {
    mockUpdateSession.mockRejectedValue(new Error('Database error'));

    const response = await proxy(createRequest('/history'));

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(response.headers.get('location')).toBe('/');
  });

  it('should copy cookies when redirecting authorized user from public route', async () => {
    const request = createRequest('/sign-in');
    const testCookies = [
      { name: 'sb-access-token', value: 'token123' },
      { name: 'sb-refresh-token', value: 'refresh456' },
    ];

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request, testCookies),
      user: { sub: 'user-1234' },
    });

    const response = await proxy(request);

    expect(response.status).toBe(HTTP_STATUS.REDIRECT);
    expect(response.headers.get('location')).toBe('http://localhost:3000/');

    const responseCookies = response.cookies.getAll();

    expect(responseCookies).toHaveLength(2);
    expect(responseCookies[0].name).toBe('sb-access-token');
    expect(responseCookies[0].value).toBe('token123');
    expect(responseCookies[1].name).toBe('sb-refresh-token');
    expect(responseCookies[1].value).toBe('refresh456');
  });

  it('should copy cookies when redirecting unauthorized user from private route', async () => {
    const request = createRequest('/history');
    const testCookies = [{ name: 'sb-access-token', value: 'old-token' }];

    mockUpdateSession.mockResolvedValue({
      supabaseResponse: createMockSupabaseResponse(request, testCookies),
      user: null,
    });

    const response = await proxy(request);

    expect(response.headers.get('location')).toBe('/');

    const responseCookies = response.cookies.getAll();

    expect(responseCookies).toHaveLength(1);
    expect(responseCookies[0].name).toBe('sb-access-token');
    expect(responseCookies[0].value).toBe('old-token');
  });
});
