import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApiCall } from './use-api-call';
import { HTTP_STATUS } from '@/constants/http-status';

const MIN_SUCCESS_STATUS = 200;
const MAX_SUCCESS_STATUS = 299;

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

function createFetchResponse(
  status: number,
  statusText: string,
  body: string,
  headers: Record<string, string> = {},
): Response {
  const responseHeaders = new Headers(headers);
  const encoder = new TextEncoder();
  const encodedBody = encoder.encode(body);

  return {
    status,
    statusText,
    ok: status >= MIN_SUCCESS_STATUS && status <= MAX_SUCCESS_STATUS,
    headers: responseHeaders,
    text: vi.fn().mockResolvedValue(body),
    json: vi.fn(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: vi.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    formData: vi.fn(),
    bytes: vi.fn().mockResolvedValue(encodedBody),
  };
}

describe('useApiCall', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useApiCall());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.response).toBeNull();
  });

  it('should set loading state during execution', async () => {
    mockFetch.mockImplementation(
      () =>
        new Promise<Response>((resolve) =>
          setTimeout(
            () =>
              resolve(
                createFetchResponse(
                  HTTP_STATUS.OK,
                  'OK',
                  '{"message":"success"}',
                ),
              ),
            100,
          ),
        ),
    );

    const { result } = renderHook(() => useApiCall());

    let promise: Promise<void>;
    act(() => {
      promise = result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should execute API call and set response on success', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.OK, 'OK', '{"message":"success"}', {
        'content-type': 'application/json',
      }),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    const response = result.current.response;
    expect(response).not.toBeNull();
    if (response) {
      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.statusText).toBe('OK');
      expect(response.body).toBe('{\n  "message": "success"\n}');
      expect(response.headers['content-type']).toBe('application/json');
    }
  });

  it('should handle error response', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(
        HTTP_STATUS.NOT_FOUND,
        'Not Found',
        '{"error":"not found"}',
      ),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/missing',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        status: HTTP_STATUS.NOT_FOUND,
        statusText: 'Not Found',
      }),
    );
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        statusText: 'Network Error',
        body: 'Network failure',
      }),
    );
  });

  it('should handle non-Error network failure', async () => {
    mockFetch.mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        statusText: 'Network Error',
        body: 'Request failed',
      }),
    );
  });

  it('should handle empty response body', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.NO_CONTENT, 'No Content', ''),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'DELETE',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        status: HTTP_STATUS.NO_CONTENT,
        body: '(empty response)',
      }),
    );
  });

  it('should handle invalid JSON response', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.OK, 'OK', 'plain text response'),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        status: HTTP_STATUS.OK,
        body: 'plain text response',
      }),
    );
  });

  it('should handle response with duration in body', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(
        HTTP_STATUS.OK,
        'OK',
        '{"data":"test","duration":150}',
      ),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        duration: 150,
      }),
    );
  });

  it('should handle response with non-number duration', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.OK, 'OK', '{"duration":"not a number"}'),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).toEqual(
      expect.objectContaining({
        duration: 0,
      }),
    );
  });

  it('should send correct request to proxy', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.OK, 'OK', '{}'),
    );

    const { result } = renderHook(() => useApiCall());

    const requestBody = {
      url: 'https://api.example.com/users',
      method: 'POST',
      headers: { Authorization: 'Bearer token' },
      body: '{"name":"test"}',
    };

    await act(async () => {
      await result.current.execute(requestBody);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  });

  it('should manually set response', () => {
    const { result } = renderHook(() => useApiCall());

    const customResponse = {
      status: HTTP_STATUS.OK,
      statusText: 'Custom',
      headers: {},
      body: 'custom body',
      duration: 0,
    };

    act(() => {
      result.current.setResponse(customResponse);
    });

    expect(result.current.response).toEqual(customResponse);
  });

  it('should reset response to null', async () => {
    mockFetch.mockResolvedValue(
      createFetchResponse(HTTP_STATUS.OK, 'OK', '{}'),
    );

    const { result } = renderHook(() => useApiCall());

    await act(async () => {
      await result.current.execute({
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: {},
      });
    });

    expect(result.current.response).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.response).toBeNull();
  });
});
