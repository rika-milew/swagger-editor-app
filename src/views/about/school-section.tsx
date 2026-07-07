import { Box, Heading, Link, Stack, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { colors } from '@/theme/colors';
import { about } from '@/theme/about';

export default function SchoolSection() {
  return (
    <Stack gap={6}>
      <Text color={colors.colorZinc500} fontSize="xs" textTransform="uppercase">
        RS School
      </Text>

      <Flex {...about.rsFlexContent}>
        <Box p={{ base: 6, md: 8 }}>
          <Stack {...about.rsStackContainer}>
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

            <Link {...about.rsLogoLink}>
              <Image src="/rs-school.png" alt="RS School" {...about.rsImage} />
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}
