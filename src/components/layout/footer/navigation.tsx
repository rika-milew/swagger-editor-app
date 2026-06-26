import { Link, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function Navigation() {
  return (
    <HStack gap="6">
      <Link
        as={NextLink}
        href="/about"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        About
      </Link>
      <Link
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        RS SCHOOL
      </Link>
      <Link
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        color={colors.colorZinc600}
        {...typography.navFooter}
        _hover={{
          color: colors.colorWhite,
          textDecoration: 'none',
        }}
      >
        GitHub
      </Link>
    </HStack>
  );
}
