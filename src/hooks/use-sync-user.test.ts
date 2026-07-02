import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSyncUser } from '@/hooks/use-sync-user';
import { useUserStore } from '@/store/user-store';
import type { User } from '@supabase/supabase-js';

vi.mock('@/store/user-store', () => ({
  useUserStore: vi.fn(),
}));

describe('useSyncUser', () => {
  it('should call clearUser when user is null', () => {
    const clearUser = vi.fn();
    const setUser = vi.fn();

    vi.mocked(useUserStore).mockImplementation((selector) =>
      selector({ setUser, clearUser, user: null }),
    );

    renderHook(() => useSyncUser(null));

    expect(clearUser).toHaveBeenCalled();
  });

  it('should call setUser with correct data when user is provided', () => {
    const setUser = vi.fn();
    const clearUser = vi.fn();
    vi.mocked(useUserStore).mockImplementation((selector) =>
      selector({ setUser, clearUser, user: null }),
    );

    const user: User = {
      id: '1',
      email: 'test@example.com',
      created_at: '2026-01-01',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
    };

    renderHook(() => useSyncUser(user));

    expect(setUser).toHaveBeenCalledWith({
      id: '1',
      email: 'test@example.com',
      created_at: '2026-01-01',
    });
  });

  it('should use empty string when user email is undefined', () => {
    const setUser = vi.fn();
    const clearUser = vi.fn();

    vi.mocked(useUserStore).mockImplementation((selector) =>
      selector({ setUser, clearUser, user: null }),
    );

    const user: User = {
      id: '1',
      email: undefined,
      created_at: '2026-01-01',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
    };

    renderHook(() => useSyncUser(user));

    expect(setUser).toHaveBeenCalledWith({
      id: '1',
      email: '',
      created_at: '2026-01-01',
    });
  });
});
