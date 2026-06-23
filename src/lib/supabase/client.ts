import { createBrowserClient } from '@supabase/ssr';
import type { DefaultSupabaseClient } from './types';

export function createClient(): DefaultSupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(url, key);
}
