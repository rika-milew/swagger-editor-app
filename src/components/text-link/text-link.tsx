'use client';

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

type TextLinkProps = Omit<ChakraLinkProps, 'href'> & {
  href: string;
  color?: string;
};

export function TextLink({
  href,
  children,
  color = colors.brandPrimary,
  ...rest
}: TextLinkProps) {
  return (
    <ChakraLink href={href} {...typography.textLink} color={color} {...rest}>
      {children}
    </ChakraLink>
  );
}
