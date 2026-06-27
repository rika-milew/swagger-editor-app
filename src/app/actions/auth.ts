'use server';

import { createServerClient } from '@/lib/database/server';
import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema } from '@/lib/validation/auth-schemas';
import { getErrorMessage } from '@/utils/get-error-message';
import type { z } from 'zod';

type AuthenticationResult = {
  error: string;
};

export async function signIn(
  data: z.infer<typeof signInSchema>,
): Promise<AuthenticationResult> {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { error: getErrorMessage(result.error) ?? 'Validation failed' };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: getErrorMessage(error) ?? 'Authentication failed' };
  }

  redirect('/');
}

export async function signUp(
  data: z.infer<typeof signUpSchema>,
): Promise<AuthenticationResult> {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return { error: getErrorMessage(result.error) ?? 'Validation failed' };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: getErrorMessage(error) ?? 'Registration failed' };
  }

  redirect('/');
}
