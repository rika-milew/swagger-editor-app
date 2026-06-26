'use client';

import { useState } from 'react';
import { Box, Button, Flex, HStack, Separator } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { buttons } from '@/theme/buttons';
import { container } from '@/theme/container';
import { typography } from '@/theme/typography';
import Navigation from './navigation';
import Logo from '../logo/logo';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Box as="header" {...container.headerBox}>
      <Flex px="6" py="4" {...container.layoutContainer}>
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
