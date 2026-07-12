'use client';

import { Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { useTranslations } from 'next-intl';

export const LogTableHeader = () => {
  const t = useTranslations('HistoryPage');

  return (
    <Table.Header>
      <Table.Row style={{ backgroundColor: 'transparent' }}>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.time')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.method')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.endpoint')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.status')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.duration')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.req')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.res')}
        </Table.ColumnHeader>
        <Table.ColumnHeader {...history.tableHeaderCell}>
          {t('columns.error')}
        </Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  );
};
