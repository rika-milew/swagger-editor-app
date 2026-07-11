'use client';

import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import type { EndpointDetailsTranslations } from './types';
import { buttons } from '@/theme';

type TryItOutProps = {
  translations: EndpointDetailsTranslations;
};

export function TryItOut({ translations }: TryItOutProps) {
  const [isTryMode, setIsTryMode] = useState(false);

  if (!isTryMode) {
    return (
      <VStack align="start">
        <Button {...buttons.truItOut} onClick={() => setIsTryMode(true)}>
          {translations.tryItOut}
        </Button>
      </VStack>
    );
  }

  return (
    <VStack align="start">
      <HStack gap={2}>
        <Button {...buttons.execute}>{translations.execute}</Button>

        <Button {...buttons.generateCurl}>{translations.generateCurl}</Button>
      </HStack>
    </VStack>
  );
}
