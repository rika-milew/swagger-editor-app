'use client';

import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { colors } from '@/shared/theme/colors';
import { buttons } from '@/shared/theme/buttons';
import Navigation from './navigation';
import Logo from './Logo';

export default function Header() {
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
          <Button
            size="sm"
            variant="ghost"
            color="gray.300"
            _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
          >
            EN / RU
          </Button>

          <Button
            size="sm"
            variant="ghost"
            color="gray.300"
            _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
          >
            Auth
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
