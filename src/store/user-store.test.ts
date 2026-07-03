import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '@/store/user-store';

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({ user: null });
  });

  it('should have null user by default', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
  });

  it('should set user', () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      created_at: '2026-01-01',
    };
    useUserStore.getState().setUser(user);
    expect(useUserStore.getState().user).toEqual(user);
  });

  it('should clear user', () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      created_at: '2026-01-01',
    };
    useUserStore.getState().setUser(user);
    useUserStore.getState().clearUser();
    expect(useUserStore.getState().user).toBeNull();
  });
});
