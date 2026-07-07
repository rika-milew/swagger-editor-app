import { Box, Heading, Link, Stack, Flex, Text } from '@chakra-ui/react';

import { colors } from '@/theme/colors';

export default function SchoolSection() {
  return (
    <Stack gap={6}>
      <Text
        color={colors.colorZinc500}
        fontSize="xs"
        letterSpacing="0.35em"
        textTransform="uppercase"
      >
        RS School
      </Text>

      <Flex
        bg={colors.panel}
        border="1px solid"
        borderColor={colors.border}
        borderRadius="xl"
      >
        <Box p={{ base: 6, md: 8 }}>
          <Stack
            direction={{
              base: 'column',
              md: 'row',
            }}
            justify="space-between"
            align={{
              base: 'start',
              md: 'center',
            }}
            gap={8}
          >
            <Box maxW="700px">
              <Heading color={colors.colorWhite} size="lg" mb={4}>
                RS School Graduation Project
              </Heading>

              <Text color={colors.mutedForeground} lineHeight="1.8">
                This application was created as the final team project during
                the RS School React course. Our goal was to build a modern
                developer tool with an intuitive interface for working with
                OpenAPI specifications.
              </Text>
            </Box>

            <Link
              href="https://rs.school/"
              target="_blank"
              colorScheme="cyan"
              whiteSpace="nowrap"
            >
              Visit RS School
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}
