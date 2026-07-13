import NextLink from 'next/link';
import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function Logo() {
  return (
    <Link
      as={NextLink}
      href="/"
      _hover={{ textDecoration: 'none' }}
      _focusVisible={{ boxShadow: 'none' }}
    >
      <HStack gap={3}>
        <Box
          w="24px"
          h="24px"
          borderRadius="md"
          bg={colors.brandPrimary}
          boxShadow={colors.logoGlow}
        />

        <HStack gap={0.5}>
          <Text
            {...typography.logoText}
            color={colors.colorWhite}
            fontSize={{ base: 'md', sm: 'xl' }}
          >
            SWAGGER
          </Text>

          <Text
            {...typography.logoText}
            color={colors.brandPrimary}
            fontSize={{ base: 'md', sm: 'xl' }}
          >
            OPEN
          </Text>
        </HStack>
      </HStack>
    </Link>
  );
}
