'use client';

import { useTranslations } from 'next-intl';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { buttons } from '@/theme/buttons';
import Link from 'next/link';
import { container } from '@/theme/container';
import Navigation from './navigation';
import Logo from '../logo/logo';
import { ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/user-store';
import { signOut } from '@/app/actions/auth';
import LanguageSwitcher from './language-switcher';

export default function Header() {
  const t = useTranslations('Buttons');

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      clearUser();
    }
  };

  return (
    <Box as="header" {...container.headerBox}>
      <Flex px="6" py="4" {...container.flexContainer}>
        <HStack gap="10">
          <Logo />
          <Navigation />
        </HStack>

        <HStack gap="4">
          <LanguageSwitcher />

          {user ? (
            <>
              <Button size="sm" {...buttons.signIn} asChild>
                <Link href={ROUTES.HISTORY}>{t('history')}</Link>
              </Button>
              <Button
                size="sm"
                {...buttons.signOut}
                onClick={() => void handleSignOut()}
              >
                {t('logout')}
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" {...buttons.signIn} asChild>
                <Link href={ROUTES.SIGN_IN}>{t('login')}</Link>
              </Button>
              <Button size="sm" {...buttons.signUp} asChild>
                <Link href={ROUTES.SIGN_UP}>{t('register')}</Link>
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
