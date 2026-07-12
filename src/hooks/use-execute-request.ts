'use client';

import { useState, useCallback } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { ResponseData } from '@/types/viewer.types';
import { useSchemaStore } from '@/store/schema-store';
import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import { isResponseData } from '@/types/guards';
import { METHODS_WITH_BODY } from '@/constants/http-status';

type UseExecuteRequestReturn = {
  isLoading: boolean;
  response: ResponseData | null;
  handleExecute: (
    paramValues: Record<string, string>,
    bodyValue: string,
  ) => Promise<void>;
  handleGenerateCurl: () => void;
  resetResponse: () => void;
};

export function useExecuteRequest(endpoint: Endpoint): UseExecuteRequestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);

  const baseUrl = useSchemaStore((state) => state.baseUrl);

  const handleExecute = useCallback(
    async (
      paramValues: Record<string, string>,
      bodyValue: string,
    ): Promise<void> => {
      if (!baseUrl) {
        setResponse({
          status: 0,
          statusText: 'Error',
          headers: {},
          body: 'Base URL is not set. Please select a server.',
          duration: 0,
        });
        return;
      }

      const parameters = endpoint.parameters ?? [];
      const hasBody = METHODS_WITH_BODY.has(endpoint.method.toUpperCase());

      const requiredParams = parameters.filter((p) => p.required);
      const missingParams = requiredParams.filter(
        (p) => !paramValues[p.name] || paramValues[p.name].trim() === '',
      );

      if (missingParams.length > 0) {
        const missingNames = missingParams.map((p) => p.name).join(', ');
        setResponse({
          status: 400,
          statusText: 'Validation Error',
          headers: {},
          body: `Missing required parameters: ${missingNames}`,
          duration: 0,
        });
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: buildUrl(baseUrl, endpoint.path, parameters, paramValues),
            method: endpoint.method.toUpperCase(),
            headers: buildHeaders(parameters, paramValues),
            body: hasBody ? bodyValue : undefined,
          }),
        });

        const rawBody = await res.text();
        let body: string;
        let parsedData: unknown = null;
        let duration = 0;

        try {
          parsedData = JSON.parse(rawBody);
          body = JSON.stringify(parsedData, null, 2);

          if (
            parsedData &&
            typeof parsedData === 'object' &&
            'duration' in parsedData
          ) {
            duration =
              typeof parsedData.duration === 'number' ? parsedData.duration : 0;
          }
        } catch {
          body = rawBody || '(empty response)';
        }

        const responseData: ResponseData = {
          status: res.status,
          statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
          headers: Object.fromEntries(res.headers.entries()),
          body,
          duration,
        };

        if (isResponseData(parsedData)) {
          setResponse({
            ...responseData,
            ...parsedData,
            status: res.status,
            statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
            headers: parsedData.headers,
            duration,
          });
        } else {
          setResponse(responseData);
        }
      } catch (error) {
        setResponse({
          status: 0,
          statusText: 'Network Error',
          headers: {},
          body: error instanceof Error ? error.message : 'Request failed',
          duration: 0,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, endpoint.path, endpoint.method, endpoint.parameters],
  );

  const handleGenerateCurl = useCallback((): void => {
    console.log('Generate cURL');
  }, []);

  const resetResponse = useCallback((): void => {
    setResponse(null);
  }, []);

  return {
    isLoading,
    response,
    handleExecute,
    handleGenerateCurl,
    resetResponse,
  };
}
