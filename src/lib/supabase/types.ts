import type { SupabaseClient } from '@supabase/supabase-js';

export type DefaultSupabaseClient = SupabaseClient<
  never,
  'public',
  'public',
  never,
  never
>;
