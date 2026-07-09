import { Box, Text, Stack, Flex } from '@chakra-ui/react';
import type { Endpoint } from '@/utils/parse-swagger';
import type { EndpointDetailsTranslations } from './types';
import { swagger } from '@/theme/swagger';
import { colors } from '@/theme';

type EndpointDetailsProps = {
  endpoint: Endpoint;
  translations: EndpointDetailsTranslations;
};

export function EndpointDetails({
  endpoint,
  translations,
}: EndpointDetailsProps) {
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
                    <Text ml="auto" fontSize="xs" color={colors.destructive}>
                      required
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
          <Text {...swagger.sectionTitle}>{translations.requestBody}</Text>

          {endpoint.requestBody ? (
            <Box as="pre" {...swagger.requestBodyContent}>
              {JSON.stringify(endpoint.requestBody, null, 2)}
            </Box>
          ) : (
            <Text color={colors.mutedForeground}>
              {translations.noRequestBody}
            </Text>
          )}
        </Box>

        <Box>
          <Text {...swagger.sectionTitle}>{translations.responses}</Text>

          <Box as="pre" {...swagger.responsesContent}>
            {JSON.stringify(endpoint.responses, null, 2)}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
