import { Box, Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import type { MethodType } from '@/theme/history';
import { LogTableHeader } from '../log-table-header/log-table-header';
import { LogTableRow } from '../table-row/table-row';
import { LogTableEmpty } from '@/components/history-section/log-table-empty/log-table-empty';

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

const mockLogs: LogItem[] = [
  {
    id: '1',
    time: '2026-07-11 12:42:08',
    method: 'GET',
    endpoint: '/users/42',
    status: 200,
    duration: '142ms',
    req: '128 B',
    res: '1.3 KB',
  },
  {
    id: '2',
    time: '2026-07-11 12:38:19',
    method: 'POST',
    endpoint: '/users/register',
    status: 201,
    duration: '318ms',
    req: '412 B',
    res: '256 B',
  },
  {
    id: '3',
    time: '2026-07-11 12:30:55',
    method: 'DELETE',
    endpoint: '/users/992',
    status: 404,
    duration: '28ms',
    req: '96 B',
    res: '412 B',
    error: 'NotFoundError: user with id=992 does not exist',
  },
  {
    id: '4',
    time: '2026-07-11 12:14:02',
    method: 'PUT',
    endpoint: '/users/17',
    status: 500,
    duration: '1240ms',
    req: '384 B',
    res: '220 B',
    error: 'InternalServerError: Database connection timeout',
  },
  {
    id: '5',
    time: '2026-07-11 11:55:48',
    method: 'GET',
    endpoint: '/users?limit=10',
    status: 200,
    duration: '96ms',
    req: '64 B',
    res: '5.0 KB',
  },
  {
    id: '6',
    time: '2026-07-11 11:40:11',
    method: 'POST',
    endpoint: '/users/login',
    status: 401,
    duration: '74ms',
    req: '210 B',
    res: '148 B',
    error: 'UnauthorizedError: Invalid credentials provided',
  },
];

export const LogsTable = () => {
  if (mockLogs.length === 0) {
    return <LogTableEmpty />;
  }
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
          {mockLogs.map((log, index) => (
            <LogTableRow
              key={log.id}
              log={log}
              isLast={index === mockLogs.length - 1}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
