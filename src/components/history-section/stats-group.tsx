import { Box } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { StatsCard } from './stats-card';
import { getTranslations } from 'next-intl/server';

export const StatsGroup = async () => {
  const t = await getTranslations('HistoryPage');

  const labels = {
    totalRequests: t('totalRequests'),
    avgDuration: t('avgDuration'),
    successRate: t('successRate'),
  };

  return (
    <Box {...history.statsGrid}>
      <StatsCard label={labels.totalRequests} value="1,284" />
      <StatsCard label={labels.avgDuration} value="187ms" />
      <StatsCard label={labels.successRate} value="98.4%" />
    </Box>
  );
};
