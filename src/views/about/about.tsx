import { Box, Stack } from '@chakra-ui/react';
import { about } from '@/theme/about';
import HeroSection from './hero-section';
import StackSection from './stack-section';
import TeamSection from './team-section';
import SchoolSection from './school-section';

export default function AboutView() {
  return (
    <Box {...about.aboutWrapper}>
      <Box {...about.aboutContainer}>
        <Stack gap={{ base: 10, md: 14 }}>
          <HeroSection />
          <StackSection />
          <TeamSection />
          <SchoolSection />
        </Stack>
      </Box>
    </Box>
  );
}
