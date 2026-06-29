import { HStack } from '@chakra-ui/react';
import AppLink from '@/components/layout/AppLink/AppLink';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function Navigation() {
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
        About
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
