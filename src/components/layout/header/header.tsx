'use client';

import { useTranslations } from 'next-intl';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { buttons } from '@/theme/buttons';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import LanguageSwitcher from './language-switcher';

export default function Header() {
  const t = useTranslations('Buttons');

  return (
    <Box as="header" {...container.headerBox}>
      <Flex px="6" py="4" {...container.flexContainer}>
        <HStack gap="10">
          <Logo />
          <Navigation />
        </HStack>

        <HStack gap="4">
          <LanguageSwitcher />

          <Button size="sm" {...buttons.signIn}>
            {t('login')}
          </Button>

          <Button size="sm" {...buttons.signUp}>
            {t('register')}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
