import { Box, Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import type { MethodType } from '@/theme/history';
import { LogTableHeader } from '../log-table-header/log-table-header';
import { LogTableRow } from '../table-row/table-row';
import { LogTableEmpty } from '@/components/history-section/log-table-empty/log-table-empty';
import { getHistory } from '@/app/actions/history';
import { getSession } from '@/lib/auth/get-session';
import { formatLogs } from '@/utils/history-helpers';

export type LogItem = {
  id: string;
  time: string;
  method: MethodType;
  endpoint: string;
  status: number;
  duration: string;
  req: string;
  res: string;
  error?: string;
};

export const LogsTable = async () => {
  const user = await getSession();
  if (!user) {
    return null;
  }

  const result = await getHistory();
  const logs = result.data ?? [];

  if (logs.length === 0) {
    return <LogTableEmpty />;
  }

  const formattedLogs = formatLogs(logs);

  return (
    <Box {...history.tableContainer}>
      <Table.Root
        native
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          borderCollapse: 'collapse',
        }}
      >
        <LogTableHeader />
        <Table.Body>
          {formattedLogs.map((log, index) => (
            <LogTableRow
              key={log.id}
              log={log}
              isLast={index === formattedLogs.length - 1}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
