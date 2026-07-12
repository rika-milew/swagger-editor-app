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
import { TryItOutParams } from './try-it-out-params';
import { useTryItOut } from '@/hooks/use-try-it-out';
import { TryItOutResponse } from './try-it-out-response/try-it-out-response';
import { CurlDisplay } from './curl-display/curl-display';

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
    curl,
    handleTryItOut,
    handleExecute,
    handleCancel,
    handleCurl,
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
            {isLoading ? translations.executing : translations.execute}
          </Button>

          <Button
            {...buttons.generateCurl}
            disabled={isLoading}
            onClick={() => handleCurl(paramValues, bodyValue)}
          >
            {translations.generateCurl}
          </Button>

          <Button
            {...buttons.cancel}
            onClick={handleCancel}
            disabled={isLoading}
          >
            {translations.cancel}
          </Button>
        </HStack>
      </VStack>
      {response && <TryItOutResponse response={response} />}
      {curl && <CurlDisplay curlCommand={curl} />}
    </Stack>
  );
}
