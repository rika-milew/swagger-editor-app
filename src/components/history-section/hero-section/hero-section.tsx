'use client';

import { Stack, Text } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('HistoryPage');

  return (
    <Stack align="start" gap={6}>
      <Text {...history.historyTitle}>{t('historyTitle')}</Text>
      <Text {...history.historyDescription}>{t('historyDesc')}</Text>
    </Stack>
  );
};
