'use client';

import { useState, useCallback } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { ResponseData } from '@/types/viewer.types';
import { useSchemaStore } from '@/store/schema-store';
import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import { METHODS_WITH_BODY } from '@/constants/http-status';
import { createCurlCommand } from '@/utils/generate-curl';
import { HTTP_STATUS } from '@/constants/http-status';
import { useApiCall } from './use-api-call';
import { createResponseData } from '@/utils/create-response-data';

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

type ExecuteFunction = (
  paramValues: Record<string, string>,
  bodyValue: string,
) => Promise<void>;

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
            status: HTTP_STATUS.BAD_REQUEST,
            statusText: 'Configuration Error',
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
            status: HTTP_STATUS.NOT_FOUND,
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
