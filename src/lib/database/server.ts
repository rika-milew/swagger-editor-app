import { createServerClient as serverClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

export async function createServerClient(): Promise<SupabaseClient<Database>> {
  try {
    const cookieStore = await cookies();

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase environment variables');
    }

    return serverClient<Database>(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            void 0;
          }
        },
      },
    });
  } catch (error) {
    console.error('Error creating server client:', error);
    throw new Error('Failed to create Supabase server client');
  }
}
