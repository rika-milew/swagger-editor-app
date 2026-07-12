'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { colors, buttons } from '@/theme';
import { useTranslations } from 'next-intl';
import { swagger } from '@/theme/swagger';

export const COPY_FEEDBACK_MS = 2000;

type CurlDisplayProps = {
  curlCommand: string;
};

export function CurlDisplay({ curlCommand }: CurlDisplayProps) {
  const t = useTranslations('SwaggerViewer');
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      timeoutRef.current = setTimeout(setCopied, COPY_FEEDBACK_MS, false);
    } catch {
      void 0;
    }
  }, [curlCommand]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
