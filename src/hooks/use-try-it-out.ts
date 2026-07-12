'use client';

import { useState } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { ResponseData } from '@/types/viewer.types';
import { useSchemaStore } from '@/store/schema-store';
import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import { isResponseData } from '@/types/guards';
import { METHODS_WITH_BODY } from '@/constants/http-status';
import type { Dispatch, SetStateAction } from 'react';

const handleGenerateCurl = (): void => {
  console.log('Generate cURL');
};

type UseTryItOutReturn = {
  isTryMode: boolean;
  isLoading: boolean;
  response: ResponseData | null;
  paramValues: Record<string, string>;
  bodyValue: string;
  hasBody: boolean;
  parameters: Endpoint['parameters'];
  handleTryItOut: () => void;
  handleExecute: () => Promise<void>;
  handleCancel: () => void;
  handleGenerateCurl: () => void;
  setParamValues: Dispatch<SetStateAction<Record<string, string>>>;
  setBodyValue: Dispatch<SetStateAction<string>>;
};

export function useTryItOut(endpoint: Endpoint): UseTryItOutReturn {
  const [isTryMode, setIsTryMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState<ResponseData | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [bodyValue, setBodyValue] = useState('');

  const baseUrl = useSchemaStore((state) => state.baseUrl);
  const hasBody = METHODS_WITH_BODY.has(endpoint.method.toUpperCase());
  const parameters = endpoint.parameters ?? [];

  const handleTryItOut = (): void => {
    setIsTryMode(true);
    setParamValues({});
    setBodyValue('');
    setResponse(null);

    const example =
      endpoint.requestBody?.content?.['application/json']?.example;
    if (example) {
      setBodyValue(JSON.stringify(example, null, 2));
    }
  };

  const handleExecute = async (): Promise<void> => {
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
  };

  const handleCancel = (): void => {
    setIsTryMode(false);
    setResponse(null);
    setParamValues({});
    setBodyValue('');
  };

  return {
    isTryMode,
    isLoading,
    response,
    paramValues,
    bodyValue,
    hasBody,
    parameters,
    handleTryItOut,
    handleExecute,
    handleCancel,
    handleGenerateCurl,
    setParamValues,
    setBodyValue,
  };
}
