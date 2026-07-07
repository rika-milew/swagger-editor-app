import { Box, Stack } from '@chakra-ui/react';

import { colors } from '@/theme/colors';
import HeroSection from './hero-section';
import StackSection from './stack-section';
import TeamSection from './team-section';
import SchoolSection from './school-section';

export default function AboutView() {
  return (
    <Box
      bg={colors.background}
      w="100%"
      minH="100%"
      display="flex"
      justifyContent="center"
    >
      <Box maxW="1100px" py={{ base: 10, md: 16 }} px={{ base: 5, md: 8 }}>
        <Stack gap={{ base: 14, md: 20 }}>
          <HeroSection />
          <StackSection />
          <TeamSection />
          <SchoolSection />
        </Stack>
      </Box>
    </Box>
  );
}
