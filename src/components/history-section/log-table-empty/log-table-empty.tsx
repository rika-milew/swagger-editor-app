'use client';

import { Box } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { useTranslations } from 'next-intl';

export const LogTableEmpty = () => {
  const t = useTranslations('HistoryPage');

  return (
    <Box {...history.tableContainer}>
      <Box {...history.tableEmptyState}>
        <Box {...history.tableEmptyStateTitle}>{t('noLogsTitle')}</Box>
        <Box {...history.tableEmptyStateDesc}>{t('noLogsDesc')}</Box>
      </Box>
    </Box>
  );
};
