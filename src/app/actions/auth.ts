'use server';

import { createServerClient } from '@/lib/database/server';
import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema } from '@/lib/validation/auth-schemas';
import { getErrorMessage } from '@/utils/get-error-message';
import { ROUTES } from '@/constants/routes';
import { getLocaleFromHeaders } from '@/utils/get-locale-server';
import { getDatabaseErrorKey } from '@/lib/database/database-errors';
import type { z } from 'zod';

type AuthenticationResult = {
  error: string;
};

export async function signIn(
  data: z.infer<typeof signInSchema>,
): Promise<AuthenticationResult> {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return {
      error: getErrorMessage(result.error) ?? 'validationErrors.default',
    };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: getDatabaseErrorKey(error) };
    }
  } catch {
    return { error: 'serverErrors.default' };
  }

  const locale = await getLocaleFromHeaders();
  redirect(`/${locale}${ROUTES.HOME}`);
}

export async function signUp(
  data: z.infer<typeof signUpSchema>,
): Promise<AuthenticationResult> {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return {
      error: getErrorMessage(result.error) ?? 'validationErrors.default',
    };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: getDatabaseErrorKey(error) };
    }
  } catch {
    return { error: 'serverErrors.default' };
  }

  const locale = await getLocaleFromHeaders();
  redirect(`/${locale}${ROUTES.HOME}`);
}

export async function signOut(locale?: string): Promise<void> {
  const userLocale = locale ?? (await getLocaleFromHeaders());

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      const message = getErrorMessage(error) ?? 'Sign out error';
      console.error('Sign out error:', message);
    }
  } catch (error) {
    const message = getErrorMessage(error) ?? 'Sign out failed';
    console.error('Sign out failed:', message);
  }

  redirect(`/${userLocale}${ROUTES.HOME}`);
}
