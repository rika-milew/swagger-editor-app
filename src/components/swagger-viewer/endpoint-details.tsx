import { Box, Text } from '@chakra-ui/react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { EndpointDetailsTranslations } from './types';

type EndpointDetailsProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function EndpointDetails({
  endpoint,
  translations,
}: EndpointDetailsProps) {
  return (
    <Box mt={4} p={4} bg="gray.700" borderRadius="md">
      <Text fontWeight="bold">{translations.parameters}</Text>

      {endpoint.parameters?.map((param) => (
        <Text key={param.name}>
          {param.in}: {param.name}
        </Text>
      ))}

      <Text mt={4} fontWeight="bold">
        {translations.requestBody}
      </Text>

      <pre>{JSON.stringify(endpoint.requestBody, null, 2)}</pre>

      <Text mt={4} fontWeight="bold">
        {translations.responses}
      </Text>

      <pre>{JSON.stringify(endpoint.responses, null, 2)}</pre>
    </Box>
  );
}
