import { Box, Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import type { MethodType } from '@/theme/history';
import { LogTableHeader } from './log-table-header';
import { LogTableRow } from './table-row';

type LogItem = {
  id: string;
  time: string;
  method: MethodType;
  endpoint: string;
  status: number;
  duration: string;
  req: string;
  res: string;
};

const mockLogs: LogItem[] = [
  {
    id: '1',
    time: '12:42:08',
    method: 'GET',
    endpoint: '/users/42',
    status: 200,
    duration: '142ms',
    req: '128b',
    res: '1284b',
  },
  {
    id: '2',
    time: '12:38:19',
    method: 'POST',
    endpoint: '/users/register',
    status: 201,
    duration: '318ms',
    req: '412b',
    res: '256b',
  },
  {
    id: '3',
    time: '12:30:55',
    method: 'DELETE',
    endpoint: '/users/992',
    status: 404,
    duration: '28ms',
    req: '96b',
    res: '412b',
  },
  {
    id: '4',
    time: '12:14:02',
    method: 'PUT',
    endpoint: '/users/17',
    status: 500,
    duration: '1240ms',
    req: '384b',
    res: '220b',
  },
  {
    id: '5',
    time: '11:55:48',
    method: 'GET',
    endpoint: '/users?limit=10',
    status: 200,
    duration: '96ms',
    req: '64b',
    res: '512b',
  },
];

export const LogsTable = () => {
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
