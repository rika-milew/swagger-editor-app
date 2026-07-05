'use client';

import { Link } from '@/i18n/navigation';
import { Stack, Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { buttons } from '@/theme/buttons';
import { ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/user-store';
import { signOut } from '@/app/actions/auth';
import type { StackDirection } from '@/types/layout.types';

type HeaderButtonsProps = {
  direction?: StackDirection;
};

export default function HeaderButtons({
  direction = 'row',
}: HeaderButtonsProps) {
  const t = useTranslations('Buttons');

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      clearUser();
    }
  };

  return (
    <Stack direction={direction} gap="4" align="center">
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
    </Stack>
  );
}
