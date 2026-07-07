import { Heading, Stack, Text } from '@chakra-ui/react';
import { colors } from '@/theme/colors';

export default function HeroSection() {
  return (
    <Stack align="start" gap={6}>
      <Text
        color={colors.brandPrimary}
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.35em"
        textTransform="uppercase"
      >
        About
      </Text>

      <Heading
        color={colors.colorWhite}
        fontWeight="700"
        lineHeight="1.05"
        maxW="720px"
        fontSize={{
          base: '3xl',
          md: '5xl',
        }}
      >
        A modern workbench for OpenAPI specifications.
      </Heading>

      <Text
        maxW="650px"
        color={colors.mutedForeground}
        fontSize={{
          base: 'md',
          md: 'lg',
        }}
        lineHeight="1.8"
      >
        NexusOpen is the RS School graduation project — a Swagger/OpenAPI editor
        with an interactive viewer, request execution and analytics, built
        end-to-end on TanStack Start.
      </Text>
    </Stack>
  );
}
