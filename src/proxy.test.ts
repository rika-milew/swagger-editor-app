import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const HTTP_OK_STATUS = 200;
const SESSION_TIMEOUT_MS = 5000;

const mockGetSession = vi.fn();
vi.mock('@/lib/auth/get-session', () => ({
  getSession: mockGetSession,
}));

const { proxy } = await import('@/proxy');

function createRequest(pathname: string): NextRequest {
  return new NextRequest(new URL(`http://localhost:3000${pathname}`));
}

describe('Proxy Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSession.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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
    expect(mockGetSession).not.toHaveBeenCalled();
  });

  it('passes through when getSession throws error', async () => {
    mockGetSession.mockRejectedValue(new Error('Database error'));

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_OK_STATUS);
  });

  it('passes through when getSession times out', async () => {
    mockGetSession.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(resolve, SESSION_TIMEOUT_MS * 10)),
    );

    const responsePromise = proxy(createRequest('/sign-in'));

    await vi.advanceTimersByTimeAsync(SESSION_TIMEOUT_MS);

    const response = await responsePromise;

    expect(response.headers.get('location')).toBeNull();
    expect(response.status).toBe(HTTP_OK_STATUS);
  });

  it('allows authorized user to access private route', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1234' });

    const response = await proxy(createRequest('/history'));

    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects unauthorized user from history to home page', async () => {
    mockGetSession.mockResolvedValue(null);

    const response = await proxy(createRequest('/history'));

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('redirects to home page when getSession throws error on private route', async () => {
    mockGetSession.mockRejectedValue(new Error('Database error'));

    const response = await proxy(createRequest('/history'));

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('redirects to home page when getSession times out on private route', async () => {
    mockGetSession.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(resolve, SESSION_TIMEOUT_MS * 10)),
    );

    const responsePromise = proxy(createRequest('/history'));

    await vi.advanceTimersByTimeAsync(SESSION_TIMEOUT_MS);

    const response = await responsePromise;

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('clears timeout when getSession resolves before timeout', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1234' });

    const response = await proxy(createRequest('/sign-in'));

    expect(response.headers.get('location')).toBe('http://localhost:3000/');
  });
});
