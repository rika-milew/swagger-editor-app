'use client';

import { useState, useCallback } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { ResponseData } from '@/types/viewer.types';
import { METHODS_WITH_BODY } from '@/constants/http-status';
import type { Dispatch, SetStateAction } from 'react';
import { useExecuteRequest } from './use-execute-request';

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
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [bodyValue, setBodyValue] = useState('');

  const hasBody = METHODS_WITH_BODY.has(endpoint.method.toUpperCase());
  const parameters = endpoint.parameters ?? [];

  const {
    isLoading,
    response,
    handleExecute: executeRequest,
    handleGenerateCurl,
    resetResponse,
  } = useExecuteRequest(endpoint);

  const handleTryItOut = useCallback((): void => {
    setIsTryMode(true);
    resetResponse();
    setParamValues({});
    setBodyValue('');

    const example =
      endpoint.requestBody?.content?.['application/json']?.example;
    if (example) {
      setBodyValue(JSON.stringify(example, null, 2));
    }
  }, [endpoint.requestBody?.content, resetResponse]);

  const handleExecute = useCallback(async (): Promise<void> => {
    await executeRequest(paramValues, bodyValue);
  }, [executeRequest, paramValues, bodyValue]);

  const handleCancel = useCallback((): void => {
    setIsTryMode(false);
    resetResponse();
    setParamValues({});
    setBodyValue('');
  }, [resetResponse]);

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
