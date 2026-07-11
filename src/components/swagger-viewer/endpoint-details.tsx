import { Box, Text, Stack, Flex } from '@chakra-ui/react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { EndpointDetailsTranslations } from './types';
import { swagger } from '@/theme/swagger';
import { colors } from '@/theme';
import { TryItOut } from '../try-it-out/try-it-out';

type EndpointDetailsProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function EndpointDetails({
  endpoint,
  translations,
}: EndpointDetailsProps) {
  const hasResponses =
    endpoint.responses && Object.keys(endpoint.responses).length > 0;
  return (
    <Box {...swagger.endpointDetailsContainer}>
      <Stack gap={6}>
        <Box>
          <Text mb={3} fontWeight="semibold" color={colors.foreground}>
            {translations.parameters}
          </Text>

          {endpoint.parameters?.length ? (
            <Stack gap={2}>
              {endpoint.parameters.map((param) => (
                <Flex
                  key={`${param.in}-${param.name}`}
                  {...swagger.endpointParametersContainer}
                >
                  <Text {...swagger.paramTypeText}>{param.in}</Text>

                  <Text {...swagger.paramText}>{param.name}</Text>

                  {param.required && (
                    <Text {...swagger.endpointRequiredText}>
                      {translations.required}
                    </Text>
                  )}
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text color={colors.mutedForeground}>
              {translations.noParameters}
            </Text>
          )}
        </Box>

        <Box>
          <Text {...swagger.endpointSectionTitle}>
            {translations.requestBody}
          </Text>

          {endpoint.requestBody ? (
            <Box as="pre" {...swagger.endpointSectionContent}>
              {JSON.stringify(endpoint.requestBody, null, 2)}
            </Box>
          ) : (
            <Text color={colors.mutedForeground}>
              {translations.noRequestBody}
            </Text>
          )}
        </Box>

        <TryItOut endpoint={endpoint} translations={translations} />

        <Box>
          <Text {...swagger.endpointSectionTitle}>
            {translations.responses}
          </Text>

          {hasResponses ? (
            <Box as="pre" {...swagger.endpointSectionContent}>
              {JSON.stringify(endpoint.responses, null, 2)}
            </Box>
          ) : (
            <Text color={colors.mutedForeground}>
              {translations.noResponses}
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
