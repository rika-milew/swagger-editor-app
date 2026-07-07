import { SimpleGrid, Stack, Text, Flex, Box, Link } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { about } from '@/theme/about';

const team = [
  {
    initials: 'EM',
    name: 'Erika Milevskaya',
    role: 'Team Lead/Frontend Engineer',
    github: 'https://github.com/rika-milew',
  },
  {
    initials: 'MT',
    name: 'Michael Tavyrin',
    role: 'Frontend Engineer',
    github: 'https://github.com/bssier',
  },
  {
    initials: 'NY',
    name: 'Nina Yeulash',
    role: 'Frontend Engineer',
    github: 'https://github.com/NinaEvlash',
  },
];

export default function TeamSection() {
  return (
    <Stack gap={6}>
      <Text color={colors.colorZinc500} fontSize="xs" textTransform="uppercase">
        Team
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        gap={6}
      >
        {team.map((member) => (
          <Flex key={member.name} {...about.membersContent}>
            <Box p={6}>
              <Stack align="center" gap={5}>
                <Box {...about.avatarBox}>{member.initials}</Box>

                <Box textAlign="center">
                  <Text
                    color={colors.colorWhite}
                    fontWeight="700"
                    fontSize="lg"
                  >
                    {member.name}
                  </Text>

                  <Text
                    color={colors.brandPrimary}
                    fontSize="sm"
                    fontWeight="600"
                  >
                    {member.role}
                  </Text>
                </Box>

                <Link
                  href={member.github}
                  target="_blank"
                  color={colors.mutedForeground}
                  borderColor={colors.border}
                >
                  GitHub
                </Link>
              </Stack>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
