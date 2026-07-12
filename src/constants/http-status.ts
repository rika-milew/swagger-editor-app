export const HTTP_STATUS = {
  OK: 200,
  REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  BAD_GATEWAY: 502,
} as const;

export const VALID_HTTP_METHODS = new Set<string>([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const);

export const METHODS_WITH_BODY = new Set<string>(['POST', 'PUT', 'PATCH']);
