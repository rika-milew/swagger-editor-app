import { getTranslations } from 'next-intl/server';
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

export default async function StackSection() {
  const t = await getTranslations('AboutPage');
  return (
    <Stack gap={5}>
      <Text color={colors.colorZinc500} fontSize="xs" textTransform="uppercase">
        {t('stackTitle')}
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
