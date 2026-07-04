'use client';

import { Box, Flex, HStack } from '@chakra-ui/react';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import LanguageSwitcher from './language-switcher';
import HeaderButtons from './header-buttons';
import MobileMenu from './mobile-menu';
import { useScroll } from '@/hooks/use-scroll';

export default function Header() {
  const scrolled = useScroll();

  return (
    <Box as="header" {...container.headerBox} data-scrolled={scrolled}>
      <Flex {...container.headerContent} data-scrolled={scrolled}>
        <HStack gap="10">
          <Logo />
          <Box display={{ base: 'none', lg: 'block' }}>
            <Navigation />
          </Box>
        </HStack>

        <HStack gap="4">
          <LanguageSwitcher />
          <Box display={{ base: 'none', lg: 'block' }}>
            <HeaderButtons />
          </Box>
          <MobileMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
