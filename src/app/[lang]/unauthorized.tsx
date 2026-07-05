'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { colors } from '@/theme';
import { Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { getLocaleFromPath } from '@/utils/get-locale';
import { ROUTES } from '@/constants/routes';

const REDIRECT_DELAY = 1500;

const translations: Record<
  string,
  {
    title: string;
    description: string;
    redirectMessage: string;
  }
> = {
  en: {
    title: 'Unauthorized',
    description: "You're not authorized to access this page.",
    redirectMessage: 'Redirecting to home page...',
  },
  ru: {
    title: 'Нет доступа',
    description: 'У вас нет прав для доступа к этой странице.',
    redirectMessage: 'Перенаправление на главную...',
  },
};

export default function UnauthorizedPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = translations[locale] ?? translations.en;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${locale}${ROUTES.HOME}`);
    }, REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [router, locale]);

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container maxW="md">
        <VStack gap="4" textAlign="center">
          <Heading as="h1" fontSize="8xl" color={colors.destructive} mb="8">
            401
          </Heading>
          <Heading as="h2" color={colors.colorWhite} fontSize="2xl">
            {t.title}
          </Heading>
          <Text color={colors.colorZinc400} fontSize="lg">
            {t.description}
          </Text>
          <Text color={colors.colorZinc500} fontSize="sm" aria-live="polite">
            {t.redirectMessage}
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
}
