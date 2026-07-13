'use client';

import { Box } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/constants/routes';
import { TextLink } from '@/components/text-link/text-link';

export const LogTableEmpty = () => {
  const t = useTranslations('HistoryPage');

  return (
    <Box {...history.tableContainer}>
      <Box {...history.tableEmptyState}>
        <Box {...history.tableEmptyStateTitle}>{t('noLogsTitle')}</Box>
        <Box {...history.tableEmptyStateDesc}>{t('noLogsDesc')}</Box>
        <TextLink
          href={ROUTES.HOME}
          fontSize="md"
          fontWeight="bold"
          textDecoration="underline"
        >
          {t('goToEditor')}
        </TextLink>
      </Box>
    </Box>
  );
};
