'use client';

import { Box, Text, Badge, VStack, Heading, Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { mockSwagger } from './mock-swagger';
import { parseSwagger } from '@/utils/parse-swagger';
import getColor from './get-swagger-color';
import { colors } from '@/theme/colors';
import { swagger } from '@/theme/swagger';

export function SwaggerViewer() {
  const t = useTranslations('SwaggerViewer');
  const endpoints = parseSwagger(mockSwagger);

  if (!endpoints.length) {
    return <Text>No endpoints found</Text>;
  }

  return (
    <Box {...swagger.swaggerContainer}>
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

      <VStack gap={3} align="stretch">
        {endpoints.map((ep) => (
          <Flex key={`${ep.method}-${ep.path}`} {...swagger.cardContainer}>
            <Flex align="center" gap={4}>
              <Badge bg={getColor(ep.method)} {...swagger.cardBadge}>
                {ep.method.toUpperCase()}
              </Badge>

              <Text {...swagger.cardPathText}>{ep.path}</Text>
            </Flex>

            <Text color={colors.colorZinc400} fontSize="sm" textAlign="right">
              {ep.summary}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
