'use client';

import { Box, Stack } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { HeroSection } from '@/components/history-section/hero-section/hero-section';
import { LogsTable } from '@/components/history-section/log-table/logs-table';

export const HistoryView = () => {
  return (
    <Box {...history.historyWrapper}>
      <Box {...history.historyContainer}>
        <Stack gap={{ base: 10, md: 14 }}>
          <HeroSection />
          <LogsTable />
        </Stack>
      </Box>
    </Box>
  );
};
