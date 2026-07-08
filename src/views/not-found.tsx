'use client';

import {
  Flex,
  Heading,
  VStack,
  Container,
  Button,
  Text,
} from '@chakra-ui/react';
import { colors, buttons } from '@/theme';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';

export function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <Flex minH="100vh" align="center" justify="center" py={10} px={4}>
      <Container maxW="md">
        <VStack gap="4" textAlign="center">
          <Heading as="h1" fontSize="8xl" color={colors.destructive} mb={8}>
            404
          </Heading>
          <Heading as="h2" color={colors.colorWhite} fontSize="2xl">
            {t('title')}
          </Heading>
          <Text color={colors.colorZinc400} fontSize="lg">
            {t('description')}
          </Text>
          <Link href={ROUTES.HOME}>
            <Button as="span" {...buttons.submit}>
              {t('button')}
            </Button>
          </Link>
        </VStack>
      </Container>
    </Flex>
  );
}
