'use client';

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as NextLink } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { typography, colors } from '@/theme';

type TextLinkProps = Omit<ChakraLinkProps, 'href'> & {
  href: string;
  color?: string;
  children: ReactNode;
};

export function TextLink({
  href,
  children,
  color = colors.brandPrimary,
  ...rest
}: TextLinkProps) {
  return (
    <ChakraLink
      as={NextLink}
      href={href}
      {...typography.textLink}
      color={color}
      {...rest}
    >
      {children}
    </ChakraLink>
  );
}
