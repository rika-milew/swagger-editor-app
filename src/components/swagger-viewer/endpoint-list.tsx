'use client';

import { useState } from 'react';
import { Box, Badge, Flex, Text, VStack } from '@chakra-ui/react';

import type { Endpoint } from '@/utils/parse-swagger';
import type { EndpointDetailsTranslations } from '../../types/viewer.types';

import getColor from './get-swagger-color';
import { EndpointDetails } from './endpoint-details';
import { swagger } from '@/theme/swagger';
import { colors } from '@/theme/colors';

type EndpointListProps = {
  endpoints: Endpoint[];
  translations: EndpointDetailsTranslations;
};

export function EndpointList({ endpoints, translations }: EndpointListProps) {
  const [openedEndpoint, setOpenedEndpoint] = useState<string | null>(null);

  const handleToggle = (endpointId: string) => {
    setOpenedEndpoint((current) =>
      current === endpointId ? null : endpointId,
    );
  };

  return (
    <VStack {...swagger.cardsWrapper}>
      {endpoints.map((endpoint) => {
        const endpointId = `${endpoint.method}-${endpoint.path}`;

        const isOpen = openedEndpoint === endpointId;

        return (
          <Box key={endpointId} width="100%">
            <Flex
              as="button"
              {...swagger.cardContainer}
              cursor="pointer"
              onClick={() => handleToggle(endpointId)}
              role="button"
              aria-expanded={isOpen}
            >
              <Flex align="center" gap={4}>
                <Badge bg={getColor(endpoint.method)} {...swagger.cardBadge}>
                  {endpoint.method.toUpperCase()}
                </Badge>

                <Text {...swagger.cardPathText}>{endpoint.path}</Text>
              </Flex>

              <Text color={colors.colorZinc400} fontSize="sm" textAlign="right">
                {endpoint.summary}
              </Text>
            </Flex>

            {isOpen && (
              <EndpointDetails
                endpoint={endpoint}
                translations={translations}
              />
            )}
          </Box>
        );
      })}
    </VStack>
  );
}
