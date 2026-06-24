import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetUser, mockCreateServerClient } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockCreateServerClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

vi.mock('@/lib/database/server', () => ({
  createServerClient: mockCreateServerClient,
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
    expect(mockCreateServerClient).toHaveBeenCalledTimes(1);
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

    const result = await getSession();

    expect(result).toBeNull();
  });
});
