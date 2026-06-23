import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetUser, mockCreateClient } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockCreateClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: mockCreateClient,
}));

import { getSession } from './get-session';

describe('getSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns user when user session is valid', async () => {
    const mockUser = { id: '1', email: 'user@mail.com' };
    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getSession();

    expect(result).toEqual(mockUser);
    expect(mockCreateClient).toHaveBeenCalledTimes(1);
  });

  it('returns null when no user session exists', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    const result = await getSession();

    expect(result).toBeNull();
  });

  it('throws error when getSession fails', async () => {
    mockGetUser.mockRejectedValue(new Error('Authentication error'));

    await expect(getSession()).rejects.toThrow('Authentication error');
  });
});
