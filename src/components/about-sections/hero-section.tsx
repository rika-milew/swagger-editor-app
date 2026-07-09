import { getTranslations } from 'next-intl/server';
import { Heading, Stack, Text } from '@chakra-ui/react';
import { about } from '@/theme/about';

export default async function HeroSection() {
  const t = await getTranslations('AboutPage');

  return (
    <Stack align="start" gap={6}>
      <Text {...about.heroTitle}>{t('heroTitle')}</Text>
      <Heading {...about.heroHeading}>{t('heroHeading')}</Heading>
      <Text {...about.heroDescr}>{t('heroDescr')}</Text>
    </Stack>
  );
}
