import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      flex="1"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="container.md" w="full">
        {children}
      </Container>
    </Box>
  );
}
