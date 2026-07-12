'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { colors } from '@/theme';
import { useTranslations } from 'next-intl';

const COPY_FEEDBACK_MS = 2000;

type CurlDisplayProps = {
  curlCommand: string;
};

export function CurlDisplay({ curlCommand }: CurlDisplayProps) {
  const t = useTranslations('SwaggerViewer');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      void 0;
    }
  }, [curlCommand]);

  return (
    <Box
      border="1px solid"
      borderColor={colors.border}
      borderRadius="md"
      p={4}
      mt={4}
    >
      <Text fontWeight="semibold" mb={2}>
        {t('curlTitle')}
      </Text>

      <Box
        as="pre"
        fontSize="sm"
        p={3}
        bg="gray.800"
        borderRadius="md"
        overflow="auto"
        whiteSpace="pre-wrap"
        mb={3}
      >
        {curlCommand}
      </Box>

      <Button size="sm" onClick={() => void handleCopy()}>
        {copied ? t('copied') : t('copyCurl')}
      </Button>
    </Box>
  );
}
