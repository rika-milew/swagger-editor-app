'use client';

import { useState } from 'react';
import { Box, Button, Flex, HStack, Separator } from '@chakra-ui/react';
import { colors } from '@/shared/theme/colors';
import { buttons } from '@/shared/theme/buttons';
import { typography } from '@/shared/theme/typography';
import Navigation from './navigation';
import Logo from './Logo';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg={colors.background}
      borderBottom="1px solid"
      borderColor={colors.border}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px="6"
        py="4"
        align="center"
        justify="space-between"
      >
        <HStack gap="10">
          <Logo />
          <Navigation />
        </HStack>

        <HStack gap="4">
          <Button size="sm" {...buttons.languageSwitcher}>
            EN / RU
          </Button>

          <Separator
            orientation="vertical"
            height="20px"
            borderColor={colors.border}
          />

          <Button
            size="sm"
            {...buttons.auth}
            {...typography.authButton}
            onClick={() => setIsAuth((prev) => !prev)}
          >
            Auth: {isAuth ? 'On' : 'Off'}
          </Button>

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
