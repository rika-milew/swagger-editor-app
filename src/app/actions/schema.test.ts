import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveSchema, getSchema } from './schema';

const { mockGetSession, mockCreateServerClient, mockSafeParse } = vi.hoisted(
  () => ({
    mockGetSession: vi.fn(),
    mockCreateServerClient: vi.fn(),
    mockSafeParse: vi.fn(),
  }),
);

vi.mock('@/lib/auth/get-session', () => ({
  getSession: mockGetSession,
}));

vi.mock('@/lib/database/server', () => ({
  createServerClient: mockCreateServerClient,
}));

vi.mock('@/lib/validation/endpointsSchema', () => ({
  endpointsSchema: {
    safeParse: mockSafeParse,
  },
}));

describe('saveSchema', () => {
  const mockUpsert = vi.fn();
  const mockSupabase = {
    from: vi.fn(() => ({
      upsert: mockUpsert,
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateServerClient.mockResolvedValue(mockSupabase);
  });

  it('should return error if validation fails', async () => {
    mockSafeParse.mockReturnValue({
      success: false,
      error: { issues: [{ message: 'Invalid' }] },
    });

    const result = await saveSchema({ schema: 'test', format: 'yaml' });

    expect(result).toEqual({ error: 'Invalid schema data' });
  });

  it('should return error if user is not authenticated', async () => {
    mockSafeParse.mockReturnValue({
      success: true,
      data: { schema: 'test', format: 'yaml' },
    });
    mockGetSession.mockResolvedValue(null);

    const result = await saveSchema({ schema: 'test', format: 'yaml' });

    expect(result).toEqual({ error: 'You must be signed in to save' });
  });

  it('should save schema successfully', async () => {
    mockSafeParse.mockReturnValue({
      success: true,
      data: { schema: 'code', format: 'yaml' },
    });
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockUpsert.mockResolvedValue({ error: null });

    const result = await saveSchema({
      schema: 'code',
      format: 'yaml',
    });

    expect(mockSupabase.from).toHaveBeenCalledWith('user_schemas');
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        schema: 'code',
        format: 'yaml',
      }),
      { onConflict: 'user_id' },
    );
    expect(result).toEqual({ success: true });
  });

  it('should handle database error', async () => {
    mockSafeParse.mockReturnValue({
      success: true,
      data: { schema: 'test', format: 'json' },
    });
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockUpsert.mockResolvedValue({ error: new Error('Database error') });

    const result = await saveSchema({ schema: 'test', format: 'json' });

    expect(result).toEqual({ error: 'Failed to save schema' });
  });

  it('should handle unexpected error', async () => {
    mockSafeParse.mockReturnValue({
      success: true,
      data: { schema: 'test', format: 'yaml' },
    });
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockCreateServerClient.mockRejectedValue(new Error('Connection failed'));

    const result = await saveSchema({ schema: 'test', format: 'yaml' });

    expect(result).toEqual({ error: 'Failed to save schema' });
  });
});

describe('getSchema', () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockMaybeSingle = vi.fn();
  const mockSupabase = {
    from: vi.fn(() => ({
      select: mockSelect,
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateServerClient.mockResolvedValue(mockSupabase);
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ maybeSingle: mockMaybeSingle });
  });

  it('should return null if user is not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const result = await getSchema();

    expect(result).toBeNull();
  });

  it('should return schema data when valid', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockMaybeSingle.mockResolvedValue({
      data: { schema: 'code', format: 'yaml' },
      error: null,
    });

    const result = await getSchema();

    expect(result).toEqual({ schema: 'code', format: 'yaml' });
  });

  it('should return null if no schema found', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockMaybeSingle.mockResolvedValue({ data: null, error: null });

    const result = await getSchema();

    expect(result).toBeNull();
  });

  it('should return null on database error', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: new Error('Database error'),
    });

    const result = await getSchema();

    expect(result).toBeNull();
  });

  it('should return null if data format is invalid', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockMaybeSingle.mockResolvedValue({
      data: { schema: 123, format: 'invalid' },
      error: null,
    });

    const result = await getSchema();

    expect(result).toBeNull();
  });

  it('should return null if data is missing fields', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockMaybeSingle.mockResolvedValue({
      data: { schema: 'test' },
      error: null,
    });

    const result = await getSchema();

    expect(result).toBeNull();
  });

  it('should handle unexpected error', async () => {
    mockGetSession.mockResolvedValue({ id: 'user-1' });
    mockCreateServerClient.mockRejectedValue(new Error('Connection failed'));

    const result = await getSchema();

    expect(result).toBeNull();
  });
});
