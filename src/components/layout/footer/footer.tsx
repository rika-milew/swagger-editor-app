'use client';

import { Box, Flex, HStack, Text, Stack } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { container } from '@/theme/container';
import Navigation from './navigation';

export default function Footer() {
  return (
    <Box as="footer" {...container.footerBox}>
      <Flex
        px="6"
        py="6"
        {...container.flexContainer}
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify="space-between"
        gap={{ base: '4', lg: '8' }}
      >
        <HStack gap="3" opacity={0.6}>
          <Box w="24px" h="24px" borderRadius="md" bg={colors.colorWhite} />
          <Text fontSize={{ base: 'md', sm: 'xl' }} color={colors.colorWhite}>
            REACTful
          </Text>
        </HStack>

        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', lg: 'auto' }}
          flex="1"
          justify="space-between"
          align={{ base: 'flex-start', sm: 'center' }}
          gap="3"
        >
          <Box ml={{ base: '0', lg: '16' }}>
            <Navigation />
          </Box>

          <Text
            fontSize={{ base: '10px', sm: 'xs' }}
            color={colors.colorZinc600}
          >
            © 2026 NexusOpen
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
