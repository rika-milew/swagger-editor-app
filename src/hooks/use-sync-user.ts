'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user-store';
import type { User } from '@supabase/supabase-js';

export function useSyncUser(user: User | null): void {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.email ?? '',
        created_at: user.created_at,
      });
    } else {
      clearUser();
    }
  }, [user, setUser, clearUser]);
}
