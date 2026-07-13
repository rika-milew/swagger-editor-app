'use client';

import { Box, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

export type ValidationError = {
  path: string;
  message: string;
  line?: number;
};

type EditorErrorsProps = {
  errors: ValidationError[];
};

export const EditorErrors = ({ errors }: EditorErrorsProps) => {
  const t = useTranslations('EditorErrors');

  if (errors.length === 0) {
    return null;
  }

  return (
    <Box
      mt={4}
      p={4}
      bg="#1e1e1e"
      borderRadius="12px"
      maxH="180px"
      overflowY="auto"
      fontFamily="monospace"
      fontSize="13px"
    >
      <Text as="h3" color="red.400" mb={3} fontWeight="bold">
        {t('validationErrors', { count: errors.length })}
      </Text>

      <Box as="ul" p={0} m={0} listStyle="none">
        {errors.map((error, index) => (
          <Box as="li" key={`${error.path}-${String(index)}`} mb={2}>
            {typeof error.line === 'number' && (
              <Text as="span" color="orange.400" mr={2}>
                {t('line', { line: error.line })}:
              </Text>
            )}

            <Text as="span" color="orange.400" mr={2}>
              {error.path}:
            </Text>

            <Text as="span" color="gray.200">
              {error.message}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
