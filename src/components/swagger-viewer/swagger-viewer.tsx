'use client';

import { Box, Text, Heading, Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useSchemaStore } from '@/store/schema-store';
import { parseSchema } from '@/utils/parse-schema';
import { parseSwagger } from '@/utils/parse-swagger';
import { colors } from '@/theme/colors';
import { swagger } from '@/theme/swagger';
import { EndpointList } from './endpoint-list';
import { BaseUrlSelector } from './baseurl-selector/baseurl-selector';

export function SwaggerViewer() {
  const t = useTranslations('SwaggerViewer');
  const detailsTranslations = {
    parameters: t('parameters'),
    requestBody: t('requestBody'),
    responses: t('responses'),
    required: t('required'),
    noParameters: t('noParameters'),
    noRequestBody: t('noRequestBody'),
    noResponses: t('noResponses'),
    tryItOut: t('tryItOut'),
    execute: t('execute'),
    executing: t('executing'),
    cancel: t('cancel'),
    generateCurl: t('generateCurl'),
    addRequestBody: t('addRequestBody'),
    enterRequestBody: t('enterRequestBody'),
  };
  const code = useSchemaStore((state) => state.code);
  const format = useSchemaStore((state) => state.format);

  const schema = useMemo(() => {
    if (!code) {
      return null;
    }

    return parseSchema(code, format);
  }, [code, format]);

  const endpoints = useMemo(() => {
    if (!schema) {
      return [];
    }

    return parseSwagger(schema);
  }, [schema]);

  const servers = schema?.servers ?? [];

  if (!code) {
    return null;
  }

  if (!schema) {
    return <Text color={colors.destructive}>{t('invalidSchema')}</Text>;
  }

  if (!endpoints.length) {
    return <Text>{t('noEndpoints')}</Text>;
  }

  return (
    <Box {...swagger.swaggerContainer}>
      <Box>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading size="lg" color="white">
            {schema.info.title}
          </Heading>

          <Text color={colors.colorZinc500} fontSize="sm">
            v{schema.info.version}
          </Text>
        </Flex>

        <Text color={colors.colorZinc400} mb={8}>
          {t('description')}
        </Text>

        <BaseUrlSelector servers={servers} />

        <Text {...swagger.topText}>{t('endpoints')}</Text>
      </Box>
      <EndpointList endpoints={endpoints} translations={detailsTranslations} />
    </Box>
  );
}
