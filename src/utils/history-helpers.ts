import type { MethodType } from '@/theme/history';
import type { Tables } from '@/types/database.types';
import type { LogItem } from '@/components/history-section/log-table/logs-table';
import { VALID_HTTP_METHODS, HTTP_STATUS } from '@/constants/http-status';

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

export const formatBytes = (bytes: number | null): string => {
  if (!bytes || bytes === 0) {
    return '0 B';
  }

  const BYTES_IN_KILOBYTE = 1024;
  const UNITS = ['B', 'KB', 'MB', 'GB'];

  const unitIndex = Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KILOBYTE));

  const formattedValue = Number.parseFloat(
    (bytes / Math.pow(BYTES_IN_KILOBYTE, unitIndex)).toFixed(2),
  );

  const unit = UNITS[unitIndex];

  return `${String(formattedValue)} ${unit}`;
};

export const isValidMethod = (method: string): method is MethodType => {
  return VALID_HTTP_METHODS.has(method.toUpperCase());
};

export const toValidMethod = (method: string): MethodType => {
  const upper = method.toUpperCase();
  const methods: MethodType[] = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'HEAD',
    'OPTIONS',
  ];
  for (const m of methods) {
    if (m === upper) {
      return m;
    }
  }
  return 'GET';
};

export const formatLogs = (
  logs: Tables<'request_history'>[] | null,
): LogItem[] => {
  if (!logs) {
    return [];
  }

  return logs.map((log) => ({
    id: log.id,
    time: formatTimestamp(log.request_timestamp),
    method: toValidMethod(log.request_method),
    endpoint: log.endpoint_url,
    status: log.response_status_code ?? HTTP_STATUS.BAD_GATEWAY,
    duration: `${String(log.request_duration ?? 0)}ms`,
    req: formatBytes(log.request_size),
    res: formatBytes(log.response_size),
    error: log.error_details ?? undefined,
  }));
};
