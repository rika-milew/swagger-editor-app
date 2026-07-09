'use client';

import type { Key } from 'react';
import { Box, Text } from '@chakra-ui/react';

type ValidationError = {
  path: string;
  message: string;
};

type EditorErrorsProps = {
  errors: ValidationError[];
};

export const EditorErrors = ({ errors }: EditorErrorsProps) => {
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
      <Text color="red.400" mb={2} fontWeight="bold">
        Validation Errors ({errors.length})
      </Text>
      <Box as="ul" p={0} m={0} style={{ listStyleType: 'none' }}>
        {errors.map((error: ValidationError, index: Key) => (
          <Box as="li" key={index} mb={1.5} color="gray.300">
            <Text as="span" color="orange.400" mr={2}>
              [{error.path}]
            </Text>
            {error.message}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
