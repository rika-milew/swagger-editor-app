import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExecuteRequest, createResponseData } from './use-execute-request';
import { useSchemaStore } from '@/store/schema-store';
import { useApiCall } from './use-api-call';
import type { Endpoint } from '@/utils/parse-swagger';
import { HTTP_STATUS } from '@/constants/http-status';

vi.mock('@/store/schema-store', () => ({
  useSchemaStore: vi.fn(),
}));

vi.mock('./use-api-call', () => ({
  useApiCall: vi.fn(),
}));

vi.mock('@/utils/try-it-out-utils', () => ({
  buildUrl: vi.fn(),
  buildHeaders: vi.fn(),
}));

vi.mock('@/utils/generate-curl', () => ({
  createCurlCommand: vi.fn(),
}));

function createEndpoint(overrides: Partial<Endpoint> = {}): Endpoint {
  return {
    path: '/test',
    method: 'get',
    parameters: [],
    ...overrides,
  };
}

describe('createResponseData', () => {
  it('should create default response data', () => {
    const response = createResponseData();
    expect(response.status).toBe(HTTP_STATUS.NETWORK_ERROR);
    expect(response.statusText).toBe('Error');
    expect(response.headers).toEqual({});
    expect(response.body).toBe('');
    expect(response.duration).toBe(0);
  });

  it('should override default values', () => {
    const response = createResponseData({
      status: HTTP_STATUS.OK,
      statusText: 'OK',
      body: 'success',
    });
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.statusText).toBe('OK');
    expect(response.body).toBe('success');
  });
});

describe('useExecuteRequest', () => {
  const mockExecute = vi.fn();
  const mockSetResponse = vi.fn();
  const mockReset = vi.fn();
  const mockBaseUrl = 'https://api.example.com';

  beforeEach(async () => {
    vi.clearAllMocks();

    vi.mocked(useSchemaStore).mockReturnValue(mockBaseUrl);
    vi.mocked(useApiCall).mockReturnValue({
      isLoading: false,
      response: null,
      setResponse: mockSetResponse,
      execute: mockExecute,
      reset: mockReset,
    });

    const tryItOutUtils = await import('@/utils/try-it-out-utils');
    vi.mocked(tryItOutUtils.buildUrl).mockImplementation(
      (baseUrl: string, path: string) => `${baseUrl}${path}`,
    );
    vi.mocked(tryItOutUtils.buildHeaders).mockReturnValue({});

    const generateCurl = await import('@/utils/generate-curl');
    vi.mocked(generateCurl.createCurlCommand).mockImplementation(
      (baseUrl: string, endpoint: Endpoint) =>
        `curl -X ${endpoint.method.toUpperCase()} ${baseUrl}${endpoint.path}`,
    );
  });

  it('should return initial state', () => {
    const endpoint = createEndpoint();
    const { result } = renderHook(() => useExecuteRequest(endpoint));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.response).toBeNull();
    expect(result.current.curl).toBe('');
  });

  it('should set error if baseUrl is missing', async () => {
    vi.mocked(useSchemaStore).mockReturnValue('');

    const endpoint = createEndpoint();
    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({}, '');
    });

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HTTP_STATUS.BAD_REQUEST,
        statusText: 'Configuration Error',
        body: 'Base URL is not set. Please select a server.',
      }),
    );
  });

  it('should validate required parameters', async () => {
    const endpoint = createEndpoint({
      parameters: [
        { name: 'id', in: 'path', required: true },
        { name: 'name', in: 'query', required: true },
      ],
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({}, '');
    });

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HTTP_STATUS.NOT_FOUND,
        statusText: 'Validation Error',
        body: 'Missing required parameters: id, name',
      }),
    );
  });

  it('should not validate if all required parameters are provided', async () => {
    const endpoint = createEndpoint({
      parameters: [{ name: 'id', in: 'path', required: true }],
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({ id: '123' }, '');
    });

    expect(mockExecute).toHaveBeenCalled();
  });

  it('should skip validation for parameters with empty values', async () => {
    const endpoint = createEndpoint({
      parameters: [{ name: 'id', in: 'path', required: true }],
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({ id: '   ' }, '');
    });

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        body: 'Missing required parameters: id',
      }),
    );
  });

  it('should execute API call with correct parameters', async () => {
    const endpoint = createEndpoint({
      path: '/users/{id}',
      method: 'post',
      parameters: [{ name: 'id', in: 'path', required: true }],
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({ id: '123' }, '{"name":"test"}');
    });

    expect(mockExecute).toHaveBeenCalledWith({
      url: 'https://api.example.com/users/{id}',
      method: 'POST',
      headers: {},
      body: '{"name":"test"}',
    });
  });

  it('should not include body for get requests', async () => {
    const endpoint = createEndpoint({
      method: 'get',
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({}, 'should not be sent');
    });

    expect(mockExecute).toHaveBeenCalledWith(
      expect.objectContaining({
        body: undefined,
      }),
    );
  });

  it('should generate curl command', () => {
    const endpoint = createEndpoint({
      path: '/users',
      method: 'get',
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    act(() => {
      result.current.handleCurl({}, '');
    });

    expect(result.current.curl).toBe(
      'curl -X GET https://api.example.com/users',
    );
  });

  it('should handle endpoint without parameters', async () => {
    const endpoint = createEndpoint({
      parameters: undefined,
    });

    const { result } = renderHook(() => useExecuteRequest(endpoint));

    await act(async () => {
      await result.current.handleExecute({}, '');
    });

    expect(mockExecute).toHaveBeenCalled();
  });

  it('should reset response and curl', () => {
    const endpoint = createEndpoint();
    const { result } = renderHook(() => useExecuteRequest(endpoint));

    act(() => {
      result.current.handleCurl({}, '');
    });

    expect(result.current.curl).not.toBe('');

    act(() => {
      result.current.resetResponse();
    });

    expect(mockReset).toHaveBeenCalled();
    expect(result.current.curl).toBe('');
  });
});
