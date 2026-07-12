'use client';

import { useState, useCallback } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { ResponseData } from '@/types/viewer.types';
import { useSchemaStore } from '@/store/schema-store';
import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import { isResponseData } from '@/types/guards';
import { METHODS_WITH_BODY } from '@/constants/http-status';
import { createCurlCommand } from '@/utils/generate-curl';

type UseExecuteRequestReturn = {
  isLoading: boolean;
  response: ResponseData | null;
  handleExecute: (
    paramValues: Record<string, string>,
    bodyValue: string,
  ) => Promise<void>;
  curl: string;
  handleCurl: (paramValues: Record<string, string>, bodyValue: string) => void;
  resetResponse: () => void;
};

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

type ExecuteFunction = (
  paramValues: Record<string, string>,
  bodyValue: string,
) => Promise<void>;

const DEFAULT_RESPONSE: ResponseData = {
  status: 0,
  statusText: 'Error',
  headers: {},
  body: '',
  duration: 0,
};

const createResponseData = (
  overrides: Partial<ResponseData> = {},
): ResponseData => ({
  ...DEFAULT_RESPONSE,
  ...overrides,
});

const validateRequiredParams = (
  parameters: Endpoint['parameters'],
  paramValues: Record<string, string>,
): string | null => {
  if (!parameters) {
    return null;
  }
  const missingParams = parameters
    .filter(
      ({ required, name }) =>
        required && (!paramValues[name] || paramValues[name].trim() === ''),
    )
    .map(({ name }) => name);

  return missingParams.length > 0
    ? `Missing required parameters: ${missingParams.join(', ')}`
    : null;
};

export function useExecuteRequest(endpoint: Endpoint): UseExecuteRequestReturn {
  const { isLoading, response, setResponse, execute, reset } = useApiCall();
  const [curl, setCurl] = useState('');
  const baseUrl = useSchemaStore((state) => state.baseUrl);

  const handleCurl = useCallback(
    (paramValues: Record<string, string>, bodyValue: string) => {
      setCurl(createCurlCommand(baseUrl, endpoint, paramValues, bodyValue));
    },
    [baseUrl, endpoint],
  );

  const handleExecute = useCallback<ExecuteFunction>(
    async (paramValues, bodyValue): Promise<void> => {
      if (!baseUrl) {
        setResponse(
          createResponseData({
            body: 'Base URL is not set. Please select a server.',
          }),
        );
        return;
      }

      const { path, method, parameters = [] } = endpoint;
      const validationError = validateRequiredParams(parameters, paramValues);

      if (validationError) {
        setResponse(
          createResponseData({
            status: 400,
            statusText: 'Validation Error',
            body: validationError,
          }),
        );
        return;
      }

      const hasBody = METHODS_WITH_BODY.has(method.toUpperCase());

      await execute({
        url: buildUrl(baseUrl, path, parameters, paramValues),
        method: method.toUpperCase(),
        headers: buildHeaders(parameters, paramValues),
        body: hasBody ? bodyValue : undefined,
      });
    },
    [baseUrl, execute, setResponse, endpoint],
  );
  const resetResponse = useCallback(() => {
    reset();
    setCurl('');
  }, [reset]);

  return {
    isLoading,
    response,
    curl,
    handleExecute,
    handleCurl,
    resetResponse,
  };
}

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
