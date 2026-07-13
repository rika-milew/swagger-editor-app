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
  const currentPath = pathname.replace(/^\/(en|ru)/, '') || '/';
  const t = useTranslations('Navigation');
  return (
    <Stack
      as="nav"
      aria-label="Header navigation"
      gap="6"
      direction={direction}
      align="center"
    >
      <AppLink
        href="/"
        color={currentPath === '/' ? colors.nav.active : colors.nav.inactive}
        _hover={
          currentPath === '/'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        {t('home')}
      </AppLink>

      <AppLink
        href="/about"
        color={
          currentPath === '/about' ? colors.nav.active : colors.nav.inactive
        }
        _hover={
          currentPath === '/about'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        {t('about')}
      </AppLink>
    </Stack>
  );
}
