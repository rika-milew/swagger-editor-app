import { Badge, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { colors } from '@/theme/colors';

const stack = [
  'TanStack Start',
  'React 19',
  'TypeScript',
  'Tailwind v4',
  'Vite',
];

export default function StackSection() {
  return (
    <Stack gap={5}>
      <Text
        color={colors.colorZinc500}
        fontSize="xs"
        letterSpacing="0.35em"
        textTransform="uppercase"
      >
        Stack
      </Text>

      <Wrap gap={3}>
        {stack.map((item) => (
          <WrapItem key={item}>
            <Badge
              px={4}
              py={2}
              borderRadius="full"
              bg={colors.panel}
              color={colors.cardForeground}
              border="1px solid"
              borderColor={colors.border}
              fontWeight="500"
              fontSize="sm"
            >
              {item}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
}
