'use client';

import { Box, Button, Flex, HStack, Separator } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { buttons } from '@/theme/buttons';
import Link from 'next/link';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import { ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/user-store';
import { signOut } from '@/app/actions/auth';

export default function Header() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = () => {
    clearUser();
    void signOut();
  };

  return (
    <Box as="header" {...container.headerBox}>
      <Flex px="6" py="4" {...container.flexContainer}>
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

          {user ? (
            <>
              <Button size="sm" asChild>
                <Link href={ROUTES.HISTORY}>History</Link>
              </Button>
              <Button size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" {...buttons.signIn} asChild>
                <Link href={ROUTES.SIGN_IN}>Sign In</Link>
              </Button>
              <Button size="sm" {...buttons.signUp} asChild>
                <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
