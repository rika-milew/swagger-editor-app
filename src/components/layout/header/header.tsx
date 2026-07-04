'use client';

import { Box, Flex, HStack } from '@chakra-ui/react';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import LanguageSwitcher from './language-switcher';
import HeaderButtons from './header-buttons';
import MobileMenu from './mobile-menu';

export default function Header() {
  return (
    <Box as="header" {...container.headerBox}>
      <Flex {...container.headerContent}>
        <HStack gap="10">
          <Logo />
          <Box display={{ base: 'none', md: 'block' }}>
            <Navigation />
          </Box>
        </HStack>

        <HStack gap="4">
          <LanguageSwitcher />
          <Box display={{ base: 'none', md: 'block' }}>
            <HeaderButtons />
          </Box>
          <MobileMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
