'use server';

import { createServerClient } from '@/lib/database/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/get-session';
import { requestSchema } from '@/lib/validation/request-schema';
import type { RequestInput } from '@/lib/validation/request-schema';
import { ROUTES } from '@/constants/routes';
import type { Tables } from '@/types/database.types';

type RequestHistoryRecord = Tables<'request_history'>;

type ActionResponse<T> = {
  data: T | null;
  error: string | null;
};

type GetHistoryResponse = ActionResponse<RequestHistoryRecord[]>;
type SaveHistoryResponse = ActionResponse<RequestHistoryRecord>;

export async function getHistory(): Promise<GetHistoryResponse> {
  try {
    const user = await getSession();

    if (!user) {
      return { data: null, error: 'Not authenticated' };
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('request_history')
      .select('*')
      .eq('user_id', user.id)
      .order('request_timestamp', { ascending: false });

    if (error) {
      return { data: null, error: 'Failed to load history' };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: 'Failed to load history' };
  }
}

export async function saveToHistory(
  request: RequestInput,
): Promise<SaveHistoryResponse> {
  try {
    const user = await getSession();

    if (!user) {
      return { data: null, error: 'Not authenticated' };
    }

    const result = requestSchema.safeParse(request);

    if (!result.success) {
      return { data: null, error: 'Invalid request data' };
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('request_history')
      .insert({
        user_id: user.id,
        ...result.data,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: 'Failed to save history' };
    }

    revalidatePath(ROUTES.HISTORY);
    return { data, error: null };
  } catch {
    return { data: null, error: 'Failed to save history' };
  }
}

export async function recordHistory(params: {
  targetUrl: string;
  method: RequestInput['request_method'];
  body?: string;
  responseStatus: number | null;
  responseBody: string | null;
  duration: number;
  errorDetails: string | null;
}): Promise<void> {
  const user = await getSession();
  if (!user) {
    return;
  }

  const entry: RequestInput = {
    endpoint_url: params.targetUrl,
    request_method: params.method,
    request_size: new Blob([params.body ?? '']).size,
    response_status_code: params.responseStatus,
    response_size:
      params.responseBody === null
        ? null
        : new Blob([params.responseBody]).size,
    request_duration: params.duration,
    error_details: params.errorDetails,
  };

  try {
    await saveToHistory(entry);
  } catch (error) {
    void error;
  }
}
