'use client';

import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { colors } from '@/shared/theme/colors';
import Navigation from './navigation';

export default function Footer() {
  return (
    <Box
      as="footer"
      h="80px"
      bg={colors.background}
      borderTop="1px solid"
      borderColor={colors.border}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px="6"
        py="6"
        align="center"
        justify="space-between"
      >
        <HStack gap="3" opacity={0.6}>
          <Box w="24px" h="24px" borderRadius="md" bg={colors.colorWhite} />
          <Text color={colors.colorWhite}>RS SCHOOL</Text>
        </HStack>
        <Navigation />
        <HStack gap="3">
          <Text fontSize="xs" color={colors.colorZinc600}>
            © 2026 NexusOpen
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
