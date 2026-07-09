import { Box, Text, Heading, Flex } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { mockSwagger } from './mock-swagger';
import { parseSwagger } from '@/utils/parse-swagger';
import { colors } from '@/theme/colors';
import { swagger } from '@/theme/swagger';
import { EndpointList } from './endpoint-list';

export async function SwaggerViewer() {
  const t = await getTranslations('SwaggerViewer');
  const detailsTranslations = {
    parameters: t('parameters'),
    requestBody: t('requestBody'),
    responses: t('responses'),
    noParameters: t('noParameters'),
    noRequestBody: t('noRequestBody'),
  };
  const endpoints = parseSwagger(mockSwagger);

  if (!endpoints.length) {
    return <Text>{t('noEndpoints')}</Text>;
  }

  return (
    <Box {...swagger.swaggerContainer}>
      <Box>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading size="lg" color="white">
            {mockSwagger.info.title}
          </Heading>

          <Text color={colors.colorZinc500} fontSize="sm">
            v{mockSwagger.info.version}
          </Text>
        </Flex>

        <Text color={colors.colorZinc400} mb={8}>
          {t('description')}
        </Text>

        <Text {...swagger.topText}>{t('endpoints')}</Text>
      </Box>
      <EndpointList endpoints={endpoints} translations={detailsTranslations} />
    </Box>
  );
}
