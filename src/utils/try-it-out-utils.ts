import type { SwaggerParameter } from '@/types/viewer.types';

export function getParameters(
  parameters: SwaggerParameter[],
  location: string,
): SwaggerParameter[] {
  return parameters.filter((parameter) => parameter.in === location);
}

export function buildUrl(
  baseUrl: string,
  path: string,
  parameters: SwaggerParameter[],
  values: Record<string, string>,
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');

  let url = cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;

  getParameters(parameters, 'path').forEach((parameter) => {
    const value = values[parameter.name];
    if (value) {
      url = url.replace(`{${parameter.name}}`, encodeURIComponent(value));
    }
  });

  const queryString = getParameters(parameters, 'query')
    .filter((parameter) => values[parameter.name])
    .map(
      (parameter) =>
        `${parameter.name}=${encodeURIComponent(values[parameter.name])}`,
    )
    .join('&');

  return queryString ? `${url}?${queryString}` : url;
}

export function buildHeaders(
  parameters: SwaggerParameter[],
  values: Record<string, string>,
): Record<string, string> {
  const headers: Record<string, string> = {};

  getParameters(parameters, 'header').forEach((parameter) => {
    if (values[parameter.name]) {
      headers[parameter.name] = values[parameter.name];
    }
  });

  const cookies = getParameters(parameters, 'cookie')
    .filter((parameter) => values[parameter.name])
    .map(
      (parameter) =>
        `${parameter.name}=${encodeURIComponent(values[parameter.name])}`,
    )
    .join('; ');

  if (cookies) {
    headers.Cookie = cookies;
  }

  return headers;
}
