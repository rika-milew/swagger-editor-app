import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const SESSION_TIMEOUT_MS = 5000;

export async function updateSession(request: NextRequest): Promise<{
  supabaseResponse: NextResponse;
  user: unknown;
}> {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let user = null;

  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('getClaims timeout')),
        SESSION_TIMEOUT_MS,
      );
    });

    const result = await Promise.race([
      supabase.auth.getClaims(),
      timeoutPromise,
    ]);

    user = result.data?.claims ?? null;
  } catch (error) {
    console.error('updateSession auth check failed:', error);
    user = null;
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }

  return { supabaseResponse, user };
}
