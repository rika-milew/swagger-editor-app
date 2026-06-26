import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { colors } from '@/theme/colors';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      minH="100dvh"
      bg={colors.background}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md" w="full">
        {children}
      </Container>
    </Box>
  );
}
