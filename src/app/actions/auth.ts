'use server';

import { createServerClient } from '@/lib/database/server';
import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema } from '@/lib/validation/auth-schemas';
import { ROUTES } from '@/constants/routes';
import { getLocaleFromHeaders } from '@/utils/get-locale-server';
import { toErrorKeyDTO } from '@/lib/database/dto/error-key.dto';
import type { z } from 'zod';

type AuthenticationResult = {
  error: string;
};

async function redirectToLocalizedHome(): Promise<never> {
  const locale = await getLocaleFromHeaders();
  redirect(`/${locale}${ROUTES.HOME}`);
}

export async function signIn(
  data: z.infer<typeof signInSchema>,
): Promise<AuthenticationResult> {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return {
      error: 'validationErrors.default',
    };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: toErrorKeyDTO(error) };
    }
  } catch (error) {
    console.error('Sign in failed:', error);
    return { error: 'serverErrors.default' };
  }

  await redirectToLocalizedHome();
  return { error: '' };
}

export async function signUp(
  data: z.infer<typeof signUpSchema>,
): Promise<AuthenticationResult> {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return {
      error: 'validationErrors.default',
    };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: toErrorKeyDTO(error) };
    }
  } catch (error) {
    console.error('Sign up failed:', error);
    return { error: 'serverErrors.default' };
  }

  await redirectToLocalizedHome();
  return { error: '' };
}

export async function signOut(locale?: string): Promise<void> {
  const userLocale = locale ?? (await getLocaleFromHeaders());

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', toErrorKeyDTO(error));
    }
  } catch (error) {
    console.error('Sign out failed:', error);
  }

  redirect(`/${userLocale}${ROUTES.HOME}`);
}
