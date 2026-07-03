import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/database/server';

let cookiesConfig!: {
  getAll: () => unknown;
  setAll: (
    cookies: {
      name: string;
      value: string;
      options?: unknown;
    }[],
  ) => void;
};

type CookieOptions = {
  cookies: {
    getAll: () => unknown;
    setAll: (
      cookies: {
        name: string;
        value: string;
        options?: unknown;
      }[],
    ) => void;
  };
};

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(
    (_url: string, _key: string, options: CookieOptions) => {
      cookiesConfig = options.cookies;
      return {};
    },
  ),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

describe('createServerClient', () => {
  const mockUrl = 'https://test.supabase.co';
  const mockKey = 'test-key';

  beforeEach(() => {
    vi.clearAllMocks();

    process.env.SUPABASE_URL = mockUrl;
    process.env.SUPABASE_PUBLISHABLE_KEY = mockKey;

    vi.mocked(cookies).mockResolvedValue({
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    } as never);
  });

  afterEach(() => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_PUBLISHABLE_KEY;
  });

  it('should create client successfully', async () => {
    const client = await createServerClient();

    expect(client).toBeDefined();
  });

  it('should throw when SUPABASE_URL is missing', async () => {
    delete process.env.SUPABASE_URL;

    await expect(createServerClient()).rejects.toThrow(
      'Failed to create Supabase server client',
    );
  });

  it('should throw when SUPABASE_PUBLISHABLE_KEY is missing', async () => {
    delete process.env.SUPABASE_PUBLISHABLE_KEY;

    await expect(createServerClient()).rejects.toThrow(
      'Failed to create Supabase server client',
    );
  });

  it('should handle cookies() rejection', async () => {
    vi.mocked(cookies).mockRejectedValue(new Error('Cookie error'));

    await expect(createServerClient()).rejects.toThrow(
      'Failed to create Supabase server client',
    );
  });

  it('should return cookies from getAll', async () => {
    const getAll = vi.fn().mockReturnValue([{ name: 'token', value: '123' }]);

    vi.mocked(cookies).mockResolvedValue({
      getAll,
      set: vi.fn(),
    } as never);

    await createServerClient();

    expect(cookiesConfig.getAll()).toEqual([{ name: 'token', value: '123' }]);

    expect(getAll).toHaveBeenCalled();
  });

  it('should set cookies through setAll', async () => {
    const set = vi.fn();

    vi.mocked(cookies).mockResolvedValue({
      getAll: vi.fn().mockReturnValue([]),
      set,
    } as never);

    await createServerClient();

    cookiesConfig.setAll([
      {
        name: 'access-token',
        value: '123',
        options: {
          path: '/',
        },
      },
    ]);

    expect(set).toHaveBeenCalledWith('access-token', '123', {
      path: '/',
    });
  });

  it('should handle errors while setting cookies without throwing', async () => {
    const set = vi.fn(() => {
      throw new Error('Cookie set failed');
    });

    vi.mocked(cookies).mockResolvedValue({
      getAll: vi.fn().mockReturnValue([]),
      set,
    } as never);

    await createServerClient();

    expect(() => {
      cookiesConfig.setAll([
        {
          name: 'access-token',
          value: '123',
          options: {},
        },
      ]);
    }).not.toThrow();

    expect(set).toHaveBeenCalledWith('access-token', '123', {});
  });
});
