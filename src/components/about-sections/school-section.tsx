import { getTranslations } from 'next-intl/server';
import { Box, Heading, Link, Stack, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { colors } from '@/theme/colors';
import { about } from '@/theme/about';

export default async function SchoolSection() {
  const t = await getTranslations('AboutPage');
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
                {t('schoolTitle')}
              </Heading>

              <Text color={colors.mutedForeground} lineHeight="1.8">
                {t.rich('schoolDescr', {
                  course: (chunks) => (
                    <Link {...about.rsCourseLink}>{chunks}</Link>
                  ),
                })}
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
