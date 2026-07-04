'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { colors } from '@/theme';
import { Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { getLocaleFromPath } from '@/utils/get-locale';

const REDIRECT_DELAY = 1500;

export default function UnauthorizedPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${locale}`);
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
            Unauthorized
          </Heading>

          <Text color={colors.colorZinc400} fontSize="lg">
            You are not authorized to view this page.
          </Text>
          <Text color={colors.colorZinc500} fontSize="sm">
            Redirecting to home page...
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
}
