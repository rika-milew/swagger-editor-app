import { describe, expect, it } from 'vitest';
import {
  formatTimestamp,
  formatBytes,
  isValidMethod,
  formatLogs,
} from './history-helpers';
import type { Tables } from '@/types/database.types';
import { HTTP_STATUS, VALID_HTTP_METHODS } from '@/constants/http-status';

const VALID_METHOD = [...VALID_HTTP_METHODS][0] ?? 'GET';

describe('formatTimestamp', () => {
  it('should format a valid timestamp string in DD/MM/YYYY, HH:mm:ss format', () => {
    const result = formatTimestamp('2024-01-15T10:30:45.000Z');
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
  });

  it('should use 24-hour format without AM/PM', () => {
    const result = formatTimestamp('2024-01-15T15:30:45.000Z');
    expect(result).not.toContain('AM');
    expect(result).not.toContain('PM');
  });

  it('should handle different dates maintaining the correct format', () => {
    const result = formatTimestamp('2024-12-31T23:59:59.000Z');
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
  });
});

describe('formatBytes', () => {
  it('should return 0 B for null', () => {
    expect(formatBytes(null)).toBe('0 B');
  });

  it('should return 0 B for 0', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('should format bytes correctly', () => {
    expect(formatBytes(100)).toBe('100 B');
  });

  it('should format kilobytes correctly', () => {
    const oneKilobyte = 1024;
    expect(formatBytes(oneKilobyte)).toBe('1 KB');
  });

  it('should format megabytes correctly', () => {
    const oneMegabyte = 1_048_576;
    expect(formatBytes(oneMegabyte)).toBe('1 MB');
  });

  it('should format gigabytes correctly', () => {
    const oneGigabyte = 1_073_741_824;
    expect(formatBytes(oneGigabyte)).toBe('1 GB');
  });

  it('should handle fractional values', () => {
    const oneAndHalfKilobyte = 1536;
    expect(formatBytes(oneAndHalfKilobyte)).toBe('1.5 KB');
  });

  it('should handle edge case between units', () => {
    const justBelowKilobyte = 1023;
    const justAboveKilobyte = 1025;
    expect(formatBytes(justBelowKilobyte)).toBe('1023 B');
    expect(formatBytes(justAboveKilobyte)).toBe('1 KB');
  });
});

describe('isValidMethod', () => {
  it('should return true for valid HTTP methods', () => {
    VALID_HTTP_METHODS.forEach((method) => {
      expect(isValidMethod(method)).toBe(true);
    });
  });

  it('should be case insensitive', () => {
    expect(isValidMethod('get')).toBe(true);
    expect(isValidMethod('POST')).toBe(true);
    expect(isValidMethod('Delete')).toBe(true);
  });

  it('should return false for invalid methods', () => {
    expect(isValidMethod('INVALID')).toBe(false);
    expect(isValidMethod('')).toBe(false);
    expect(isValidMethod('UNKNOWN')).toBe(false);
    expect(isValidMethod('GRAPHQL')).toBe(false);
  });
});

describe('formatLogs', () => {
  const TEST_ID = '123';
  const TEST_TIMESTAMP = '2024-01-15T10:30:45.000Z';
  const TEST_ENDPOINT = '/api/users';
  const TEST_DURATION = 150;
  const TEST_REQUEST_SIZE = 1024;
  const TEST_RESPONSE_SIZE = 2048;

  const expectedDuration = String(TEST_DURATION) + 'ms';

  const createMockLog = (
    overrides: Partial<Tables<'request_history'>> = {},
  ): Tables<'request_history'> => {
    const baseLog: Tables<'request_history'> = {
      id: TEST_ID,
      request_timestamp: TEST_TIMESTAMP,
      request_method: VALID_METHOD,
      endpoint_url: TEST_ENDPOINT,
      response_status_code: 200,
      request_duration: TEST_DURATION,
      request_size: TEST_REQUEST_SIZE,
      response_size: TEST_RESPONSE_SIZE,
      error_details: null,
      created_at: TEST_TIMESTAMP,
      user_id: 'user123',
    };

    return { ...baseLog, ...overrides };
  };

  it('should return empty array for null input', () => {
    expect(formatLogs(null)).toEqual([]);
  });

  it('should format a single log correctly', () => {
    const mockLog = createMockLog();
    const result = formatLogs([mockLog]);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: TEST_ID,
      method: VALID_METHOD,
      endpoint: TEST_ENDPOINT,
      status: 200,
      duration: expectedDuration,
      req: '1 KB',
      res: '2 KB',
      error: undefined,
    });

    expect(result[0].time).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
  });

  it('should default to GET for invalid HTTP methods', () => {
    const invalidMethod = 'INVALID_METHOD';
    const mockLog = createMockLog({ request_method: invalidMethod });
    const result = formatLogs([mockLog]);

    expect(result[0].method).toBe('GET');
  });

  it('should handle null optional fields with defaults', () => {
    const mockLog = createMockLog({
      response_status_code: HTTP_STATUS.BAD_GATEWAY,
      request_duration: null,
      request_size: undefined,
      response_size: null,
      error_details: null,
    });
    const result = formatLogs([mockLog]);

    const expectedStatusCode = HTTP_STATUS.BAD_GATEWAY;
    const expectedDuration = '0ms';
    const expectedSize = '0 B';

    expect(result[0].status).toBe(expectedStatusCode);
    expect(result[0].duration).toBe(expectedDuration);
    expect(result[0].req).toBe(expectedSize);
    expect(result[0].res).toBe(expectedSize);
    expect(result[0].error).toBeUndefined();
  });

  it('should preserve error details when present', () => {
    const errorMessage = 'Network timeout';
    const mockLog = createMockLog({ error_details: errorMessage });
    const result = formatLogs([mockLog]);

    expect(result[0].error).toBe(errorMessage);
  });

  it('should format multiple logs', () => {
    const secondId = '456';
    const logs = [
      createMockLog({ id: TEST_ID }),
      createMockLog({ id: secondId, request_method: 'POST' }),
    ];
    const result = formatLogs(logs);

    expect(result).toHaveLength(logs.length);
    expect(result[0].id).toBe(TEST_ID);
    expect(result[1].id).toBe(secondId);
    expect(result[1].method).toBe('POST');
  });

  it('should handle zero duration', () => {
    const zeroDuration = 0;
    const mockLog = createMockLog({ request_duration: zeroDuration });
    const result = formatLogs([mockLog]);

    expect(result[0].duration).toBe(String(zeroDuration) + 'ms');
  });

  it('should handle large byte values', () => {
    const oneMegabyte = 1_048_576;
    const tenMegabytes = 10_485_760;

    const mockLog = createMockLog({
      request_size: oneMegabyte,
      response_size: tenMegabytes,
    });
    const result = formatLogs([mockLog]);

    expect(result[0].req).toBe('1 MB');
    expect(result[0].res).toBe('10 MB');
  });
});
