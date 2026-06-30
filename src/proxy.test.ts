import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const HTTP_OK_STATUS = 200;

const mockGetSession = vi.fn();
vi.mock('@/lib/auth/get-session', () => ({
  getSession: mockGetSession,
}));

const { proxy } = await import('@/proxy');

function createRequest(pathname: string): NextRequest {
  return new NextRequest(new URL(`http://localhost:3000${pathname}`));
}

describe('Proxy Auth Redirects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects authorized user from /sign-in to /', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1234' });

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('redirects authorized user from /sign-up to /', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1234' });

    const response = await proxy(createRequest('/sign-up'));

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('allows unauthorized user to access /sign-in', async () => {
    mockGetSession.mockResolvedValue(null);

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBeNull();
  });

  it('allows unauthorized user to access /sign-up', async () => {
    mockGetSession.mockResolvedValue(null);

    const response = await proxy(createRequest('/sign-up'));

    expect(response.headers.get('location')).toBeNull();
  });

  it('passes through non-auth routes', async () => {
    const response = await proxy(createRequest('/about'));

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_OK_STATUS);
  });

  it('passes through when getSession throws error', async () => {
    mockGetSession.mockRejectedValue(new Error('Database error'));

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_OK_STATUS);
  });
});
