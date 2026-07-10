import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getHistory, saveToHistory } from './history';

const { mockGetSession, mockCreateServerClient } = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
  mockCreateServerClient: vi.fn(),
}));

vi.mock('@/lib/auth/get-session', () => ({
  getSession: mockGetSession,
}));

vi.mock('@/lib/database/server', () => ({
  createServerClient: mockCreateServerClient,
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

const { revalidatePath } = await import('next/cache');

describe('getHistory', () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockOrder = vi.fn();
  const mockSupabase = {
    from: vi.fn(() => ({
      select: mockSelect,
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateServerClient.mockResolvedValue(mockSupabase);
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ order: mockOrder });
  });

  const mockHistoryRecord = {
    id: 'record-1',
    user_id: 'user-1',
    endpoint_url: '/api/test',
    request_method: 'GET' as const,
    request_size: 100,
    request_timestamp: new Date().toISOString(),
    response_status_code: 200,
    response_size: 50,
    request_duration: 150,
    error_details: null,
    created_at: new Date().toISOString(),
  };

  it('returns error when user is not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const result = await getHistory();

    expect(result).toEqual({ data: null, error: 'Not authenticated' });
  });

  it('returns history records for authenticated user', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockOrder.mockResolvedValue({ data: [mockHistoryRecord], error: null });

    const result = await getHistory();

    expect(result).toEqual({ data: [mockHistoryRecord], error: null });
  });

  it('returns error on Supabase query failure', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockOrder.mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    });

    const result = await getHistory();

    expect(result).toEqual({ data: null, error: 'Failed to load history' });
  });

  it('returns error on unexpected exception', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockCreateServerClient.mockRejectedValue(new Error('Connection refused'));

    const result = await getHistory();

    expect(result).toEqual({ data: null, error: 'Failed to load history' });
  });
});

describe('saveToHistory', () => {
  const mockInsert = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();
  const mockSupabase = {
    from: vi.fn(() => ({
      insert: mockInsert,
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateServerClient.mockResolvedValue(mockSupabase);
    mockInsert.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });
  });

  const validRequest = {
    endpoint_url: '/api/test',
    request_method: 'GET' as const,
    request_size: 100,
    request_timestamp: new Date().toISOString(),
    response_status_code: 200,
    response_size: 50,
    request_duration: 150,
    error_details: null,
  };

  const mockSavedRecord = {
    id: 'record-1',
    user_id: 'user-1',
    ...validRequest,
    created_at: new Date().toISOString(),
  };

  it('returns error when user is not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const result = await saveToHistory(validRequest);

    expect(result).toEqual({ data: null, error: 'Not authenticated' });
  });

  it('saves record and revalidates path on success', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockSingle.mockResolvedValue({ data: mockSavedRecord, error: null });

    const result = await saveToHistory(validRequest);

    expect(mockSupabase.from).toHaveBeenCalledWith('request_history');
    expect(result).toEqual({ data: mockSavedRecord, error: null });
    expect(revalidatePath).toHaveBeenCalledWith('/history');
  });

  it('returns error on Supabase insert failure', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'Insert failed' },
    });

    const result = await saveToHistory(validRequest);

    expect(result).toEqual({ data: null, error: 'Failed to save history' });
  });

  it('returns error on unexpected exception', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockCreateServerClient.mockRejectedValue(new Error('Connection refused'));

    const result = await saveToHistory(validRequest);

    expect(result).toEqual({ data: null, error: 'Failed to save history' });
  });

  it('returns error for invalid request data', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });

    const result = await saveToHistory({
      endpoint_url: '',
      request_method: 'GET',
      request_size: -1,
      response_status_code: 0,
      response_size: -1,
      request_duration: -1,
      error_details: null,
    });

    expect(result).toEqual({ data: null, error: 'Invalid request data' });
  });
});
