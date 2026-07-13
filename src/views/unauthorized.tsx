'use client';

import { Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { colors } from '@/theme';
import { useTranslations } from 'next-intl';

export function Unauthorized() {
  const t = useTranslations('Unauthorized');

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container maxW="md">
        <VStack gap="4" textAlign="center">
          <Heading as="h1" fontSize="8xl" color={colors.destructive} mb="8">
            401
          </Heading>
          <Heading as="h2" color={colors.colorWhite} fontSize="2xl">
            {t('title')}
          </Heading>
          <Text color={colors.colorZinc400} fontSize="lg">
            {t('description')}
          </Text>
          <Text color={colors.colorZinc500} fontSize="sm" aria-live="polite">
            {t('redirectMessage')}
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
}
