import { HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import AppLink from '@/components/app-link/app-link';
import { colors } from '@/theme/colors';

export default function Navigation() {
  const pathname = usePathname();
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
        Editor
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
        About
      </AppLink>
    </HStack>
  );
}
