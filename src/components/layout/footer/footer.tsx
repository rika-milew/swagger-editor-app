'use client';

import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { container } from '@/theme/container';
import Navigation from './navigation';

export default function Footer() {
  return (
    <Box as="footer" {...container.footerBox}>
      <Flex px="6" py="6" {...container.flexContainer}>
        <HStack gap="3" opacity={0.6}>
          <Box w="24px" h="24px" borderRadius="md" bg={colors.colorWhite} />
          <Text color={colors.colorWhite}>REACTful</Text>
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
