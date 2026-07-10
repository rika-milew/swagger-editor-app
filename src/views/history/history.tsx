import { Box, Stack } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { HeroSection } from '@/components/history-section/hero-section';
import { StatsGroup } from '@/components/history-section/stats-group';
import { LogsTable } from '@/components/history-section/logs-table';

export const HistoryView = () => {
  return (
    <Box {...history.historyWrapper}>
      <Box {...history.historyContainer}>
        <Stack gap={{ base: 10, md: 14 }}>
          <HeroSection />
          <StatsGroup />
          <LogsTable />
        </Stack>
      </Box>
    </Box>
  );
};
