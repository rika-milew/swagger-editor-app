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

      {endpoint.parameters?.length ? (
        endpoint.parameters.map((param) => (
          <Text key={`${param.in}-${param.name}`}>
            {param.in}: {param.name}
          </Text>
        ))
      ) : (
        <Text>{translations.noParameters}</Text>
      )}

      <Text mt={4} fontWeight="bold">
        {translations.requestBody}
      </Text>

      <pre>{JSON.stringify(endpoint.requestBody, null, 2)}</pre>

      <Text mt={4} fontWeight="bold">
        {translations.responses}
      </Text>

      {endpoint.requestBody ? (
        <pre>{JSON.stringify(endpoint.requestBody, null, 2)}</pre>
      ) : (
        <Text>{translations.noRequestBody}</Text>
      )}
    </Box>
  );
}
