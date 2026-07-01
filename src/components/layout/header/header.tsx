'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Box, Button, Flex, HStack, Separator, Text } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { buttons } from '@/theme/buttons';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import type { Locale } from '@/i18n/routing';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'ru' : 'en';

    const cleanPath = pathname.replace(/^\/(en|ru)/, '');

    router.replace(`/${newLocale}${cleanPath}`);
  };

  return (
    <Box as="header" {...container.headerBox}>
      <Flex px="6" py="4" {...container.flexContainer}>
        <HStack gap="10">
          <Logo />
          <Navigation />
        </HStack>

        <HStack gap="4">
          <Button
            onClick={switchLanguage}
            size="sm"
            {...buttons.languageSwitcher}
          >
            <Text
              as="span"
              color={
                locale === 'en' ? colors.brandPrimary : colors.colorZinc600
              }
            >
              EN
            </Text>
            {' / '}
            <Text
              as="span"
              color={
                locale === 'ru' ? colors.brandPrimary : colors.colorZinc600
              }
            >
              RU
            </Text>
          </Button>

          <Separator
            orientation="vertical"
            height="20px"
            borderColor={colors.border}
          />

          <Button size="sm" {...buttons.signIn}>
            Sign In
          </Button>

          <Button size="sm" {...buttons.signUp}>
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
