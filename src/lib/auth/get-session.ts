import { createServerClient } from '@/lib/database/server';
import type { User } from '@supabase/supabase-js';

export async function getSession(): Promise<User | null> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}
