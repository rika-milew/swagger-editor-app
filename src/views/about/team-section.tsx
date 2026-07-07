import {
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Box,
  Avatar,
  Link,
} from '@chakra-ui/react';
import { colors } from '@/theme/colors';

const team = [
  {
    initials: 'AV',
    name: 'Alexei Volkov',
    role: 'Team Lead / Architect',
    github: 'https://github.com/',
  },
  {
    initials: 'ER',
    name: 'Elena Richter',
    role: 'Frontend Engineer',
    github: 'https://github.com/',
  },
  {
    initials: 'MT',
    name: 'Marcus Thorne',
    role: 'Backend Engineer',
    github: 'https://github.com/',
  },
];

export default function TeamSection() {
  return (
    <Stack gap={6}>
      <Text
        color={colors.colorZinc500}
        fontSize="xs"
        letterSpacing="0.35em"
        textTransform="uppercase"
      >
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
          <Flex
            direction="column"
            align="start"
            key={member.name}
            bg={colors.panel}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            transition="all .25s"
            _hover={{
              transform: 'translateY(-6px)',
              borderColor: colors.brandPrimary,
            }}
          >
            <Box p={6}>
              <Stack align="start" gap={5}>
                <Avatar.Root size="lg">
                  <Avatar.Fallback
                    bg={colors.brandSecondary}
                    color={colors.colorWhite}
                  >
                    {member.initials}
                  </Avatar.Fallback>
                </Avatar.Root>

                <Box>
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
