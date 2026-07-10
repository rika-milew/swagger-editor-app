import { Table } from '@chakra-ui/react';
import { history } from '@/theme/history';
import { getTranslations } from 'next-intl/server';

export const LogTableHeader = async () => {
  const t = await getTranslations('HistoryPage');

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
      </Table.Row>
    </Table.Header>
  );
};
