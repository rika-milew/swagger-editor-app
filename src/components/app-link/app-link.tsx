import NextLink from 'next/link';
import { Link, type LinkProps } from '@chakra-ui/react';

type AppLinkProps = LinkProps & {
  href: string;
  children: React.ReactNode;
};

export default function AppLink({ href, children, ...props }: AppLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      as={isExternal ? undefined : NextLink}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
