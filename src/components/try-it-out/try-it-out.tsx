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
import type { EndpointDetailsTranslations } from '../../types/viewer.types';
import { buttons } from '@/theme';
import { colors } from '@/theme';
import { ParametersSection } from './parameters-section';

type TryItOutProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function TryItOut({ endpoint, translations }: TryItOutProps) {
  const [isTryMode, setIsTryMode] = useState(false);

  if (!isTryMode) {
    return (
      <VStack align="start">
        <Button {...buttons.tryItOut} onClick={() => setIsTryMode(true)}>
          {translations.tryItOut}
        </Button>
      </VStack>
    );
  }

  const pathParams = endpoint.parameters?.filter((p) => p.in === 'path') ?? [];

  const queryParams =
    endpoint.parameters?.filter((p) => p.in === 'query') ?? [];

  const headerParams =
    endpoint.parameters?.filter((p) => p.in === 'header') ?? [];

  const cookieParams =
    endpoint.parameters?.filter((p) => p.in === 'cookie') ?? [];

  return (
    <Stack gap={6}>
      <ParametersSection title="Path Parameters" parameters={pathParams} />

      <ParametersSection title="Query Parameters" parameters={queryParams} />

      <ParametersSection title="Header Parameters" parameters={headerParams} />

      <ParametersSection title="Cookie Parameters" parameters={cookieParams} />

      <Box>
        <Text mb={2} fontWeight="semibold">
          {translations.addRequestBody}
        </Text>
        <Textarea
          minH="180px"
          p={4}
          placeholder={translations.enterRequestBody}
        />
      </Box>

      <VStack align="start">
        <HStack gap={2}>
          <Button {...buttons.tryItOut}>{translations.execute}</Button>

          <Button {...buttons.generateCurl}>{translations.generateCurl}</Button>
        </HStack>
      </VStack>

      <Box
        border="1px solid"
        borderColor={colors.border}
        borderRadius="md"
        p={4}
      >
        <Text fontWeight="bold" mb={4}>
          Response
        </Text>

        <Text color={colors.mutedForeground}>
          The server response will appear here after execution.
        </Text>
      </Box>
    </Stack>
  );
}
