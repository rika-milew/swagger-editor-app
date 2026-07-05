'use client';

import { Stack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppLink from '@/components/app-link/app-link';
import { colors } from '@/theme/colors';
import type { StackDirection } from '@/types/layout.types';

type NavigationProps = {
  direction?: StackDirection;
};

export default function Navigation({ direction = 'row' }: NavigationProps) {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  return (
    <Stack as="nav" gap="6" direction={direction} align="center">
      <AppLink
        href="/"
        color={pathname === '/' ? colors.nav.active : colors.nav.inactive}
        _hover={
          pathname === '/'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        {t('home')}
      </AppLink>

      <AppLink
        href="/about"
        color={pathname === '/about' ? colors.nav.active : colors.nav.inactive}
        _hover={
          pathname === '/about'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        {t('about')}
      </AppLink>
    </Stack>
  );
}
