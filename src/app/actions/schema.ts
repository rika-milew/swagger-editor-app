'use server';

import { createServerClient } from '@/lib/database/server';
import { getSession } from '@/lib/auth/get-session';
import { saveSchemaSchema } from '@/lib/validation/schema-schemas';
import type { z } from 'zod';

type SchemaResult = {
  error?: string;
  success?: boolean;
};

type LatestSchema = {
  schema: string;
  format: 'json' | 'yaml';
} | null;

export async function saveSchema(
  data: z.infer<typeof saveSchemaSchema>,
): Promise<SchemaResult> {
  const result = saveSchemaSchema.safeParse(data);
  if (!result.success) {
    return { error: 'schema.saveError' };
  }

  const user = await getSession();
  if (!user) {
    return { error: 'schema.unauthorized' };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.from('user_schemas').upsert(
      {
        user_id: user.id,
        schema: data.schema,
        format: data.format,
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
  } catch (error) {
    console.error('Save schema failed:', error);
    return { error: 'schema.saveError' };
  }
}

export async function getLatestSchema(): Promise<LatestSchema> {
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
  } catch (error) {
    console.error('Get latest schema failed:', error);
    return null;
  }
}
