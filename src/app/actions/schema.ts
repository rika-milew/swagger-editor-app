'use server';

import { createServerClient } from '@/lib/database/server';
import { getSession } from '@/lib/auth/get-session';
import { endpointsSchema } from '@/lib/validation/endpoints-schema';
import type { z } from 'zod';

type SchemaResult = {
  error?: string;
  success?: boolean;
};

type SavedSchema = {
  schema: string;
  format: 'json' | 'yaml';
} | null;

export async function saveSchema(
  data: z.infer<typeof endpointsSchema>,
): Promise<SchemaResult> {
  const user = await getSession();
  if (!user) {
    return { error: 'You must be signed in to save' };
  }

  const result = endpointsSchema.safeParse(data);
  if (!result.success) {
    return { error: 'Invalid schema data' };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.from('user_schemas').upsert(
      {
        user_id: user.id,
        schema: result.data.schema,
        format: result.data.format,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      },
    );

    if (error) {
      throw error;
    }

    return { success: true };
  } catch {
    return { error: 'Failed to save schema' };
  }
}

export async function getSchema(): Promise<SavedSchema> {
  try {
    const user = await getSession();
    if (!user) {
      return null;
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('user_schemas')
      .select('schema, format')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      return null;
    }

    const raw: unknown = data;

    if (
      typeof raw === 'object' &&
      raw !== null &&
      'schema' in raw &&
      'format' in raw &&
      typeof raw.schema === 'string' &&
      (raw.format === 'json' || raw.format === 'yaml')
    ) {
      return {
        schema: raw.schema,
        format: raw.format,
      };
    }

    return null;
  } catch {
    return null;
  }
}
