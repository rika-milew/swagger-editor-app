import { z } from 'zod';

const supabaseUrlSchema = z
  .string()
  .min(1, 'Supabase URL is required')
  .refine((url) => {
    try {
      const parsed = new URL(url);
      return (
        parsed.protocol === 'https:' &&
        (parsed.hostname.includes('supabase.co') ||
          parsed.hostname === 'localhost')
      );
    } catch {
      return false;
    }
  }, 'Must be a valid Supabase URL');

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: supabaseUrlSchema,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'Supabase publishable key is required')
    .refine(
      (key) => key.startsWith('sb_') || key.startsWith('eyJ'),
      'Must be a valid Supabase publishable key',
    ),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    z.treeifyError(parsedEnv.error),
  );
  throw new Error('Missing or invalid environment variables');
}

export const env = parsedEnv.data;
