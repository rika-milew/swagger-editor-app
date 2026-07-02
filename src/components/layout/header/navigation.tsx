'use client';

import { HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppLink from '@/components/app-link/app-link';
import { colors } from '@/theme/colors';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  return (
    <HStack gap="6">
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
    </HStack>
  );
}
