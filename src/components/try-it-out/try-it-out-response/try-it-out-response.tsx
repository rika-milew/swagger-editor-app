'use client';

import { Box, Text } from '@chakra-ui/react';
import type { ResponseData } from '@/types/viewer.types';
import { colors } from '@/theme';
import { HTTP_STATUS } from '@/constants/http-status';

type TryItOutResponseProps = {
  response: ResponseData;
};

export function TryItOutResponse({ response }: TryItOutResponseProps) {
  return (
    <Box border="1px solid" borderColor={colors.border} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={4}>
        Response{' '}
        <Text
          as="span"
          color={
            response.status < HTTP_STATUS.BAD_REQUEST ? 'green.400' : 'red.400'
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
          <Text fontWeight="semibold" mb={2} fontSize="sm">
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
        <Text fontWeight="semibold" mb={2} fontSize="sm">
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
  );
}
