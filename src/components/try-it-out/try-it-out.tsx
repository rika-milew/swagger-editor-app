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
import type { Endpoint } from '@/utils/parse-swagger';
import type { EndpointDetailsTranslations } from '@/types/viewer.types';
import { buttons } from '@/theme';
import { colors } from '@/theme';
import { TryItOutParams } from './try-it-out-params';
import { HTTP_STATUS } from '@/constants/http-status';
import { useTryItOut } from '@/hooks/use-try-it-out';

type TryItOutProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function TryItOut({ endpoint, translations }: TryItOutProps) {
  const {
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
  } = useTryItOut(endpoint);

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
        parameters={parameters ?? []}
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

          <Button
            {...buttons.generateCurl}
            disabled={isLoading}
            onClick={handleGenerateCurl}
          >
            {translations.generateCurl}
          </Button>

          <Button
            {...buttons.cancel}
            onClick={handleCancel}
            disabled={isLoading}
          >
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
              mr={2}
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
