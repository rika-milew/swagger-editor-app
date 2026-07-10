import { Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { colors } from '@/theme/colors';
import { MethodBadge } from './method-badge';
import type { MethodType } from '@/theme/history';

type LogTableRowProps = {
  log: {
    id: string;
    time: string;
    method: MethodType;
    endpoint: string;
    status: number;
    duration: string;
    req: string;
    res: string;
  };
  isLast: boolean;
};

export const LogTableRow = ({ log, isLast }: LogTableRowProps) => {
  const cellStyles = isLast
    ? { ...history.tableBodyCell, borderBottom: 'none' }
    : history.tableBodyCell;

  return (
    <Table.Row
      _hover={{ bg: colors.surfaceHover }}
      transition="background 0.2s"
      style={{ backgroundColor: 'transparent' }}
    >
      <Table.Cell {...cellStyles} color={colors.colorZinc500}>
        {log.time}
      </Table.Cell>
      <Table.Cell {...cellStyles}>
        <MethodBadge method={log.method} />
      </Table.Cell>
      <Table.Cell {...cellStyles} color={colors.colorWhite} fontWeight="medium">
        {log.endpoint}
      </Table.Cell>
      <Table.Cell
        {...cellStyles}
        color={history.getStatusColor(log.status)}
        fontWeight="bold"
      >
        {log.status}
      </Table.Cell>
      <Table.Cell {...cellStyles} color={colors.colorZinc400}>
        {log.duration}
      </Table.Cell>
      <Table.Cell {...cellStyles} color={colors.colorZinc500}>
        {log.req}
      </Table.Cell>
      <Table.Cell {...cellStyles} color={colors.colorZinc500}>
        {log.res}
      </Table.Cell>
    </Table.Row>
  );
};
