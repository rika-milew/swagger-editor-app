'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { colors, buttons } from '@/theme';
import { useTranslations } from 'next-intl';
import { swagger } from '@/theme/swagger';

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
        whiteSpace="pre-wrap"
        {...swagger.endpointSectionContent}
        mb={4}
      >
        {curlCommand}
      </Box>

      <Button {...buttons.copyCurl} onClick={() => void handleCopy()}>
        {copied ? t('copied') : t('copyCurl')}
      </Button>
    </Box>
  );
}
