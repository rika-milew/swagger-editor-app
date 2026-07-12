import { useState, useCallback } from 'react';
import { isResponseData } from '@/types/guards';
import type { ResponseData } from '@/types/viewer.types';
import { createResponseData } from '@/utils/create-response-data';

type ProxyRequestBody = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

type UseApiCallReturn = {
  isLoading: boolean;
  response: ResponseData | null;
  setResponse: (data: ResponseData) => void;
  execute: (body: ProxyRequestBody) => Promise<void>;
  reset: () => void;
};

export function useApiCall(): UseApiCallReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);

  const execute = useCallback(async (body: ProxyRequestBody) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const rawBody = await res.text();
      let responseBody: string;
      let parsedData: unknown = null;
      let duration = 0;

      try {
        parsedData = JSON.parse(rawBody);
        responseBody = JSON.stringify(parsedData, null, 2);

        if (
          parsedData &&
          typeof parsedData === 'object' &&
          'duration' in parsedData
        ) {
          duration =
            typeof parsedData.duration === 'number' ? parsedData.duration : 0;
        }
      } catch {
        responseBody = rawBody || '(empty response)';
      }

      const responseData: ResponseData = {
        status: res.status,
        statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
        headers: Object.fromEntries(res.headers.entries()),
        body: responseBody,
        duration,
      };

      if (isResponseData(parsedData)) {
        setResponse({ ...parsedData, duration });
      } else {
        setResponse(responseData);
      }
    } catch (error) {
      setResponse(
        createResponseData({
          statusText: 'Network Error',
          body: error instanceof Error ? error.message : 'Request failed',
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => setResponse(null), []);

  return { isLoading, response, setResponse, execute, reset };
}
