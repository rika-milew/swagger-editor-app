'use client';

import {
  VStack,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { Endpoint } from '@/utils/parse-swagger';
import type {
  EndpointDetailsTranslations,
  ResponseData,
} from '../../types/viewer.types';
import { buttons } from '@/theme';
import { colors } from '@/theme';
import { TryItOutParams } from './try-it-out-params';
import { useSchemaStore } from '@/store/schema-store';
import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import { isResponseData } from '@/types/guards';
import { HTTP_STATUS } from '@/constants/http-status';

type TryItOutProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function TryItOut({ endpoint, translations }: TryItOutProps) {
  const [isTryMode, setIsTryMode] = useState(false);

  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [bodyValue, setBodyValue] = useState('');

  const baseUrl = useSchemaStore((state) => state.baseUrl);
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(
    endpoint.method.toUpperCase(),
  );
  const parameters = endpoint.parameters ?? [];

  const handleTryItOut = () => {
    setIsTryMode(true);
    const example =
      endpoint.requestBody?.content?.['application/json']?.example;
    if (example) {
      setBodyValue(JSON.stringify(example, null, 2));
    }
  };

  const handleExecute = async () => {
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
      const data: unknown = await res.json();

      if (isResponseData(data)) {
        setResponse(data);
      } else {
        setResponse({
          status: 0,
          statusText: 'Error',
          headers: {},
          body: 'Invalid response',
          duration: 0,
        });
      }
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Error',
        headers: {},
        body: error instanceof Error ? error.message : 'Request failed',
        duration: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsTryMode(false);
    setResponse(null);
    setParamValues({});
    setBodyValue('');
  };

  if (!isTryMode) {
    return (
      <VStack align="start">
        <Button {...buttons.tryItOut} onClick={handleTryItOut}>
          {translations.tryItOut}
        </Button>
      </VStack>
    );
  }

  return (
    <Stack gap={6}>
      <TryItOutParams
        parameters={endpoint.parameters ?? []}
        paramValues={paramValues}
        onParamChange={setParamValues}
      />

      {hasBody && (
        <Box>
          <Text mb={2} fontWeight="semibold">
            {translations.addRequestBody}
          </Text>
          <Textarea
            minH="180px"
            p={4}
            placeholder={translations.enterRequestBody}
            value={bodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
          />
        </Box>
      )}

      <VStack align="start">
        <HStack gap={2}>
          <Button
            {...buttons.tryItOut}
            onClick={() => void handleExecute()}
            disabled={isLoading}
          >
            {isLoading ? 'Executing...' : translations.execute}
          </Button>

          <Button {...buttons.generateCurl}>{translations.generateCurl}</Button>

          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>

      {response && (
        <Box
          border="1px solid"
          borderColor={colors.border}
          borderRadius="md"
          p={4}
        >
          <Text fontWeight="bold" mb={4}>
            Response{' '}
            <Text
              as="span"
              color={
                response.status < HTTP_STATUS.BAD_REQUEST
                  ? 'green.400'
                  : 'red.400'
              }
            >
              [{response.status} {response.statusText}]
            </Text>
            <Text as="span" color={colors.mutedForeground} fontSize="sm">
              {' '}
              ⏱ {response.duration}ms
            </Text>
          </Text>

          {Object.keys(response.headers).length > 0 && (
            <Box mb={3}>
              <Text fontWeight="semibold" mb={1} fontSize="sm">
                Headers
              </Text>
              <Box
                as="pre"
                fontSize="sm"
                p={2}
                bg="gray.800"
                borderRadius="md"
                overflow="auto"
              >
                {JSON.stringify(response.headers, null, 2)}
              </Box>
            </Box>
          )}

          <Box>
            <Text fontWeight="semibold" mb={1} fontSize="sm">
              Body
            </Text>
            <Box
              as="pre"
              fontSize="sm"
              p={2}
              bg="gray.800"
              borderRadius="md"
              overflow="auto"
              maxH="400px"
            >
              {response.body}
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
