import { Box, Text } from '@chakra-ui/react';
import { history } from '@/theme/history';

type StatsCardProps = {
  label: string;
  value: string;
};

export const StatsCard = ({ label, value }: StatsCardProps) => {
  return (
    <Box {...history.statsCard}>
      <Text {...history.statsLabel}>{label}</Text>
      <Text {...history.statsValue}>{value}</Text>
    </Box>
  );
};
