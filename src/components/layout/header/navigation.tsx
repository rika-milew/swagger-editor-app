import { Link, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { colors } from '@/shared/theme/colors';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <HStack gap="6">
      <Link
        as={NextLink}
        href="/"
        color={pathname === '/' ? colors.nav.active : colors.nav.inactive}
        _hover={
          pathname === '/'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        Editor
      </Link>

      <Link
        as={NextLink}
        href="/about"
        color={pathname === '/about' ? colors.nav.active : colors.nav.inactive}
        _hover={
          pathname === '/about'
            ? undefined
            : { color: colors.colorWhite, textDecoration: 'none' }
        }
      >
        About
      </Link>
    </HStack>
  );
}
