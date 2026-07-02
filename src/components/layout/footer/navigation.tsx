'use client';

import { HStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import AppLink from '@/components/app-link/app-link';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function Navigation() {
  const t = useTranslations('Navigation');
  return (
    <HStack gap="6">
      <AppLink
        href="/about"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        {t('about')}
      </AppLink>
      <AppLink
        href="https://rs.school/"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        RS SCHOOL
      </AppLink>
      <AppLink
        href="https://github.com"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        GitHub
      </AppLink>
    </HStack>
  );
}
