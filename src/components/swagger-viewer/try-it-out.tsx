'use client';

import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { buttons } from '@/theme';

export function TryItOut() {
  const t = useTranslations('SwaggerViewer');
  const [isTryMode, setIsTryMode] = useState(false);

  if (!isTryMode) {
    return (
      <VStack align="start">
        <Button {...buttons.truItOut} onClick={() => setIsTryMode(true)}>
          {t('tryItOut')}
        </Button>
      </VStack>
    );
  }

  return (
    <VStack align="start">
      <HStack gap={2}>
        <Button {...buttons.execute}>{t('execute')}</Button>

        <Button {...buttons.generateCurl}>{t('generateCurl')}</Button>
      </HStack>
    </VStack>
  );
}
