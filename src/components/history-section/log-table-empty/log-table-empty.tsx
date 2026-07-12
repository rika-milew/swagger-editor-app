import { Box } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { getTranslations } from 'next-intl/server';

export const LogTableEmpty = async () => {
  const t = await getTranslations('HistoryPage');

  return (
    <Box {...history.tableContainer}>
      <Box {...history.tableEmptyState}>
        <Box {...history.tableEmptyStateTitle}>{t('noLogsTitle')}</Box>
        <Box {...history.tableEmptyStateDesc}>{t('noLogsDesc')}</Box>
      </Box>
    </Box>
  );
};
