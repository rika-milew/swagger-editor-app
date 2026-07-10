import type { RequestInput } from '@/lib/validation/request-schema';

type ProxyRequestInput = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

const VALID_METHODS = new Set([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
]);

export function isRequestMethod(
  value: unknown,
): value is RequestInput['request_method'] {
  return typeof value === 'string' && VALID_METHODS.has(value);
}

export function isInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return BLOCKED_HOSTS.has(parsed.hostname);
  } catch {
    return true;
  }
}

export function isProxyRequest(value: unknown): value is ProxyRequestInput {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'url' in value && typeof value.url === 'string' && value.url.length > 0
  );
}
