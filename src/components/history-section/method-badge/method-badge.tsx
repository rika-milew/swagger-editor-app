import { history } from '@/theme/history';
import type { MethodType } from '@/theme/history';
import { Box } from '@chakra-ui/react';

export const MethodBadge = ({ method }: { method: MethodType }) => (
  <Box {...history.methodBadge} bg={history.getMethodBg(method)}>
    {method}
  </Box>
);
