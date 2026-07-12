'use client';

import { useState } from 'react';
import { Table, Box, Button } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { colors } from '@/theme/colors';
import { MethodBadge } from '../method-badge/method-badge';
import type { LogItem } from '../log-table/logs-table';

type LogTableRowProps = {
  log: LogItem;
  isLast: boolean;
};

export const LogTableRow = ({ log, isLast }: LogTableRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!log.error;

  const cellStyles =
    isLast && !isOpen
      ? { ...history.tableBodyCell, borderBottom: 'none' }
      : history.tableBodyCell;

  const errorCellStyles = isLast
    ? { ...history.tableBodyCell, borderBottom: 'none' }
    : history.tableBodyCell;

  return (
    <>
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
        <Table.Cell
          {...cellStyles}
          color={colors.colorWhite}
          fontWeight="medium"
        >
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

        <Table.Cell {...cellStyles}>
          {hasError ? (
            <Button
              {...history.tableErrorButton}
              color={isOpen ? colors.colorZinc500 : colors.destructive}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? '- hide' : '+ view'}
            </Button>
          ) : (
            <Box {...history.tableEmptyError}>—</Box>
          )}
        </Table.Cell>
      </Table.Row>

      {hasError && isOpen && (
        <Table.Row style={{ backgroundColor: 'transparent' }}>
          <Table.Cell
            {...errorCellStyles}
            {...history.tableErrorDetailCell}
            colSpan={8}
          >
            {log.error}
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};
