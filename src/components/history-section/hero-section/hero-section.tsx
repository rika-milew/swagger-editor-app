import { Stack, Text } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { getTranslations } from 'next-intl/server';

export const HeroSection = async () => {
  const t = await getTranslations('HistoryPage');

  return (
    <Stack align="start" gap={6}>
      <Text {...history.historyTitle}>{t('historyTitle')}</Text>
      <Text {...history.historyDescription}>{t('historyDesc')}</Text>
    </Stack>
  );
};
