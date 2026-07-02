'use client';

import { useSyncUser } from '@/hooks/use-sync-user';
import type { User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  useSyncUser(user);

  return <>{children}</>;
}
