'use server';

import { createServerClient } from '@/lib/database/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/get-session';
import { requestSchema } from '@/lib/validation/request-schema';
import type { RequestInput } from '@/lib/validation/request-schema';

export type RequestHistoryRecord = {
  id: string;
  user_id: string;
  endpoint_url: string;
  request_method: string;
  request_size: number;
  request_timestamp: string;
  response_status_code: number | null;
  response_size: number | null;
  request_duration: number | null;
  error_details: string | null;
  created_at: string | null;
};

type ActionResponse<T> = {
  data: T | null;
  error: string | null;
};

type GetHistoryResponse = ActionResponse<RequestHistoryRecord[]>;
type SaveHistoryResponse = ActionResponse<RequestHistoryRecord>;

export async function getHistory(): Promise<GetHistoryResponse> {
  const user = await getSession();

  if (!user) {
    return { data: null, error: 'Not authenticated' };
  }

  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from('request_history')
      .select('*')
      .eq('user_id', user.id)
      .order('request_timestamp', { ascending: false });

    if (error) {
      console.error('Failed to load history:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Failed to load history:', error);
    return { data: null, error: 'Failed to load history' };
  }
}

export async function saveToHistory(
  request: RequestInput,
): Promise<SaveHistoryResponse> {
  const user = await getSession();

  if (!user) {
    return { data: null, error: 'Not authenticated' };
  }

  const result = requestSchema.safeParse(request);
  if (!result.success) {
    console.error('Validation failed:', result.error.issues);
    return { data: null, error: 'Invalid request data' };
  }

  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from('request_history')
      .insert({
        user_id: user.id,
        ...result.data,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save history:', error);
      return { data: null, error: error.message };
    }

    revalidatePath('/history');
    return { data, error: null };
  } catch (error) {
    console.error('Failed to save history:', error);
    return { data: null, error: 'Failed to save request' };
  }
}
