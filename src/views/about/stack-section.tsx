import { Badge, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { about } from '@/theme/about';

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
      <Text color={colors.colorZinc500} fontSize="xs" textTransform="uppercase">
        Stack
      </Text>

      <Wrap gap={3}>
        {stack.map((item) => (
          <WrapItem key={item}>
            <Badge {...about.stackItemConteiner}>{item}</Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
}
