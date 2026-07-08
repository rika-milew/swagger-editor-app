import { Box, Stack } from '@chakra-ui/react';
import { about } from '@/theme/about';
import HeroSection from '../../components/about-sections/hero-section';
import StackSection from '../../components/about-sections/stack-section';
import TeamSection from '../../components/about-sections/team-section';
import SchoolSection from '../../components/about-sections/school-section';

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
